import { ReactComponent as NotesIcon } from "../resources/notes.svg";
import { Row, Col, Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import { timeSince } from "../utils/DateUtils"
import { urlify } from "../utils/UrlUtils";
import { TaleActions } from "../actions/ApiCalls";
import { useState } from "react";

function TaleNotes(props) {
  const [style, setStyle] = useState({ display: 'none' });
  const item = props.notes;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {item.content}
    </Tooltip>
  );

  return (
    <div className="d-flex align-items-center mb-3">
      <NotesIcon width="20" height="20" className="mr-3" />
      <div className="w-75"
        onMouseEnter={e => {
          setStyle({ display: 'inline-block' });
        }}
        onMouseLeave={e => {
          setStyle({ display: 'none' })
        }}
      >
        <p className="mb-0 text-truncate ">
          <Badge className="bg-success mr-2">Chương {item.chapter}
          </Badge>
          <OverlayTrigger
            placement="top"
            delay={{ show: 300 }}
            overlay={renderTooltip}
          >
            <span dangerouslySetInnerHTML={{ __html: urlify(item.content) }} />
          </OverlayTrigger>
        </p>
        <small className="text-muted d-flex">{timeSince(item.ct)}
          {/* <a href="javascript:void(0)"
            style={style}
            className="pl-3"
          >
            Chỉnh sửa
          </a> */}
          {
            (item.id !== undefined && item.id !== null) &&
            <a href="javascript:void(0)"
              style={style}
              className="text-danger pl-2"
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
          }

        </small>
      </div>
    </div >
  )
}

export default TaleNotes;