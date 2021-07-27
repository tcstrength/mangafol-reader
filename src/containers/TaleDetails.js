import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { TaleActions, FileActions } from "../actions/ApiCalls";
import LoadingDialog from "../components/LoadingDialog";
import TaleDetailsView from "../components/TaleDetailsView";
import Dialog from "../components/Dialog";
import TaleAdvanceDialog from "../components/TaleAdvanceDialog";
import TaleUploadDialog from "../components/TaleUploadDialog";
import TaleRatingDialog from "../components/TaleRatingDialog";
import TaleNotesDialog from "../components/TaleNotesDialog";
import TaleNotesView from "../components/TaleNotesView";
import TaleSideCardList from "../components/TaleSideCardList";
import { throttle } from 'throttle-debounce';
import { useHistory } from "react-router-dom";


export default class TaleDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: props.match.params.slug,
      notesList: [],
      topList: [],
      loading: true,
      updating: false,
      failure: false,
      advanceShow: false,
      uploadShow: false,
      ratingShow: false,
      notesShow: false,
      fileChosen: null,
      uploadStatus: null
    }
  }

  componentDidMount() {
    this.refreshTale()
    this.updateTopList()
  }

  updateTopList() {
    const promise = TaleActions.top(10);
    promise.then((resp) => {
      this.setState({ topList: resp.data.content.list, loading: false })
    }).catch((resp) => {
    })
  }

  refreshTale() {
    const promise = TaleActions.getBySlug(this.state.slug);
    promise.then((resp) => {
      this.setState({ loading: false, failure: false, tale: resp.data.content })
      this.refreshNotes(false);
    }).catch((resp) => {
      this.setState({ loading: false, failure: true })
    })
  }

  refreshNotes(wantRefreshTale) {
    const promise = TaleActions.getNotes(this.state.tale.id, 0, 100)
    promise.then((resp) => {
      this.setState({ notesList: resp.data.content.list })
    })
  }

  updateTale(log, body) {
    this.setState({ updating: true })
    const id = this.state.tale.id;
    const promise = TaleActions.update({ ...body, id: id });
    promise.then((resp) => {
      this.setState({ updating: false, failure: false, tale: resp.data.content })
    }).catch((resp) => {
      this.setState({ updating: false, failure: true })
    })
  }

  onChapterUpdate = (e) => {
    if (e.key === 'Enter') {
      this.updateTale('Cập nhật chương truyện ' + this.state.tale.chapter,
        { chapter: this.state.tale.chapter });
    }
  };

  onChapterChange = (e) => {
    this.setState({
      tale: {
        ...this.state.tale,
        chapter: e.target.value
      }
    })
  }

  onAdvanceClick = (e) => {
    this.setState({ advanceShow: true })
  }

  onRatingChange = (rating, name) => {
    console.log(rating)
    const { tale } = this.state

    this.setState({
      tale: {
        ...tale,
        rating: rating
      }
    })
  }

  onAdvanceUpdate = (tale) => {
    this.updateTale('Cập nhật nâng cao', tale);
  }

  onAdvanceDelete = () => {
    const promise = TaleActions.delete(this.state.tale.id)
    this.setState({ updating: true })
    promise.then((resp) => {
      console.log(resp);
      this.props.history.push('/')
    })
  }

  onUploadClick = (e) => {
    this.setState({ uploadShow: true, uploadStatus: null, fileChosen: null })
  }

  onStartUploadingClick = (e) => {
    this.setState({ uploadStatus: 'uploading' })
    const promise = FileActions.uploadImgbb(this.state.fileChosen)
    promise.then((resp) => {
      this.setState({ uploadStatus: 'success' })
      this.updateTale('Đổi ảnh đại diện cho truyện', {
        featuredImg: resp.data.content
      })
    }).catch((resp) => {
      this.setState({ uploadStatus: 'error' })
    })
  }

  onUploadFileChange = (e) => {
    this.setState({ fileChosen: e.target.files[0] })
  }

  onRatingClick = (e) => {
    this.setState({ ratingShow: true })
  }

  onDescriptionChange = (e) => {
    var { tale } = this.state
    tale.shortDesc = e.target.value;
    this.setState({ tale: tale })
  }

  onRatingAccept = (e) => {
    var { tale } = this.state

    this.updateTale('Đánh giá truyện', {
      rating: tale.rating,
      shortDesc: tale.shortDesc
    })
  }

  onNotesCompleted = (e) => {
    this.setState({ updating: false })
    this.refreshNotes(true);
  }

  render() {
    return (
      <Row>
        <LoadingDialog loading={this.state.loading} />
        <Dialog
          show={this.state.failure}
          onHide={() => { this.setState({ failure: false }) }}
          title="Tải trang thất bại"
          content="Đã có lỗi xảy ra, vui lòng thử lại"
          type="warning"
          stext="Trang chủ"
          slink="/"
          ptext="Thử lại"
          plink="" />
        <LoadingDialog show={this.state.loading} />

        <Col md={8}>
          {(this.state.tale !== null && this.state.tale !== undefined) &&
            <>
              <TaleRatingDialog
                tale={this.state.tale}
                show={this.state.ratingShow}
                onRatingAccept={this.onRatingAccept}
                onRatingChange={this.onRatingChange}
                onDescriptionChange={this.onDescriptionChange}
                onHide={() => { this.setState({ ratingShow: false }) }}
              />

              <TaleNotesDialog
                tale={this.state.tale}
                show={this.state.notesShow}
                onNotesUpdating={() => { this.setState({ updating: true }) }}
                onNotesCompleted={this.onNotesCompleted}
                onHide={() => { this.setState({ notesShow: false }) }}
              />

              <TaleAdvanceDialog
                onHide={() => { this.setState({ advanceShow: false }) }}
                onUpdate={this.onAdvanceUpdate}
                onDelete={this.onAdvanceDelete}
                show={this.state.advanceShow}
                tale={this.state.tale} />

              <TaleUploadDialog
                onHide={() => { this.setState({ uploadShow: false }) }}
                show={this.state.uploadShow}
                uploadStatus={this.state.uploadStatus}
                onFileChange={this.onUploadFileChange}
                onUploadClick={this.onStartUploadingClick} />

              <TaleDetailsView
                tale={this.state.tale}
                updating={this.state.updating}
                onAdvanceClick={this.onAdvanceClick}
                onChapterUpdate={this.onChapterUpdate}
                onChapterChange={this.onChapterChange}
                onRatingClick={this.onRatingClick}
                onUploadClick={this.onUploadClick}
                onNotesClick={() => { this.setState({ notesShow: true }) }}
              />

              <TaleNotesView
                onNotesUpdating={() => { this.setState({ updating: true }) }}
                onNotesCompleted={this.onNotesCompleted}
                list={this.state.notesList} />
            </>
          }
        </Col>
        <Col md={4}>
          <TaleSideCardList
            variant="danger"
            title="Truyện hay"
            list={this.state.topList}
          />
        </Col>
      </Row>
    )
  }
}