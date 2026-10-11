import { afterAll, beforeEach, expect, mock, test } from "bun:test";

const sendMail = mock(async () => ({ accepted: ["owner@example.com"] }));
const createTransport = mock(() => ({ sendMail }));
mock.module("nodemailer", () => ({ default: { createTransport } }));

const smtpKeys = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "SMTP_TO",
];
const originalEnv = Object.fromEntries(
  smtpKeys.map((key) => [key, process.env[key]]),
);
const submission = {
  name: " Hamid ",
  email: " visitor@example.com ",
  message: " Let's discuss a project. ",
};

beforeEach(() => {
  Object.assign(process.env, {
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: "587",
    SMTP_SECURE: "false",
    SMTP_USER: "owner@example.com",
    SMTP_PASS: "test-password",
    SMTP_FROM: "owner@example.com",
    SMTP_TO: "owner@example.com",
  });
  createTransport.mockClear();
  sendMail.mockReset();
  sendMail.mockResolvedValue({ accepted: ["owner@example.com"] });
});

afterAll(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  mock.restore();
});

async function submit(body, raw = false) {
  const { POST } = await import("../src/app/api/contact-submission/route.ts");
  return POST(
    new Request("http://localhost/api/contact-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw ? body : JSON.stringify(body),
    }),
  );
}

test("sends trimmed contact details to the configured owner with the visitor as reply-to", async () => {
  const response = await submit(submission);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    success: true,
    message: "Message sent successfully.",
  });
  expect(createTransport.mock.calls[0][0]).toMatchObject({
    port: 587,
    secure: false,
    requireTLS: true,
  });
  expect(sendMail.mock.calls[0][0]).toMatchObject({
    from: "owner@example.com",
    to: "owner@example.com",
    replyTo: "visitor@example.com",
    subject: "Portfolio inquiry",
    text: "Let's discuss a project.\n\nFrom: Hamid\nEmail: visitor@example.com",
  });
});

test("rejects malformed JSON without attempting delivery", async () => {
  expect((await submit("{", true)).status).toBe(400);
  expect(sendMail).not.toHaveBeenCalled();
});

test("rejects invalid fields and oversized messages without attempting delivery", async () => {
  for (const body of [
    null,
    [],
    {},
    { ...submission, name: 42 },
    { ...submission, email: "invalid" },
    { ...submission, email: "x@example.com\r\nBcc: other@example.com" },
    { ...submission, name: " " },
    { ...submission, message: "short" },
    { ...submission, message: "x".repeat(5001) },
  ]) {
    expect((await submit(body)).status).toBe(400);
  }
  expect(sendMail).not.toHaveBeenCalled();
});

test("reports missing or invalid SMTP configuration without delivery", async () => {
  delete process.env.SMTP_PASS;
  expect((await submit(submission)).status).toBe(503);
  process.env.SMTP_PASS = "test-password";
  process.env.SMTP_PORT = "invalid";
  expect((await submit(submission)).status).toBe(503);
  expect(sendMail).not.toHaveBeenCalled();
});

test("returns a generic error when SMTP delivery fails", async () => {
  sendMail.mockRejectedValueOnce(new Error("private SMTP details"));
  const response = await submit(submission);
  expect(response.status).toBe(502);
  const body = await response.json();
  expect(body.success).toBe(false);
  expect(JSON.stringify(body)).not.toContain("private SMTP details");
});

test("reports failed delivery when the SMTP server accepts no recipients", async () => {
  sendMail.mockResolvedValueOnce({
    accepted: [],
    rejected: ["owner@example.com"],
  });
  const response = await submit(submission);
  expect(response.status).toBe(502);
  expect((await response.json()).success).toBe(false);
});
