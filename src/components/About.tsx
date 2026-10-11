import { aboutData } from "../data/about.data";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" title="About Me">
      <p className="t4">
        {aboutData.longSummary}
      </p>
    </Section>
  );
}
