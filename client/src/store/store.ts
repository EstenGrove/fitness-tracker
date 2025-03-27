import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// slice reducers
import userReducer from "../features/user/userSlice";
import medsReducer from "../features/meds/medsSlice";
import sharedReducer from "../features/shared/sharedSlice";
import historyReducer from "../features/history/historySlice";
import workoutsReducer from "../features/workouts/workoutsSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		meds: medsReducer,
		shared: sharedReducer,
		history: historyReducer,
		workouts: workoutsReducer,
		dashboard: dashboardReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
