import axios from 'axios'
import {
    NEWS_LIST_REQUEST,
    NEWS_LIST_SUCCESS,
    NEWS_LIST_FAIL,

    NEWS_DETAILS_REQUEST,
    NEWS_DETAILS_SUCCESS,
    NEWS_DETAILS_FAIL,

    NEWS_DELETE_REQUEST,
    NEWS_DELETE_SUCCESS,
    NEWS_DELETE_FAIL,

    NEWS_CREATE_REQUEST,
    NEWS_CREATE_SUCCESS,
    NEWS_CREATE_FAIL,

    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_UPDATE_FAIL,

    NEWS_CREATE_REVIEW_REQUEST,
    NEWS_CREATE_REVIEW_SUCCESS,
    NEWS_CREATE_REVIEW_FAIL,


    NEWS_TOP_REQUEST,
    NEWS_TOP_SUCCESS,
    NEWS_TOP_FAIL,

} from '../constants/newsConstants'

export const getUserNews = (keyword = '', userInfo = null) => async (dispatch) => {
    try {
      dispatch({ type: NEWS_LIST_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (userInfo) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
  
      const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/news/mynews`, config);
  
      dispatch({
        type: NEWS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEWS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
export const listNews = (keyword = '', userInfo = null) => async (dispatch) => {
    try {
      dispatch({ type: NEWS_LIST_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (userInfo) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
  
      const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/news${keyword}`, config);
  
      dispatch({
        type: NEWS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEWS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  

export const listTopNews = () => async (dispatch) => {
    try {
        dispatch({ type: NEWS_TOP_REQUEST })

        const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/news/top/`)

        dispatch({
            type: NEWS_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEWS_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listNewsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: NEWS_DETAILS_REQUEST })

        const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/news/${id}`)

        dispatch({
            type: NEWS_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEWS_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteNews = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NEWS_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `https://bitesizedsite.pythonanywhere.com/api/news/delete/${id}/`,
            config
        )

        dispatch({
            type: NEWS_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: NEWS_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createNews = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NEWS_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `https://bitesizedsite.pythonanywhere.com/api/news/newsitem/create/`,
            {},
            config
        )
        dispatch({
            type: NEWS_CREATE_SUCCESS,
            payload: data,
})


} catch (error) {
    dispatch({
        type: NEWS_CREATE_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}



export const updateNews = (newsitem) => async (dispatch, getState) => {
    try {
    dispatch({
    type: NEWS_UPDATE_REQUEST
    })

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put(
        `https://bitesizedsite.pythonanywhere.com/api/news/update/${newsitem._id}/`,
        newsitem,
        config
    )

    dispatch({
        type: NEWS_UPDATE_SUCCESS,
        payload: data
    })

} catch (error) {
    dispatch({
        type: NEWS_UPDATE_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}

export const createNewsReview = (newId, review) => async (dispatch, getState) => {
    try {
    dispatch({
    type: NEWS_CREATE_REVIEW_REQUEST
    })

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    await axios.post(
        `https://bitesizedsite.pythonanywhere.com/api/news/${newId}/reviews/`,
        review,
        config
    )

    dispatch({
        type: NEWS_CREATE_REVIEW_SUCCESS,
    })

} catch (error) {
    dispatch({
        type: NEWS_CREATE_REVIEW_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}
