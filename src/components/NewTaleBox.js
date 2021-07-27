import { Card, Button, Form } from "react-bootstrap";
import { TaleActions } from "../actions/ApiCalls";
import Loading from "./Loading";

function NewTaleBox(props) {
  return (
    <Card className="p-0 mb-3">
      <Card.Body className="text-center">
        <Card.Title>Bạn có truyện mới?</Card.Title>
        <Form className="mt-3" onSubmit={(e) => { e.preventDefault(); props.onNewSubmit(e) }}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control required type="text" placeholder="Tên truyện" onChange={props.onTitleChange} />
          </Form.Group>
          <hr></hr>
          <Button variant="outline-primary" className="w-100" type="submit">
            {
              props.loading &&
              <Loading size="sm" />
            }
            {' '}
            Thêm truyện mới
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default NewTaleBox;