import { Link } from "react-router-dom";
import Navigation001 from "../Navigation/Navigation001";
import React from "react";
import "./Header001.css"

function Header001(){
   const [menuIsExpanded, setmenuIsExpanded] = React.useState(false)

   const handleHeader001MenuButtonClick = ()=>{
      setmenuIsExpanded(!menuIsExpanded)
   }

   return(
      <>
         <div
         className="Header001"
         >
            <Link to="/"
             className="Header001LogoAnchor">
               <p
               className="Header001LogoText"
               >Eduardo Osteicoechea</p>
            </Link>
            <button
            className="Header001MenuButton"
            onClick={handleHeader001MenuButtonClick}
            >
               <div
               className="Header001MenuButtonBar Header001MenuButtonBar1"
               ></div>
               <div
               className="Header001MenuButtonBar Header001MenuButtonBar2"
               ></div>
            </button>
         </div>
         <Navigation001 isExpanded={menuIsExpanded}/>
      </>
   )
}

export default Header001