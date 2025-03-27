import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const sharedSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
});

export default sharedSlice.reducer;
