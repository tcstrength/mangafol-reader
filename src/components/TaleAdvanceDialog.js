import { Modal, Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";
import StarRatings from "react-star-ratings";

/**
 * onUpdate
 * onDelete
 * @param {*} props 
 * @returns 
 */
function TaleAdvanceDialog(props) {
  const [tale, setTale] = useState(props.tale)

  const finishedRadios = [
    { name: 'Đang tiến hành', value: 'false', variant: 'outline-primary' },
    { name: 'Hoàn thành', value: 'true', variant: 'outline-secondary' },
  ];

  const readingRadios = [
    { name: 'Chưa đọc', value: '0', variant: 'outline-danger' },
    { name: 'Đang đọc', value: '1', variant: 'outline-success' },
    { name: 'Đã đọc xong', value: '2', variant: 'outline-secondary' },
  ]

  return (
    <Form className="mt-3">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Body className="text-center">
          <h4>Chỉnh sửa nâng cao</h4>
          <p className="pt-2"></p>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control required type="text" placeholder="Tên truyện" value={tale.title}
              onChange={(e) => { setTale({ ...tale, title: e.target.value }) }} />
          </Form.Group>

          <Form.Group className="mb-3 d-flex" controlId="author">
            <Form.Control required style={{ marginRight: "6px" }} type="text" placeholder="Tác giả" value={tale.author}
              onChange={(e) => { setTale({ ...tale, author: e.target.value }) }} />
            <Form.Control
              style={{ marginLeft: "6px" }}
              type="number"
              size="sm"
              value={tale.chapter}
              onChange={(e) => { setTale({ ...tale, chapter: e.target.value }) }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="finished">
            <ButtonGroup className="mb-2 w-100">
              {finishedRadios.map((radio, idx) => (
                <ToggleButton
                  className="w-50"
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={radio.variant}
                  name="radio"
                  value={radio.value}
                  checked={radio.value === tale.taleFinished.toString()}
                  onChange={(e) => { setTale({ ...tale, taleFinished: e.target.value === 'true' }) }}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="readingStatus">
            <ButtonGroup className="w-100">
              {readingRadios.map((radio, idx) => (
                <ToggleButton
                  className="w-50"
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={radio.variant}
                  name="radio"
                  value={radio.value}
                  checked={radio.value === tale.readingStatus.toString()}
                  onChange={(e) => { setTale({ ...tale, readingStatus: e.target.value }) }}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>

          <Form.Group controlId="linkPattern">
            <Form.Control required type="text" as="textarea"
              style={{ resize: "none" }} rows={2}
              placeholder="Link pattern, ví dụ: https://example.com/{{chapter}}" value={tale.linkPattern}
              onChange={(e) => { setTale({ ...tale, linkPattern: e.target.value }) }} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="row w-100">
            <div className="col-3 p-0 m-0">
              <Button variant="danger" className="w-100" onClick={() => { props.onHide(); props.onDelete() }}>Xoá</Button>
            </div>
            <div className="col-6">
              <Button variant="primary" className="w-100" onClick={() => { props.onHide(); props.onUpdate(tale) }}>Cập nhật</Button>
            </div>
            <div className="col-3 p-0 m-0">
              <Button variant="secondary" className="w-100" onClick={props.onHide}>Xem lại</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal >
    </Form >
  );
}

export default TaleAdvanceDialog;