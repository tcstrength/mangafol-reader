import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { TaleActions, FileActions } from "../actions/ApiCalls";
import LoadingDialog from "../components/LoadingDialog";
import TaleDetailsView from "../components/TaleDetailsView";
import Dialog from "../components/Dialog";
import TaleAdvanceDialog from "../components/TaleAdvanceDialog";
import TaleRatingDialog from "../components/TaleRatingDialog";
import TaleNotesDialog from "../components/TaleNotesDialog";
import TaleNotesView from "../components/TaleNotesView";
import TaleSideCardList from "../components/TaleSideCardList";

export default class TaleDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: props.match.params.slug,
      notesList: [],
      lastUpdateList: [],
      lastUpdateLoading: false,
      loading: true,
      updating: false,
      failure: false,
      advanceShow: false,
      uploadShow: false,
      ratingShow: false,
      notesShow: false
    }
  }

  componentDidMount() {
    this.refreshTale(true)
    this.updateTopList()
  }

  updateTopList() {
    this.setState({ lastUpdateLoading: true })
    const promise = TaleActions.lastUpdate(5);
    promise.then((resp) => {
      this.setState({ lastUpdateList: resp.data.content.list, loading: false, lastUpdateLoading: false })
    }).catch((resp) => {
    })
  }

  refreshTale(wantRefreshNotes) {
    const promise = TaleActions.getBySlug(this.state.slug);
    promise.then((resp) => {
      this.setState({ loading: false, failure: false, tale: resp.data.content })
      if (wantRefreshNotes) {
        this.refreshNotes(false);
      }
    }).catch((resp) => {
      this.setState({ loading: false, failure: true })
    })
  }

  refreshNotes() {
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

    if (e.key === undefined || e.key === 'Enter') {
      this.updateTale('C???p nh???t ch????ng truy???n ' + this.state.tale.chapter,
        { chapter: this.state.tale.chapter });
    }
  };

  onChapterChange = (e) => {
    console.log("Chapter change", e);
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

  onAdvanceUpdate = (tale, fileChosen) => {
    this.updateTale("C???p nh???t n??ng cao", {
      ...tale,
      featuredImg: null
    })

    console.log(fileChosen)

    if (fileChosen !== null && fileChosen !== undefined) {
      const promise = FileActions.uploadImgbb(fileChosen)
      promise.then((resp) => {
        this.updateTale('?????i ???nh ?????i di???n cho truy???n', {
          featuredImg: resp.data.content
        })
      }).catch((resp) => {
      })
    }
  }

  onAdvanceDelete = () => {
    const promise = TaleActions.delete(this.state.tale.id)
    this.setState({ updating: true })
    promise.then((resp) => {
      this.props.history.push('/')
    })
  }

  // onStartUploadingClick = (e) => {
  //   this.setState({ uploadStatus: 'uploading' })
  //   const promise = FileActions.uploadImgbb(this.state.fileChosen)
  //   promise.then((resp) => {
  //     this.setState({ uploadStatus: 'success' })
  //     this.updateTale('?????i ???nh ?????i di???n cho truy???n', {
  //       featuredImg: resp.data.content
  //     })
  //   }).catch((resp) => {
  //     this.setState({ uploadStatus: 'error' })
  //   })
  // }

  onRatingClick = (e) => {
    this.setState({ ratingShow: true })
  }

  onRatingAccept = (tale) => {
    this.updateTale('????nh gi?? truy???n', tale)
  }

  onNotesCompleted = (e) => {
    this.setState({ updating: false })
    this.refreshNotes();
    this.refreshTale(false);
  }

  onReadingStatusUpdate = (newStatus) => {
    this.setState({ updating: true })
    this.updateTale('?????i t??nh tr???ng ?????c', { readingStatus: newStatus })
  }

  onTaleFinishedUpdate = (newStatus) => {
    this.setState({ updating: true })
    this.updateTale('?????i t??nh tr???ng truy???n', { taleFinished: newStatus })
  }

  render() {
    return (
      <Row>
        <LoadingDialog loading={this.state.loading} />
        <Dialog
          show={this.state.failure}
          onHide={() => { this.setState({ failure: false }) }}
          title="T???i trang th???t b???i"
          content="???? c?? l???i x???y ra, vui l??ng th??? l???i"
          type="warning"
          stext="Trang ch???"
          slink="/"
          ptext="Th??? l???i"
          plink="" />
        <LoadingDialog show={this.state.loading} />

        <Col md={8}>
          {(this.state.tale !== null && this.state.tale !== undefined) &&
            <>
              <TaleRatingDialog
                tale={this.state.tale}
                show={this.state.ratingShow}
                onRatingAccept={this.onRatingAccept}
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

              <TaleDetailsView
                tale={this.state.tale}
                updating={this.state.updating}
                onAdvanceClick={this.onAdvanceClick}
                onChapterUpdate={this.onChapterUpdate}
                onChapterChange={this.onChapterChange}
                onReadingStatusUpdate={this.onReadingStatusUpdate}
                onTaleFinishedUpdate={this.onTaleFinishedUpdate}
                onRatingClick={this.onRatingClick}
                // onUploadClick={this.onUploadClick}
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
            loading={this.state.lastUpdateLoading}
            variant="success"
            title="Truy???n v???a ?????c"
            list={this.state.lastUpdateList}
          />
          {/* <TaleSideCardList
            loading={this.state.topLoading}
            variant="danger"
            title="Truy???n y??u th??ch"
            list={this.state.topList}
          /> */}
        </Col>
      </Row>
    )
  }
}