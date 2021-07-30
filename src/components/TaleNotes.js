import { ReactComponent as NotesIcon } from "../resources/notes.svg";
import { Row, Col, Card, Badge } from "react-bootstrap"
import { timeSince } from "../utils/DateUtils"
import { urlify } from "../utils/UrlUtils";
import { TaleActions } from "../actions/ApiCalls";
import { useState } from "react";

var parseHtml = require("html-react-parser");

function TaleNotes(props) {
  const [style, setStyle] = useState({ display: 'none' });
  const item = props.notes;

  return (
    <div className="d-flex align-items-center mb-3">
      <NotesIcon width="20" height="20" className="mr-3" />
      <div className="w-75"
        onMouseEnter={e => {
          console.log("WTF")
          setStyle({ display: 'inline-block' });
        }}
        onMouseLeave={e => {
          setStyle({ display: 'none' })
        }}
      >
        <p className="mb-0 text-truncate ">
          <Badge className="bg-success mr-2">Chương {item.chapter}
          </Badge>
          <div dangerouslySetInnerHTML={{ __html: urlify(item.content) }} />
        </p>
        <small className="text-muted d-flex">{timeSince(item.ct)}
          <a href="javascript:void(0)"
            style={style}
            className="pl-3"
          >
            Chỉnh sửa
          </a>
          <a href="javascript:void(0)"
            style={style}
            className="text-danger pl-3"
            onClick={() => {
              props.onNotesUpdating()
              const promise = TaleActions.delNotes(item.id);
              promise.then((resp) => {
                props.onNotesCompleted()
              })
            }}
          >
            Xoá
          </a>
        </small>
      </div>
    </div >
  )
}

export default TaleNotes;