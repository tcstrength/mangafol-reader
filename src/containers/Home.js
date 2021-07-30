import { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import NewTaleBox from "../components/NewTaleBox";
import { TaleActions } from "../actions/ApiCalls";
import Loading from "../components/Loading";
import LoadingDialog from "../components/LoadingDialog";
import TaleSideCardList from "../components/TaleSideCardList";
import TaleCardList from "../components/TaleCardList";
import TaleSummary from "../components/TaleSummary";
import { List } from "css-tree";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      creating: false,
      loadMore: false,
      newTitle: "",
      recentList: [],
      lastUpdateList: [],
      lastUpdateLoading: false,
      topList: [],
      topLoading: false,
      offset: -1,
      limit: 12,
      reachEnd: false
    }
  }

  componentDidMount() {
    this.setState({ recentLoading: true, loading: true })
    this.updateTopList();
    this.updateLastUpdateList();
    this.updateLoadMore();
  }

  updateLastUpdateList() {
    this.setState({ lastUpdateLoading: true })
    TaleActions.lastUpdate(10).then((resp) => {
      this.setState({ lastUpdateList: resp.data.content.list, lastUpdateLoading: false })
    })
  }

  updateTopList() {
    this.setState({ topLoading: true })
    const promise = TaleActions.top(6);
    promise.then((resp) => {
      this.setState({ topList: resp.data.content.list, topLoading: false, loading: false })
    }).catch((resp) => {
    })
  }

  updateLoadMore = (e) => {
    this.setState({ loadMore: true })
    const { offset, limit, recentList } = this.state;
    const newOffset = offset + 1;
    const promise = TaleActions.recent(newOffset, limit);

    promise.then((resp) => {
      const list = resp.data.content.list;
      if (list.length < limit) {
        this.setState({ recentList: recentList.concat(list), reachEnd: true, loadMore: false })
      } else {
        this.setState({ recentList: recentList.concat(list), offset: newOffset, loadMore: false })
      }
    }).catch((resp) => {
    })
  }

  onTitleChange = (e) => {
    this.setState({ newTitle: e.target.value })
  }

  onNewSubmit = (e) => {
    this.setState({ creating: true })
    const promise = TaleActions.create({ title: this.state.newTitle, readingStatus: 1 })
    promise.then((resp) => {
      this.setState({
        creating: false, recentList: [
          resp.data.content,
          ...this.state.recentList
        ]
      })
      this.updateTopList();
    }).catch((resp) => {
      this.setState({ creating: false })
    })
  }

  render() {

    return (
      <Row>
        <Col md={8}>
          <LoadingDialog loading={this.state.loading} />
          <Row>
            <Col md={4}>
              <TaleSummary />
            </Col>
            <Col md={8}>
              <NewTaleBox
                loading={this.state.creating}
                onTitleChange={this.onTitleChange}
                onNewSubmit={this.onNewSubmit} />
            </Col>
          </Row>
          <br></br>
          <TaleCardList
            bg="secondary"
            title="Truyện được đánh giá hay"
            variant="light"
            loading={this.state.topLoading}
            list={this.state.topList} />
          <br></br>
          <TaleCardList
            bg="secondary"
            title="Truyện gần đây"
            variant="light"
            list={this.state.recentList} />
          <div className="text-center pb-3">
            {!this.state.reachEnd && !this.state.loading &&
              <Button className="w-25" variant="secondary"
                onClick={this.updateLoadMore}>
                {this.state.loadMore && <Loading />}
                {' '} Tải thêm truyện...</Button>
            }
          </div>
        </Col>
        <Col md={4}>
          <TaleSideCardList
            loading={this.state.lastUpdateLoading}
            variant="primary"
            title="Truyện vừa cập nhật"
            list={this.state.lastUpdateList}
          />
        </Col>
      </Row>
    );
  }
}