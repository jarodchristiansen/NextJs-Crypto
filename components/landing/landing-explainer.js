import classes from "./landing-explainer.module.css";
import { Carousel, Modal, Button } from "react-bootstrap";
import { useState } from "react";

function LandingExplainer(props) {
  // userProfiles: {headerText: 'User Profile Customization', subHeaderText: 'Wallet Tracking', description: 'This is the description text'}
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { text } = props;
  return (
    <div>
      <div className="card text-center mb-3 border border-dark border-1 rounded shadow">
        <div className="card-body">
          <h5 className="card-title">{text?.headerText || "Card Title"}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {text?.subHeaderText || "Card subtitle"}
          </h6>
          <hr className={"bg-dark"} />
          <p className="card-text">
            {text?.description ||
              "            Some quick example text to build on the card title and make up the\n" +
                "            bulk of the card's content."}
          </p>
        </div>
        <button
          className={
            "modal-trigger-button btn btn-primary mb-3 rounded mx-auto w-50 border border-dark border-1 shadow"
          }
          onClick={handleShow}
        >
          Learn More
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{text?.modalHeader || "Modal Heading"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {text?.modalBodyText || "This is the modal description"}
            {/*<img src{text?.modalBodyImage || ''} />*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default LandingExplainer;
