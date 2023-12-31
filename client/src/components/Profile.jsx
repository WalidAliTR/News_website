import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// images
import userPic from "../assets/images/user.jpg";
import logo from "../assets/images/logo.png";
import { AppContext } from "../context/AppContext";

// components
import SideMenu from "./SideMenu";

// icons
import { FaBars, FaUser, FaUserEdit } from "react-icons/fa";

import { FaSquareXTwitter } from "react-icons/fa6";
import profileImageChange from "../hooks/profileImageChange";

// toast notification
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const { user: globalUser, getUserById, updateUser } = useContext(AppContext);
  const { imgUrl, handleImageChange, setImgUrl } = profileImageChange();
  const [menu, setMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(id);
      setUser(response.data);
      console.log(response.data);
    };

    fetchUser();
  }, []);

  const [changeUser, setChangeUser] = useState({
    email: "",
    password: "",
    about: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setChangeUser({ ...changeUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate
    if (
      !changeUser.email &&
      !changeUser.password &&
      !changeUser.about &&
      !changeUser.linkedin &&
      !imgUrl
    ) {
      toast.error("Please fill at least one field");
      return;
    }

    const updatedUser = {
      user_email: changeUser.email,
      user_password: changeUser.password,
      user_about: changeUser.about,
      social_media_links: changeUser.linkedin,
      user_picture: imgUrl,
    };

    try {
      setLoading(true);
      const response = await updateUser(id, updatedUser);
      console.log(response);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        navigate(`/`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      <div
        className="login-container"
        style={{
          alignItems: "start",
          marginTop: "40px",
        }}
      >
        <div
          className="login-wrapper"
          style={{
            padding: "50px",
            width: "90%",
          }}
        >
          <Link to={"/"}>
            <img
              src={imgUrl ? imgUrl : user?.user_picture}
              alt="User pic"
              className="logo"
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0",
              }}
            />
          </Link>
          {globalUser && user?.user_PK === globalUser?.user_PK && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleImageChange}
                accept="image/*"
                style={{
                  display: "none",
                }}
              />
              <label
                htmlFor="file_up"
                style={{
                  cursor: "pointer",
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <span>Change Profile Picture</span>
              </label>
            </div>
          )}
          <div style={{ color: "gray" }}>
            <span
              style={{ color: "black", fontWeight: "bold", fontSize: "25px" }}
            >
              {user?.user_name}
            </span>
            {globalUser && user?.user_PK === globalUser?.user_PK && (
              <p style={{ color: "red", fontSize: "13px" }}>
                you can't change your user name
              </p>
            )}
          </div>
          <p style={{ color: "gray" }}>
            About :{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {user?.about_user}
            </span>
          </p>
          <p style={{ color: "gray" }}>
            Social Media :{" "}
            <Link
              to={user?.linkedin}
              style={{ color: "black", textDecoration: "none" }}
              target="_blank"
            >
              <FaSquareXTwitter
                size={22}
                style={{ color: "black", marginLeft: "10px" }}
              />
            </Link>
          </p>
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: 0,
            }}
          >
            You can update your profile here
          </p>
          {/* account created at  */}
          <p style={{ color: "gray" }}>
            Account created at:{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {new Date(user?.CreatedAt).toDateString()}
            </span>
          </p>
          {globalUser && user?.user_PK === globalUser?.user_PK && (
            <div>
              <button
                type="button"
                className="animated-button"
                onClick={() => {
                  setEditMode(!editMode);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaUserEdit
                  size={22}
                  style={{
                    color: "black",
                    marginRight: "10px",
                  }}
                />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
          {editMode && (
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder={globalUser?.user_email}
                  autoComplete="no-password"
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="about">About</label>
                <textarea
                  type="text"
                  id="about"
                  autoComplete="no-password"
                  placeholder={globalUser?.about_user}
                  onChange={handleChange}
                  style={{
                    resize: "none",
                  }}
                />
              </div>
              <div
                className="input-field"
                style={{
                  width: "50%",
                }}
              >
                <label htmlFor="linkedin">Twitter</label>
                <input
                  type="text"
                  id="Twitter"
                  placeholder={globalUser?.social_media_links}
                  autoComplete="no-password"
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {loading && <ClipLoader color="black" size={30} />}
                {!loading && (
                  <button type="submit" className="animated-button">
                    Update Profile
                  </button>
                )}
              </div>
            </form>
          )}
          <Link to={"/"} className="link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
