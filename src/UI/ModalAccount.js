import React, { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalAccount(props) {
  const userInputRef = useRef();
  const passPassRef = useRef();

  function closeModalAccountHandler() {
    
    // if token dosn't exit at all => register to get a token
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
      body: JSON.stringify([{react_post_type: "REGISTRATION"},{JWT_SECRET:''},{USER: userInputRef},{PASSWORD: passPassRef}]),  
    }) 
    .then((response) => {
     //return response.json();
     return response.text();
    })
    .then((message) => {
      console.log("message =" + message)
      if ((message) && (message.toString().length > 9)){
      //if ((message.toString().length > 100)){
          // probably its good => save in localstorage
        // since I use response.text() the token is the last 10 digits

        // 21-3 Don't accept and save locally token in registration - only in login
        // let token = message.slice(-10);       
        // localStorage.setItem('token',token);

        // to enable closing login in App.js
        if (message.indexOf('creadential and token saved') > 0){
            props.setAccountExists(true)
        }
        return message
      }
      else{
        alert('Credentials mistake. Please try again')
      }
    })
    .catch((error) => console.error(error));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title className="account-title">יצירת חשבון</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-filed">
            <div className="labels">
              <p className="textLarge">LOGIN</p>
              <p className="text-small">(לפחות 3 תווים)</p>
            </div>
            <input
              type="text"
              value={userInputRef.current}
              onChange={(e) => (userInputRef.current = e.target.value)}
            />
          </div>
          <div className="input-filed">
            <div className="labels second">
              <p className="textLarge">LOGIN</p>
              <p className="text-small">(לפחות 3 תווים)</p>
            </div>
            <input
              type="text"
              value={passPassRef.current}
              onChange={(e) => (passPassRef.current = e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={closeModalAccountHandler}>
            צור חשבון
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalAccount;