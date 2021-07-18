import { Component } from "react";
import { TaleActions } from "../../actions/TaleActions"
import Tale from "./Tale";

class TaleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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
        loaded: true
      })
    }).catch((error) => {

    })
  }

  renderTales(list) {
    const listItems = list.map((item) =>
      <Tale tale={item}></Tale>
    )

    return listItems;
  }

  render() {
    const { loaded, list, offset, limit } = this.state;

    if (!this.state.loaded) {
      return <p>Loading...</p>;
    } else {
      return this.renderTales(list);
    }
  }
}

export default TaleList;