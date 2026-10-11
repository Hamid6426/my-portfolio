import { projectsData } from "../data/projects.data";
import Section from "./Section";
import { Separator } from "./Separator";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul>
        {projectsData.map((p) => (
          <li key={p.id ?? p.title}>
            <Separator />
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} (opens in a new tab)`}
              className="group grid grid-cols-12 items-start gap-x-6 gap-y-6 py-8 lg:py-12 cursor-pointer"
            >
              <div className="col-span-12 transition-transform duration-300 ease-out group-hover:translate-x-3 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 lg:col-span-9">
                <h3 className="t3">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-[54ch] t5 text-muted">
                  {p.description}
                </p>
                <div className="mt-4 t8 text-muted">
                  <p>{p.tags.join(" · ")}</p>
                </div>
              </div>

              <div className="col-span-12 flex justify-end lg:col-span-3 lg:h-full lg:items-end">
                <span
                  aria-hidden="true"
                  className="font-heading font-extrabold text-4xl transition-colors group-hover:text-ink lg:text-6xl"
                >
                  ↗
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
