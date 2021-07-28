import { Modal, Button } from "react-bootstrap";
import SuccessImg from '../resources/success.svg';
import WarningImg from '../resources/warning.svg';
import ErrorImg from '../resources/error.svg';

function Dialog(props) {
  const { type, title, content, plink, slink, ptext, stext } = props;

  var imgSrc = SuccessImg;
  var pVariant = "primary";
  var sVariant = "secondary";

  if (type === 'warning') {
    imgSrc = WarningImg;
    pVariant = "warning";
    sVariant = "primary";
  } else if (type === 'error') {
    imgSrc = ErrorImg;
    pVariant = "success";
    sVariant = "primary";
  }

  var sbtn = <a href={slink} className={`btn btn btn-${sVariant} w-100`}>{stext}</a>
  var pbtn = <a href={plink} className={`btn btn btn-${pVariant} w-100`}>{ptext}</a>

  if (plink === '') {
    pbtn = <Button variant={pVariant} className="w-100" onClick={props.onHide}>{ptext}</Button>
  }

  if (slink === '') {
    sbtn = <Button variant={sVariant} className="w-100" onClick={props.onHide}>{stext}</Button>
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className="text-center">
        <img alt="" src={imgSrc} width="64px" height="64px"></img>
        <p></p>
        <h3>{title}</h3>
        <p>
          {content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="row w-100">
          <div className="col-6">
            {pbtn}
          </div>
          <div className="col-6">
            {sbtn}
          </div>
        </div>
      </Modal.Footer>
    </Modal >
  );
}

export default Dialog;