import type { ReactNode } from "react";
import { Separator } from "./Separator";

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
        <h2 className="mb-12 t2">
          {title}
        </h2>
        {children}
      </section>
  );
}

export default Section;
