

import React from "react";
import "./AHealthyLoneliness.css";

interface Article
{
   title: string;
   ideas: Idea[];
}
interface Idea
{
   heading: string;
   subideas: Subidea[];
}
interface Subidea
{
   text: string;
   keyPhrases: string[];
   relatedBibleReferences: string[];
   lists: string[];
   isBiblicalPassage: boolean;
   biblicalReference: string;
}

function AHealthyLoneliness()
{
   const [isDataLoaded, setisDataLoaded] = React.useState(false);
   const [jsonData, setjsonData] = React.useState<Article | null>();
   const [errorMessage, seterrorMessage] = React.useState<string | null>();
   const [ideas, setideas] = React.useState<string[] | null>([]);

   React.useEffect(() =>
   {
      const loadData = async () =>
      {
         try
         {
            const response = await fetch("static_data/a_healthy_lonelyness.json");
            if (!response.ok) throw new Error(`Error fetching data: ${response.status}, ${response.statusText}`);

            const data = await response.json();
            const formattedData: Article = data as Article;
            setjsonData(formattedData)
            setideas(formattedData.ideas.map(idea => idea.heading));
            setisDataLoaded(true)
         } catch (error: any)
         {
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
               <h1>{jsonData.title}</h1>
               <ul>
                  {ideas?.map((i,index) => <li key={index}><a href={"#"+i}>{index+1}. {i}</a></li>)}
               </ul>
                  {jsonData.ideas.map((i,index)=>
                     <div
                     key={index}
                     className="ArticleIdea"
                     >
                        <h2
                         key={index}
                         id={i.heading}
                        className="ArticleIdeaHeading"
                        >{index+1}. {i.heading}</h2>
                        {i.subideas.map((si,index)=>{
                           const rbr = si.relatedBibleReferences && si.relatedBibleReferences.length > 0 ? si.relatedBibleReferences.reduce((acc,c)=>acc.concat(", " +c)) : "";
                           if(si.isBiblicalPassage && si.isBiblicalPassage) 
                              return <p 
                              key={index} 
                              className="biblicalPassage"
                              >
                                 "{si.text}"". {rbr}
                                 {
                                    si.relatedBibleReferences.length > 0
                                 }
                                 <span
                                 className="biblicalPassageReference"
                                 >
                                    {si.biblicalReference}.
                                 </span>
                              </p>
                           return <p key={index}>
                                 {si.text}. <span 
                                 className="biblicalPassageReference">
                                 {rbr}
                                 </span>
                              </p>
                           }
                        )}
                     </div>)}
            </article>
         )}
      </div>
   );
}

export default AHealthyLoneliness;