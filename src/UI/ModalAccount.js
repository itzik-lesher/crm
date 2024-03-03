import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalLogin(props) {
  return (
    <Modal
    show={show}
    //onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
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
          value={passInputRef.current}
          onChange={(e) => (passInputRef.current = e.target.value)}
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="warning" onClick={handleClose}>
        צור חשבון
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default ModalLogin;