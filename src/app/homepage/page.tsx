// COMPONENTS
import Header from "./_components/header";
import AboutMe from "./_components/about-me";
import Experiences from "./_components/experiences";
import Highlights from "./_components/highlights";

export default function Homepage() {
  return (
    <main className="text-white max-w-5xl mx-auto rounded-md bg-white/15 p-4 space-y-4 fade-in">
      {/* Header */}
      <Header />

      {/* About me */}
      <AboutMe />

      {/* Education, Experiences */}
      <Experiences />

      {/* Achievements, Coding, Designing */}
      <Highlights />
    </main>
  );
}
