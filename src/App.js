import React from "react";
import {
  Button,
  Alert,
  Accordion,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import UserList from "./components/UserList";

import "./App.css";
import NavBar from "./UI/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      test
      <UserList />;
    </>
  );
};

export default App;
