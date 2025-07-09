const educationExperience = [
  {
    type: "Education",
    title: "Compassvale Secondary School",
    date: "2018 - 2022",
    currentlyHere: false,
  },
  {
    type: "Education",
    title: "Singapore Polytechnic",
    date: "2023 - Present",
    currentlyHere: true,
  },
];

const workExperience = [
  {
    type: "Experience",
    title: "Amber Creative Pte Ltd",
    role: "Full-stack Software Developer Intern",
    date: "April 2025 - Present ",
    currentlyHere: true,
  },
];

const highlightSections = [
  {
    title: "Achievements",
    details: [
      "More than 20 certificates attained",
      "Received certificates from organizations such as AWS and GitHub",
      "Awarded Grand Finalist for SP Batey Hackathon",
    ],
    link: "/achievements",
  },
  {
    title: "Coding",
    details: [
      "Over 2 years experience doing full-stack web development",
      "Studying to become a MERN stack developer",
      "Developed and contributed to over 10 projects with a variety of tech stacks",
    ],
    link: "/coding",
  },
  {
    title: "Designing",
    details: [
      "Over 2 years doing product, UI/UX and graphic designs",
      "Experienced with design softwares such as Adobe Photoshop, Adobe Illustrator, Figma etc.",
    ],
    link: "/designing",
  },
];

const experiences = { educationExperience, workExperience, highlightSections };
export default experiences;
