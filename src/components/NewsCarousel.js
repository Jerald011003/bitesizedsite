import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopNews } from '../actions/newsActions'

function NewsCarousel() {
    const dispatch = useDispatch()

    const  newsTopRated = useSelector(state => state. newsTopRated)
    const { error, loading, news } =  newsTopRated

    useEffect(() => {
        dispatch(listTopNews())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {news.map(newsitem => (
                        <Carousel.Item key={newsitem._id}>
                            <Link to={`/news/${newsitem._id}`}>
                                <Image src={newsitem.image} alt={newsitem.title} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{newsitem.title} - {newsitem.name} </h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default NewsCarousel
