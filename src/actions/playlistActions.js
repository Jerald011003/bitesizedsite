import axios from 'axios';
import {
  PLAYLIST_CREATE_REQUEST,
  PLAYLIST_CREATE_SUCCESS,
  PLAYLIST_CREATE_FAIL,
  PLAYLIST_LIST_REQUEST,
  PLAYLIST_LIST_SUCCESS,
  PLAYLIST_LIST_FAIL,
  PLAYLIST_DELETE_REQUEST,
  PLAYLIST_DELETE_SUCCESS,
  PLAYLIST_DELETE_FAIL,
} from '../constants/playlistConstants';

export const createPlaylist = (playlist) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLAYLIST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const formData = new FormData();
    formData.append('title', playlist.title);
    formData.append('image', playlist.image);
    formData.append('link', playlist.link);


    const { data } = await axios.post(`https://bitesizedsite.pythonanywhere.com/api/playlists/create/`, formData, config);

    dispatch({ type: PLAYLIST_CREATE_SUCCESS, payload: data });

    // Retrieve the list of playlists and update the state
    dispatch(listPlaylists());
  } catch (error) {
    dispatch({
      type: PLAYLIST_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPlaylists = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PLAYLIST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`https://bitesizedsite.pythonanywhere.com/api/playlists/list/`, config);

    dispatch({ type: PLAYLIST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAYLIST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePlaylist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLAYLIST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`https://bitesizedsite.pythonanywhere.com/api/playlists/${id}/`, config);

    dispatch({ type: PLAYLIST_DELETE_SUCCESS, payload: id });

    // Retrieve the list of playlists and update the state
    dispatch(listPlaylists());
  } catch (error) {
    dispatch({
      type: PLAYLIST_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
