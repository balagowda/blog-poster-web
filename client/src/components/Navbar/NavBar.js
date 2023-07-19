import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LoginContext } from '../context/Context';
import Avatar from "@mui/material/Avatar";

const NavBar = () => {

  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  useEffect(()=>{
    setAccount(account);
  },[account,setAccount]);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">blog<span style={{color:'yellow'}}>Poster</span></Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            {account ? (
            <Avatar
              style={{backgroundColor:"#1365cf",cursor:'pointer'}}
              title={account.message.fname}
              id="basic-button"
            >
              {account.message.fname[0]}
            </Avatar>
          ) : (
            <Avatar className="avtar" style={{cursor:"pointer"}}/>
          )}
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar
