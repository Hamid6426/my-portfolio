import type { ReactNode } from "react";
import { Slide } from "./Motion";

export function Section({
  id,
  title,
  children,
}: Readonly<{
  id: string;
  title: string;
  children: ReactNode;
}>) {
  return (
    <section id={id} className="px-[5%] pb-48">
      <h2 className="t2 mb-12">
        <Slide inView animation="slide-up-section" className="block">
          {title}
        </Slide>
      </h2>
      {children}
    </section>
  );
}

export default Section;
