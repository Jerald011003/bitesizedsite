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
    NEWS_CREATE_RESET,
  
    NEWS_UPDATE_REQUEST,
    NEWS_UPDATE_SUCCESS,
    NEWS_UPDATE_FAIL,
    NEWS_UPDATE_RESET,
  
    NEWS_CREATE_REVIEW_REQUEST,
    NEWS_CREATE_REVIEW_SUCCESS,
    NEWS_CREATE_REVIEW_FAIL,
    NEWS_CREATE_REVIEW_RESET,
  
    NEWS_TOP_REQUEST,
    NEWS_TOP_SUCCESS,
    NEWS_TOP_FAIL,
  } from '../constants/newsConstants'
  
  export const newsListReducer = (state = { news: [] }, action) => {
    switch (action.type) {
      case NEWS_LIST_REQUEST:
        return { loading: true, news: [] }
  
      case NEWS_LIST_SUCCESS:
        return {
          loading: false,
          news: action.payload.news,
          page: action.payload.page,
          pages: action.payload.pages,
        }
  
      case NEWS_LIST_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }
  
  export const newsDetailsReducer = (state = { newsitem: { reviews: [] } }, action) => {
    switch (action.type) {
      case NEWS_DETAILS_REQUEST:
        return { loading: true, ...state }
  
      case NEWS_DETAILS_SUCCESS:
        return { loading: false, newsitem: action.payload }
  
      case NEWS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }
  
  export const newsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWS_DELETE_REQUEST:
        return { loading: true }
  
      case NEWS_DELETE_SUCCESS:
        return { loading: false, success: true }
  
      case NEWS_DELETE_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }
  
  export const newsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWS_CREATE_REQUEST:
        return { loading: true }
  
      case NEWS_CREATE_SUCCESS:
        return { loading: false, success: true, newsitem: action.payload }
  
      case NEWS_CREATE_FAIL:
        return { loading: false, error: action.payload }
  
      case NEWS_CREATE_RESET:
        return {}
  
      default:
        return state
    }
  }
  
  export const newsUpdateReducer = (state = { newsitem: {} }, action) => {
    switch (action.type) {
      case NEWS_UPDATE_REQUEST:
        return { loading: true }
  
      case NEWS_UPDATE_SUCCESS:
        return { loading: false, success: true, newsitem: action.payload }
  
      case NEWS_UPDATE_FAIL:
        return { loading: false, error: action.payload }
  
      case NEWS_UPDATE_RESET:
        return { newsitem: {} }
  
      default:
        return state
    }
  }
  
  export const newsReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWS_CREATE_REVIEW_REQUEST:
        return { loading: true }
  
      case NEWS_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
  
      case NEWS_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
  
      case NEWS_CREATE_REVIEW_RESET:
        return {}
  
      default:
        return state
    }
}

export const newsTopRatedReducer = (state = { news: [] }, action) => {
    switch (action.type) {
      case NEWS_TOP_REQUEST:
        return { loading: true, news: [] }
  
      case NEWS_TOP_SUCCESS:
        return { loading: false, news: action.payload }
  
      case NEWS_TOP_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }
  