// COMPONENTS
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import UIUXProjects from "./_components/uiux-projects";
import PDProjects from "./_components/pd-projects";

// DATA
import { designCategories } from "@data/design-projects";

const categoryComponents = {
  "UI/UX": UIUXProjects,
  Product: PDProjects,
  // "Graphic": GDProjects,
};

export default function DesignProjects() {
  return (
    <main className="fade-in">
      <Tabs defaultValue="UI/UX">
        <TabsList className="mx-auto w-full max-w-5xl md:gap-x-8 bg-white/0 text-white dark">
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
