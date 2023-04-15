import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listNewsDetails } from '../actions/newsActions';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { Dropdown } from 'react-bootstrap';
import { createPlaylist, deletePlaylist, listPlaylists } from '../actions/playlistActions';
import { useRef } from 'react';
import { createNewsReview } from '../actions/newsActions';
import { NEWS_CREATE_REVIEW_RESET } from '../constants/newsConstants';



function NewsScreen({ match, history}) {
  const { playlists } = useSelector((state) => state.playlistList);

  const [showDropdown, setShowDropdown] = useState(false);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const newsDetails = useSelector(state => state.newsDetails);
  const {  newsitem, error, loading} = newsDetails;



  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wishlist, setWishlist] = useState([]);







  const newsReviewCreate = useSelector(state => state.newsReviewCreate);
  const {
    loading: loadingnewsReview,
    error: errornewsReview,
    success: successnewsReview,
  } = newsReviewCreate;

  useEffect(() => {
    if (successnewsReview) {
      setRating(0);
      setComment('');
      dispatch({ type: NEWS_CREATE_REVIEW_RESET });
    }

    dispatch(listNewsDetails(match.params.id));
  }, [dispatch, match, successnewsReview]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewsReview(
        match.params.id, {
        rating,
        comment
    }
    ));
  };

  useEffect(() => {
    dispatch(listNewsDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cartnews/${match.params.id}?qty=${qty}`);
  };

  const addToWishlist = () => {
    history.push(`/liked/${match.params.id}?qty=${qty}`);
    setLiked(true); // Update the state to indicate that the user has liked the news

  };

  const addToPreorder = () => {
    history.push(`/playlist/${match.params.id}?qty=${qty}`);
  };


  const [showPremium, setShowPremium] = useState(false);
  // const [showBasic, setShowBasic] = useState(true);

  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const [showDownload, setShowDownload] = useState(false)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])
    const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    };

    const addToPlaylist = (playlistId, playlistTitle) => {
      history.push(`/playlist/${match.params.id}?qty=${qty}/${playlistTitle}`);
    };
    const download = () => {
      window.location.href = newsitem.download;
    };
 
  return (
    <div>
       
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
     ) : error ? ( 
        <Message variant="danger">{error}</Message>
     ) : ( 
        <div>
          <Row>
          <Col sm={12} md={6} lg={4} xl={6} className="home-screen-product-col">
      
    <ListGroup>
      <Card>
        <ListGroup>
        <Image 
  src={newsitem.image} 
  alt={newsitem.headline} 
  fluid 
  className="float-md-end" 
  style={{ width: '1250px', height: '500px', objectFit: 'cover' }}
/>        </ListGroup>
      </Card>

   
    </ListGroup>
 
  
  
      <br />
      <br />
      <Card>
        <ListGroup>
          
     
</ListGroup>
</Card>
</Col>
<Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{newsitem.headline}</h1>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {newsitem.description}
                  
     
                </ListGroup.Item>


                <ListGroup.Item>



                </ListGroup.Item>
              </ListGroup>
            </Col>



            <Col md={6}>
  <ListGroup>
    {loadingOrders ? (
      <Loader />
    ) : errorOrders ? (
      <Message variant='danger'>{errorOrders}</Message>
    ) : (
      <div>
        <ListGroup.Item>
          <div>
            <Card>
              <h2 className='text-center'>Comments</h2>
              {newsitem.reviews.length === 0 && <Message>No comments</Message>}
              <ListGroup variant='flush'>
                {newsitem.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <h5>{review.name}</h5>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                
              </ListGroup>
            </Card>
          </div>
        </ListGroup.Item>
      </div>
    )}
  </ListGroup>
</Col>



        <Col md={6}>
              <ListGroup >

         {loadingOrders ? (
  <Loader /> 
) : errorOrders ? ( 
  <Message variant='danger'>{errorOrders}</Message> 
) : ( 
  orders.map(order => (

    
    <div key={order.id}>
     
      <h2>
      {order.isPremium && order.isBought && (
          <div>

<ListGroup.Item>
<div >
<Card>
      
          {/* <h2 className='text-center'> Comments</h2> */}
          {/* {newsitem.reviews.length === 0 && <Message>No Comments</Message>} */}
        
            <ListGroup.Item>
              <h2>Write a Comment</h2>
              {successnewsReview && (
                <Message variant="success">
                  Comment submitted successfully
                </Message>
              )}
              {loadingnewsReview && <Loader />}
              {errornewsReview && (
                <Message variant="danger">{errornewsReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                  
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label></Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingnewsReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a comment</Message>
                                                )}
                                        </ListGroup.Item>
                                    {/* </ListGroup> */}
                              
      </Card>
</div>

            </ListGroup.Item>

        

          </div>
        )}
      </h2>
    </div>
  ))

  
)}

        

     
            </ListGroup>

        </Col>
      </Row>
    </div>
   )} 
</div>

);
}

export default NewsScreen;

