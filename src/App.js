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
import ModalAccount from "./UI/ModalAccount";

const App = () => {
  const [logedInUser, setLoginUser] = useState(false);
  const [accountExists, setAccountExists] =useState(false);

  useLayoutEffect(()=>{
    let tokenString = localStorage.getItem('token');
    
    if (tokenString && tokenString.length > 9){
      setLoginUser(false);
    }else{
      setAccountExists(true)
    }
    
    let accountTokenCheckPost =[];
    accountTokenCheckPost = [{react_post_type: "ACCOUNT-TOKEN-CHECK"},{clientToken: tokenString}]
    if (tokenString && tokenString.length > 9){
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
      if (data.indexOf('REGISTRATION-MODAL') > 0){
      // missing .env file
        setAccountExists(false);
        setLoginUser(false);
        return
      }
      else if (data.indexOf('LOGIN-MODAL') > 0){
        setAccountExists(true);
        setLoginUser(false);
        return;
      }
      else if (data.indexOf('TOKEN-OK') > 0){
        setAccountExists(true);
        setLoginUser(true);
        return
      }
    })
    .catch((error) => console.error(error));



  },[])
  
  const loginUserHandler = () =>{
    setLoginUser(true);
  }

  const loginModalAccountHandler = () =>{
    setAccountExists(true);
  }
/*
   {!logedInUser ? <ModalLogin show={!logedInUser} loginUserHandler={loginUserHandler} 
      setLoginUser={setLoginUser} />: null}
      {logedInUser? <UserList /> : null}
*/
  let final_disply = null;
  if ( accountExists && logedInUser) {
    final_disply = <UserList />
  }
  else if ( accountExists && !logedInUser) {
    final_disply = <ModalLogin show={!logedInUser} loginUserHandler={loginUserHandler} 
    setLoginUser={setLoginUser} setAccountExists={setAccountExists} />
  }
  else if ( !accountExists) {
    final_disply = <ModalAccount show={!logedInUser} loginModalAccountHandler={loginModalAccountHandler} 
    setAccountExists={setAccountExists} setLoginUser={setLoginUser}/>
  }
  return (
    <>

      <NavBar />
      
      <Button variant="primary" onClick={() => setLoginUser(false)}>
        Launch modal with grid
      </Button>
      {final_disply}
    </>
  );
};

export default App;
