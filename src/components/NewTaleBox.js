import { Card, Button, Form } from "react-bootstrap";
import { TaleActions } from "../actions/ApiCalls";
import Loading from "./Loading";
import { throttle } from 'throttle-debounce';

function NewTaleBox(props) {
  const searchText = throttle(250, false, (e) => {
    const text = e.target.value;
    // console.log("Search")
    // TaleActions.external(text).then((resp) => {
    //   console.log(resp.data.content)
    // })
  });

  return (
    <Card className="p-0 mb-3">
      <Card.Body className="text-center">
        <Card.Title>Bạn có truyện mới?</Card.Title>
        <Form className="mt-3" onSubmit={(e) => { e.preventDefault(); props.onNewSubmit(e) }}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control required type="text" placeholder="Tên truyện" onChange={e => { searchText(e); props.onTitleChange(e) }} />
          </Form.Group>
          <hr></hr>
          <Button variant="primary" className="w-100" type="submit">
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