import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "../Navbar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import './sign.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/Context";

const SignIn = () => {

  const [detail,setDetail] = useState({email:"",password:""});
  const {account,setAccount} = useContext(LoginContext);

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
    const { email, password } = detail;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const reply = await res.json();

    if (res.status === 422 || !detail) {
      toast.warn("Invalid details", {
        position: "top-center",
      });
      console.log(reply);
    } else {

      toast.success("Login Success", {
        position: "top-center",
      });

      // console.log(reply);
      setAccount(reply);

      redirect("/dashboard");

      setDetail({
        ...detail,
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <div className="App">
        <NavBar />
        <div className="container p-5 d-flex justify-content-center">
          <div style={{ width: "600px" }} className="border shadow p-3 bg-light">
            <h4 className="text-center">Sign In</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={detail.email} onChange={handleInput}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={detail.password} onChange={handleInput}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <div className="text-center p-3">
              <h6>
                Don't have an account? <NavLink to="/register">SignUp</NavLink>
              </h6>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default SignIn;
