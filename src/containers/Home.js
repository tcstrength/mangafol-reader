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
import RankList from "../components/RankList";

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
      topOffset: -1,
      topLimit: 5,
      topLoading: false,
      offset: -1,
      limit: 96,
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
    TaleActions.lastUpdate(5).then((resp) => {
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
      this.updateLastUpdateList();
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
          {/* <br></br> */}
          {/* <TaleCardList
            bg="secondary"
            title="Truy???n ???????c ????nh gi?? hay"
            variant="light"
            loading={this.state.topLoading}
            list={this.state.topList} />
          <br></br> */}
          <TaleCardList
            bg="secondary"
            title="Truy???n c???a b???n"
            variant="light"
            list={this.state.recentList} />
          <div className="text-center pb-3">
            {!this.state.reachEnd && !this.state.loading &&
              <Button className="w-25" variant="secondary"
                onClick={this.updateLoadMore}>
                {this.state.loadMore && <Loading />}
                {' '} T???i th??m truy???n...</Button>
            }
          </div>
        </Col>
        <Col md={4}>
          <RankList>

          </RankList>
          <TaleSideCardList
            loading={this.state.lastUpdateLoading}
            variant="success"
            title="Truy???n v???a ?????c"
            list={this.state.lastUpdateList}
          />
          <TaleSideCardList
            loading={this.state.topLoading}
            variant="danger"
            title="Truy???n y??u th??ch"
            list={this.state.topList}
          />
        </Col>
      </Row>
    );
  }
}