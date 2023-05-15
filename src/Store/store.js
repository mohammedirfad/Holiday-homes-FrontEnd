import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore ,
    persistReducer ,
    FLUSH ,
    REHYDRATE ,  
    PAUSE ,
    PERSIST ,
    PURGE ,
    REGISTER      
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authSlice  from '../../src/Store/features/authSlice';
import LocationSlice from '../Store/features/UserLocationSlice'
import HostStep1slice from '../Store/features/HostSlicestep1'
import HostStep2slice from '../Store/features/HostSlicestep2'
import HostStep3slice from '../Store/features/HostSlicestep3'
import HostVerify from "./features/HostVerification";
import AdminSlice from "./features/AdminSlice";


const LoginpersistConfig = { key: "userAuth" , storage , version : 1};
const LocationpersistConfig = { key : "Location" , storage , version : 1};
const Hoststep1persistConfig = { key : "Hostslice1" , storage , version : 1};
const Hoststep2persistConfig = { key : "Hostslice2" , storage , version : 1};
const Hoststep3persistConfig = { key : "Hostslice3" , storage , version : 1};
const HostverifypersistConfig = { key : "HostVerifys" , storage , version : 1};
const AdminpersistCongig = { key : "adminAuth" , storage , version : 1};


const UserLoginpersistReducer = persistReducer(LoginpersistConfig, authSlice.reducer);
const UserLocationpersistReducer = persistReducer(LocationpersistConfig, LocationSlice.reducer);
const Hostslicestep1persistReducer = persistReducer(Hoststep1persistConfig, HostStep1slice.reducer);
const Hostslicestep2persistReducer = persistReducer(Hoststep2persistConfig, HostStep2slice.reducer);
const Hostslicestep3persistReducer = persistReducer(Hoststep3persistConfig, HostStep3slice.reducer);
const HostssliceverifypersistReducer = persistReducer(HostverifypersistConfig, HostVerify.reducer);
const AdminSlicepersistReducer = persistReducer(AdminpersistCongig, AdminSlice.reducer);

export const store = configureStore({
  reducer: {
    userAuth: UserLoginpersistReducer,
    Location:UserLocationpersistReducer,
    Hostslice1:Hostslicestep1persistReducer,
    Hostslice2:Hostslicestep2persistReducer,
    Hostslice3:Hostslicestep3persistReducer,
    HostVerifys:HostssliceverifypersistReducer, 
    adminAuth:AdminSlicepersistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
