import React from "react";
import { useState, useContext, useEffect , CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

// toast
import { toast } from "react-hot-toast";

// images
import logo from "../assets/images/logo.png";

// icons
import { FaBars } from "react-icons/fa";
// context
import { AppContext } from "../context/AppContext";

// custom hooks
import profileImageChange from "../hooks/profileImageChange";

// components
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import axios from "axios";

const NewArticle = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading , setLoading] = useState(false);

  const { imgUrl, handleImageChange, setImgUrl } = profileImageChange();

  // all fields are required
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !content) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!user) {
      toast.error("Please login to create an article!");
      return;
    }
    const article = {
      news_category: category,
      news_title: title,
      news_content: content,
      author_PK: user?.user_PK,
      news_picture: imgUrl,
    };

    try{
      setLoading(true);
      const response = await axios.post("/api/news", article, {
        validateStatus: false,
      });
  
      if (response.status === 201) {
        toast.success("Article created successfully!");
        navigate("/");
      } else {
        toast.error("Something went wrong!");
      }
  
      setTitle("");
      setCategory("");
      setContent("");
      setImgUrl("");

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }

  };

  // check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
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
            <form onSubmit={handleSubmit}>
              {" "}
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  autoComplete="no-password"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
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
                  value={user?.user_name || ""}
                />
              </div>
              <div className="form">
                <label htmlFor="category">Select a category:</label>
                <select
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
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
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="form">
                <label htmlFor="image">Upload Image (Optional):</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" style={{ marginTop: "1rem" }} disabled={loading}>
                Add News
              </button>

              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <ClipLoader color={"#000"} loading={loading} size={50} />
                </div>
              )}
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
