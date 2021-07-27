import { Button, Form, Modal } from "react-bootstrap";
import { featured } from "../constants/Images";
import { useState } from "react";
import Loading from "./Loading";

/**
 * props.onFileChange(e) when user choose file
 * props.onUploadClick(e) when user click upload button
 * @param {*} props 
 * @returns 
 */
function TaleUploadDialog(props) {
  const [preview, setPreview] = useState(featured)

  const onFileChange = (e1) => {
    var input = e1.target

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setPreview(e.target.result)
      };

      reader.readAsDataURL(input.files[0]);
      props.onFileChange(e1);
    }
  }

  const uploading = props.uploadStatus === 'uploading'
  var uploadBtn = <Button className="w-50" onClick={props.onUploadClick}>{uploading && <Loading />} {' '} Tải lên</Button>

  if (props.uploadStatus === "success") {
    uploadBtn = <Button variant="success" className="w-50" onClick={props.onHide}>Đóng</Button>
  } else if (props.uploadStatus === "error") {
    uploadBtn = <Button variant="danger" className="w-50">Thất bại</Button>
  }

  return (
    <Form>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <img
          height="300"
          src={preview}
          style={{ objectFit: "cover", borderRadius: "4px 4px 0 0" }}
        />
        <Modal.Body className="text-center">
          <Form.Group controlId="featuredImg" className="d-flex btn-group">
            <Form.Control type="file" className="form-control" style={{ content: "Chọn ảnh", borderRadius: "4px 0 0 4px" }} name="image"
              accept="image/png, image/gif, image/jpeg"
              onChange={onFileChange} />
            {uploadBtn}
          </Form.Group>
        </Modal.Body>
      </Modal>
    </Form >
  )
}

export default TaleUploadDialog;