import {createSlice , createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    user: null,
    name: null,
    admin_token: null,
   
};

const AdminSlice = createSlice({
    name:"adminAuth",
    initialState,
    reducers :{
        setLogin : (state, action) => {
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.admin_token = action.payload.admin_token;
          
        },

        setLogout : (state) => {
            state.user = null;
            state.token = null;
           
            state.name = null;
         
        },
    },
   
});

export const {setLogin, setLogout} = AdminSlice.actions;

export default AdminSlice;