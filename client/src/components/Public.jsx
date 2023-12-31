import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import avatr from "../assets/images/avatar.jpg";
import logo from "../assets/images/logo.png";
import { FaBars, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import SideMenu from "./SideMenu";
import Footer from "./Footer";

const Public = () => {
  const [menu, setMenu] = useState(false);
  const { user, getNews } = useContext(AppContext);

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data);
    };

    fetchNews();
  }, []);

  return (
    <div>
      <div id="wrapper">
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
                <a href="#">Sports</a>
              </li>
              <li>
                <a href="#">Technolgoy</a>
              </li>
              <li>
                <a href="#">Lifestyle</a>
              </li>
            </ul>
          </nav>
          <nav className="main">
            <ul>
              <li className="">
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
                >
                  <Link to={`/profile/${user?.user_PK}`}>
                    <FaUser
                      size={22}
                      style={{ color: "gray", marginTop: "18px" }}
                    />
                  </Link>
                </div>
              </li>
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

        <SideMenu menu={menu} setMenu={setMenu} />

        <div id="main">
          {news.map((article) => {
            return (
              <article className="post" key={article.news_PK}>
                <header>
                  <div className="title">
                    <h2>
                      <Link to={`/post/${article.news_PK}`}>
                        {article.news_title}
                      </Link>
                    </h2>
                  </div>
                  <div className="meta">
                    <time className="published">
                      {new Date(article.CreatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    <Link
                      to={`/profile/${article.author_PK}`}
                      className="author"
                    >
                      <span className="name">{article.author_name}</span>
                      <img
                        src={article.author_picture || avatr}
                        alt=""
                        style={{
                          clipPath: "circle(50%)",
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                      />
                    </Link>
                  </div>
                </header>
                <Link
                  to={`/post/${article.news_PK}`}
                  className="image featured"
                >
                  <img
                    src={article.news_picture}
                    alt="News Picture"
                    height={600}
                    width={350}
                  />
                </Link>
                <p>{article.news_content}</p>
                <footer>
                  <ul className="actions">
                    <li>
                      <Link
                        to={`/post/${article.news_PK}`}
                        className="button large"
                      >
                        Continue Reading
                      </Link>
                    </li>
                  </ul>
                  <ul className="stats">
                    <li>
                      <Link to={`/post/${article.news_PK}`}>
                        {article.news_category}
                      </Link>
                    </li>
                  </ul>
                </footer>
              </article>
            );
          })}
        </div>

        <section id="sidebar">
          <section id="intro">
            <a href="#" className="logo">
              <img src="assets/images/logo.jpg" alt="" />
            </a>
            <header>
              <h2>World News</h2>
              <p>
                Another fine responsive site template by{" "}
                <Link
                  to="https://walidalitr.github.io/My-Portfolio/"
                  target="_blank"
                >
                  Walid Ali
                </Link>
              </p>
            </header>
          </section>

          <section>
            <div className="mini-posts">
              {news.map((article) => {
                return (
                  <article className="mini-post" key={article.news_PK}>
                    <header>
                      <h3>
                        <Link to={`/post/${article.news_PK}`}>
                          {article.news_title}
                        </Link>
                      </h3>
                      <time className="published" dateTime={article.CreatedAt}>
                        {new Date(article.CreatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>
                      <a href="#" className="author">
                        <img
                          src={article.author_picture || avatr}
                          alt="User Picture"
                          style={{
                            clipPath: "circle(50%)",
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginLeft: "10px",
                            marginRight: "10px",
                          }}
                        />
                      </a>
                    </header>
                  </article>
                );
              })}
            </div>
          </section>

          {/* <section className="blurb">
            <h2>About</h2>
            <p>
              Mauris neque quam, fermentum ut nisl vitae, convallis maximus
              nisl. Sed mattis nunc id lorem euismod amet placerat. Vivamus
              porttitor magna enim, ac accumsan tortor cursus at phasellus sed
              ultricies.
            </p>
            <ul className="actions">
              <li>
                <Link to={"/"} className="button">
                  Learn More
                </Link>
              </li>
            </ul>
          </section> */}

          <center>
            <Footer />
          </center>
        </section>
      </div>
    </div>
  );
};

export default Public;
