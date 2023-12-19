import React from "react";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.jpg";
import pic01 from "../assets/images/pic01.jpg";
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaRss,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

const SinglePost = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div id="wrapper" style={{
        display: "flex",
        flexDirection: "column",
      }}>
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

        {/* <!-- Main --> */}
        <div id="main">
          {/* <!-- Post --> */}
          <article className="post">
            <header>
              <div className="title">
                <h2>
                  <a href="#">Magna sed adipiscing</a>
                </h2>
                <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
              </div>
              <div className="meta">
                <time className="published" dateTime="2015-11-01">
                  November 1, 2015
                </time>
                <a href="#" className="author">
                  <span className="name">Jane Doe</span>
                  <img src={avatar} alt="" />
                </a>
              </div>
            </header>
            <span className="image featured">
              <img src={pic01} alt="" />
            </span>
            <p>
              Mauris neque quam, fermentum ut nisl vitae, convallis maximus
              nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor
              magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies
              mi non congue ullam corper. Praesent tincidunt sed tellus ut
              rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies
              congue gravida diam non fringilla.
            </p>
            <p>
              Nunc quis dui scelerisque, scelerisque urna ut, dapibus orci. Sed
              vitae condimentum lectus, ut imperdiet quam. Maecenas in justo ut
              nulla aliquam sodales vel at ligula. Sed blandit diam odio, sed
              fringilla lectus molestie sit amet. Praesent eu tortor viverra
              lorem mattis pulvinar feugiat in turpis. className aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Fusce ullamcorper tellus sit amet mattis dignissim.
              Phasellus ut metus ligula. Curabitur nec leo turpis. Ut gravida
              purus quis erat pretium, sed pellentesque massa elementum. Fusce
              vestibulum porta augue, at mattis justo. Integer sed sapien
              fringilla, dapibus risus id, faucibus ante. Pellentesque mattis
              nunc sit amet tortor pellentesque, non placerat neque viverra.{" "}
            </p>
            <footer>
              <ul className="stats">
                <li>
                  <a href="#">General</a>
                </li>
              </ul>
            </footer>
          </article>
        </div>

        {/* <!-- Footer --> */}
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
            &copy; Untitled. Design: <a href="http://html5up.net">Walid Ali</a>.
            Images: <a href="http://unsplash.com">Unsplash</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SinglePost;
