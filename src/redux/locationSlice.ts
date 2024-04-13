import { createSlice } from "@reduxjs/toolkit";
import { LocationType } from "../utils/types";
type LocationState = {
  locations: LocationType[];
  loading: boolean;
  error: string | null;
};

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation(state, action) {
      state.locations.push(...action.payload);
    },
  },
});

export const { addLocation } = locationSlice.actions;
export default locationSlice;
