import { skillsData } from "@/data/skills.data";
import Section from "./Section";
import { Separator } from "./Separator";
import { Slide } from "./Motion";

export default function Skill() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-6">
        {skillsData.map((s, i) => (
          <Slide key={s.id ?? s.title} inView animation="slide-left">
            {i > 0 && <Separator className="mb-6" />}
            <dt className="t3">{s.title}</dt>
            <dd className="t7 mt-1 text-muted">{s.items.join(" · ")}</dd>
          </Slide>
        ))}
      </dl>
    </Section>
  );
}
