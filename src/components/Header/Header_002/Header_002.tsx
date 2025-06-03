import { Link } from "react-router-dom";
import React from "react";
import "./Header_002.css"; 

function Header_002() {
   const [menuIsExpanded, setmenuIsExpanded] = React.useState(false)
   const [fontSize, setfontSize] = React.useState(16)

   const handleHeader001MenuButtonClick = () => {
      setmenuIsExpanded(!menuIsExpanded)
   }

   const replaceStylesheet = (id:string,stylesheetNameStart:string,property:any)=>{
      const previousStylesheet = document.getElementById(id)
      if (previousStylesheet) previousStylesheet.remove()
      const tagElement = document.createElement("link")
      tagElement.id = id
      tagElement.setAttribute("rel", "stylesheet")
      tagElement.setAttribute("href", `${stylesheetNameStart}${property}.css`)
      document.head.appendChild(tagElement)
   }

   const handleHeader001BiggerButtonClick = () => {
      if (fontSize < 24) {
         setfontSize((fontSize) => fontSize + 2)
      }
   }
   const handleHeader001SmallerButtonClick = () => {
      if (fontSize > 10) {
         setfontSize((fontSize) => fontSize - 2)
      }
   }
      React.useEffect(() => {
         replaceStylesheet("fontSize_stylesheet", "font_size_", fontSize)
      }, [fontSize]);
   
   
   const handleLetsTalkButtonClick = () => {
      window.open('https://wa.me/584147281033', '_blank');
   }

      const [navigationClasses, setnavigationClasses] = React.useState("Navigation001");
   
      React.useEffect(() =>
      {
         setnavigationClasses((prev) =>
         {
            if (prev === "Navigation001 Navigation001Visible")
            {
               return "Navigation001 Navigation001Hidden";
            }
            else if (prev === "Navigation001")
            {
               return "Navigation001 Navigation001Hidden";
            }
            else
            {
               return "Navigation001 Navigation001Visible";
            }
         });
      }, [menuIsExpanded]);

   return (
      <>
         <div
            className="Header_002"
         >
            <Link 
            to="/"
            className="Header001LogoAnchor"
            >
               <p
                  className="Header001LogoText"
               >eduardoos.com</p>
            </Link>
            <button
               className="lets_talk_button"
               onClick={handleLetsTalkButtonClick}
            >
               Let's Talk
            </button>
            <button
               className="Header_002_button Header_002_font_decrement_button"
               onClick={handleHeader001SmallerButtonClick}
            >
                {/* <img src="/brand/icon_font_size_decrement.svg" height="100%"/> */}
            </button>
            <button
               className="Header_002_button Header_002_font_increment_button"
               onClick={handleHeader001BiggerButtonClick}
            >
                {/* <img src="/brand/icon_font_size_increment.svg" height="100%"/> */}
            </button>
            <button
               className="Header_002_button Header_002_menu_button"
               onClick={handleHeader001MenuButtonClick}
            >
                {/* <img src="/brand/icon_menu.svg" height="100%"/> */}
            </button>
         </div>
         
         <nav className={navigationClasses}>
            <ul className="Navigation001Ul">
               <li>
                  <Link to="/"
            onClick={handleHeader001MenuButtonClick}
            >Home</Link>
               </li>
               <li>
                  <Link to="/a_healthy_lonelyness"
            onClick={handleHeader001MenuButtonClick}
            >A Healthy Loneliness</Link>
               </li>
               <li>
                  <Link to="/church_membership"
            onClick={handleHeader001MenuButtonClick}
            >Church Membership</Link>
               </li>
               <li>
                  <Link to="/responding_to_hard_discipline"
            onClick={handleHeader001MenuButtonClick}
            >Responding to hard discipline</Link>
               </li>
               <li>
                  <Link to="/before_the_role_and_the_tragedy"
            onClick={handleHeader001MenuButtonClick}
            >Before the Role and the Tragedy</Link>
               </li>
               <li>
                  <Link to="/mglearning"
            onClick={handleHeader001MenuButtonClick}
            >MGLearning</Link>
               </li>
            </ul>
         </nav>
      </>
   )
}


export default Header_002