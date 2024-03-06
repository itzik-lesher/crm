import React , {useState, useLayoutEffect} from "react";
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
  const [registeredUser, setRegisteredUser] = useState(false);

  useLayoutEffect(()=>{
    let tokenString = localStorage.getItem('token');
    if (tokenString && tokenString.length > 0){
      setRegisteredUser(true);
    }else{
      setRegisteredUser(false)
    }
  },[])
  
  const modifyRegisteredUserHandler = () =>{
    setRegisteredUser(true);
  }

  return (
    <>

      <NavBar />
      
      <Button variant="primary" onClick={() => setRegisteredUser(false)}>
        Launch modal with grid
      </Button>
      {!registeredUser ? <ModalLogin show={!registeredUser} registeredUserHandler={modifyRegisteredUserHandler} 
      setRegisteredUser={setRegisteredUser} />: null}
      {registeredUser? <UserList /> : null}
    </>
  );
};

export default App;
