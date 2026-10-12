import { projectsData } from "../data/projects.data";
import { Slide } from "./Motion";
import Section from "./Section";
import { Separator } from "./Separator";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul>
        {projectsData.map((p) => (
          <li key={p.id ?? p.title}>
            <Separator />
            <Slide
              inView
              animation="slide-left"
              className="py-12"
            >
              <div>
                <h3 className="t3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} (opens in a new tab)`}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <span>{p.title}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </h3>
                <p className="t5 mt-4 max-w-[54ch] text-muted">
                  {p.description}
                </p>
                <div className="t7 mt-4 text-muted">
                  <p>{p.tags.join(" · ")}</p>
                </div>
              </div>
            </Slide>
          </li>
        ))}
      </ul>
    </Section>
  );
}
