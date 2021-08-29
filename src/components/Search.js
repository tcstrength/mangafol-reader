import { FormControl, InputGroup } from "react-bootstrap";
import { search } from "../constants/Images";
import { throttle } from 'throttle-debounce';
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { TaleActions } from "../actions/ApiCalls";
import { getTaleLink, mapReadingStatus } from "../constants/Config";
import Loading from "./Loading";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Fragment } from "react";
import { featured } from "../constants/Images";

var keyword = "";

function Search(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const transferFeaturedImg = (featuredImg) => {
    console.log(featuredImg);
    if (featuredImg === null) {
      return featured;
    }

    return featuredImg.viewPath;
  }

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

  const handleChange = (value) => {
    const tale = value[0]
    window.location.href = getTaleLink(tale);
  }


  const handleSearch = (query) => {
    setIsLoading(false);

    TaleActions.search(query, 10).then((resp) => {
      const options = resp.data.content.list;
      setOptions(options);
      setIsLoading(false);
    })
  };

  const filterBy = () => true;

  return (
    <div className="w-100">
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-search-ow"
        isLoading={isLoading}
        labelKey="title"
        align="left"
        emptyLabel="Không tìm thấy truyện nào..."
        promptText="Gõ tên truyện"
        searchText="Đang tìm..."
        minLength={1}
        onSearch={handleSearch}
        onChange={handleChange}
        options={options}
        placeholder="Tìm truyện của bạn..."
        renderMenuItemChildren={(item, props) => (
          <Fragment>
            <span className={`text-${mapReadingStatusCustom(item.readingStatus).variant}`}>
              <span className="d-flex align-items-center p-0 m-0">
                <img className="rounded border mr-1" src={transferFeaturedImg(item.featuredImg)}
                  alt="" height="24px" width="24px" style={{ objectFit: "cover" }} />
                {' '} {item.title}
              </span>
              <small className="text-muted">Chương {item.chapter}</small>
            </span>
          </Fragment>
        )}
      />
      {/* <img alt="" src={search} width="16" height="16" className="d-inline-block align-middle" /> */}
    </div>
  )

  // return (
  //   <>
  //     <Dropdown>
  //       <InputGroup size="mr-3" onChange={searchText}
  //         onBlur={e => { handleOnBlur() }}
  //         onFocus={e => { setShow(true) }}>
  //         <FormControl className="pt-1" type="search" placeholder="Tìm truyện" />
  //         <InputGroup.Text >
  //           {!loading && <img
  //             alt="" src={search} width="16" height="16" className="d-inline-block align-middle" />}
  //           {loading && <Loading className="" />}
  //           {' '}
  //         </InputGroup.Text>
  //       </InputGroup>
  //       {show && list.length !== 0 &&
  //         <div className="dropdown-menu mt-1 show" aria-labelledby="tale-search"
  //           onMouseEnter={e => { setHover(true) }}
  //           onMouseLeave={e => { setHover(false) }}>
  //           <div className="hs-menu-inner">
  //             {list.map((item) => {
  //               return <a className={`dropdown-item text-${mapReadingStatusCustom(item.readingStatus).variant}`} data-value={item.id} href={getTaleLink(item)}>
  //                 {item.title}
  //                 <br></br>
  //                 <small className="text-muted">Chương {item.chapter}</small>
  //               </a>
  //             })}
  //           </div>
  //         </div>
  //       }
  //     </Dropdown>

  //   </>
  // )
}

export default Search;