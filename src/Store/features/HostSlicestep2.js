import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={
    name:null,
    user:null,
    token:null,
    amenities:null,
    host_id:null,
    
   description:null,
   adddescriptions:"Youll have a great time at this comfortable place to stay.",
   title:null,
   


};

const HostStep2slice = createSlice({
    name:'Hostslice2',
    initialState,
    reducers:{
        setHoststep2: (state,action) =>{
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.host_id = action.payload.host_id;
            state.description = action.payload.description;
            state.adddescriptions = action.payload.adddescriptions;
            state.title = action.payload.title;
        },
    }
});

export const { setHoststep2 } = HostStep2slice.actions;

export default HostStep2slice;