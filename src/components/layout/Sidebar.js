import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";

const Sidebar = () => {
  const [isReactMenuBtn, setIsReactMenuBtn] = useState(true);
  const location = useLocation().pathname.replace("/", "");

  console.log();

  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <button
          onClick={() => {
            setIsReactMenuBtn(!isReactMenuBtn);
          }}
        >
          React <img src="/assets/svg/plus.svg" alt="" />
        </button>

        {isReactMenuBtn && (
          <div className="sidebar__menu--react">
            <ul>
              <li>
                <Link
                  to="/counter"
                  id="counter"
                  className={`${location === "counter" ? "active" : ""}`}
                >
                  <ReactSVG src="/assets/svg/counter-rgb.svg" />
                  Counter
                </Link>
              </li>

              <li>
                <Link
                  id="form"
                  to="/form"
                  className={location === "form" ? "active" : ""}
                >
                  <ReactSVG src="/assets/svg/form-black.svg" />
                  Form
                </Link>
              </li>

              <li>
                <Link
                  to="list"
                  id="list"
                  className={location === "list" ? "active" : ""}
                >
                  <ReactSVG src="/assets/svg/list-black.svg" />
                  List
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
