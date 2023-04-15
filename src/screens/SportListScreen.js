import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Sport from '../components/Sport';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listSports } from '../actions/sportActions';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
// import SportCarousel from '../components/SportCarousel';
import SearchBox from '../components/SearchBox'; // import SearchBox component
import '../styles/Header.css';

function SportListScreen({ history }) {
  const dispatch = useDispatch();
  const sportsList = useSelector(state => state.sportsList);
  const { error, loading, sports, page, pages } = sportsList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listSports(keyword));
  }, [dispatch, keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/Sportlist${keyword}&search=${keyword}`);
    } else {
      history.push(`/Sportlist/search/${keyword}`);
    }
  };

  return (
    <div>
      <SearchBox submitHandler={submitHandler} />
      <br/>
      {/* {!keyword && <SportCarousel />} */}
      {/* <Sport /> */}
      {/* <Sport /> */}
      {loading ? (
  <Loader />
) : error ? (
  <Message variant="danger">{error}</Message>
) : (
  <div>
    <Row className="justify-content-center">
      {sports.map((sportsitem) => (
        <Col key={sportsitem._id} sm={12} md={3} lg={2} xl={12}>
          <Sport sportsitem={sportsitem} />
        </Col>
      ))}
    </Row>

    <Paginate
      page={page}
      pages={pages}
      keyword={keyword}
      className="home-screen-pagination"
    />
  </div>
)}


      
    </div>
  );
}

export default SportListScreen;
