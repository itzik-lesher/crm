import React, { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalLoginNew(props) {
  const userInputRef = useRef();
  const passInputRef = useRef();

  function closeModalLoginHandler() {
    /*
    // first check if there is valid token
    let tokenString = localStorage.getItem('token');
    if (tokenString && tokenString.length > 0){
      props.setLoginUser(true);
      ///////return;
    }else{
      props.setLoginUser(true)
    }
    */
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
      body: JSON.stringify([{react_post_type: "LOGIN"},{USER: userInputRef.current},{PASSWORD: passInputRef.current}]),  
    }) 
    .then((response) => {
     //return response.json();
     return response.text();
    })
    .then((message) => {
      console.log("message =" + message)
      if ((message.toString().length > 9) && message){
      let server_token = message.slice(-10);
      //if ((message.toString().length > 100)){
          // probably its good => save in localstorage
        //if (localStorage.getItem('token') === server_token){
        // to enable closing login in App.js

        localStorage.setItem('token',server_token);
        // to enable closing login in App.js
        props.setLoginUser(true)
        return message
        //}

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
         Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col >
            Password
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
              value={passInputRef.current}
              onChange={(e) => (passInputRef.current = e.target.value)}/>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModalLoginHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLoginNew;