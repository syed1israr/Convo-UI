import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api.js";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat.js";


const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
{/*
  Hi
*/}