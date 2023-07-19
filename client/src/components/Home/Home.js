import React from "react";
import NavBar from "../Navbar/NavBar";
import "./home.css";
import Card from "react-bootstrap/Card";
import {NavLink}  from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="container row mx-auto p-5">
        <div className="left col">
          <Card border="info" style={{ width: "31rem" }} className="card">
            <Card.Body>
              <Card.Title>
                <h4>blogPoster</h4>
              </Card.Title>
              <Card.Text className="font-weight-normal lead">
                BlogPoster is a user-centric website that enables individuals to
                share their unique perspectives through blog posts. It offers a
                seamless and intuitive platform for users to create, edit, and
                publish their content. With a focus on user experience,
                BlogPoster provides features like scheduling, updating, and
                formatting options to enhance the quality and presentation of
                blog posts. The platform also incorporates SEO techniques to
                improve the discoverability of blogs and encourages social
                sharing for wider reach. Additionally, BlogPoster fosters a
                sense of community through its commenting system, allowing users
                to engage in meaningful discussions. With robust privacy
                measures in place, BlogPoster ensures the safety and
                confidentiality of user data and blog content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="d-flex justify-content-end col ">
          <div className="right my-auto">
            <NavLink to="/login" className="text-decoration-none">
              <Card border="info" style={{ width: "18rem"}}>
                <Card.Body>
                  <Card.Title>Sign IN</Card.Title>
                </Card.Body>
              </Card>
            </NavLink>
            <br />
            <NavLink to="/register" className="text-decoration-none">
              <Card border="info" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Sign UP</Card.Title>
                </Card.Body>
              </Card>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
