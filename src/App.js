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

//import ModalAccount from "./UI/ModalAccount";
import ModalLogin  from "./UI/ModalLogin";

const App = () => {
  const [logedInUser, setLoginUser] = useState(false);
  const [accountExists, setAccountExists] =useState(false);

  useLayoutEffect(()=>{
    let tokenString = localStorage.getItem('token');
    
    if (tokenString && tokenString.length > 0){
      setLoginUser(true);
    }else{
      setLoginUser(false)
    }
    
    let accountTokenCheckPost =[];
    accountTokenCheckPost = [{react_post_type: "ACCOUNT-TOKEN-CHECK"},{clientToken: tokenString}]
    if (tokenString && tokenString.length > 0){
      accountTokenCheckPost = [{react_post_type: "ACCOUNT-TOKEN-CHECK"},{clientToken: tokenString}]
    }
    else{
      accountTokenCheckPost = [{react_post_type: "ACCOUNT-TOKEN-CHECK"},{clientToken:''}]
    }
    // check if there is an account in server

    let api_url = window.location.href;
    if (api_url.indexOf("localhost") >= 0) {
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
      body: JSON.stringify(accountTokenCheckPost)  
    }) 
    .then((response) => response.text())
    .then((data) => {
      console.log("message =" + data)
      if (data.indexOf('ENV-MISSING') > 0){
      // missing .env file
        setAccountExists(false);
        return
      }
      else if (data.indexOf('ENV-EXISTS') > 0){
        setAccountExists(true);
        return;
      }
    })
    .catch((error) => console.error(error));



  },[])
  
  const modifyRegisteredUserHandler = () =>{
    setLoginUser(true);
  }

  return (
    <>

      <NavBar />
      
      <Button variant="primary" onClick={() => setLoginUser(false)}>
        Launch modal with grid
      </Button>
      {!logedInUser ? <ModalLogin show={!logedInUser} registeredUserHandler={modifyRegisteredUserHandler} 
      setLoginUser={setLoginUser} />: null}
      {logedInUser? <UserList /> : null}
    </>
  );
};

export default App;
