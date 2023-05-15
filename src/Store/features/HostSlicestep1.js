import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={
    name:null,
    user:null,
    token:null,
    structure:null,
    host_id:null,
    floorPlan:{
        guest:1,
        bedrooms:1,
        bathrooms:1,
        bed:1
    },
    status:null

};

const HostStep1slice = createSlice({
    name:'Hostslice1',
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