"use client";

import { useState } from "react";
import { aboutData } from "@/data/about.data";
import { socialData } from "@/data/socials.data";
import { contactData } from "@/data/contact.data";
import { nav } from "@/data/navbar.data";
import { Separator } from "./Separator";

function CopyButton({
  text,
  label,
}: Readonly<{
  text: string;
  label: string;
}>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      title={copied ? "Copied!" : `Copy ${label}`}
      className="inline-flex items-center justify-center p-1 text-base/60 transition-colors hover:text-primary"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 text-primary"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
          aria-hidden="true"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}

export default function Footer() {
  const github = socialData.find((s) => s.label === "GitHub")?.href;
  const linkedin = socialData.find((s) => s.label === "LinkedIn")?.href;

  const links = [
    github && {
      label: "GitHub",
      href: github,
      copyValue: github,
      external: true,
    },
    linkedin && {
      label: "LinkedIn",
      href: linkedin,
      copyValue: linkedin,
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${contactData.email}`,
      copyValue: contactData.email,
      external: false,
    },
    {
      label: "Phone",
      href:
        contactData.phoneHref || `tel:${contactData.phone.replace(/\s/g, "")}`,
      copyValue: contactData.phone,
      external: false,
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    copyValue: string;
    external: boolean;
  }[];

  return (
    <footer className="bg-inverse px-[5%] pt-8 text-base">
      <div className="t8 flex flex-col gap-6 pb-6">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.section}`} className="hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {links.map((item) => (
            <div key={item.label} className="inline-flex items-center gap-1.5">
              <CopyButton text={item.copyValue} label={item.label} />
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="hover:text-primary"
              >
                {item.label} ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      <Separator className="border-base/20" />

      <div className="t8 flex flex-col gap-2 py-8 text-base/65 sm:flex-row sm:justify-between">
        <p>© 2026 {aboutData.fullName}</p>
        <a href="#top" className="hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
