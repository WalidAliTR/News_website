import React from "react";
import { useState } from "react";
import avatr from "../assets/images/avatar.jpg";
import logo from "../assets/images/logo.png";
import pic01 from "../assets/images/pic01.jpg";
import {
  FaBars,
  FaSearch,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaRss,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Public = () => {
  const [menu, setMenu] = useState(false);

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
              <li>
                <a href="login.html" className="button large fit">
                  Log In
                </a>
              </li>
            </ul>
          </section>
        </section>

        <div id="main">
          <article className="post">
            <header>
              <div className="title">
                <h2>
                  <Link to={"/post/1"}>Magna sed adipiscing</Link>
                </h2>
                <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
              </div>
              <div className="meta">
                <time className="published" dateTime="2015-11-01">
                  November 1, 2015
                </time>
                <a href="#" className="author">
                  <span className="name">Jane Doe</span>
                  <img src={avatr} alt="" />
                </a>
              </div>
            </header>
              <Link to={"/post/1"} className="image featured">
              <img src={pic01} alt="" />
            </Link>
            <p>
              Mauris neque quam, fermentum ut nisl vitae, convallis maximus
              nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor
              magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies
              mi non congue ullam corper. Praesent tincidunt sed tellus ut
              rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies
              congue gravida diam non fringilla.
            </p>
            <footer>
              <ul className="actions">
                <li>
                  <a href="single.html" className="button large">
                    Continue Reading
                  </a>
                </li>
              </ul>
              <ul className="stats">
                <li>
                  <a href="#">General</a>
                </li>
                <li>
                  <a href="#" className="icon solid fa-heart">
                    28
                  </a>
                </li>
                <li>
                  <a href="#" className="icon solid fa-comment">
                    128
                  </a>
                </li>
              </ul>
            </footer>
          </article>
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
                <a href="http://html5up.net">HTML5 UP</a>
              </p>
            </header>
          </section>

          <section>
            <div className="mini-posts">
              <article className="mini-post">
                <header>
                  <h3>
                    <a href="single.html">Vitae sed condimentum</a>
                  </h3>
                  <time className="published" dateTime="2015-10-20">
                    October 20, 2015
                  </time>
                  <a href="#" className="author">
                    <img src="assets/images/avatar.jpg" alt="" />
                  </a>
                </header>
                <a href="single.html" className="image">
                  <img src="assets/images/pic04.jpg" alt="" />
                </a>
              </article>

              <article className="mini-post">
                <header>
                  <h3>
                    <a href="single.html">Rutrum neque accumsan</a>
                  </h3>
                  <time className="published" dateTime="2015-10-19">
                    October 19, 2015
                  </time>
                  <a href="#" className="author">
                    <img src="assets/images/avatar.jpg" alt="" />
                  </a>
                </header>
                <a href="single.html" className="image">
                  <img src="assets/images/pic05.jpg" alt="" />
                </a>
              </article>
            </div>
          </section>

          <section className="blurb">
            <h2>About</h2>
            <p>
              Mauris neque quam, fermentum ut nisl vitae, convallis maximus
              nisl. Sed mattis nunc id lorem euismod amet placerat. Vivamus
              porttitor magna enim, ac accumsan tortor cursus at phasellus sed
              ultricies.
            </p>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  Learn More
                </a>
              </li>
            </ul>
          </section>

          <section id="footer">
            <ul className="icons">
              <li>
                {/* for example : 
                <Link to={"/instagram.com"}>
                </Link> */}
                <Link>
                  <FaTwitter size={18} style={{ color: "red" }} />
                </Link>
              </li>
              <li>
                <Link>
                  <FaFacebookF size={18} style={{ color: "red" }} />
                </Link>
              </li>
              <li>
                <Link>
                  <FaInstagram size={18} style={{ color: "red" }} />
                </Link>
              </li>
              <li>
                <Link>
                  <FaRss size={18} style={{ color: "red" }} />
                </Link>
              </li>
              <li>
                <Link>
                  <MdOutlineEmail size={18} style={{ color: "red" }} />
                </Link>
              </li>
            </ul>
            <p className="copyright">
              &copy; Untitled. Design:{" "}
              <a href="http://html5up.net">Walid Ali</a>. assets/images:{" "}
              <a href="http://unsplash.com">Unsplash</a>.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Public;
