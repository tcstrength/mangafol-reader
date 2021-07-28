import TaleCard from "./TaleCard";
import { Row, Col } from "react-bootstrap"

function TaleCardList(props) {
  const list = props.list;
  return (
    <Row>
      {list.map((item) => {
        return <Col md={4}><TaleCard tale={item} /></Col>
      })}
    </Row>
  )
}

export default TaleCardList;