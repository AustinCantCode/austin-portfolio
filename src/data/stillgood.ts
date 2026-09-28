/** Copy for the /stillgood page, from the design handoff. */
export const stillgoodPage = {
  hero: {
    status: "Live on Google Play",
    title: "StillGood.",
    tagline: "Less waste. Smarter pantry.",
    line: "Snap your groceries, get reminded before they go off, and find recipes to use them up.",
  },
  features: {
    title: "Scan it. Track it. Cook it.",
    items: [
      {
        icon: "lucide:scan-line",
        title: "Snap to add",
        text: "Take a photo of your groceries and the app lists them for you.",
        imageHint: "Scanning screen",
      },
      {
        icon: "lucide:calendar-clock",
        title: "Know what's expiring",
        text: "Everything sorted by date, with a reminder before it goes off.",
        imageHint: "Expiry list screen",
      },
      {
        icon: "lucide:chef-hat",
        title: "Cook what you have",
        text: "Recipe ideas for the food that needs using first.",
        imageHint: "Recipe screen",
      },
    ],
  },
  story: {
    title: "From hackathon to Play Store.",
    items: [
      {
        date: "Sep 2024",
        title: "Frésko",
        text: "At a student competition, my team designed the idea and reached the grand finals.",
      },
      {
        date: "Apr 2026",
        title: "StillGood begins",
        text: "I turned the idea into a real app, working on my own.",
      },
      {
        date: "26 Aug 2026",
        title: "Live on Google Play",
        text: "Anyone with an Android phone can now download it.",
      },
    ],
  },
  builtWith: {
    title: "Built by me, with an AI helper.",
    text: "I designed and built the app, the system behind it and the website myself. I used Claude Code, an AI coding assistant, to work faster: I decided how everything should work, and checked every piece of code it wrote before using it.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Fastify",
      "Supabase",
      "Gemini API",
      "PostHog",
      "Next.js",
      "Claude Code",
    ],
  },
  cta: {
    title: "Get StillGood.",
    line: "Available now on Android.",
  },
};
