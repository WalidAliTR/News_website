import React from "react";
import { useState, useEffect, useContext } from "react";
import logo from "../assets/images/logo.png";
import avatr from "../assets/images/avatar.jpg";

import { FaBars, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

import { AppContext } from "../context/AppContext";

const SinglePost = () => {
  const [menu, setMenu] = useState(false);
  const { user, getNewsById } = useContext(AppContext);
  const { id } = useParams();

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNewsById(id);
      setNews(response.data);
    };

    fetchNews();
  }, []);

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

        <SideMenu menu={menu} />

        {/* <!-- Main --> */}
        <div id="main">
          {/* <!-- Post --> */}
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
                    <a href="#" className="author">
                      <span className="name">{article.author_name}</span>
                      <img src={article.author_picture || avatr} alt="" />
                    </a>
                  </div>
                </header>
                <Link
                  to={`/post/${article.news_PK}`}
                  className="image featured"
                >
                  <img src={article.news_picture} alt="" />
                </Link>
                <p>{article.news_content}</p>
                <footer style={{ display: "flex", justifyContent: "end" }}>
                  <ul className="stats">
                    <li style={{fontSize: "1.2rem"}}>
                      <Link to={`/post/${article.news_PK}`}>
                        {article.news_category}
                      </Link>
                    </li>
                    {user && user.user_PK === article.author_PK && (
                      <li>
                        <Link to={`/edit/${article.news_PK}`}>
                          <FaRegEdit size={18} />
                        </Link>
                      </li>
                    )}

                    {user && user.user_PK === article.author_PK && (
                      <li>
                        <Link to={`/delete/${article.news_PK}`}>
                          <MdDelete size={18} />
                        </Link>
                      </li>
                    )}
                  </ul>
                </footer>
              </article>
            );
          })}
        </div>

        {/* <!-- Footer --> */}
        <center>
          <Footer />
        </center>
      </div>
    </div>
  );
};

export default SinglePost;
