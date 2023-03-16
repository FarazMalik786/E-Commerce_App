import { configureStore } from '@reduxjs/toolkit';
import basicinforeducer from "./Basic_Info";
import cart_reducer from './Cart_Info';

export const mystore = configureStore({
    reducer:{
        user_information: basicinforeducer,
        cart_information: cart_reducer,
    },
});