import { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Store, UserActions } from "../actions/ApiCalls";
import { useState } from "react";
import Loading from "./Loading";

function FeedbackDialog(props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const sendFeedback = () => {
    const body = {
      content: content
    }

    UserActions.feedback(body).then((resp) => {
      props.onHide();
      setLoading(false);
      setContent("");
    }).catch((resp) => {
      props.onHide();
      setLoading(false);
      setContent("");
    })
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body>
        <h4>Gửi góp ý</h4>
        <p></p>
        <p>Chúng tôi rất vui với bất kì góp ý nào của <strong>{Store.userProfile.firstName}</strong>, những góp ý của <strong>{Store.userProfile.firstName}</strong> sẽ giúp cải thiện rất nhiều</p>
        <p></p>
        <p>Liên hệ: tccuong1404@gmail.com</p>
        <p></p>
        <Form.Group controlId="review">
          <Form.Control autofocus as="textarea" style={{ resize: "none" }} rows={3} placeholder="Nội dung" value={content}
            onChange={e => setContent(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div className="row w-100">
          <div className="col-6" style={{ paddingLeft: 0 }}>
            <Button variant="primary" className="w-100" onClick={e => { sendFeedback(); setLoading(true); }}>
              {loading && <Loading />}
              {' '} Gửi góp ý</Button>
          </div>
          <div className="col-6" style={{ paddingRight: 0 }}>
            <Button variant="secondary" className="w-100" onClick={props.onHide}>Bỏ qua</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal >
  );
}

export default FeedbackDialog;