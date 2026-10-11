import { educationData } from "@/data/education.data";
import Section from "./Section";
import { Separator } from "./Separator";
import { Slide } from "./Motion";

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
              <Slide inView animation="slide-left">
                {i > 0 && <Separator className="mb-6" />}

                <p className="t3">{displayHeading}</p>
                <p className="t5 mt-1 text-muted">{ed.institution}</p>
                <p className="t5 mt-1 text-muted">{ed.graduation}</p>
              </Slide>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
