import { FormControl, InputGroup } from "react-bootstrap";
import { search } from "../constants/Images";
import { throttle } from 'throttle-debounce';
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { TaleActions } from "../actions/ApiCalls";
import { getTaleLink } from "../constants/Config";
import Loading from "./Loading";

var keyword = "";

function Search(props) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const searchText = throttle(500, false, (e) => {
    const text = e.target.value;
    keyword = text;

    if (text !== '') {
      setLoading(true);
      TaleActions.search(text, 10).then((resp) => {
        if (resp.config.params.text === keyword) {
          console.log(keyword)
          setLoading(false);
          setList(resp.data.content.list)
        }
      })
    } else {
      setLoading(false);
    }
  });

  return (
    <>
      <Dropdown>
        <InputGroup size="sm mr-3" onChange={searchText}>
          <FormControl type="text" placeholder="Tìm truyện" />
          <InputGroup.Text >
            <img
              alt="" src={search} width="16" height="16" className="d-inline-block align-middle" />
            {' '}
          </InputGroup.Text>
        </InputGroup>
        {list.length !== 0 &&
          <div className="dropdown-menu mt-1 show" aria-labelledby="example-two-button">
            <div className="hs-menu-inner">
              {list.map((item) => {
                return <a className="dropdown-item" data-value={item.id} href={getTaleLink(item)}>
                  {item.title}
                  <br></br>
                  <small className="text-muted">Chương {item.chapter}</small>
                </a>
              })}
            </div>
          </div>
        }
      </Dropdown>
      <div>
        {loading && <Loading className="ml-1 mt-1 align-middle" />}
      </div>
    </>
  )
}

export default Search;