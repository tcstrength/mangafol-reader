import { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import NewTaleBox from "../components/NewTaleBox";
import { TaleActions } from "../actions/ApiCalls";
import Loading from "../components/Loading";
import LoadingDialog from "../components/LoadingDialog";
import TaleSideCardList from "../components/TaleSideCardList";
import TaleCardList from "../components/TaleCardList";
import { List } from "css-tree";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      creating: false,
      loadMore: false,
      newTitle: "",
      recentList: [],
      topList: [],
      offset: -1,
      limit: 10,
      reachEnd: false
    }
  }

  componentDidMount() {
    this.updateLoadMore();
    this.updateTopList();
  }

  updateTopList() {
    const promise = TaleActions.top(10);
    promise.then((resp) => {
      this.setState({ topList: resp.data.content.list, loading: false })
    }).catch((resp) => {
    })
  }

  updateLoadMore = (e) => {
    this.setState({ loadMore: true })
    const { offset, limit, recentList } = this.state;
    const newOffset = offset + 1;
    const promise = TaleActions.paging(newOffset, limit);

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
          <NewTaleBox
            loading={this.state.creating}
            onTitleChange={this.onTitleChange}
            onNewSubmit={this.onNewSubmit} />
          <TaleCardList list={this.state.recentList} />
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
            variant="danger"
            title="Truyện hay"
            list={this.state.topList}
          />
        </Col>
      </Row>
    );
  }
}