import { Badge, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap"
import { featured } from "../constants/Images";
import { mapReadingStatus } from "../constants/Config";
import AuthorIcon from "../resources/author.svg";
import FinishedIcon from "../resources/finished.svg";
import FlagIcon from "../resources/flag.svg";
import BookIcon from "../resources/book.svg";
import PlayIcon from "../resources/play.svg";
import RatingIcon from "../resources/rating.svg";
import Dialog from "./Dialog";
import { ReactComponent as RatingIcon2 } from "../resources/rating.svg";
import { ReactComponent as SendIcon } from "../resources/send.svg";
import { ReactComponent as NotesIcon } from "../resources/notes.svg";
import { ReactComponent as ShareIcon } from "../resources/share.svg";
import Loading from "./Loading";
import { timeSince } from "../utils/DateUtils";
import { useState } from "react";

function TaleDetailsView(props) {
  const tale = props.tale;
  const pt = "pt-3";

  const [showLinkGuid, setShowLinkGuid] = useState(false)

  const transferDescription = (description) => {
    if (description === '') {
      return 'Không có mô tả'
    }

    return description;
  }

  const transferFeaturedImg = (featuredImg) => {
    if (featuredImg === null) {
      return featured;
    }

    return featuredImg.viewPath;
  }

  const renderItem = (head, icon, content) => {
    if (content === null || content === '') {
      content = 'Chưa cập nhật';
    }

    return (
      <li className={pt} key={head}>
        <img alt="" src={icon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">{head}:</b>
        <span className="align-middle">{content}</span>
      </li>
    )
  }

  const renderReadingStatus = (readingStatus) => {
    var map = mapReadingStatus(readingStatus)
    var badge = <Badge className={`bg-${map.variant} rounded-pill align-middle`}>{map.text}</Badge>;

    return (
      <li className={`${pt} align-middle`} key="status">
        <img alt="" src={FlagIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Tình trạng đọc:</b>
        {badge}
      </li>
    )
  }

  const renderStatus = (finished) => {
    var badge = <Badge className="bg-primary rounded-pill align-middle">Đang tiến hành</Badge>;

    if (finished) {
      badge = <Badge className="bg-success rounded-pill align-middle">Hoàn thành</Badge>;
    }

    return (
      <li className={`${pt} align-middle`} key="finished">
        <img alt="" src={FinishedIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Tình trạng truyện:</b>
        {badge}
      </li>
    )
  }

  const renderRating = (rating) => {
    var badge = <Badge className="bg-secondary rounded-pill align-middle">Chưa đánh giá</Badge>
    var text = `${rating}/10`;

    if (rating >= 7) {
      badge = <Badge className="bg-success rounded-pill align-middle">{text}</Badge>
    } else if (rating >= 5) {
      badge = <Badge className="bg-warning rounded-pill align-middle">{text}</Badge>
    } else if (rating >= 0) {
      badge = <Badge className="bg-danger rounded-pill align-middle">{text}</Badge>
    }

    return (
      <li className={pt} key="rating">
        <img alt="" src={RatingIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Đánh giá:</b>
        {badge}
      </li>
    )
  }

  const renderChapter = (chapter) => {
    return (
      <li className={`${pt} d-flex align-items-center`} key="chapter">
        <img alt="" src={PlayIcon} width="20" />
        <b className="mx-1">Chương:</b>
        <Form.Control
          type="number"
          size="sm"
          style={{ width: "80px", marginRight: "10px" }}
          value={chapter}
          onKeyDown={props.onChapterUpdate}
          onChange={props.onChapterChange} />
      </li>
    )
  }

  var readNowBtn = <a href={tale.linkDisplay} className="btn btn-primary"><SendIcon className="mb-1" fill="#FFF" width="16" height="16" /> Đọc ngay</a>

  if (tale.linkDisplay === '') {
    readNowBtn = <a href="javascript:void(0)" onClick={() => { setShowLinkGuid(true) }} className="btn btn-primary"><SendIcon className="mb-1" fill="#FFF" width="16" height="16" /> Đọc ngay</a>
  }

  return (
    <>
      <Dialog show={showLinkGuid}
        onHide={() => { setShowLinkGuid(false) }}
        title="Chưa có link pattern"
        content="Ấn vào nút Nâng cao, sau đó cập nhật Link patter"
        stext="Trang chủ"
        slink="/"
        ptext="Đã hiểu"
        plink=""
      />
      <Row>
        <Col md={4}>
          <img
            className="rounded border"
            src={transferFeaturedImg(tale.featuredImg)}
            alt="" height="350px" width="100%" style={{ objectFit: "cover" }}></img>
        </Col >
        <Col md={8} className="px-5">
          <ul className="list-unstyled">
            <li key="title" className="d-flex align-items-center">
              <h4 className="pr-3 mb-0" style={{ textTransform: "capitalize" }}>{tale.title}</h4>
              <div className="pb-1">
                {props.updating && <Loading size="sm" />}
              </div>
            </li>

            <li key="timeSince">
              <small className="text-muted">{timeSince(tale.ct)}</small>
            </li>

            {renderItem('Tác giả', AuthorIcon, tale.author)}
            {renderRating(tale.rating)}
            {renderReadingStatus(tale.readingStatus)}
            {renderStatus(tale.taleFinished)}
            {renderChapter(tale.chapter)}
            {renderItem('Mô tả', BookIcon, transferDescription(tale.shortDesc))}
          </ul>
        </Col>
      </Row >
      <ButtonGroup className="pt-3 w-100" aria-label="Tale Controls">
        {readNowBtn}
        <Button variant="secondary" onClick={props.onRatingClick}><RatingIcon2 className="mb-1" fill="#FFF" width="16" height="16" /> Đánh giá</Button>
        <Button variant="secondary" onClick={props.onNotesClick}><NotesIcon className="mb-1" fill="#FFF" width="16" height="16" /> Ghi chú</Button>
        <Button variant="secondary" onClick={props.onShareClick}><ShareIcon className="mb-1" fill="#FFF" width="16" height="16" /> Chia sẻ</Button>
        <Button variant="warning" onClick={props.onAdvanceClick}>Nâng cao</Button>
      </ButtonGroup>
    </>
  )
}

export default TaleDetailsView;