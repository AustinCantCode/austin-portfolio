import { TimelineLayout } from "@components/ui/timeline-layout";
import Title from "@components/ui/title";
import { timelineData } from "@data/timeline";

export default function Timeline() {
  return (
    <section>
      <Title header="Timeline and Progress" />
      <TimelineLayout items={timelineData} size="lg" animate={false} />
    </section>
  );
}
