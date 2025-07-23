import experiences from "@data/homepage-experiences";

export default function Experiences() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4">
      <div className="bg-white/15 rounded-md p-3 sm:p-4 w-full">
        <h3 className="pb-2">Education</h3>

        {experiences.educationExperience.map((experience, index) => {
          return experience.type === "Education" ? (
            <div
              className={
                experience.currentlyHere === true ? "border-l-2 pl-4" : "pl-5"
              }
              key={index}
            >
              <h5>{experience.title}</h5>
              <p>{experience.date}</p>
            </div>
          ) : null;
        })}
      </div>
      <div className="bg-white/15 rounded-md p-3 sm:p-4 w-full">
        <h3 className="pb-2">Experience</h3>

        {experiences.workExperience.map((experience, index) => {
          return experience.type === "Experience" ? (
            <div
              className={
                experience.currentlyHere === true ? "border-l-2 pl-4" : "pl-5"
              }
              key={index}
            >
              <h5>{experience.title}</h5>
              <p>{experience.role}</p>
              <p>{experience.date}</p>
            </div>
          ) : null;
        })}
      </div>
    </section>
  );
}
