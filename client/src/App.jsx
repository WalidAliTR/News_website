import "./App.css";

// import a components from the components folder
import Public from "./components/Public";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SinglePost from "./components/SinglePost";
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </div>
  );
}

export default App;
