import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listNewsDetails, updateNews } from '../actions/newsActions'
import { NEWS_UPDATE_RESET } from '../constants/newsConstants'

function NewsEditScreen({ match, history }) {

    const newsId = match.params.id

const [headline, setHeadline] = useState('')
const [description, setDescription] = useState('')
const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false)
const [category, setCategory] = useState()

const dispatch = useDispatch()

const newsDetails = useSelector(state => state.newsDetails)
const { error, loading, newsitem } = newsDetails

const newsUpdate = useSelector(state => state.newsUpdate)
const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = newsUpdate

useEffect(() => {

    if (successUpdate) {
        dispatch({ type: NEWS_UPDATE_RESET })
        history.push('/newslist')
    } else {
        if (!newsitem.headline || newsitem._id !== Number(newsId)) {
            dispatch(listNewsDetails(newsId))
        } else {
            setHeadline(newsitem.headline)
            setDescription(newsitem.description)
            setImage(newsitem.image)
            setCategory(newsitem.category)

        }
    }
}, [dispatch, newsitem, newsId, history, successUpdate])

const submitHandler = (e) => {
    e.preventDefault()
    console.log(category); // Add this line to check the value of the category field

    dispatch(updateNews({
        _id: newsId,
        headline,
        description,
        image,
        category
    }))
}

const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('newsitem_id', newsId)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('https://bitesizedsite.pythonanywhere.com/api/news/upload/', formData, config)

        setImage(data)
        setUploading(false)

    } catch (error) {
        setUploading(false)
    }
}

return (
    <div>
        <Link to='/newslist'>
            Go Back
        </Link>

        <FormContainer>
            <h1>Edit News</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>You are not the owner bitch!</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='headline'>
                            <Form.Label>headline</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter headline'
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image URL'
                                value={image}
                                onChange={(e) => setImage(e.target
                                    .value)}
                                    ></Form.Control>
                                    <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                    ></Form.File>
                                    {uploading && <Loader />}
                                    </Form.Group>                    
                                    <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as='select'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value=''>Select category...</option>
                                <option value='politics'>Politics</option>
                                <option value='sports'>Sports</option>
                                <option value='gaming'>Gaming</option>
                            </Form.Control>
                        </Form.Group>
                                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            )
        }
    </FormContainer>
</div>
)}

export default NewsEditScreen



