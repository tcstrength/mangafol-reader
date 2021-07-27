import { Component } from "react";
import { Container } from "react-bootstrap";
import { AuthActions } from "../actions/ApiCalls";
import Dialog from "../components/Dialog";

export default class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }

    AuthActions.logout();
  }

  render() {
    return (
      < Container className="p-5 d-flex flex-column" >
        <Dialog
          show={this.state.show}
          onHide={() => { }}
          title="Đăng xuất thành công"
          content="Bạn đã đăng xuất thành công, cám ơn bạn đã sử dụng dịch vụ"
          ptext="Đăng nhập"
          plink="/login"
          stext="Đăng ký"
          slink="/register" />
      </Container >
    );
  }
}