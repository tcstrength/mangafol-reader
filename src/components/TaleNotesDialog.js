import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { TaleActions } from "../actions/ApiCalls"

function TaleNotesDialog(props) {
  const { tale } = props;

  const [notes, setNotes] = useState({
    taleId: tale.id,
    chapter: tale.chapter,
    content: ""
  })

  const postNotes = () => {
    console.log(notes)
    const promise = TaleActions.addNotes(notes)
    promise.then((resp) => {
      console.log(resp.data.content)
      props.onNotesCompleted();
    }).catch((resp) => {
      console.log(resp.data)
    })
    props.onHide()
  }

  const onNotesChange = (e) => {
    setNotes({
      ...notes,
      content: e.target.value
    })
  }

  const onChapterChange = (e) => {
    setNotes({
      ...notes,
      chapter: e.target.value
    })
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className="text-center">
        <h4>Ghi chú <strong>{tale.title}</strong></h4>
        <p></p>
        <Form.Group controlId="chapter" className="mb-3 d-flex">
          <Form.Label className="my-auto mr-3">Chương muốn ghi chú:</Form.Label>
          <Form.Control
            type="number"
            size="sm"
            style={{ width: "80px", marginRight: "10px" }}
            value={notes.chapter}
            onChange={onChapterChange} />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Control required as="textarea" style={{ resize: "none" }} rows={3} placeholder="Ghi chú" value={notes.content}
            onChange={onNotesChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div className="row w-100">
          <div className="col-6" style={{ paddingLeft: 0 }}>
            <Button type="submit" variant="success" className="w-100" onClick={postNotes}>Lưu ghi chú</Button>
          </div>
          <div className="col-6" style={{ paddingRight: 0 }}>
            <Button variant="secondary" className="w-100" onClick={props.onHide}>Bỏ qua</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal >
  );
}

export default TaleNotesDialog;