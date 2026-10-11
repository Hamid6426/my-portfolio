import { experienceData } from "../data/experience.data";
import Section from "./Section";
import { Separator } from "./Separator";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="list-none p-0">
        
        {experienceData.map((e, i) => (
          <li key={e.id ?? e.dates + e.company}>
            <Separator />
            <div className="py-12">
              <h3 className={`t3 ${i === 0 ? "text-ink" : ""}`}>
                {e.role}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 t5 text-muted">
                <span>{e.location ? `${e.company} · ${e.location}` : e.company}</span>
                <span aria-hidden="true">·</span>
                
                <p>
                  {e.dates.endsWith("Present") ? (
                    <>
                      {e.dates.slice(0, -"Present".length)}
                      <span className="font-medium text-ink">Present</span>
                    </>
                  ) : (
                    e.dates
                  )}
                </p>
              </div>
              <ul className="mt-5 max-w-3xl space-y-2.5 t7">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
