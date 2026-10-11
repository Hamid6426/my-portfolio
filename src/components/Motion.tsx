"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

type SlideUpProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  animation?:
    | "slide-up"
    | "slide-up-short-summary"
    | "slide-up-section"
    | "slide-up-long-summary"
    | "slide-left";
}>;

export function Slide({
  children,
  className = "",
  delay = 0,
  inView = false,
  animation = "slide-up",
}: SlideUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    initial: !inView,
    margin: "0px 0px -120px 0px",
  });

  return (
    <div
      ref={ref}
      className={className + (isInView ? " " + animation : " slide-pending")}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
