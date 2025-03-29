import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { activityApi } from "../features/activity/activityApi";
import { sharedApi } from "../features/shared/sharedApi";
import { workoutsApi } from "../features/workouts/workoutsApi";
// slice reducers
import userReducer from "../features/user/userSlice";
import medsReducer from "../features/meds/medsSlice";
import sharedReducer from "../features/shared/sharedSlice";
import historyReducer from "../features/history/historySlice";
import workoutsReducer from "../features/workouts/workoutsSlice";
import activityReducer from "../features/activity/activitySlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		meds: medsReducer,
		shared: sharedReducer,
		history: historyReducer,
		workouts: workoutsReducer,
		activity: activityReducer,
		dashboard: dashboardReducer,
		[activityApi.reducerPath]: activityApi.reducer,
		[sharedApi.reducerPath]: sharedApi.reducer,
		[workoutsApi.reducerPath]: workoutsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(activityApi.middleware)
			.concat(sharedApi.middleware)
			.concat(workoutsApi.middleware);
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// ALWAYS USE THIS VIA: const dispatch = useAppDispatch();
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store };
