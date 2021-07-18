import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import SuccessImg from '../resources/success.svg';
import WarningImg from '../resources/warning.svg';
import ErrorImg from '../resources/error.svg';

function Dialog(props) {
  const { type, title, content, plink, slink, ptext, stext } = props;


  var imgSrc = SuccessImg;
  if (type === 'warning') {
    imgSrc = WarningImg;
  } else if (type === 'error') {
    imgSrc = ErrorImg;
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className="text-center">
        <img src={imgSrc} width="64px" height="64px"></img>
        <p></p>
        <h3>{title}</h3>
        <p>
          {content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="row w-100">
          <div className="col-6">
            <a href={plink} className="btn btn-md btn-primary w-100">{ptext}</a>
          </div>
          <div className="col-6">
            <a href={slink} className="btn btn-md btn-secondary w-100">{stext}</a>
          </div>
        </div>
      </Modal.Footer>
    </Modal >
  );
}

export default Dialog;