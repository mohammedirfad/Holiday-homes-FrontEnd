import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    name:null,
    user:null,
    token:null,
    host_id:null,
    IdType:"DrivingLicense",
    frontImage:null,
    BackImage:null,
    hostSelfie:null

};
const HostVerify = createSlice({
    name:'HostVerifys',
    initialState,
    reducers:{
        setHostVerify: (state,action) =>{
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.host_id = action.payload.host_id
            state.IdType = action.payload.IdType;
            state.frontImage = action.payload.frontImage;
            state.BackImage = action.payload.BackImage;
            state.hostSelfie = action.payload.hostSelfie;
        },
    }
});

export const { setHostVerify } = HostVerify.actions;

export default HostVerify;