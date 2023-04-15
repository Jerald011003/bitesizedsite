import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { getUserNews, listNews, deleteNews, createNews } from '../actions/newsActions';
import { NEWS_CREATE_RESET } from '../constants/newsConstants';

function NewsListScreen({ history, match }) {

    const dispatch = useDispatch();

const newsList = useSelector(state => state.newsList);
const { loading, error, news, pages, page } = newsList;

const newsDelete = useSelector(state => state.newsDelete);
const { loading: loadingDelete, error: errorDelete, success: successDelete } = newsDelete;

const newsCreate = useSelector(state => state.newsCreate);
const { loading: loadingCreate, error: errorCreate, success: successCreate, newsitem: createdNews } = newsCreate;

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

let keyword = history.location.search;

useEffect(() => {
    dispatch({ type: NEWS_CREATE_RESET });
  
    if (!userInfo) {
      history.push('/login');
    }
  
    if (successCreate) {
      history.push(`/create/news/${createdNews._id}/edit`);
    } else {
      dispatch(getUserNews(keyword, userInfo)); // Pass the userInfo object to filter news items by user
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdNews, keyword]);
  

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this news?')) {
        dispatch(deleteNews(id));
    }
}

const createNewsHandler = () => {
    dispatch(createNews());
}

return (
    <div>
        <Row className='align-items-center'>
           

            <Col className='text-right'>
                <Button className='my-3' onClick={createNewsHandler}>
                    <i className='fas fa-plus'></i> Create
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>You are not the owner</Message>}


        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading
            ? (<Loader />)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>TITLE</th>
                                    <th>DESCRIPTION</th>
                                    <th>DATE</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {news.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.user}</td>

                                        <td>{item.headline}</td>
                                        <td>{item.description}</td>
                                        {/* <td>{item.createdAt.substring(0, 10)}</td> */}

                                        <td>
                                            <LinkContainer to={`/create/news/${item._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(item._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                       
                            </Table>                    <Paginate pages={pages} page={page} keyword={keyword} />
                </div>
            )
    }
</div>
)}

export default NewsListScreen;