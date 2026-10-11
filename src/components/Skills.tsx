import { skillsData } from "@/data/skills.data";
import Section from "./Section";
import { Separator } from "./Separator";

export default function Skill() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-6">
        {skillsData.map((s, i) => (
          <div key={s.id ?? s.title}>
            {i > 0 && <Separator className="mb-6" />}
            <dt className="t3">{s.title}</dt>
            <dd className="mt-1 t8 text-muted">
              {s.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
