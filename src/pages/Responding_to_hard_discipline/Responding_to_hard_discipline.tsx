

import React from "react";
import "./Responding_to_hard_discipline.css";

interface Article {
   title: string;
   introduction_ideas: IntroductionIdea[];
   ideas: Idea[];
}
interface IntroductionIdea {
   text: string;
   keyPhrases: string[];
   relatedBibleReferences: string[];
   lists: string[];
   isBiblicalPassage: boolean;
   biblicalReference: string;
   isBiblicallyJustifiedIdeaList: boolean;
   biblicallyJustifiedIdeaList: BiblicallyJustifiedIdeaList[];
}
interface Idea {
   heading: string;
   subideas: Subidea[];
}
interface Subidea {
   text: string;
   keyPhrases: string[];
   relatedBibleReferences: string[];
   lists: string[];
   isBiblicalPassage: boolean;
   biblicalReference: string;
   isBiblicallyJustifiedIdeaList: boolean;
   biblicallyJustifiedIdeaList: BiblicallyJustifiedIdeaList[];
}
interface BiblicallyJustifiedIdeaList {
   text: string;
   biblicalReferences: string[];
}

function Responding_to_hard_discipline() {
   const [isDataLoaded, setisDataLoaded] = React.useState(false);
   const [jsonData, setjsonData] = React.useState<Article | null>();
   const [errorMessage, seterrorMessage] = React.useState<string | null>();
   const [ideas, setideas] = React.useState<string[] | null>([]);

   React.useEffect(() => {
      const loadData = async () => {
         try {
            const response = await fetch("static_data/responding_to_hard_discipline.json");
            if (!response.ok) throw new Error(`Error fetching data: ${response.status}, ${response.statusText}`);

            const data = await response.json();
            const formattedData: Article = data as Article;
            setjsonData(formattedData);
            setideas(formattedData.ideas.map(idea => idea.heading));
            setisDataLoaded(true);
         } catch (error: any) {
            console.error(error);
            seterrorMessage(error);
            setisDataLoaded(false);
         }
      };
      loadData();
   }, []);

   return (
      <div
         className="ArticlePage001"
      >
         {errorMessage && <p>Error: {errorMessage}</p>}
         {!isDataLoaded && !errorMessage && <p>Loading data...</p>}
         {isDataLoaded && jsonData && (
            <article>
               <h1 className="article_heading">{jsonData.title}</h1>

               <section className="article_intro_section">
                  {jsonData.introduction_ideas?.map((ii, iiIndex) => <p className="article_intro_section_paragraph">{ii.text}</p>)}
               </section>

               <section className="reference_to_article_headings_section">
                  <h2 className="reference_to_article_headings_list_heading">Article Ideas</h2>
                  <ul className="reference_to_article_heading_list">
                     {ideas?.map((i, index) => <li key={index}><span>{index + 1}. </span><a className="reference_to_article_heading" href={"#" + i}>{i}</a></li>)}
                  </ul>
               </section>

               {jsonData.ideas.map((i, index) =>
                  <div key={index} className="ArticleIdea">
                     <h2
                        key={index}
                        id={i.heading}
                        className="ArticleIdeaHeading"
                     >{index + 1}. {i.heading}</h2>
                     {i.subideas.map((si, index) => {

                        const rbr = si.relatedBibleReferences && si.relatedBibleReferences.length > 0 ? si.relatedBibleReferences.reduce((acc, c) => acc.concat(", " + c)) : "";

                        if (si.isBiblicalPassage && si.isBiblicalPassage) {
                           return <p
                              key={index}
                              className="biblicalPassage"
                           >
                              "{si.text}"". {rbr}
                              <span
                                 className="biblicalPassageReference"
                              >
                                 {si.biblicalReference}.
                              </span>
                           </p>;
                        }

                        if (si.isBiblicallyJustifiedIdeaList) {
                           const ideas: BiblicallyJustifiedIdeaList[] = si.biblicallyJustifiedIdeaList
                           return <div
                              key={index}
                              className="biblicalPassage"
                           >
                              <ul className="biblically_justified_idea_list" >
                                 {ideas.map((element, i) => (
                                    <li className="biblically_justified_idea_list_item" key={i}>
                                       <input className="biblically_justified_idea_checkbox" type="checkbox" />
                                       {index + 1}. <span className="biblically_justified_idea_text">{element.text}</span>
                                       <div className="biblically_justified_idea_biblical_references_container">
                                          {element.biblicalReferences.map((br, bri) => (
                                             <span key={bri} className="biblically_justified_idea_biblical_reference_text">{br}</span>
                                          ))}
                                       </div>
                                    </li>
                                 ))}
                              </ul>
                           </div>;
                        }

                        return <p key={index}>
                           {si.text}
                           <span className="biblicalPassageReference">
                              {rbr}
                           </span>
                        </p>;
                     }
                     )}
                  </div>)}
            </article>
         )}
      </div>
   );
}

export default Responding_to_hard_discipline;