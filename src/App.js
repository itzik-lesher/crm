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
  const [accountInServerExists, setAccountInServerExists] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(false);


  useLayoutEffect(()=>{
    let tokenString = localStorage.getItem('token');
    /*if (tokenString && tokenString.length > 0){
      setRegisteredUser(true);
    }else{
      setRegisteredUser(false)
    }*/
    // check token in server

    // Check in server if there is an account and if kukie OK

    //if (tokenString && tokenString.length > 0){
      // if token dosn't exit at all => register to get a token
      let api_url = window.location.href;

      if (api_url.indexOf("localhost") >= 0) {
        // means localhost
        ///api_url = "http://localhost/lp/lp-develop/api/api.php";
        api_url = "http://localhost/lp/lp-develop/crm/api/api.php";
      } else {
        // production(the slice works like ../../../api.php)
        //////api_url = api_url.slice(0, -17) + "/api/api.php";
        //api_url = api_url.slice(0, -11) + "/api/api.php";
        api_url = api_url.slice(0, -11) + "/crm/api/api.php";
      }
      fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{react_post_type: "ENV-STATUS"}]),  
      }) 
      .then((response) => {
      return response.json();
      })
      .then((message) => {
        console.log("message =" + message)
        if ((message.toString().length > 10) && (message.toString() !== "123")){
        //if ((message.toString().length > 100)){
            // probably its good => save in localstorage
          localStorage.setItem('token',message);
          // to enable closing login in App.js
          //props.setRegisteredUser(true)
          return message
        }
        else{
          alert('Credentials mistake. Please try again')
        }
      })
      .catch((error) => console.error(error));
    


    
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
