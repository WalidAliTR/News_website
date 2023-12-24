import React , { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";


import { FaSearch } from "react-icons/fa";

import { AppContext } from "../context/AppContext";

import { toast } from "react-hot-toast";

const SideMenu = ({ menu }) => {
  const { user, logoutUser, getNews } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.status === 200) {
      toast.success("Logout Successful");
    } else {
      toast.error("Logout Failed");
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data);
    };

    fetchNews();
  }, []);

  // handle search on change
  useEffect(() => {
    const filtered = news.filter((item) =>
      item.news_title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [news, search]);


  return (
    <div>
      <section id="menu" className={menu ? "menu_open" : "menu_close"}>
        <section>
          <form className="search" method="get" action="#">
            <input
              type="text"
              name="query"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
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
            {filteredNews?.map((item) => (
              <li key={item.news_PK}>
                <Link to={`/post/${item.news_PK}`}>
                  <h3>{item.news_title}</h3>
                  <p>{item.news_content.slice(0, 44)}...</p>
                </Link>
              </li>
            ))}
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
                <Link className="button large fit" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default SideMenu;
