import { Link } from "react-router-dom";
import Navigation001 from "../Navigation/Navigation001";
import React from "react";
import "./Header001.css"

function Header001() {
   const [menuIsExpanded, setmenuIsExpanded] = React.useState(false)
   const [currentThemeIsLight, setcurrentThemeIsLight] = React.useState(true)
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

   const handleHeader001ThemeButtonClick = () => {
      setcurrentThemeIsLight((currentThemeIsLight) => !currentThemeIsLight)
   }
   React.useEffect(() => {
      replaceStylesheet("theme_stylesheet", "theme_", currentThemeIsLight ? "light" : "dark")
   }, [currentThemeIsLight]);

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



   return (
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
               className="light_background_strong_foreground"
               onClick={handleHeader001ThemeButtonClick}
            >
                <img src="brand/icon_theme_toggle.svg" height="100%"/>
            </button>
            <button
               className="light_background_strong_foreground"
               onClick={handleHeader001BiggerButtonClick}
            >
                <img src="brand/icon_font_size_increment.svg" height="100%"/>
            </button>
            <button
               className="light_background_strong_foreground"
               onClick={handleHeader001SmallerButtonClick}
            >
                <img src="brand/icon_font_size_decrement.svg" height="100%"/>
            </button>
            <button
               className="light_background_strong_foreground"
               onClick={handleHeader001MenuButtonClick}
            >
                <img src="brand/icon_menu.svg" height="100%"/>
            </button>
         </div>
         <Navigation001 isExpanded={menuIsExpanded} />
      </>
   )
}

export default Header001