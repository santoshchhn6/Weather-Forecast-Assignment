import { createSlice } from "@reduxjs/toolkit";
type appState = {
  tempType: string;
  forecastTime: string;
};

const initialState: appState = {
  tempType: "celsius",
  forecastTime: "8:30 AM",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTempType(state, action) {
      state.tempType = action.payload;
    },
    setForecastTime(state, action) {
      state.forecastTime = action.payload;
    },
  },
});

export const { setTempType, setForecastTime } = appSlice.actions;
export default appSlice;
