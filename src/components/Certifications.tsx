import { certificationsData } from "@/data/certifications.data";
import Section from "./Section";
import { Separator } from "./Separator";

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="space-y-6">
        {certificationsData.map((c, i) => {
          const title = typeof c === "string" ? c : c.title;
          const place = typeof c === "string" ? null : c.issuer;
          const key = typeof c === "string" ? c : c.id ?? c.title;
          const date = typeof c === "string" ? null : c.issuedAt;

          return (
            <li key={key}>
              {i > 0 && <Separator className="mb-6" />}
              <p className="t3">{title}</p>
              {(place || date) && (
                <p className="mt-1 t5 text-muted">
                  {[place, date].filter(Boolean).join(" · ")}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
