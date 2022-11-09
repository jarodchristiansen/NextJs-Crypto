import React, { useState } from "react";
import styled from "styled-components";
import { Carousel, Modal, Button } from "react-bootstrap";

const InfoCard = ({ headerText, bodyText }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <InfoCardContainer>
        <div className="info-card-header">
          <span className="heading-text">{headerText}</span>
        </div>

        <div className="info-card-body">
          <span className="body-text">{bodyText}</span>
        </div>
      </InfoCardContainer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{text?.modalHeader || "Modal Heading"}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {/* <div className={"card-text text-center my-2"}>
            <span>
              <b>{text?.modalBodyText || "This is the modal description"}</b>
            </span>
          </div>

          <img
            src={text?.modalBodyImage || "../vercel.svg"}
            alt={text?.modalBodyText || "This is the modal description"}
            width="450"
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const InfoCardContainer = styled.div`
  animation: "fade-in";
  border-radius: 17px;
  border: 2px solid gray;
  padding: 2rem 2rem;
  margin: 2rem;
  box-shadow: 2px 4px 8px lightgray;
  min-width: 18rem;

  .info-card-header {
    border-bottom: 2px solid lightgray;
    text-align: center;
    padding: 1rem 0;
  }

  .info-card-body {
    text-align: center;
    padding: 1rem 0;
  }
`;

export default InfoCard;
