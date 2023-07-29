import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Menu.scss";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Navbar className="bg-dark p-0">
      <Container>
        <Navbar.Brand href="#home">
          <Link to={"/"}>
            <p className="brandmarvel">Marvel</p>
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Menu;
