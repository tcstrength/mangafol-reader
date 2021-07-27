import { ReactComponent as NotesIcon } from "../resources/notes.svg";
import { Row, Col, Card, Badge } from "react-bootstrap"
import { timeSince } from "../utils/DateUtils"
import { TaleActions } from "../actions/ApiCalls";
import TaleNotes from "./TaleNotes";

function TaleNotesView(props) {
  const list = props.list;

  return (
    <>
      {list.length !== 0 &&
        <Card className="mt-3">
          <Card.Body className="px-3 pt-3 pb-0">
            {list.map((item) => {
              return <TaleNotes {...props} notes={item} />
            })}
          </Card.Body>
        </Card >
      }
    </>
  )
}

export default TaleNotesView;