import axios from 'axios';
import {
  SPORTS_LIST_REQUEST,
  SPORTS_LIST_SUCCESS,
  SPORTS_LIST_FAIL,
  SPORTS_DETAILS_REQUEST,
  SPORTS_DETAILS_SUCCESS,
  SPORTS_DETAILS_FAIL,
  SPORTS_DELETE_REQUEST,
  SPORTS_DELETE_SUCCESS,
  SPORTS_DELETE_FAIL,
  SPORTS_CREATE_REQUEST,
  SPORTS_CREATE_SUCCESS,
  SPORTS_CREATE_FAIL,
  SPORTS_UPDATE_REQUEST,
  SPORTS_UPDATE_SUCCESS,
  SPORTS_UPDATE_FAIL,
  SPORTS_CREATE_REVIEW_REQUEST,
  SPORTS_CREATE_REVIEW_SUCCESS,
  SPORTS_CREATE_REVIEW_FAIL,
  SPORTS_TOP_REQUEST,
  SPORTS_TOP_SUCCESS,
  SPORTS_TOP_FAIL,
} from '../constants/sportConstants';

export const listSports = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: SPORTS_LIST_REQUEST });
    const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/sports${keyword}`);
    dispatch({
      type: SPORTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SPORTS_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const listTopSports = () => async (dispatch) => {
  try {
    dispatch({ type: SPORTS_TOP_REQUEST });
    const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/sports/top/`);
    dispatch({
      type: SPORTS_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SPORTS_TOP_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const listSportsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SPORTS_DETAILS_REQUEST });
    const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/sports/${id}`);
    dispatch({
      type: SPORTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SPORTS_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const deleteSports = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SPORTS_DELETE_REQUEST });
    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`https://bitesizedsite.pythonanywhere.com/api/sports/delete/${id}/`, config);
    dispatch({ type: SPORTS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SPORTS_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const createSports = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: SPORTS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`https://bitesizedsite.pythonanywhere.com/api/sports/create/`, {}, config);
  
      dispatch({
        type: SPORTS_CREATE_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: SPORTS_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const updateSports = (sports) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SPORTS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `https://bitesizedsite.pythonanywhere.com/api/sports/update/${sports._id}/`,
        sports,
        config
      );
  
      dispatch({
        type: SPORTS_UPDATE_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: SPORTS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const createSportsReview = (sportsId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SPORTS_CREATE_REVIEW_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.post(`https://bitesizedsite.pythonanywhere.com/api/sports/${sportsId}/reviews/`, review, config);
  
      dispatch({
        type: SPORTS_CREATE_REVIEW_SUCCESS,
      });
  
    } catch (error) {
      dispatch({
        type: SPORTS_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  