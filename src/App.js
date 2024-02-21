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
  const [modalLoginShow, setModaLoginShow] = useState(false);
  return (
    <>

      <NavBar />
      <Button variant="primary" onClick={() => setModaLoginShow(true)}>
        Launch modal with grid
      </Button>

      <ModalLogin show={modalLoginShow} onHide={() => setModaLoginShow(false)} />
      <UserList />;
    </>
  );
};

export default App;
