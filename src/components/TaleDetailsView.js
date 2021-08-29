import { Badge, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap"
import { featured } from "../constants/Images";
import { mapReadingStatus, mapTaleFinished, mapRating } from "../constants/Config";
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
import { urlify } from "../utils/UrlUtils";
import { useState } from "react";

function TaleDetailsView(props) {
  const tale = props.tale;
  const pt = "pt-3";

  const [showLinkGuid, setShowLinkGuid] = useState(false)
  const [readingStatusOptionsShow, setReadingStatusOptionsShow] = useState(false)
  const [taleFinishedOptionsShow, setTaleFinishedOptionsShow] = useState(false)

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

  const renderItem = (head, icon, content, isHtml) => {
    if (content === null || content === '') {
      content = 'Chưa cập nhật';
    }

    if (isHtml) {
      content = urlify(content);
    }

    return (
      <li className={pt} key={head}>
        <img alt="" src={icon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">{head}:</b>
        <span className="align-middle" dangerouslySetInnerHTML={{ __html: content }}></span>
      </li>
    )
  }

  const renderReadingStatus = (readingStatus) => {
    var map = mapReadingStatus(readingStatus)
    var badge = <Badge className={`bg-${map.variant} rounded-pill align-middle mr-1`}>{map.text}</Badge>;

    var remaining = [1, 0, 2].filter(item => item !== readingStatus)
    var remainingBadges = remaining.map((item) => {
      var map = mapReadingStatus(item)
      return <a href="#" onClick={e => props.onReadingStatusUpdate(item)}><Badge className={`bg-${map.variant} rounded-pill align-middle mr-1`}>{map.text}</Badge></a >
    });

    return (
      <li className={`${pt} align-middle`} key="status"
        style={{ cursor: "pointer" }}
        onMouseUp={e => setReadingStatusOptionsShow(true)}
        onMouseLeave={e => setReadingStatusOptionsShow(false)}>
        <img alt="" src={FlagIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Tình trạng đọc:</b>
        {badge}
        {readingStatusOptionsShow && remainingBadges}
      </li>
    )
  }

  const renderStatus = (finished) => {
    var map = mapTaleFinished(finished)
    var badge = <Badge className={`bg-${map.variant} rounded-pill align-middle mr-1`}>{map.text}</Badge>;

    var remaining = [false, true].filter(item => item !== finished)
    var remainingBadges = remaining.map((item) => {
      var map = mapTaleFinished(item)
      return <a href="#" onClick={e => props.onTaleFinishedUpdate(item)}><Badge className={`bg-${map.variant} rounded-pill align-middle mr-1`}>{map.text}</Badge></a >
    });

    return (
      <li className={`${pt} align-middle`} key="finished"
        style={{ cursor: "pointer" }}
        onMouseUp={e => setTaleFinishedOptionsShow(true)}
        onMouseLeave={e => setTaleFinishedOptionsShow(false)}>
        <img alt="" src={FinishedIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Tình trạng truyện:</b>
        {badge}
        {taleFinishedOptionsShow && remainingBadges}
      </li>
    )
  }

  const renderRating = (rating) => {
    var map = mapRating(rating)
    var badge = <Badge className={`bg-${map.variant} rounded-pill align-middle`}>{map.text}</Badge>
    return (
      <li className={pt} key="rating" style={{ cursor: "pointer" }} onClick={props.onRatingClick}>
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
          onBlur={props.onChapterUpdate}
          onChange={props.onChapterChange} />
      </li>
    )
  }

  var readNowBtn = <a href={tale.linkDisplay} target="_blank" className="btn btn-primary"><SendIcon className="mb-1" fill="#FFF" width="16" height="16" /> Đọc ngay</a>

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

            {renderItem('Tác giả', AuthorIcon, tale.author, false)}
            {renderRating(tale.rating)}
            {renderReadingStatus(tale.readingStatus)}
            {renderStatus(tale.taleFinished)}
            {renderChapter(tale.chapter)}
            {renderItem('Mô tả', BookIcon, transferDescription(tale.shortDesc), true)}
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