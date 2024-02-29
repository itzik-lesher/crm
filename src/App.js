import React , {useState} from "react";
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
import ModalLogin  from "./UI/ModalLogin";

const App = () => {
  const [unRegisteredUser, setUnRegisteredUser] = useState(false);
  return (
    <>

      <NavBar />
      <Button variant="primary" onClick={() => setUnRegisteredUser(true)}>
        Launch modal with grid
      </Button>

      <ModalLogin show={unRegisteredUser} onHide={() => setUnRegisteredUser(false)} />
      <UserList />;
    </>
  );
};

export default App;
