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
     return response.json();
     //return response.text();
    })
    .then((message) => {
      console.log("message =" + message)
      if ((message.toString().length > 10) && (message.toString() !== "123")){
      //if ((message.toString().length > 100)){
          // probably its good => save in localstorage
        localStorage.setItem('token',message);
        // to enable closing login in App.js
        props.setAccountExists(true)
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
        <Modal.Title id="contained-modal-title-vcenter">
         Account Registration
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col >
            Account
            </Col>   
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <input type="text"
              value={userInputRef.current}
              onChange={(e) => (userInputRef.current = e.target.value)}/>
            </Col>
          </Row>
          <Row>
            <Col >
            User Name
            </Col>   
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <input type="text"
              value={passPassRef.current}
              onChange={(e) => (passPassRef.current = e.target.value)}/>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModalAccountHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAccount;