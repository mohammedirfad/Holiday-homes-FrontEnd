import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={
    name:null,
    user:null,
    token:null,
   

};

const Bookingslice = createSlice({
    name:'Bookslice1',
    initialState,
    reducers:{
        setHoststep1: (state,action) =>{
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.structure = action.payload.structure;
        //    state.guest = action.payload.floorPlan.guest
           state.host_id = action.payload.host_id;
           state.status = action.payload.status;
        },
    }
});

export const { setHoststep1 } = HostStep1slice.actions;

export default HostStep1slice;