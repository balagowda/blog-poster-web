import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "../Navbar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import "./sign.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [detail, setDetail] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const redirect = useNavigate("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    setDetail((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = detail;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        email,
        password,
        cpassword,
      }),
    });

    const reply = await res.json();
    // console.log(reply);

    if (res.status === 422 || !detail) {
      toast.warn("please provide valid data", {
        position: "top-center",
      });
    } else {

       toast.success("Registerd successfully", {
        position: "top-center",
      });

      redirect("/login");
      setDetail({
        ...detail,
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <>
      <div className="App">
        <NavBar />
        <div className="container p-5 d-flex justify-content-center">
          <div
            style={{ width: "600px" }}
            className="border shadow p-3 bg-light"
          >
            <h4 className="text-center">Sign Up</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="fname"
                  value={detail.fname}
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={detail.email}
                  onChange={handleInput}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={detail.password}
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="cpassword"
                  value={detail.cpassword}
                  onChange={handleInput}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <div className="text-center p-3">
              <h6>
                Have an account? <NavLink to="/login">Signin</NavLink>
              </h6>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default SignUp;
