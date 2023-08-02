import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/Context";
import Button from "react-bootstrap/esm/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAccountAction, logoutAccountAction } from "../redux/Actions/accountAction";

const Profile = () => {
  const { account, setAccount } = useContext(LoginContext);

  const  profile  = useSelector((state) => state.getAccountData);
  // console.log(account);

  const dispatch = useDispatch();
  const reDirect = useNavigate("");

  const logOut = async (cid) => {
    const res = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid,
      }),
    });

    const reply = await res.json();

    if (res.status === 422) {
      toast.warn("Something went wrong", {
        position: "top-center",
      });
      console.log(reply);
    } else {
      reDirect("/");
      setAccount("");
      dispatch(logoutAccountAction());
    }
  };

  useEffect(()=>{
    if(!account){
      reDirect("/login");
    }
    else{
      dispatch(loginAccountAction(account.token));
    }
  },[account,reDirect,dispatch])

  return (
    <div className="container">
      <div className="row " style={{ height: "80%" }}>
        <div className="col-sm-2">
          <div className="side-by-side">
            <Avatar
              style={{
                backgroundColor: "#1365cf",
                cursor: "pointer",
                height: "110px",
                width: "110px",
                fontSize: "50px",
              }}
              variant="square"
              id="basic-button"
            >
              {profile && profile.details ? profile.details.fname[0] : ""}
            </Avatar>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="side-by-side" style={{ fontSize: "25px" }}>
            <strong> Name : </strong>
            {profile ? profile.details.fname : ""} <br />
            <br />
            <strong> Mail : </strong>
            {profile ? profile.details.email : ""}
            <br />
            <br />
            <Button
              variant="outline-primary"
              className="col-sm-4"
              onClick={() => logOut(profile.details.cid)}
            >
              Log Out
            </Button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
