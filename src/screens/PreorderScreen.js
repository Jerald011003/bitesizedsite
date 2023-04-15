import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPreorder, removeFromPreorder } from '../actions/preorderActions';
import { Row, Col, Image, ListGroup, Button, Card, Form, Container } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listSongDetails, createSongReview } from '../actions/songActions';
import { SONG_CREATE_REVIEW_RESET } from '../constants/songConstants';

const PlaylistScreen = ({ match, location, history }) => {
  const songId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const preorder = useSelector(state => state.preorder);
  const { preorderItems } = preorder;

  useEffect(() => {
    if (songId) {
      dispatch(addToPreorder(songId, qty));
    }
  }, [dispatch, songId, qty]);

  const removeFromPreorderHandler = (id) => {
    dispatch(removeFromPreorder(id));
  };

  const songDetails = useSelector(state => state.songDetails);
  const { loading, error, song } = songDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;


  return (
    <Container>
      <h1>Playlist</h1>
      {preorderItems.length === 0 ? (
        <div className="text-center">
          <p>Your playlist is empty</p>
          <Link to="/" className="btn btn-primary">
            Go Listen
          </Link>
        </div>
      ) : (
        <Row>
          {preorderItems.map((item) => (
            <Col key={item.song} xs={12} md={6} lg={4} className="mb-5">
              <div className="p-3 border rounded">
                <Image src={item.image} alt={item.name} fluid />
                <div className="mt-3">
                  <Link to={`/song/${item.song}`} className="fw-bold">
                    {item.name}
                  </Link>
                </div>
                <h2></h2>
                {/* <div className="mb-3">${item.price}</div> */}
                {/* <div className="mb-3">Date of Available: {item.preorderdate}</div> */}
               
                <Button
                  variant="danger"
                  onClick={() => removeFromPreorderHandler(item.song)}
                >
                  Remove
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PlaylistScreen
