import { Component } from "react";
import { Carousel } from "react-bootstrap";
import DefaultBannerImg from "../resources/banner.svg";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [
        {
          "bannerImg": DefaultBannerImg,
          "title": "Title Test",
          "content": "Lorem ipsup..."
        },
        {
          "bannerImg": DefaultBannerImg,
          "title": "Title Test",
          "content": "Lorem ipsup..."
        },
        {
          "bannerImg": DefaultBannerImg,
          "title": "Title Test",
          "content": "Lorem ipsup..."
        }
      ]
    }
  }

  renderItems(banners) {
    const listItems = banners.map((item) =>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={item.bannerImg}
          alt="banner"
        />
        <Carousel.Caption>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );

    return listItems;
  }
  render() {
    return (
      <Carousel>
        {this.renderItems(this.state.banners)}
      </Carousel>
    );
  }
}

export default Banner;