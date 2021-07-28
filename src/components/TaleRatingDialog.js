import { Modal, Button, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { useState } from "react";
/**
 * props.onHide hide modal dialog
 * props.onRatingAccept user click accept current rating values
 * @param {*} props 
 * @returns 
 */
function TaleRatingDialog(props) {
  const [tale, setTale] = useState({
    title: props.tale.title,
    shortDesc: props.tale.shortDesc,
    rating: props.tale.rating
  })

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body className="text-center">
        <h4>Đánh giá <strong>{tale.title}</strong></h4>
        <StarRatings
          rating={tale.rating}
          starDimension="28px"
          starRatedColor="#fcc603"
          changeRating={(rating, name) => setTale({ ...tale, rating: rating })}
          numberOfStars={10}
          starHoverColor="#fcc603"
          name='rating'
        />
        <p></p>
        <Form.Group controlId="review">
          <Form.Control as="textarea" style={{ resize: "none" }} rows={3} placeholder="Mô tả về bộ truyện này" value={tale.shortDesc}
            onChange={(e) => setTale({ ...tale, shortDesc: e.target.value })} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div className="row w-100">
          <div className="col-6" style={{ paddingLeft: 0 }}>
            <Button variant="primary" className="w-100" onClick={() => { props.onRatingAccept(tale); props.onHide() }}>Đánh giá</Button>
          </div>
          <div className="col-6" style={{ paddingRight: 0 }}>
            <Button variant="secondary" className="w-100" onClick={props.onHide}>Bỏ qua</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal >
  );
}

export default TaleRatingDialog;