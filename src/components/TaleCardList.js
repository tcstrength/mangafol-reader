import TaleCard from "./TaleCard";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap"
import Loading from "./Loading";

function TaleCardList(props) {
  const list = props.list;
  const variant = props.variant;
  const title = props.title;
  const bg = (props.bg === null) ? "" : "bg-" + props.bg;
  const classVariant = `p-0 mb-3 border-${variant} text-${variant} ${bg}`
  const loading = (props.loading === null) ? false : props.loading;

  return (
    <>
      <Card className={classVariant}>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>{title}</Card.Title>
            </Col>
            <Col md={8} className="text-end">
              {/* <ButtonGroup aria-label="Tale Controls">
                <Button className="p-0 m-0 px-2 py-1" variant="success">Đang theo dõi</Button>
                <Button className="p-0 m-0 px-2 py-1" variant="primary">Đọc xong</Button>
                <Button className="p-0 m-0 px-2 py-1" variant="danger">Ngưng theo dõi</Button>
              </ButtonGroup> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {loading &&
        <div className="w-100 text-center">
          <Loading size="md" />
        </div>
      }
      <Row style={{ minHeight: "25%" }}>
        {list.map((item) => {
          return <Col md={4}><TaleCard tale={item} /></Col>
        })}
      </Row>
    </>
  )
}

export default TaleCardList;