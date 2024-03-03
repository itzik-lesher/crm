import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAccount() {
  const [show, setShow] = useState(true);
  const userInputRef = useRef();
  const passInputRef = useRef();
  const [accountData, setAcountData] = useState({
	ACCOUNT:'',
    USER:'',
    PASWORD:''
  });
  const dataFetchedRef = useRef(0);

  const handleClose = (e) => {
    e.preventDefault();
    console.log("console");
    console.log("user = " + userInputRef.current);
    setAcountData({
	  ACCOUNT:'account',
      USER: userInputRef.current,
      PASWORD: passInputRef.current
    })
    dataFetchedRef.current = 2;
    setShow(false);
  };

  useEffect(() => {
    if (dataFetchedRef.current < 2) {
      dataFetchedRef.current--;
      return;
    }
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
      body: JSON.stringify(accountData),  
    }) 
    .then((response) => {
     return response.text();
    })
    .then((message) => {
      console.log("message =" + message)
      return message
    })
    .catch((error) => console.error(error));
    
  }, [accountData])

  //const handleShow = () => setShow(true);

  return (
    <>
      {/*} <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
  </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
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
    </>
  );
}

export default ModalAccount;
