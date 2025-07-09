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
        <TabsList className="mx-auto w-full max-w-5xl gap-x-8 rounded-md bg-white/0 text-white dark">
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

{
  /* <div className="introduction">
                <h1 className="title">Design Projects</h1>
                <p className="titleDescription">
                    During my time studying for my Diploma in Information Technology (DIT) in Singapore Polytechnic, I gradually developed a passion for designing, particularly for user interfaces, products and graphics like brand logos, posters with various softwares and techniques.<br /><br />
                    As an aspiring web developer, I feel that it is important to have some skill in User Interface design, so a webpage can have a perfect blend of functionality and aesthetics. With this, I decided to specialize in User Interface and User Experience (UI/UX) for my Diploma and pursue a Certificate of Design and Innovation in Singapore Polytechnic to further develop my ability as a designer.                </p>

                <h5 className='CertDetails'>Technologies Used: </h5>
                <img className='logo' src='https://1000logos.net/wp-content/uploads/2024/09/Figma-Logo-500x281.jpg' />
                <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png?20200616073617' />
                <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/512px-Adobe_Illustrator_CC_icon.svg.png' />
                <img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhPftuKPEqskRCfpWQeOQlBAI9ZgxXfOvr3w&s' />

                <img className='logo' src='https://aeg.alpineschools.org/wp-content/uploads/sites/45/2023/08/Tinkercad.png' />

                <h5 className='CertDetails'>Total Projects: {designProjects.length}</h5>
            </div>

            <h3 className='CertCategory'>Personal Projects</h3>
            <div className="line"></div>

            <div className="cards">
                <div className="row row-cols-1 row-cols-md-1 g-4">
                    {designProjects.map((designProjects) => (
                        <section id={designProjects.id} key={designProjects.id}>
                            <div className="col">
                                <div className="card">
                                    <img src={designProjects.imgUrl}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{designProjects.title}</h5>
                                        <p className="card-text">{designProjects.description}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div> */
}
