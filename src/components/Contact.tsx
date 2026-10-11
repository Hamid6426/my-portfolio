"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Separator } from "./Separator";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", email: "", message: "" };
const emailRe = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!emailRe.test(v.email.trim()))
    e.email = "Please enter a valid email.";
  if (!v.message.trim()) e.message = "Please write a message.";
  else if (v.message.trim().length < 10)
    e.message = "Message must be at least 10 characters.";
  return e;
}

const fields: {
  key: keyof Values;
  label: string;
  type?: string;
  auto?: string;
}[] = [
  { key: "name", label: "Name", auto: "name" },
  { key: "email", label: "Email", type: "email", auto: "email" },
];

const inputCls =
  "block w-full border-0 border-b border-ink/60 bg-transparent pr-0 pl-2 py-3 text-xl text-ink placeholder:text-muted outline-none focus:outline-none focus:border-accent focus:border-b-2 focus-visible:outline-none focus-visible:ring-0 aria-[invalid=true]:border-b-2 aria-[invalid=true]:border-accent";

export default function Contact() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [honey, setHoney] = useState("");
  const [toast, setToast] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const set = (k: keyof Values, val: string) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev: SubmitEvent) => {
    ev.preventDefault();
    if (pending || honey) return;
    setToast(false);
    setSubmitError("");
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = (Object.keys(errs) as (keyof Values)[])[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/contact-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setSubmitError(
          result.message ||
            "Unable to send your message. Please try again later.",
        );
        return;
      }
      setValues(empty);
      setToast(true);
    } catch {
      setSubmitError("Unable to send your message. Please try again later.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Separator />
      <section
        id="contact"
        className="px-gutter py-[clamp(4rem,10vw,10rem)]"
      >
        <h2 className="t1 text-ink">
          Let&apos;s talk.
        </h2>

      <div className="mt-[clamp(3rem,6vw,6rem)]">
        <div className="max-w-3xl">
          <noscript>
            <style>{`#contact form { display: none; }`}</style>
            <p>Please use the email or phone link to get in touch.</p>
          </noscript>
          <form
            onSubmit={submit}
            noValidate
            aria-label="Contact form"
            className="space-y-8"
          >
            {fields.map((f) => (
              <div key={f.key}>
                <label htmlFor={`f-${f.key}`} className="t9 text-muted">
                  {f.label}
                </label>
                <input
                  id={`f-${f.key}`}
                  name={f.key}
                  type={f.type ?? "text"}
                  required
                  disabled={pending}
                  maxLength={f.key === "name" ? 100 : 254}
                  autoComplete={f.auto}
                  value={values[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  aria-invalid={errors[f.key] ? true : undefined}
                  aria-describedby={errors[f.key] ? `e-${f.key}` : undefined}
                  className={inputCls}
                />
                {errors[f.key] && (
                  <p
                    id={`e-${f.key}`}
                    role="alert"
                    className="mt-2 mono text-ink"
                  >
                    ↑ {errors[f.key]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label htmlFor="f-message" className="t9 text-muted">
                Message
              </label>
              <textarea
                id="f-message"
                name="message"
                disabled={pending}
                rows={6}
                required
                minLength={10}
                maxLength={5000}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "e-message" : undefined}
                className={`${inputCls} resize-y`}
              />
              {errors.message && (
                <p id="e-message" role="alert" className="mt-2 mono text-ink">
                  ↑ {errors.message}
                </p>
              )}
            </div>

            <div
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Leave this field empty{" "}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                />
              </label>
            </div>

            {submitError && (
              <p role="alert" className="mono text-ink">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="bg-ink px-8 py-4 t9 text-paper transition-colors hover:bg-accent hover:text-[#111110] disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between gap-6 bg-ink px-5 py-4 mono text-paper sm:left-auto sm:max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Message sent. Thank you, I&apos;ll reply soon.</span>
            <button
              type="button"
              onClick={() => setToast(false)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  </>
  );
}
