import { useState } from "react";
import { Button, Modal, Col, Row } from "react-bootstrap";
import fetch from "unfetch";
import TermsAndConditionsText from "./termsAndConditionsText";

// async function changePasswordHandler(passwordData) {
//     const response = await fetch("/api/auth/change-password/", {
//         method: "PATCH",
//         body: JSON.stringify(passwordData),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//
//     const data = await response.json();
//     console.log(data);
// }

// async function changeUsernameHandler(userNameData) {
//     const response = await fetch("/api/auth/change-username/", {
//         method: "PATCH",
//         body: JSON.stringify(userNameData),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//
//     const data = await response.json();
//     return data;
// }

const TermAndConditionsModal = (props) => {
  const { show, setShow } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={"h-75"}>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TermsAndConditionsText />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/*<Button variant="primary" onClick={handleClose}>*/}
          {/*    Save Changes*/}
          {/*</Button>*/}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TermAndConditionsModal;
