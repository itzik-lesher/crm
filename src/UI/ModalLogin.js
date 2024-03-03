import React, { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalLogin(props) {
  const userInputRef = useRef();
  const passInputRef = useRef();

  function closeModalAccountHandler() {
    // first check if there is valid token
    let tokenString = localStorage.getItem('token');
    if (tokenString && tokenString.length > 0){
      props.setRegisteredUser(true);
      return;
    }else{
      props.setRegisteredUser(true)
    }
    // if not register to get a token
    fetch("api_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{react_post_type: "TOKENREQUEST"}]),  
    }) 
    .then((response) => {
     return response.text();
    })
    .then((message) => {
      console.log("message =" + message)
      return message
    })
    .catch((error) => console.error(error));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Dashboard
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
        <Button onClick={closeModalAccountHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLogin;