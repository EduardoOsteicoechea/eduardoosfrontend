import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation001.css";

interface Navigation001Props
{
   isExpanded: boolean;
}

function Navigation001({ isExpanded }: Navigation001Props)
{
   const [navigationClasses, setnavigationClasses] = useState("Navigation001");

   useEffect(() =>
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
   }, [isExpanded]);

   return (
      <nav className={navigationClasses}>
         <ul className="Navigation001Ul">
            <li>
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/a_healthy_lonelyness">A Healthy Loneliness</Link>
            </li>
         </ul>
      </nav>
   );
}

export default Navigation001;


// return (
//    <nav className={navigationClasses}>
//       <ul className="Navigation001Ul">
//          <li>
//             <Link to="/">Home</Link>
//          </li>
//          <li>
//             <Link to="/contact">Contact</Link>
//          </li>
//          <button type="button" onClick={handleSessionButtonClick}>
//             Session
//          </button>
//          {sessionTrayIsExpanded && (
//             <div>
//                <li>
//                   <Link to="/login">LogIn</Link>
//                </li>
//                <li>
//                   <Link to="/singin">SingIn</Link>
//                </li>
//                <li>
//                   <Link to="/logout">LogOut</Link>
//                </li>
//             </div>
//          )}
//       </ul>
//    </nav>
// );