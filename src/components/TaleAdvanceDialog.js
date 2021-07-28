import { Modal, Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";
import { mapReadingStatus, mapTaleFinished } from "../constants/Config";
import StarRatings from "react-star-ratings";
import Loading from "./Loading";
import { featured } from "../constants/Images";

/**
 * onUpdate
 * onDelete
 * @param {*} props 
 * @returns 
 */
function TaleAdvanceDialog(props) {
  const [tale, setTale] = useState({
    title: props.tale.title,
    author: props.tale.author,
    chapter: props.tale.chapter,
    readingStatus: props.tale.readingStatus,
    taleFinished: props.tale.taleFinished,
    linkPattern: props.tale.linkPattern,
    featuredImg: props.tale.featuredImg
  })

  const [fileChosen, setFileChosen] = useState('')

  const [preview, setPreview] = useState(tale.featuredImg !== null ? tale.featuredImg.viewPath : featured)

  const onFileChange = (e1) => {
    var input = e1.target

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setPreview(e.target.result)
      };

      reader.readAsDataURL(input.files[0]);
      setFileChosen(input.files[0])
    }
  }

  const finishedRadios = [false, true].map((item) => {
    const map = mapTaleFinished(item)
    return {
      name: map.text, value: item.toString(), variant: `outline-${map.variant}`
    }
  })

  const readingRadios = [0, 1, 2].map((item) => {
    const map = mapReadingStatus(item)
    return {
      name: map.text, value: item.toString(), variant: `outline-${map.variant}`
    }
  })

  return (
    <Form className="mt-3">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Body className="text-center">
          <h4>Chỉnh sửa nâng cao</h4>
          <img
            height="200"
            src={preview}
            className="rounded"
            style={{ objectFit: "cover" }}
          />
          <p className="pt-2"></p>
          <Form.Group className="mb-2" controlId="title">
            <Form.Control required type="text" placeholder="Tên truyện" value={tale.title}
              onChange={(e) => { setTale({ ...tale, title: e.target.value }) }} />
          </Form.Group>

          <Form.Group className="mb-2 d-flex" controlId="author">
            <Form.Control required style={{ marginRight: "6px" }} type="text" placeholder="Tác giả" value={tale.author}
              onChange={(e) => { setTale({ ...tale, author: e.target.value }) }} />
            <Form.Control
              style={{ marginLeft: "6px" }}
              type="number"
              size="sm"
              value={tale.chapter}
              onChange={(e) => { setTale({ ...tale, chapter: e.target.value }) }} />
          </Form.Group>

          <Form.Group className="mb-2" controlId="finished">
            <ButtonGroup className=" w-100">
              {finishedRadios.map((radio, idx) => (
                <ToggleButton
                  className="w-50 btn-sm"
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

          <Form.Group className="mb-2" controlId="readingStatus">
            <ButtonGroup className="w-100">
              {readingRadios.map((radio, idx) => (
                <ToggleButton
                  className="w-50 btn-sm"
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

          <Form.Group controlId="linkPattern" className="mb-2">
            <Form.Control required type="text" as="textarea"
              style={{ resize: "none" }} rows={2}
              placeholder="Link pattern, ví dụ: https://example.com/{{chapter}}" value={tale.linkPattern}
              onChange={(e) => { setTale({ ...tale, linkPattern: e.target.value }) }} />
          </Form.Group>

          <Form.Group controlId="featuredImg" className="d-flex btn-group">
            <Form.Control type="file" className="form-control" style={{ content: "Chọn ảnh", borderRadius: "4px 0 0 4px" }} name="image"
              accept="image/png, image/gif, image/jpeg"
              onChange={onFileChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="row w-100">
            <div className="col-3 p-0 m-0">
              <Button variant="danger" className="w-100" onClick={() => { props.onHide(); props.onDelete() }}>Xoá</Button>
            </div>
            <div className="col-6">
              <Button variant="primary" className="w-100" onClick={() => { props.onHide(); props.onUpdate(tale, fileChosen) }}>Cập nhật</Button>
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