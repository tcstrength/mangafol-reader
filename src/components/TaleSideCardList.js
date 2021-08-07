import { Card } from "react-bootstrap"
import TaleCardSm from "./TaleCardSm"
import Loading from "./Loading";
function TaleSideCardList(props) {
  const list = props.list;
  const variant = props.variant;
  const title = props.title;
  const classVariant = `p-0 mb-3 border-${variant} bg-${variant} text-light`
  const loading = (props.loading === null) ? false : props.loading;

  return (
    <>
      <Card className={classVariant}>
        <Card.Body>
          <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>{title}</Card.Title>
        </Card.Body>
      </Card>

      {loading &&
        <div className="w-100 text-center pt-2 pb-4">
          <Loading size="md" />
        </div>
      }

      {list.map((item) => {
        return <TaleCardSm tale={item} />
      })}
    </>
  )
}

export default TaleSideCardList;