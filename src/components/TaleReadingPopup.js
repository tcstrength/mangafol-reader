import { Modal, Button, ButtonGroup } from "react-bootstrap";
import { ReactComponent as Arrow } from "../resources/arrow.svg";

function TaleReadingPopup(props) {
  const tale = props.tale;

  const customLink = tale.linkPattern.replace(/{+chapter}+/g, tale.chapter)

  console.log(customLink)

  const backChapter = () => {
    const e = {
      target: { value: tale.chapter - 1 },
    }

    props.onChange(e);
  }

  const nextChapter = () => {
    const e = {
      target: { value: tale.chapter + 1 },
    }

    props.onChange(e);
  }

  return (
    <Modal
      {...props}
      size="lg">
      <Modal.Body className="text-center p-1" style={{ height: "600px" }}>
        <iframe src={customLink} width="100%" height="100%" className="h-100 w-100">

        </iframe>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup aria-label="Tale Controls">
          <Button variant="secondary" onClick={backChapter}>Chương trước</Button>
          <Button variant="primary" onClick={nextChapter}>Chương sau</Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal >
  )
}

export default TaleReadingPopup;