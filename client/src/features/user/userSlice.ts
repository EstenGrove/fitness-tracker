import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./operations";
import { CurrentSession, CurrentUser } from "./types";
import { TStatus } from "../../store/types";
import { RootState } from "../../store/store";

const fakeUser: CurrentUser = {
	userID: "e7aee10d-6f2b-4756-947a-31090dc7ab0e",
	username: "estengrove99@gmail.com",
	password: "1234",
	firstName: "Steven",
	lastName: "Gore",
	userAvatar: null,
	isActive: true,
	createdDate: new Date().toString(),
	lastLoginDate: new Date().toString(),
	token: null,
};

interface UserSlice {
	status: TStatus;
	currentUser: CurrentUser | null;
	currentSession: CurrentSession | null;
}

const initialState: UserSlice = {
	status: "IDLE",
	currentUser: fakeUser,
	currentSession: null,
};

const userSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(logoutUser.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = "FULFILLED";
			});
	},
});

export const selectCurrentUser = (state: RootState) => {
	return state.user.currentUser as CurrentUser;
};
export const selectCurrentSession = (state: RootState) => {
	return state.user.currentSession as CurrentSession;
};

export default userSlice.reducer;
