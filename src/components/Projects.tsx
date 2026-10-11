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
              className="grid grid-cols-12 items-start gap-6 py-12"
            >
              <div className="col-span-12 lg:col-span-9">
                <h3 className="t3">{p.title}</h3>
                <p className="t5 mt-4 max-w-[54ch] text-muted">
                  {p.description}
                </p>
                <div className="t7 mt-4 text-muted">
                  <p>{p.tags.join(" · ")}</p>
                </div>
              </div>

              <div className="col-span-12 flex justify-end lg:col-span-3 lg:h-full lg:items-end">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} (opens in a new tab)`}
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-4xl font-extrabold transition-colors group-hover:text-inverse lg:text-6xl"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </Slide>
          </li>
        ))}
      </ul>
    </Section>
  );
}
