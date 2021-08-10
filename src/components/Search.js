import { FormControl, InputGroup } from "react-bootstrap";
import { search } from "../constants/Images";
import { throttle } from 'throttle-debounce';
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { TaleActions } from "../actions/ApiCalls";
import { getTaleLink, mapReadingStatus } from "../constants/Config";
import Loading from "./Loading";

var keyword = "";

function Search(props) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [hover, setHover] = useState(false)

  const searchText = throttle(250, false, (e) => {
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
      setList([])
    }
  });

  const mapReadingStatusCustom = (status) => {
    var map = mapReadingStatus(status)

    if (status === 1) {
      return {
        text: 'Theo dõi',
        variant: 'dark'
      }
    }

    return map;
  }


  const handleOnBlur = () => {
    if (hover === false) {
      setShow(false);
    } else {
    }
  }

  return (
    <>
      <Dropdown>
        <InputGroup size="mr-3" onChange={searchText}
          onBlur={e => { handleOnBlur() }}
          onFocus={e => { setShow(true) }}>
          <FormControl className="pt-1" type="text" placeholder="Tìm truyện" />
          <InputGroup.Text >
            {!loading && <img
              alt="" src={search} width="16" height="16" className="d-inline-block align-middle" />}
            {loading && <Loading className="" />}
            {' '}
          </InputGroup.Text>
        </InputGroup>
        {show && list.length !== 0 &&
          <div className="dropdown-menu mt-1 show" aria-labelledby="tale-search"
            onMouseEnter={e => { setHover(true) }}
            onMouseLeave={e => { setHover(false) }}>
            <div className="hs-menu-inner">
              {list.map((item) => {
                return <a className={`dropdown-item text-${mapReadingStatusCustom(item.readingStatus).variant}`} data-value={item.id} href={getTaleLink(item)}>
                  {item.title}
                  <br></br>
                  <small className="text-muted">Chương {item.chapter}</small>
                </a>
              })}
            </div>
          </div>
        }
      </Dropdown>

    </>
  )
}

export default Search;