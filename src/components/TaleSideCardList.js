import { Card } from "react-bootstrap"
import TaleCardSm from "./TaleCardSm"
function TaleSideCardList(props) {
  const list = props.list;
  const variant = props.variant;
  const title = props.title;
  const classVariant = `p-0 mb-3 border-${variant} text-${variant}`
  return (
    <>
      <Card className={classVariant}>
        <Card.Body className="text-center">
          <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>{title}</Card.Title>
        </Card.Body>
      </Card>

      {list.map((item) => {
        return <TaleCardSm tale={item} />
      })}
    </>
  )
}

export default TaleSideCardList;