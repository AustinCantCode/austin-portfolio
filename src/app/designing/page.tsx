// METADATA
import { Metadata } from "next";

// COMPONENTS
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import UIUXProjects from "./_components/uiux-projects";
import PDProjects from "./_components/pd-projects";
import GDProjects from "./_components/gd-projects";

// DATA
import { designCategories } from "@data/design-projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Austin Sia | Design Projects",
    description:
      "Highlighting my design projects, blending creativity and functionality to craft engaging, user-focused, and visually appealing UI, products and graphics.",
    keywords: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Web Developer",
      "Information Technology",
      "Computer Science",
      "Entrepreneur",
      "Designer",
      "Portfolio",
      "Next.js",
      "React",
    ],
    openGraph: {
      title: "Austin Sia | Coding Projects",
      description:
        "Highlighting my design projects, blending creativity and functionality to craft engaging, user-focused, and visually appealing UI, products and graphics.",
      url: "https://austinsia.com",
      siteName: "Austin's Portfolio",
      images: [
        {
          url: "../../public/AS-Circle-Logo.png",
          width: 500,
          height: 500,
        },
      ],
      type: "website",
    },
  };
}

const categoryComponents = {
  "UI/UX": UIUXProjects,
  Product: PDProjects,
  Graphic: GDProjects,
};

export default function DesignProjects() {
  return (
    <main className="fade-in">
      <Tabs defaultValue="UI/UX">
        <TabsList className="mx-auto lg:w-full max-w-5xl gap-x-2 lg:gap-x-8 bg-white/0 text-white dark overflow-x-clip">
          {designCategories.map((category, index) => {
            return (
              <TabsTrigger value={category} className="px-8 py-4" key={index}>
                {category}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {designCategories.map((category) => {
          const CategoryComponent = categoryComponents[category];
          return (
            <TabsContent
              key={category}
              value={category}
              className="text-white max-w-5xl w-full mx-auto mt-8"
            >
              {CategoryComponent ? <CategoryComponent /> : null}
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
}
