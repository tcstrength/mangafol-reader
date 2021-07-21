import { Modal } from "react-bootstrap";
import Loading from "./Loading";

function LoadingDialog(props) {
  console.log(props)
  return (
    <Modal
      {...props}
      backdrop="static"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className="text-center">
        <Loading></Loading>
        <p></p>
        <h3>Đang tải dữ liệu</h3>
        <p></p>
        <a href="" className="btn btn-outline-success w-75">
          Thử lại
        </a>
      </Modal.Body>
    </Modal >
  );
}

export default LoadingDialog;