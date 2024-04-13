import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import appSlice from "./appSlice";

const store = configureStore({
  reducer: {
    locations: locationSlice.reducer,
    app: appSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
