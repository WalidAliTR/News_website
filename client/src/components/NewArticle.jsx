import React from "react";
import { useState, useContext } from "react";
import logo from "../assets/images/logo.png";
import { FaBars, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import { AppContext } from "../context/AppContext";
import SideMenu from "./SideMenu";

const NewArticle = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useContext(AppContext);
  return (
    <div>
      <div
        id="wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <!-- Header --> */}
        <header id="header">
          <Link to={"/"}>
            <img src={logo} alt="News Site Logo" className="logo" />
          </Link>
          <nav className="links">
            <ul>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Business</a>
              </li>
              <li>
                <a href="#">Sport</a>
              </li>
              <li>
                <a href="#">Energy</a>
              </li>
              <li>
                <a href="#">Life</a>
              </li>
            </ul>
          </nav>
          <nav className="main">
            <ul>
              <li className="menu">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    padding: "0 1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMenu(!menu);
                  }}
                >
                  <FaBars size={22} style={{ color: "gray" }} />
                </div>
              </li>
            </ul>
          </nav>
        </header>

        {menu && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.3)",
              zIndex: "10000",
            }}
            onClick={() => {
              setMenu(!menu);
            }}
          ></div>
        )}

        {/* <section id="menu" className={menu ? "menu_open" : "menu_close"}>
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
              <li>
                <a href="login.html" className="button large fit">
                  Log In
                </a>
              </li>
            </ul>
          </section>
        </section> */}
        <SideMenu menu={menu} setMenu={setMenu} />

        {/* <!-- Main --> */}
        <div id="main">
          <article className="post">
            <h1>Add New News Article</h1>
            <form action="process_news.php" method="post">
              {" "}
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  autoComplete="no-password"
                />
              </div>
              <div className="form">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  autoComplete="no-password"
                  disabled
                  value={user?.user_name}
                />
              </div>
              <div className="form">
                <label htmlFor="category">Select a category:</label>
                <select id="category">
                  <option value="news">News</option>

                  <option value="sports">Business</option>

                  <option value="sports">Sports</option>

                  <option value="technology">Technology</option>

                  <option value="entertainment">Lifestyle</option>
                </select>
              </div>
              <div className="form">
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  rows="10"
                ></textarea>
              </div>
              <div className="form">
                <label htmlFor="image">Upload Image (Optional):</label>
                <input type="file" id="image" name="image" />
              </div>
              <button type="submit" style={{ marginTop: "1rem" }}>
                Add News
              </button>
            </form>
          </article>
        </div>

        {/* <!-- Footer --> */}
        <center>
          <Footer />
        </center>
      </div>
    </div>
  );
};

export default NewArticle;
