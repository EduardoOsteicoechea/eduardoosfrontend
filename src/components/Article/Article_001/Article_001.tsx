import React from "react";
import "./Article_001.css";

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
  extendedExplanation: string[][];
}
interface Article_001_Props {
  url: string;
}

const Article_001: React.FC<Article_001_Props> = ({ url }) => {
  const [isDataLoaded, setisDataLoaded] = React.useState(false);
  const [jsonData, setjsonData] = React.useState<Article | null>();
  const [errorMessage, seterrorMessage] = React.useState<string | null>();
  const [ideas, setideas] = React.useState<string[] | null>([]);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching data: ${response.status}, ${response.statusText}`);

        const data = await response.text();
        const dataAsJson = JSON.parse(data);
        const formattedData: Article = dataAsJson as Article;
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
      className="Article_001"
    >
      {errorMessage && <p>Error: {errorMessage}</p>}
      {!isDataLoaded && !errorMessage && <p>Loading data...</p>}
      {isDataLoaded && jsonData && (
        <article>
          <h1 className="article_heading">{jsonData.title}</h1>

          <section className="article_intro_section">
            <h2 className="Article_001_section_heading">Introduction</h2>
            {jsonData.introduction_ideas?.map((ii, iiIndex) => <p key={iiIndex} className="article_intro_section_paragraph">{ii.text}</p>)}
          </section>

          <section className="reference_to_article_headings_section">
            <h2 className="Article_001_section_heading">Ideas</h2>
            <ul className="reference_to_article_heading_list">
              {ideas?.map((mainIdea, index) => <li key={index}><span className="reference_to_article_heading_list_item_number">{index + 1}. </span><a className="reference_to_article_heading" href={`#main_idea_${index}`}>{mainIdea}</a></li>)}
            </ul>
          </section>

          <section className="article_ideas_section">
            <h2 className="Article_001_section_heading">Article</h2>
            {
              jsonData.ideas.map((i, ideaIndex) =>
                <div key={ideaIndex} className="ArticleIdea">
                  <h2
                    key={ideaIndex}
                    id={`main_idea_${ideaIndex}`}
                    className="ArticleIdeaHeading"
                  >
                    <input
                      id={`ArticleIdeaHeading_checkbox_${i}`}
                      className="biblically_justified_idea_checkbox"
                      type="checkbox"
                      onClick={() => {
                        const container = document.getElementById(`idea_${ideaIndex}_content_container`)

                        if (container?.classList.contains("visible")) {
                          container?.classList.remove("visible")
                          container?.classList.add("hidden")
                        }
                        else {
                          container?.classList.remove("hidden")
                          container?.classList.add("visible")
                        }
                      }}
                    />
                    {ideaIndex + 1}. {i.heading}
                  </h2>

                  <div
                    id={`idea_${ideaIndex}_content_container`}
                    className="idea_content_container visible"
                  >
                    {
                      i.subideas.map((si, subIdeaIndex) => {

                        const rbr = si.relatedBibleReferences && si.relatedBibleReferences.length > 0 ? si.relatedBibleReferences.reduce((acc, c) => acc.concat(", " + c)) : "";

                        if (si.isBiblicalPassage && si.isBiblicalPassage) {
                          return <p
                            key={subIdeaIndex}
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
                            key={subIdeaIndex}
                            className="biblicalPassage"
                          >
                            <ul className="biblically_justified_idea_list" >
                              {
                                ideas.map((element, bjilii) => (
                                  <li
                                    key={bjilii}
                                    id={`biblically_justified_idea_list_item_${subIdeaIndex}_${bjilii}`}
                                    className="biblically_justified_idea_list_item"
                                  >
                                    <div className="biblically_justified_idea_list_item_heading">
                                      <input
                                        id={`biblically_justified_idea_checkbox_${subIdeaIndex}_${bjilii}`}
                                        className="biblically_justified_idea_checkbox"
                                        type="checkbox"
                                        onClick={() => {
                                          const extendedExplanationContainer = document.getElementById(`biblically_justified_idea_extended_explanation_container_${subIdeaIndex}_${bjilii}`)
                                          if (extendedExplanationContainer?.classList.contains("visible")) {
                                            extendedExplanationContainer?.classList.remove("visible")
                                            extendedExplanationContainer?.classList.add("hidden")
                                          }
                                          else {
                                            extendedExplanationContainer?.classList.remove("hidden")
                                            extendedExplanationContainer?.classList.add("visible")
                                          }
                                        }}
                                      />
                                      <span className="biblically_justified_idea_number">
                                        {ideaIndex + 1}.{subIdeaIndex + 1}.
                                      </span>
                                      <span className="biblically_justified_idea_text">
                                        {element.text}
                                      </span>
                                    </div>

                                    <div className="biblically_justified_idea_biblical_references_container">
                                      {
                                        element.biblicalReferences.map((br, bri) => (
                                          <span key={bri} className="biblically_justified_idea_biblical_reference_text">{br}</span>
                                        ))
                                      }
                                    </div>

                                    <div
                                      id={`biblically_justified_idea_extended_explanation_container_${subIdeaIndex}_${bjilii}`} className="biblically_justified_idea_extended_explanation_container visible"
                                    >
                                      {
                                        element.extendedExplanation?.map(
                                          (eetxt, eetxti) => (
                                            <div
                                              key={eetxti}
                                              id="biblically_justified_idea_extended_explanation_text_items_container"
                                              className="biblically_justified_idea_extended_explanation_text_items_container"
                                            >
                                              <span
                                                key={eetxti}
                                                className={`biblically_justified_idea_extended_explanation_text ${eetxt[1]}`}
                                              >
                                                {eetxt[0]}
                                              </span>
                                              {
                                                eetxt[2] ?
                                                  <span
                                                    className={`biblically_justified_idea_extended_explanation_text_biblical_reference`}
                                                  >
                                                    ({eetxt[2]}).
                                                  </span>
                                                  : ""
                                              }
                                            </div>
                                          )
                                        )
                                      }

                                      {
                                        element.extendedExplanation?.length > 0 ?
                                          <div
                                            className="hide_biblically_justified_idea_extended_explanation_button"
                                            onClick={() => {
                                              const ideaContainer = document.getElementById(`biblically_justified_idea_list_item_${subIdeaIndex}_${bjilii}`)
                                              const extendedExplanationContainer = document.getElementById(`biblically_justified_idea_extended_explanation_container_${subIdeaIndex}_${bjilii}`)
                                              const checkboxElement = document.getElementById(`biblically_justified_idea_checkbox_${subIdeaIndex}_${bjilii}`)

                                              if (extendedExplanationContainer?.classList.contains("visible")) {
                                                extendedExplanationContainer?.classList.remove("visible")
                                                extendedExplanationContainer?.classList.add("hidden")
                                                if (checkboxElement instanceof HTMLInputElement) {
                                                  const checkbox: HTMLInputElement = checkboxElement;
                                                  checkbox.checked = true;
                                                }
                                              }
                                              else {
                                                extendedExplanationContainer?.classList.remove("hidden")
                                                extendedExplanationContainer?.classList.add("visible")
                                                if (checkboxElement instanceof HTMLInputElement) {
                                                  const checkbox: HTMLInputElement = checkboxElement;
                                                  checkbox.checked = false;
                                                }
                                              }
                                              const rect = ideaContainer?.getBoundingClientRect();
                                              if (ideaContainer) {
                                                const desiredScrollPosition = window.scrollY + rect!.top - 50;
                                                window.scrollTo({
                                                  top: desiredScrollPosition,
                                                  behavior: 'smooth'
                                                });
                                              }
                                            }}
                                          >
                                            <div className="hide_biblically_justified_idea_extended_explanation_button_bar hide_biblically_justified_idea_extended_explanation_button_bar1"></div>
                                            <div className="hide_biblically_justified_idea_extended_explanation_button_bar hide_biblically_justified_idea_extended_explanation_button_bar2"></div>
                                          </div>
                                          :
                                          ""
                                      }

                                    </div>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>;
                        }

                        // return <p key={ideaIndex}>
                        //   {si.text}
                        //   <span className="biblicalPassageReference">
                        //     {rbr}
                        //   </span>
                        // </p>;
                      }
                      )}
                  </div>
                </div>)}
          </section>
        </article>
      )}
    </div>
  );
}

export default Article_001;