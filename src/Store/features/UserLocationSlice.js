import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={
    name:null,
    longitude:"",
    latitude:"",
    city : ""
};

const LocationSlice = createSlice({
    name:'Location',
    initialState,
    reducers:{
        setLocation: (state,action) =>{
            state.name = action.name;
            state.longitude = action.longitude;
            state.latitude = action.latitude;
            state.city = action.latitude;
        },
    }
});

export const { setLocation } = LocationSlice.actions;

export default LocationSlice;