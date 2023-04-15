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
    SPORTS_CREATE_RESET,
    SPORTS_UPDATE_REQUEST,
    SPORTS_UPDATE_SUCCESS,
    SPORTS_UPDATE_FAIL,
    SPORTS_UPDATE_RESET,
    SPORTS_CREATE_REVIEW_REQUEST,
    SPORTS_CREATE_REVIEW_SUCCESS,
    SPORTS_CREATE_REVIEW_FAIL,
    SPORTS_CREATE_REVIEW_RESET,
    SPORTS_TOP_REQUEST,
    SPORTS_TOP_SUCCESS,
    SPORTS_TOP_FAIL,
  } from '../constants/sportConstants';
  
  export const sportsListReducer = (state = { sports: [] }, action) => {
    switch (action.type) {
      case SPORTS_LIST_REQUEST:
        return { loading: true, sports: [] };
  
      case SPORTS_LIST_SUCCESS:
        return {
          loading: false,
          sports: action.payload.sports,
          page: action.payload.page,
          pages: action.payload.pages,
        };
  
      case SPORTS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  
  export const sportsDetailsReducer = (state = { sportitem: { reviews: [] } }, action) => {
    switch (action.type) {
      case SPORTS_DETAILS_REQUEST:
        return { loading: true, ...state };
  
      case SPORTS_DETAILS_SUCCESS:
        return { loading: false, sportitem: action.payload };
  
      case SPORTS_DETAILS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const sportsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SPORTS_DELETE_REQUEST:
        return { loading: true };
  
      case SPORTS_DELETE_SUCCESS:
        return { loading: false, success: true };
  
      case SPORTS_DELETE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const sportsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SPORTS_CREATE_REQUEST:
        return { loading: true };
  
      case SPORTS_CREATE_SUCCESS:
        return { loading: false, success: true, sportitem: action.payload };
  
      case SPORTS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      case SPORTS_CREATE_RESET:
        return {};
  
      default:
        return state;
    }
  };
  
  export const sportsUpdateReducer = (state = { sportitem: {} }, action) => {
    switch (action.type) {
      case SPORTS_UPDATE_REQUEST:
        return { loading: true };
  
      case SPORTS_UPDATE_SUCCESS:
        return { loading: false, success: true, sportitem: action.payload };
  
      case SPORTS_UPDATE_FAIL:
        return { loading: false, error: action.payload };
  
      case SPORTS_UPDATE_RESET:
        return { sportitem: {} };
  
      default:
        return state;
    }
  };
  
  export const sportsReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SPORTS_CREATE_REVIEW_REQUEST:
        return { loading: true };
  
      case SPORTS_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true };
  
      case SPORTS_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload };
  
      case SPORTS_CREATE_REVIEW_RESET:
        return {};
  
      default:
        return state;
    }
  };

        
  export const sportsTopReducer = (state = { sports: [] }, action) => {
    switch (action.type) {
      case SPORTS_TOP_REQUEST:
        return { loading: true, sports: [] };
          
      case SPORTS_TOP_SUCCESS:
        return { loading: false, sports: action.payload };
          
      case SPORTS_TOP_FAIL:
        return { loading: false, error: action.payload };
          
      default:
        return state;
    }
  };
  