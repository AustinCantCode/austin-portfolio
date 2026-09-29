/**
 * The CMS schema. Everything on the site is edited here, at /keystatic.
 * Content is saved as JSON under content/, and images under
 * public/images/<collection>/<entry>/. scripts/content.mjs turns it into
 * the data the site reads (src/data/generated), see docs/CMS.md.
 */
import { collection, config, fields, singleton } from "@keystatic/core";
import { createElement } from "react";
import { AREA_IDS, CATEGORY_STRUCTURE } from "./src/data/structure";

/**
 * Local files in development. In production the CMS always saves by
 * committing to GitHub, and only once its GitHub App is set up
 * (docs/CMS.md): the public app slug is readable on the server and in the
 * browser, so both agree. Access is locked by src/middleware.ts (password)
 * and src/lib/cms-guard.ts (GitHub account allowlist).
 */
const connected = !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;
const dev = process.env.NODE_ENV !== "production";
// Development only: NEXT_PUBLIC_KEYSTATIC_STORAGE=github switches to GitHub
// mode, which is how the GitHub App is created the first time. The live
// site never edits local files, whatever this is set to.
const forced = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE;
const useGitHub = dev ? forced === "github" : true;
/** False on the live site until the CMS's GitHub App is set up. */
export const cmsEnabled = dev || connected;

// Helpers -------------------------------------------------------------

const img = (dir: string, label = "Image", description?: string) =>
  fields.image({
    label,
    description,
    directory: `public/images/${dir}`,
    publicPath: `/images/${dir}/`,
  });

/** An image with its alt text and how it sits in its frame. */
const media = (dir: string, label: string, description?: string) =>
  fields.object(
    {
      image: img(dir, label, description),
      alt: fields.text({
        label: "Alt text",
        description: "Describe the image for screen readers and search.",
      }),
      fit: fields.select({
        label: "Fit",
        description:
          "Cover fills the frame; Contain shows the whole image. Leave on Default unless it looks wrong.",
        options: [
          { label: "Default", value: "" },
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
        ],
        defaultValue: "",
      }),
      position: fields.text({
        label: "Position",
        description: 'Which part stays in view, e.g. "top". Usually empty.',
      }),
      bare: fields.checkbox({
        label: "Mockup (no device frame)",
        description:
          "Tick for mockup images that already show phones, so no frame is drawn around them.",
      }),
    },
    { label },
  );

const video = (dir: string) =>
  fields.file({
    label: "Demo video (MP4)",
    directory: `public/videos/${dir}`,
    publicPath: `/videos/${dir}/`,
  });

const order = fields.integer({
  label: "Order",
  description: "Lower numbers are shown first.",
  defaultValue: 100,
});

const line = (label: string, description?: string) =>
  fields.text({ label, description });

const para = (label: string, description?: string) =>
  fields.text({ label, description, multiline: true });

const icon = fields.text({
  label: "Icon",
  description:
    'An Iconify name, e.g. "lucide:code-xml" or "mdi:github" (browse icones.js.org).',
});

const link = (label: string) =>
  fields.object(
    { label: line("Link text"), href: line("Link URL or path") },
    { label },
  );

const list = (label: string, itemLabel = "Item") =>
  fields.array(fields.text({ label: itemLabel }), {
    label,
    itemLabel: (p) => p.value,
  });

const categoryOptions = CATEGORY_STRUCTURE.map((c) => ({
  label: c.label,
  value: c.slug,
}));

// Collections --------------------------------------------------------

const projects = collection({
  label: "Projects",
  slugField: "title",
  path: "content/projects/*",
  format: { data: "json" },
  previewUrl: "/projects/{slug}",
  columns: ["year", "order"],
  schema: {
    title: fields.slug({
      name: { label: "Title" },
      slug: {
        label: "URL",
        description: "The case study lives at /projects/<URL>.",
      },
    }),
    order,
    year: line("Year"),
    line: line("One-line summary", "Shown on cards and under the title."),
    subtext: line("Type", 'A short label, e.g. "Online watch shop".'),
    role: line("My role"),
    problem: para("Problem"),
    did: para("What I did"),
    outcome: para("Outcome"),
    ai: para(
      "How I used AI",
      "Optional. Leave empty if no AI assistant was used.",
    ),
    skills: list("Tools used", "Tool"),
    links: fields.array(link("Link"), {
      label: "Links",
      itemLabel: (p) => p.fields.label.value || "Link",
    }),
    categories: fields.multiselect({
      label: "Categories",
      options: categoryOptions,
    }),
    frame: fields.select({
      label: "Device frame",
      options: [
        { label: "Laptop (websites)", value: "laptop" },
        { label: "Phone (apps)", value: "phone" },
        { label: "None (photos and artwork)", value: "none" },
      ],
      defaultValue: "laptop",
    }),
    cover: media("projects", "Cover image"),
    second: media("projects", "Second image", "Optional second screen."),
    screen: media(
      "projects",
      "Single app screen",
      "Optional. Used in device frames when the cover is a mockup.",
    ),
    gallery: fields.array(media("projects", "Image"), {
      label: "Pop-up gallery",
      description:
        "Every image for the project's pop-up, in order. If empty, the cover and second image are used.",
      itemLabel: (p) => p.fields.alt.value || "Image",
    }),
    video: video("projects"),
    story: fields.array(
      fields.object({
        title: line("Section title", 'e.g. "The challenge".'),
        body: para("Text", "Leave a blank line between paragraphs."),
        image: media("projects", "Image (optional)"),
        callout: para(
          "Callout (optional)",
          "A short highlight shown in a box under the text.",
        ),
      }),
      {
        label: "Case study sections",
        description:
          "When filled in, these replace Problem / What I did / Outcome on the case study page, with a contents list beside them.",
        itemLabel: (p) => p.fields.title.value || "Section",
      },
    ),
    results: fields.array(
      fields.object({
        value: line("Figure", 'Short, e.g. "4" or "Aug 2026".'),
        label: line("What it means", 'e.g. "types of user in one system".'),
      }),
      {
        label: "Results (big figures)",
        description: "Only real, checkable facts.",
        itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}`,
      },
    ),
    notes: para(
      "Notes for me (not shown on the site)",
      "Reminders for this case study, e.g. what to check or add.",
    ),
  },
});

const smallApps = collection({
  label: "Small apps",
  slugField: "title",
  path: "content/small-apps/*",
  format: { data: "json" },
  columns: ["year", "order"],
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    order,
    tech: line("Built with"),
    year: line("Year"),
    text: para("Description"),
    image: img("small-apps", "Screenshot"),
    alt: line("Screenshot alt text"),
    video: video("small-apps"),
  },
});

const graphics = collection({
  label: "Graphic design",
  slugField: "title",
  path: "content/graphics/*",
  format: { data: "json" },
  columns: ["order"],
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    order,
    image: img("graphics", "Artwork"),
    alt: line("Alt text"),
  },
});

const ventures = collection({
  label: "Ventures",
  slugField: "name",
  path: "content/ventures/*",
  format: { data: "json" },
  columns: ["order"],
  schema: {
    name: fields.slug({ name: { label: "Name" } }),
    order,
    role: line("My role"),
    date: line("Dates"),
    line: para("Summary"),
    status: line("Status"),
    href: line("Link (path or URL)"),
    cta: line("Button text"),
  },
});

const events = collection({
  label: "Events",
  slugField: "title",
  path: "content/events/*",
  format: { data: "json" },
  columns: ["date", "order"],
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    order,
    featured: fields.checkbox({
      label: "Feature this event",
      description: "Shown large at the top of the events page. Tick only one.",
    }),
    date: line("Date"),
    role: line("My role"),
    text: para("What happened"),
    photo: media("events", "Photo"),
  },
});

const certificates = collection({
  label: "Certificates",
  slugField: "issuerGroup",
  path: "content/certificates/*",
  format: { data: "json" },
  columns: ["order"],
  schema: {
    issuerGroup: fields.slug({
      name: {
        label: "Group name",
        description: 'The filter label, e.g. "AWS / SCS".',
      },
    }),
    order,
    items: fields.array(
      fields.object(
        {
          title: line("Title"),
          issuer: line("Issued by"),
          description: para("Description"),
          image: img("certificates", "Certificate image"),
          featured: fields.checkbox({
            label: "Show on the homepage",
            description: "Featured under Recognition on the homepage.",
          }),
        },
        { label: "Certificate" },
      ),
      {
        label: "Certificates",
        itemLabel: (p) => p.fields.title.value || "Certificate",
      },
    ),
  },
});

const testimonials = collection({
  label: "Testimonials",
  slugField: "name",
  path: "content/testimonials/*",
  format: { data: "json" },
  columns: ["org", "order"],
  schema: {
    name: fields.slug({ name: { label: "Their name" } }),
    order,
    lead: fields.checkbox({
      label: "Lead quote",
      description: "Shown largest on the homepage. Tick only one.",
    }),
    quote: para("Quote", "Their words, as they wrote them."),
    role: line("Their role", 'e.g. "Director"'),
    org: line("Company or school"),
    project: fields.relationship({
      label: "Project it's about",
      description: "Also shown on that project's case study.",
      collection: "projects",
    }),
    photo: img("testimonials", "Their photo (optional)"),
    permission: fields.checkbox({
      label: "They agreed to be quoted",
      description: "Only quotes with this ticked appear on the site.",
    }),
  },
});

const writing = collection({
  label: "Writing",
  slugField: "title",
  path: "content/writing/*/",
  format: { data: "json" },
  previewUrl: "/writing/{slug}",
  columns: ["date", "draft"],
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    date: fields.date({ label: "Date", validation: { isRequired: true } }),
    summary: para(
      "Summary",
      "One or two sentences for the list and search results.",
    ),
    tags: list("Tags", "Tag"),
    draft: fields.checkbox({
      label: "Draft",
      description: "Drafts only show when you run the site on your computer.",
      defaultValue: true,
    }),
    body: fields.markdoc({
      label: "Post",
      options: {
        image: {
          directory: "public/images/writing",
          publicPath: "/images/writing/",
        },
      },
    }),
    notes: para("Notes for me (not shown on the site)"),
  },
});

// Singletons ---------------------------------------------------------

const site = singleton({
  label: "Site & contact",
  path: "content/site",
  format: { data: "json" },
  schema: {
    name: line("Name"),
    url: line("Site URL"),
    location: line("Location"),
    heroHeadline: line("Homepage headline"),
    heroLine: para("Homepage line under the headline"),
    contact: fields.object(
      {
        email: line("Email"),
        phone: line("Phone (as shown)"),
        tel: line('Phone link, e.g. "tel:+6591070598"'),
        whatsapp: line("WhatsApp link"),
        linkedin: line("LinkedIn URL"),
        linkedinLabel: line("LinkedIn (as shown)"),
        github: line("GitHub URL"),
        githubLabel: line("GitHub (as shown)"),
        githubUser: line(
          "GitHub username",
          "Used for the contributions chart.",
        ),
        cvPdf: line("CV PDF path"),
      },
      { label: "Contact" },
    ),
    googlePlayUrl: line("StillGood Google Play URL"),
    stillgoodWebsiteUrl: line("StillGood website URL"),
    calibriumUrl: line("Calibrium URL"),
  },
});

const sectionHead = (label: string) =>
  fields.object({ title: line("Title"), link: link("Link") }, { label });

const home = singleton({
  label: "Homepage",
  path: "content/home",
  format: { data: "json" },
  previewUrl: "/",
  schema: {
    journey: fields.object(
      {
        title: line("Title"),
        sub: para("Line under the title"),
        link: link("Link"),
        items: fields.array(
          fields.object({
            date: line("Date"),
            title: line("Title"),
            sub: para("Detail"),
            logo: img(
              "home",
              "Logo (optional)",
              "A small square logo shown beside the title.",
            ),
            links: fields.array(link("Link"), {
              label: "Links (optional)",
              description: 'e.g. "Case study" → /projects/fresko',
              itemLabel: (p) => p.fields.label.value || "Link",
            }),
          }),
          {
            label: "Timeline",
            itemLabel: (p) =>
              `${p.fields.date.value} · ${p.fields.title.value}`,
          },
        ),
      },
      { label: "How I got here (timeline)" },
    ),
    whatIDo: fields.object(
      {
        title: line("Title"),
        areas: fields.array(
          fields.object({
            id: fields.select({
              label: "Area",
              options: AREA_IDS.map((id) => ({ label: id, value: id })),
              defaultValue: "dev",
            }),
            icon,
            label: line("Tab label"),
            count: fields.integer({ label: "Count on the tab" }),
            headline: line("Headline"),
            blurb: para("Paragraph"),
            services: fields.array(
              fields.object({
                icon,
                title: line("Title"),
              }),
              {
                label: "Services",
                itemLabel: (p) => p.fields.title.value,
              },
            ),
            stack: list("Tools", "Tool"),
            href: line("Button link"),
            cta: line("Button text"),
            featuredProjects: fields.multiRelationship({
              label: "Project thumbnails (4)",
              collection: "projects",
            }),
            photo: media("home", "Photo"),
            photoHint: line(
              "Placeholder text",
              "Shown when there is no photo yet.",
            ),
          }),
          { label: "Areas", itemLabel: (p) => p.fields.label.value },
        ),
      },
      { label: "What I do" },
    ),
    tools: sectionHead("Tools I use"),
    selectedWork: fields.object(
      {
        title: line("Title"),
        link: link("Link"),
        projects: fields.multiRelationship({
          label: "Projects, in order",
          collection: "projects",
        }),
      },
      { label: "Selected work" },
    ),
    kindWords: fields.object(
      { title: line("Title"), sub: para("Line under the title") },
      { label: "Kind words (testimonials)" },
    ),
    clients: fields.object(
      {
        title: line("Line above the names"),
        items: fields.array(
          fields.object({
            name: line("Client name"),
            project: fields.relationship({
              label: "Case study to link to",
              collection: "projects",
            }),
            logo: img(
              "home",
              "Logo (optional)",
              "A transparent PNG or SVG; shown in one colour to match the site.",
            ),
          }),
          { label: "Clients", itemLabel: (p) => p.fields.name.value },
        ),
      },
      { label: "Clients strip" },
    ),
    events: sectionHead("Out and about"),
    recognition: fields.object(
      {
        title: line("Title"),
        sub: para("Line under the title"),
        link: link("Link"),
      },
      {
        label: "Recognition (awards)",
        description:
          'The awards themselves are picked with "Show on the homepage" in About → Certificates.',
      },
    ),
    numbers: fields.object(
      {
        title: line("Title"),
        stats: fields.array(
          fields.object({
            n: line("Number", 'e.g. "29" or "10+". Plain numbers count up.'),
            label: line("Label"),
            cta: line("Link text"),
            href: line("Link"),
          }),
          {
            label: "Stats",
            itemLabel: (p) => `${p.fields.n.value} ${p.fields.label.value}`,
          },
        ),
      },
      { label: "The story in numbers" },
    ),
    contact: fields.object(
      {
        title: line("Title"),
        line: para("Line under the title"),
        tiles: fields.array(
          fields.object({
            icon,
            title: line("Title"),
            value: line("Value"),
            note: line("Note"),
            action: line("Action text"),
            href: line("Link"),
            behavior: fields.select({
              label: "On click",
              options: [
                { label: "Open link", value: "link" },
                { label: "Copy to clipboard", value: "copy-to-clipboard" },
              ],
              defaultValue: "link",
            }),
          }),
          { label: "Tiles", itemLabel: (p) => p.fields.title.value },
        ),
      },
      { label: "Contact" },
    ),
  },
});

const about = singleton({
  label: "About",
  path: "content/about",
  format: { data: "json" },
  previewUrl: "/about",
  schema: {
    portrait: media("about", "Portrait"),
    photos: fields.array(
      fields.object({
        image: img("about", "Photo"),
        year: line("Year", 'Shown on the photo, e.g. "2018".'),
        alt: line("Alt text", "Describe the photo."),
      }),
      {
        label: "Photos over the years",
        description:
          "Add two or more and they replace the portrait with a stack visitors can swipe through, oldest at the back.",
        itemLabel: (p) => p.fields.year.value || "Photo",
      },
    ),
    intro: para("Intro"),
    timeline: fields.array(
      fields.object({
        date: line("Date"),
        title: line("Title"),
        sub: line("Detail"),
        now: fields.checkbox({ label: 'Show the "Now" badge' }),
      }),
      {
        label: "Timeline",
        itemLabel: (p) => `${p.fields.date.value} · ${p.fields.title.value}`,
      },
    ),
    more: fields.array(
      fields.object({
        href: line("Link"),
        icon,
        title: line("Title"),
        text: line("Text"),
      }),
      { label: "More about me cards", itemLabel: (p) => p.fields.title.value },
    ),
    learnt: fields.array(
      fields.object({ icon, title: line("Title"), text: para("Text") }),
      { label: "What I've learnt", itemLabel: (p) => p.fields.title.value },
    ),
  },
});

const cv = singleton({
  label: "CV",
  path: "content/cv",
  format: { data: "json" },
  previewUrl: "/cv",
  schema: {
    role: line("Role line"),
    profile: para("Profile"),
    experience: fields.array(
      fields.object({
        org: line("Organisation"),
        role: line("Role"),
        date: line("Dates"),
        text: para("What I did"),
      }),
      {
        label: "Experience",
        itemLabel: (p) => `${p.fields.org.value} · ${p.fields.role.value}`,
      },
    ),
    education: fields.array(
      fields.object({
        org: line("School"),
        date: line("Dates"),
        text: line("Qualification"),
      }),
      { label: "Education", itemLabel: (p) => p.fields.org.value },
    ),
    projects: fields.multiRelationship({
      label: "Projects on the CV",
      collection: "projects",
    }),
  },
});

const skills = singleton({
  label: "Skills",
  path: "content/skills",
  format: { data: "json" },
  previewUrl: "/about/skills",
  schema: {
    groups: fields.array(
      fields.object({
        name: line("Group"),
        plain: line("Plain-English description"),
        items: list("Tools", "Tool"),
      }),
      { label: "Skill groups", itemLabel: (p) => p.fields.name.value },
    ),
  },
});

const screen = (label: string) => media("stillgood", label);

const stillgood = singleton({
  label: "StillGood page",
  path: "content/stillgood",
  format: { data: "json" },
  previewUrl: "/stillgood",
  schema: {
    hero: fields.object(
      {
        status: line("Status pill"),
        title: line("Title"),
        tagline: line("Tagline"),
        line: para("Line"),
      },
      { label: "Hero" },
    ),
    features: fields.object(
      {
        title: line("Title"),
        items: fields.array(
          fields.object({
            icon,
            title: line("Title"),
            text: line("Text"),
            imageHint: line("Placeholder text"),
          }),
          { label: "Features", itemLabel: (p) => p.fields.title.value },
        ),
      },
      { label: "Features" },
    ),
    story: fields.object(
      {
        title: line("Title"),
        items: fields.array(
          fields.object({
            date: line("Date"),
            title: line("Title"),
            text: para("Text"),
          }),
          { label: "Steps", itemLabel: (p) => p.fields.title.value },
        ),
      },
      { label: "Story" },
    ),
    builtWith: fields.object(
      { title: line("Title"), text: para("Text"), stack: list("Tools") },
      { label: "Built with" },
    ),
    cta: fields.object(
      { title: line("Title"), line: line("Line") },
      { label: "Call to action" },
    ),
    screens: fields.object(
      {
        home: screen("Home screen"),
        pantry: screen("Pantry"),
        householdPantry: screen("Household pantry"),
        recipes: screen("Recipes"),
        scan: screen("Scanner"),
        recipeStudio: screen("Recipe Studio"),
      },
      { label: "App screenshots" },
    ),
  },
});

const categories = singleton({
  label: "Work categories",
  path: "content/categories",
  format: { data: "json" },
  previewUrl: "/development",
  schema: {
    items: fields.array(
      fields.object({
        slug: fields.select({
          label: "Category",
          description: "Categories are fixed; edit their text here.",
          options: categoryOptions,
          defaultValue: "web-apps",
        }),
        label: line("Label"),
        blurb: line("Blurb"),
        seoTitle: line("Search title", "Under 50 characters."),
      }),
      { label: "Categories", itemLabel: (p) => p.fields.label.value },
    ),
  },
});

const pageFields = (label: string, heading: boolean) =>
  fields.object(
    {
      title: line("Search title", "About 60 characters at most."),
      description: para("Search description", "About 160 characters at most."),
      ...(heading ? { heading: line("Page heading") } : {}),
    },
    { label },
  );

const pages = singleton({
  label: "Pages & SEO",
  path: "content/pages",
  format: { data: "json" },
  schema: {
    home: pageFields("Homepage", false),
    development: pageFields("Development", true),
    design: pageFields("Design", true),
    ventures: pageFields("Ventures", true),
    about: pageFields("About", true),
    skills: pageFields("Skills", true),
    certificates: pageFields("Certificates", false),
    events: pageFields("Events", true),
    cv: pageFields("CV", false),
    contact: fields.object(
      {
        title: line("Search title", "About 60 characters at most."),
        description: para(
          "Search description",
          "About 160 characters at most.",
        ),
        heading: line("Page heading"),
        intro: para("Line under the heading"),
        formTitle: line("Message form title"),
        formLine: line("Line under the form title"),
      },
      { label: "Contact" },
    ),
    stillgood: pageFields("StillGood", false),
    writing: fields.object(
      {
        title: line("Search title", "About 60 characters at most."),
        description: para(
          "Search description",
          "About 160 characters at most.",
        ),
        heading: line("Page heading"),
        intro: para("Line under the heading"),
      },
      { label: "Writing" },
    ),
  },
});

const chatbot = singleton({
  label: "Ask Austin (chatbot)",
  path: "content/chatbot",
  format: { data: "json" },
  schema: {
    button: line("Button text"),
    greeting: para("Greeting", "The first message people see."),
    prompts: list("Suggested questions", "Question"),
  },
});

const navigation = singleton({
  label: "Work areas",
  path: "content/navigation",
  format: { data: "json" },
  schema: {
    areas: fields.array(
      fields.object({
        id: fields.select({
          label: "Area",
          options: AREA_IDS.map((id) => ({ label: id, value: id })),
          defaultValue: "dev",
        }),
        label: line("Name"),
        line: line("Line under the page title"),
      }),
      { label: "Areas", itemLabel: (p) => p.fields.label.value },
    ),
  },
});

export default config({
  storage: useGitHub
    ? {
        kind: "github",
        repo: { owner: "austincantcode", name: "austin-portfolio" },
      }
    : { kind: "local" },
  ui: {
    brand: {
      name: "Austin Sia",
      mark: () =>
        createElement("img", {
          src: "/AS-Circle-Logo.png",
          alt: "",
          width: 24,
          height: 24,
          style: { borderRadius: 999 },
        }),
    },
    navigation: {
      Writing: ["writing"],
      Site: ["site", "home", "pages", "navigation", "categories", "chatbot"],
      Work: ["projects", "smallApps", "graphics", "ventures", "stillgood"],
      About: [
        "about",
        "cv",
        "skills",
        "certificates",
        "events",
        "testimonials",
      ],
    },
  },
  collections: {
    projects,
    smallApps,
    graphics,
    ventures,
    events,
    certificates,
    testimonials,
    writing,
  },
  singletons: {
    site,
    home,
    about,
    cv,
    skills,
    stillgood,
    categories,
    navigation,
    pages,
    chatbot,
  },
});
