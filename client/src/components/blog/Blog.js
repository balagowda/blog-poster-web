import React, { useState } from "react";
import "./blog.css";
import NavBar from "../Navbar/NavBar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "react-bootstrap/Modal";
import Upload from "./Upload";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Blog = () => {
  /*     total handler    */
  const [total, setTotal] = useState("");
  console.log(total);

  const handleTotal = (data) => {
    setTotal((prev) => [...prev, data]);
  };

  /* blog form handling */
  const [des, setDes] = useState({ id: "main", title: "", description: "" });

  const handleChanging = (e) => {
    const { name, value } = e.target;

    setDes((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleBlog = async (e) => {
    e.preventDefault();
    await handleTotal(des);

    const formData = new FormData();
    //formData.append("imageFile", imageFile); 

    // You can add more data to the FormData object if needed
    formData.append("total", JSON.stringify(total));

    const res = await fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:  JSON.stringify(total),
    });

    setDes((prev) => {
      return {
        ...prev,
        title: "",
        description: "",
      };
    });
  };

  /*     menu handling    */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /*   model handling   */
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  const popUp1 = () => {
    handleClose();
    setModalShow1(true);
  };

  const popUp2 = () => {
    handleClose();
    setModalShow2(true);
  };

  function MyVerticallyCenteredModal1(props) {
    const [desc, setDesc] = useState({ id: "descrip", desc: "" });
    const { total } = props;
    // console.log(total);

    const handleChange = (e) => {
      const { name, value } = e.target;

      setDesc((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      total(desc);
      setDesc((prev) => {
        return {
          ...prev,
          desc: "",
        };
      });

      setModalShow1(false);
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        <Modal.Body>
          <h4>Enter your description.</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={8}
                value={desc.desc}
                name="desc"
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        <Modal.Body>
          <Upload total={handleTotal} model={setModalShow2}/>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="blog-container overflow-auto">
      <NavBar />

      <div className="row mx-auto m-2">
        <div className="left col-3">
          <div className="container-1 shadow bg-light ">
            <h5 className="text-center p-2 border-bottom">Add new item</h5>
            <div className="text-center mx-auto">
              <Button
                className="add-button mt-4"
                id="add-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Add
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "add-button",
                }}
              >
                <MenuItem onClick={popUp1}>Text</MenuItem>
                <MenuItem onClick={popUp2}>Image/video</MenuItem>
              </Menu>

              <MyVerticallyCenteredModal1
                show={modalShow1}
                onHide={() => setModalShow1(false)}
                total={handleTotal}
              />

              <MyVerticallyCenteredModal2
                show={modalShow2}
                onHide={() => setModalShow2(false)}
              />
            </div>
          </div>
        </div>
        <div className="right col-9">
          <div className="container-2 shadow bg-light overflow-auto">
            <h5 className="text-center p-2">Enter the details of blog</h5>
            <Form
              onSubmit={handleBlog}
              style={{ width: "90%" }}
              className="mx-auto "
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title of blog"
                  value={des.title}
                  required
                  onChange={handleChanging}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={des.description}
                  name="description"
                  onChange={handleChanging}
                />
              </Form.Group>

              {total ? (
                <>
                  {total.map((item) => (
                    <>
                      {item.id === "main" ? (
                        ""
                      ) : (
                        <div
                          className="p-2 mb-2"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "white",
                          }}
                        >
                          {item.id === "descrip" ? (
                            <div>
                              <p>{item.desc}</p>
                            </div>
                          ) : (
                            <div>
                              <h6>{item.title}</h6>
                              <p>Image</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ))}
                </>
              ) : (
                ""
              )}
              <br />
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                Create
              </Button>
            </Form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
