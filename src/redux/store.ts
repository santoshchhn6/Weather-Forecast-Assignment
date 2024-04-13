import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";

const store = configureStore({
  reducer: {
    locations: locationSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
