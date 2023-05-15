import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    user: null,
    name: null,
    token: null,
    id :null,
    imageUrl: null,
    userBooking:[],

    total:null,
    numberOfDays:null, 
    checkindate:null,
    checkoutdate:null,
};

const authSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers :{
        setLogin : (state, action) => {
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.imageUrl = action.payload.imageUrl;
            state.userBooking = action.payload.userBooking;
            state.total = action.payload.total;
            state.checkindate = action.payload.checkindate;
            state.checkoutdate = action.payload.checkoutdate;
            state.numberOfDays = action.payload.numberOfDays;
        },

        setLogout : (state) => {
            state.user = null;
            state.token = null;
            state.id = null;
            state.name = null;
            state.imageUrl = null;
        },
    },
   
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice;