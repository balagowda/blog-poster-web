import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import SignIn from "./components/Sign-In-Up/SignIn";
import SignUp from "./components/Sign-In-Up/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Blog from "./components/blog/Blog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/newblog" element={<Blog />} />
    </Routes>
  );
}

export default App;
