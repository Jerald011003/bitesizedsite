import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
 
    
} from './reducers/productReducers'

import {
    newsListReducer,
    newsDetailsReducer,
    newsDeleteReducer,
    newsCreateReducer,
    newsUpdateReducer,
    newsReviewCreateReducer,
    newsTopRatedReducer,
  
    
} from './reducers/newsReducer'

import {
    sportsListReducer,
    sportsDetailsReducer,
    sportsDeleteReducer,
    sportsCreateReducer,
    sportsUpdateReducer,
    sportsReviewCreateReducer,
    sportsTopReducer,
  
    
} from './reducers/sportReducer'

import { cartReducer } from './reducers/cartReducers'
// import { newscartReducer } from './reducers/newscartReducers'
import { playlistListReducer, playlistReducer } from './reducers/playlistReducer'
import { wishReducer } from './reducers/wishReducers'
import { preorderReducer } from './reducers/preorderReducer'
// import { chatboxReducer} from './reducers/chatboxReducer'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

   
    newsList: newsListReducer,
    newsDetails: newsDetailsReducer,
    newsDelete: newsDeleteReducer,
    newsCreate: newsCreateReducer,
    newsUpdate: newsUpdateReducer,
    newsReviewCreate: newsReviewCreateReducer,
    newsTopRated: newsTopRatedReducer,

    sportsList: sportsListReducer,
    sportsDetails: sportsDetailsReducer,
    sportsDelete: sportsDeleteReducer,
    sportsCreate: sportsCreateReducer,
    sportsUpdate: sportsUpdateReducer,
    sportsReviewCreate: sportsReviewCreateReducer,
    sportsTopRated: sportsTopReducer,
    // newss: news,

    cart: cartReducer,
    // newscart: newscartReducer,
    playlistList: playlistListReducer,

    playlists: playlistListReducer,
    playlist: playlistReducer,
    wishlist: wishReducer,
    // chatbox: chatboxReducer,
    // friendsList: friendsListReducer,
    preorder: preorderReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

// const newscartItemsFromStorage = localStorage.getItem('newscartItems') ?
//     JSON.parse(localStorage.getItem('newscartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        // newscartItems: newscartItemsFromStorage,

    },
    userLogin: { userInfo: userInfoFromStorage },
}



const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store