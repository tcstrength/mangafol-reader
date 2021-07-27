import { Card } from "react-bootstrap"
import TaleCardSm from "./TaleCardSm"
function TaleSideCardList(props) {
  const list = props.list;
  return (
    <>
      <Card className="p-0 mb-3 border-danger text-danger">
        <Card.Body className="text-center">
          <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>Top 10 truyện hay</Card.Title>
        </Card.Body>
      </Card>

      {list.map((item) => {
        return <TaleCardSm tale={item} />
      })}
    </>
  )
}

export default TaleSideCardList;