import React from "react";
import "./StaticJsonDataDisplayer001.css";

interface StaticJsonDataDisplayer001Props
{
   url: string;
}

interface JsonData
{
   title: string;
   ideas: Idea[];
}

interface Idea
{
   text: string;
   key_words_and_phrases: string[];
}

function StaticJsonDataDisplayer001({ url }: StaticJsonDataDisplayer001Props)
{
   const [isDataLoaded, setisDataLoaded] = React.useState(false);
   const [jsonData, setjsonData] = React.useState<JsonData | null>(null);
   const [errorMessage, seterrorMessage] = React.useState<string | null>(null);
   const [keySkills, setkeySkills] = React.useState<string[] | null>(null);

   React.useEffect(() =>
   {
      const loadData = async () =>
      {
         try 
         {
            const response = await fetch(url);

            if (!response.ok)
            {
               throw new Error(`Failed to fetch data: ${response.status}. ${response.statusText}`);
            }

            const data = await response.json();
            const deserializedData: JsonData = data as JsonData;
            setjsonData(data);
            setisDataLoaded(true);

            const allKeyPhrases: string[] = deserializedData.ideas.reduce(
               (acc: string[], idea) => acc.concat(idea.key_words_and_phrases),
               []
            );
            const uniqueKeyPhrases = [...new Set(allKeyPhrases)];

            setkeySkills(uniqueKeyPhrases);
         }
         catch (error: any) 
         {
            console.error("Error loading JSON data: ", error);
            seterrorMessage(error);
            setisDataLoaded(false);
         }
      };

      loadData();
   }, [url]);

   if (errorMessage)
   {
      return (
         <div
            className="StaticJsonDataDisplayer001OuterContainer"
         >
            <p>Error loading data: {errorMessage}</p>
         </div>
      );
   }

   return (
      <div
      className="StaticJsonDataDisplayer001OuterContainer"
      >
         <div
         className="StaticJsonDataDisplayer001TextContainer"
         >{
               isDataLoaded ?
                  jsonData?.ideas.map((idea, index) =>
                  {
                     let formattedText = idea.text;

                     idea.key_words_and_phrases.forEach((keyword) =>
                     {
                        const regex = new RegExp(keyword);
                        formattedText = formattedText.replace(regex, `<b id="${keyword}" class="StaticJsonDataDisplayer001TextContainerRemark">${keyword}</b>`);
                     });

                     return <p
                        className="StaticJsonDataDisplayer001OuterContainerParagraph"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                     ></p>;
                  }) :
                  (<p>Loading Data...</p>)
            }
         </div>
         <div
         className="StaticJsonDataDisplayer001ButtonsContainer"
         >  
            <h2
            className="StaticJsonDataDisplayer001ButtonsContainerHeading"
            >Skills</h2>
            {isDataLoaded ? (
               keySkills?.map((phrase, index) => (
                  <button
                     onClick={() =>
                     {
                        const element = document.getElementById(phrase);
                        element?.scrollIntoView({ behavior: 'smooth' });
                     }}
                     key={index}
                  >{phrase}</button>
               ))
            ) : (
               <p>Loading Data...</p>
            )}
         </div>
      </div>
   );
}

export default StaticJsonDataDisplayer001;