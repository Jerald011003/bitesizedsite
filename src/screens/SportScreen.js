import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listSportsDetails } from '../actions/sportActions';

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

import { createSportsReview } from '../actions/sportActions';
import { SPORTS_CREATE_REVIEW_RESET } from '../constants/sportConstants';



function SportScreen({ match, history}) {


  const [showDropdown, setShowDropdown] = useState(false);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const sportsDetails = useSelector(state => state.sportsDetails);
  const {  sportitem, error, loading} = sportsDetails;



  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wishlist, setWishlist] = useState([]);







  const sportsReviewCreate = useSelector(state => state.sportsReviewCreate);
  const {
    loading: loadingSportReview,
    error: errorSportReview,
    success: successSportReview,
  } = sportsReviewCreate;

  useEffect(() => {
    if (successSportReview) {
      setRating(0);
      setComment('');
      dispatch({ type: SPORTS_CREATE_REVIEW_RESET });
    }

    dispatch(listSportsDetails(match.params.id));
  }, [dispatch, match, successSportReview]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSportsReview(
        match.params.id, {
        rating,
        comment
    }
    ));
  };

  useEffect(() => {
    dispatch(listSportsDetails(match.params.id));
  }, [dispatch, match]);


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
      window.location.href = sportitem.download;
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
  src={sportitem.image} 
  alt={sportitem.headline} 
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
                  <h1>{sportitem.headline}</h1>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {sportitem.description}
                  
     
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
              {sportitem.reviews.length === 0 && <Message>No comments</Message>}
              <ListGroup variant='flush'>
                {sportitem.reviews.map((review) => (
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
          {/* {sportitem.reviews.length === 0 && <Message>No Comments</Message>} */}
        
            <ListGroup.Item>
              <h2>Write a Comment</h2>
              {successSportReview && (
                <Message variant="success">
                  Comment submitted successfully
                </Message>
              )}
              {loadingSportReview && <Loader />}
              {errorSportReview && (
                <Message variant="danger">{errorSportReview}</Message>
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
                                                        disabled={loadingSportReview}
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

export default SportScreen;

