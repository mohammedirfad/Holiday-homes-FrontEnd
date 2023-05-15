import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={
    name:null,
    user:null,
    token:null,
    amenities : [],
    image : null,
    Price:null,
    host_id:null,
    

};

const HostStep3slice = createSlice({
    name:'Hostslice3',
    initialState,
    reducers:{
        setHoststep3: (state,action) =>{
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.Price = action.payload.Price;
            state.amenities= action.payload.amenities;
            state.host_id = action.payload.host_id;
        },
    }
});

export const { setHoststep3 } = HostStep3slice.actions;

export default HostStep3slice;