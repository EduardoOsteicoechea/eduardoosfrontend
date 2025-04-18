import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation001.css";

function Navigation001() {
  const [sessionTrayIsExpanded, setsessionTrayIsExpanded] = useState(false);

  const handleSessionButtonClick = () => {
    setsessionTrayIsExpanded(!sessionTrayIsExpanded);
  };

  useEffect(() => {
    console.log("sessionTrayIsExpanded:", sessionTrayIsExpanded);
  }, [sessionTrayIsExpanded]);

  return (
    <nav className="Navigation001">
      <ul className="Navigation001Ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <button type="button" onClick={handleSessionButtonClick}>
          Session
        </button>
        {sessionTrayIsExpanded && (
          <div>
            <li>
              <Link to="/login">LogIn</Link>
            </li>
            <li>
              <Link to="/singin">SingIn</Link>
            </li>
            <li>
              <Link to="/logout">LogOut</Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation001;