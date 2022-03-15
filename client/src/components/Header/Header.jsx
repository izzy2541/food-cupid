// Import React modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Import npm packages
import { Navbar, Nav, Button } from 'react-bootstrap';
import { GiCupidonArrow } from 'react-icons/gi';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { BsPersonCircle } from 'react-icons/bs'


// Custom styles

const Styles = styled.div`
  .custom-nav > * {
    margin-left : 1em;
    margin-right : 1em;
  }

  .custom-button {
    width: 80px;
  }

  .custom-button-two {
    width: 40px;
    height: 34px;
  }
`;


const P2 = styled.strong`
  font-size: 14px;
  font-weight: bold;
`;
const Header = (props) => {
  const { user, logout } = props 
  

  // Initial state
  const [colorChange, setColorChange] = useState(false);

  // Function: Change navbar transparency based on scroll height
  const changeNavbarColor = () => {
    if (window.scrollY > 20) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  }

  // Event Listener to Detect Scroll
  window.addEventListener('scroll', changeNavbarColor);

  return (
    <Styles>
      <Navbar bg={colorChange ? "danger" : "transparent"} variant="danger" fixed="top">        
        <Navbar.Brand href="/">
          <GiCupidonArrow className="mb-1" style={{color: "white"}} value={{ size: "75px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ml-auto custom-nav">
            <Link className="nav-link" to="/" style={{color:"white"}}><P2>HOME</P2></Link>
            <Link className="nav-link" to="/about" style={{color:"white"}}><P2>ABOUT</P2></Link>
            <Link className="nav-link" to="/restaurants"style={{color:"white"}}><P2>RESTAURANTS</P2></Link>
            {!user && <Nav.Item className="mt-1 mr-2">
              <Link className="btn btn-info btn-sm custom-button" to="/login"><P2>LOG IN</P2></Link>
            </Nav.Item>}
            {!user && <Nav.Item className="mt-1">
              <Link className="btn btn-info btn-sm custom-button" to="/signup"><P2>SIGN UP</P2></Link>
            </Nav.Item>}
            {user && <Nav.Item className="mt-1">
              <Link className="btn btn-sm custom-button-two" to="/dashboard" >
                <IconContext.Provider value={{ color: "#FFFFFF", size: "20px" }}>
                  <div>
                    <BsPersonCircle />
                  </div>
                </IconContext.Provider>
              </Link>
            </Nav.Item>}
            {user && <Nav.Item className="mt-1">
              <Button variant="outline-light" to="/login" onClick={() => { logout() }}><P2>LOGOUT</P2></Button>
            </Nav.Item>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  )
}


export default Header