import { Component } from "react";
import { TaleActions } from "../../actions/TaleActions"
import TaleCard from "./TaleCard";
import LoadingDialog from "../LoadingDialog";

class TaleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      offset: 0,
      limit: 10
    }
  }

  componentDidMount() {
    var offset = this.state.offset;
    var limit = this.state.limit;
    var promise = TaleActions.getPaging(offset, limit);
    promise.then((resp) => {
      this.setState({
        list: resp.data.content.list,
        loading: false
      })
    }).catch((error) => {
      this.setState({
        loading: false
      })
    })
  }

  renderTales(list) {
    const listItems = list.map((item) =>
      <TaleCard tale={item}></TaleCard>
    )

    return listItems;
  }

  render() {
    const { list } = this.state;
    return (
      <>
        <LoadingDialog show={this.state.loading}></LoadingDialog>
        {this.renderTales(list)}
      </>
    )
  }
}

export default TaleList;