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

export const playlistReducer = (state = {}, action) => {
    switch (action.type) {
      case PLAYLIST_CREATE_REQUEST:
        return { loading: true };
      case PLAYLIST_CREATE_SUCCESS:
        return { loading: false, playlist: action.payload };
      case PLAYLIST_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PLAYLIST_DELETE_REQUEST:
        return { ...state, loading: true };
      case PLAYLIST_DELETE_SUCCESS:
        return {
            ...state,
            loading: false,
            playlists: state.playlists.filter((playlist) => playlist.id !== action.payload),
        };
      case PLAYLIST_DELETE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
};

export const playlistListReducer = (state = { loading: true, playlists: [] }, action) => {
    switch (action.type) {
      case PLAYLIST_LIST_REQUEST:
        return { loading: true };
      case PLAYLIST_LIST_SUCCESS:
        return { loading: false, playlists: action.payload };
      case PLAYLIST_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PLAYLIST_CREATE_REQUEST:
        return { ...state, loading: true };
      case PLAYLIST_CREATE_SUCCESS:
        return { ...state, loading: false, playlists: [...state.playlists, action.payload] };
      case PLAYLIST_CREATE_FAIL:
        return { ...state, loading: false, error: action.payload };
      case PLAYLIST_DELETE_REQUEST:
        return { ...state, loading: true };
      case PLAYLIST_DELETE_SUCCESS:
        return {
            ...state,
            loading: false,
            playlists: state.playlists.filter((playlist) => playlist.id !== action.payload),
        };
      case PLAYLIST_DELETE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
};
