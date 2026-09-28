export const site = {
  name: "Austin Sia",
  url: "https://austinsia.com",
  location: "Singapore",
  heroLabel: "Currently building StillGood",
  heroHeadline: "Austin Sia.",
  heroLine: "Full-stack developer, designer and founder of StillGood.",
  contact: {
    email: "austin.sia1515@gmail.com",
    mailto: "mailto:austin.sia1515@gmail.com",
    phone: "+65 9107 0598",
    tel: "tel:+6591070598",
    whatsapp: "https://wa.me/6591070598",
    linkedin: "https://www.linkedin.com/in/austin-sia/",
    linkedinLabel: "linkedin.com/in/austin-sia",
    github: "https://github.com/austincantcode",
    githubLabel: "github.com/austincantcode",
    githubUser: "austincantcode",
    cvPdf: "/AustinResume.pdf",
  },
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=com.stillgoodapp.org",
  stillgoodWebsiteUrl: "https://stillgoodapp.org",
  calibriumUrl: "https://calibrium.sg",
};

/** True for links that are still placeholders. */
export const isPlaceholderLink = (href: string) =>
  href === "#" || href === "" || href === "TODO";
