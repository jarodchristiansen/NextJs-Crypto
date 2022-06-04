import { Carousel, Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

function FinanceChartModal(props) {
  // userProfiles: {headerText: 'User Profile Customization', subHeaderText: 'Wallet Tracking', description: 'This is the description text'}
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { text } = props;
  return (
    <>
      {/*<button*/}
      {/*  className={*/}
      {/*    "modal-trigger-button mb-3 rounded mx-auto w-50 border border-dark border-1 shadow"*/}
      {/*  }*/}
      {/*  onClick={handleShow}*/}
      {/*>*/}
      {/*  Learn More*/}
      {/*</button>*/}

      <span>
        <FaInfoCircle
          size={18}
          color={"black"}
          onClick={() => handleShow()}
          className={"pointer-link"}
        />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text?.modalHeader || "Modal Heading"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text?.modalBodyText() || "This is the modal description"}
          {/*<img src{text?.modalBodyImage || ''} />*/}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FinanceChartModal;
