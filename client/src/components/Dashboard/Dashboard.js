import React from "react";
import NavBar from "../Navbar/NavBar";
import "./dashboard.css";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <NavBar />

      <div className="row mx-auto m-2">
        <div className="left col-3">
          <div className="container-1 shadow bg-light">
            <h2 className="text-center p-2 border-bottom">Blogs</h2>
            <Link to={"/newblog"} className="text-decoration-none text-dark">
              <div className="new text-center mx-auto ">
                <h6>New Blog</h6>
              </div>
            </Link>
          </div>
        </div>
        <div className="right col-9 ">
          <div className="container-2 shadow bg-light">
            <h2 className="text-center p-2 border-bottom">Profile</h2>
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
