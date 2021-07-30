import TaleCard from "./TaleCard";
import { Row, Col, Card } from "react-bootstrap"
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
        <Card.Body className="text-center">
          <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>{title}</Card.Title>
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