import StaticJsonDataDisplayer001 from "../components/Chat/StaticJsonDataDisplayer001";
import "./Home.css"

function Home() {

   return (
      <header
      className="HomeHero"
      >
         <div
         className="HomeHeroImageContainer"
         >
            <img
            className="HomeHeroImageImage"
            src="1920x1920.jpg"
            height="100%"
            />
         </div>
         <StaticJsonDataDisplayer001 url="static_data/home_profile_presentation.json"/>
      </header>
   );
 }
 
 export default Home;