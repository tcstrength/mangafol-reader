import { ReactComponent as NotesIcon } from "../resources/notes.svg";
import { Row, Col, Card, Badge } from "react-bootstrap"
import { timeSince } from "../utils/DateUtils"

import { TaleActions } from "../actions/ApiCalls";

function TaleNotesView(props) {
  const list = props.list;

  return (
    <>
      {list.length !== 0 &&
        <Card className="mt-3">
          <Card.Body className="px-3 pt-3 pb-0">
            {list.map((item) => {
              return (
                <div className="d-flex align-items-center mb-3">
                  <NotesIcon width="20" height="20" className="mr-3" />
                  <div>
                    <p className="mb-0">
                      <Badge className="bg-success mr-2">Chương {item.chapter}
                      </Badge>
                      {item.content}
                    </p>
                    <small className="text-muted">{timeSince(item.ct)} <a href="javascript:void(0)" className="text-danger" onClick={() => {
                      const promise = TaleActions.delNotes(item.id);
                      promise.then((resp) => {
                        props.onNotesCompleted()
                      })
                    }}>Xoá</a></small>
                  </div>
                </div>
              )
            })}
          </Card.Body>
        </Card >
      }
    </>
  )
}

export default TaleNotesView;