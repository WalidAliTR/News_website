import React from "react";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const SideMenu = ({ menu }) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <section id="menu" className={menu ? "menu_open" : "menu_close"}>
        <section>
          <form className="search" method="get" action="#">
            <input type="text" name="query" placeholder="Search" />
            <FaSearch
              size={17}
              style={{
                color: "gray",
                cursor: "pointer",
                position: "absolute",
                left: "10px",
                top: "14px",
              }}
            />
          </form>
        </section>

        <section>
          <ul className="links">
            <li>
              <a href="#">
                <h3>Lorem ipsum</h3>
                <p>Feugiat tempus veroeros dolor</p>
              </a>
            </li>
            <li>
              <a href="#">
                <h3>Dolor sit amet</h3>
                <p>Sed vitae justo condimentum</p>
              </a>
            </li>
          </ul>
        </section>

        <section>
          <ul className="actions stacked">
            {!user ? (
              <li>
                <Link to={"/login"} className="button large fit">
                  Log In
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to={"/new"}
                  className="button large fit"
                  style={{ marginBottom: "1rem" }}
                >
                  Create a New Artical
                </Link>
                <Link className="button large fit">Logout</Link>
              </li>
            )}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default SideMenu;
