import { educationData } from "@/data/education.data";
import Section from "./Section";
import { Separator } from "./Separator";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="space-y-6">
        {educationData.map((ed, i) => {
          const displayHeading =
            ed.degree && ed.title && ed.degree !== ed.title
              ? `${ed.degree} - ${ed.title}`
              : ed.title || ed.degree;

          return (
            <li key={ed.id ?? ed.title}>
              {i > 0 && <Separator className="mb-6" />}

              <p className="t3">{displayHeading}</p>
              <p className="mt-1 t5 text-muted">{ed.institution}</p>
              <p className="mt-1 t5 text-muted">{ed.graduation}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
