import { Card, Button, Form } from "react-bootstrap";
import { TaleActions } from "../actions/ApiCalls";
import Loading from "./Loading";
import { useState } from "react";
import { throttle } from 'throttle-debounce';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Fragment } from "react";

function NewTaleBox(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const filterBy = () => true;

  const handleSearch = (query) => {
    TaleActions.searchTitle(query, 10).then((resp) => {
      const options = resp.data.content.list.map((item) => {
        return {
          title: item
        }
      })
      setOptions(options);
    })
  }

  const handleChange = (option) => {
    const e = {
      target: {
        value: option.title
      }
    }

    props.onTitleChange(e);
  }

  return (
    <Card className="p-0 mb-3">
      <Card.Body className="text-center">
        <Card.Title>Bạn có truyện mới?</Card.Title>
        <Form className="mt-3" onSubmit={(e) => { e.preventDefault(); props.onNewSubmit(e) }}>
          <Form.Group className="mb-3" controlId="title">
            {/* <Form.Control required type="text" placeholder="Tên truyện" onChange={e => { searchText(e); props.onTitleChange(e) }} /> */}
            <AsyncTypeahead
              filterBy={filterBy}
              id="async-new-tale"
              isLoading={isLoading}
              labelKey="title"
              emptyLabel="Không có gợi ý..."
              promptText="Gõ tên truyện"
              searchText="Đang tìm..."
              minLength={1}
              onChange={handleChange}
              onSearch={handleSearch}
              options={options}
              placeholder="Tên truyện mới..."
              renderMenuItemChildren={(option, props) => (
                <Fragment>
                  <span>{option.title}</span>
                </Fragment>
              )}
            />
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