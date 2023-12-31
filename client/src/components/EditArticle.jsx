import React from "react";
import { useState, useContext, useEffect, CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

const EditArticle = () => {
  const [menu, setMenu] = useState(false);
  const { user, getNewsById } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const { imgUrl, handleImageChange, setImgUrl } = profileImageChange();

  // all fields are required
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  console.log(title, category, content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate fields
    if (!title && !category && !content && !imgUrl) {
      return toast.error("Please fill one of the fields");
    }

    try {
      setLoading(true);
      const updatedNews = {
        news_title: title,
        news_category: category,
        news_content: content,
        news_picture: imgUrl,
      };

      const response = await axios.put(`/api/news/${id}`, updatedNews, {
        validateStatus: false,
      });
      if (response.status === 200) {
        toast.success("News updated successfully");
        navigate("/");
        window.location.reload();
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNewsById(id);
      setNews(response.data[0]);
    };

    fetchNews();
  }, []);

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
        <SideMenu menu={menu} setMenu={setMenu} />

        {/* <!-- Main --> */}
        <div id="main">
          <article className="post">
            <h1>Edit New News Article</h1>
            <form onSubmit={handleSubmit}>
              {" "}
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder={news?.news_title}
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

                  <option value="business">Business</option>

                  <option value="sports">Sports</option>

                  <option value="technology">Technology</option>

                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>
              <div className="form">
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  rows="10"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={news?.news_content}
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
              <button
                type="submit"
                style={{ marginTop: "1rem" }}
                disabled={loading}
              >
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

export default EditArticle;
