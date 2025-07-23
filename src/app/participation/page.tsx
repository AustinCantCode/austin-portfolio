// COMPONENTS
import Header from "./_components/header";
import CardText from "./_components/card-text";
import ImageCarousel from "./_components/image-carousel";

// DATA
import events from "@data/participation";

export default function Participation() {
  return events.map((event, index) => {
    return (
      <div
        className="card p-8 overflow-hidden transition-all max-w-3xl mx-auto m-10 fade-in"
        key={index}
      >
        <Header date={event.date} title={event.title} logo={event.logo} />
        <ImageCarousel images={event.src} />
        <CardText role={event.role} text={event.text} />
      </div>
    );
  });
}
