import "./App.css";

// import a components from the components folder
import Public from "./components/Public";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SinglePost from "./components/SinglePost";
import NewArticle from "./components/NewArticle";
import Profile from "./components/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/new" element={<NewArticle />} />
      </Routes>
    </div>
  );
}

export default App;
