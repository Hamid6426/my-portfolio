import { aboutData } from "../data/about.data";
import Section from "./Section";
import { Slide } from "./Motion";

export default function About() {
  return (
    <Section id="about" title="About Me">
      <p className="t4">
        <Slide inView animation="slide-up-long-summary" className="block">
          {aboutData.longSummary}
        </Slide>
      </p>
    </Section>
  );
}
