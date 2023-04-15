import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import News from '../components/News';
import Sport from '../components/Sport';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { listNews } from '../actions/newsActions';
import { listSports } from '../actions/sportActions';

import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import NewsCarousel from '../components/NewsCarousel';
import SearchBox from '../components/SearchBox'; // import SearchBox component
import '../styles/Header.css';

function NewsListScreen({ history }) {
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.newsList);
  const { error: newsError, loading: newsLoading, news, page: newsPage, pages: newsPages } = newsList;
  
  const sportsList = useSelector(state => state.sportsList);
  const { error: sportsError, loading: sportsLoading, sports, page: sportsPage, pages: sportsPages } = sportsList;
  
  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listNews(keyword));
    dispatch(listSports(keyword));

  }, [dispatch, keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/newslist${keyword}&search=${keyword}`);
    } else {
      history.push(`/newslist/search/${keyword}`);
    }
  };

  return (
    <div>
      <SearchBox submitHandler={submitHandler} />
      <br/>
      {!keyword && <NewsCarousel />}
      {/* <Sport /> */}
      {/* <News /> */}
      {newsLoading ? (
        <Loader />
      ) : newsError ? (
        <Message variant="danger">{newsError}</Message>
      ) : (
        <div>
<Row className="justify-content-center">
            {news.map((newsitem) => (
              <Col key={newsitem._id} sm={12} md={3} lg={2} xl={12}>
                <News newsitem={newsitem} />
              </Col>
            ))}
          </Row>
         
          
          <Paginate
            page={newsPage}
            pages={newsPages}
            keyword={keyword}
            className="home-screen-pagination"
          />
        </div>
      )}
      
    </div>
  );
}

export default NewsListScreen;
