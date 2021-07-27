import { Modal, Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import StarRatings from "react-star-ratings";

function TaleAdvanceDialog(props) {
  const { tale } = props;

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
              onChange={props.onTitleChange} />
          </Form.Group>

          <Form.Group className="mb-3 d-flex" controlId="author">
            <Form.Control required style={{ marginRight: "6px" }} type="text" placeholder="Tác giả" value={tale.author}
              onChange={props.onAuthorChange} />
            <Form.Control
              style={{ marginLeft: "6px" }}
              type="number"
              size="sm"
              value={tale.chapter}
              onChange={props.onChapterChange} />
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
                  onChange={props.onFinishedChange}
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
                  onChange={props.onReadingStatusChange}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="linkPattern">
            <Form.Control required type="text" as="textarea"
              style={{ resize: "none" }} rows={2}
              placeholder="Ví dụ: https://example.com/{{chapter}}" value={tale.linkPattern}
              onChange={props.onLinkPatternChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="featuredImg">
            <Form.Control type="file" className="form-control" style={{ content: "Chọn ảnh" }} name="image"
              accept="image/png, image/gif, image/jpeg"
              onChange={props.onFileChange} />
          </Form.Group>

          <StarRatings
            rating={tale.rating}
            starDimension="28px"
            starRatedColor="#fcc603"
            changeRating={props.onRatingChange}
            numberOfStars={10}
            starHoverColor="#fcc603"
            name='rating'
          />
          <p></p>
          <Form.Group controlId="review">
            <Form.Control as="textarea" style={{ resize: "none" }} rows={3} placeholder="Mô tả về bộ truyện này" value={tale.description}
              onChange={props.onDescriptionChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="row w-100">
            <div className="col-3 p-0 m-0">
              <Button variant="danger" className="w-100" onClick={() => { props.onHide(); props.onDelete() }}>Xoá</Button>
            </div>
            <div className="col-6">
              <Button variant="primary" className="w-100" onClick={() => { props.onHide(); props.onUpdate() }}>Cập nhật</Button>
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