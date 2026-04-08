import { Banner } from "./banner";
import { ProjectsSection } from "./projects-section";

export default function Home() {
  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <ProjectsSection />
    </div>
  );
};
