import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchSelectedHistory,
	SelectedHistory,
} from "../../utils/utils_history";
import { Activity } from "../activity/types";
import { AwaitedResponse } from "../types";

export interface SelectedHistoryParams {
	userID: string;
	historyID: number;
	activityType: Activity;
}

const getSelectedHistory = createAsyncThunk(
	"history/getSelectedHistory",
	async (params: SelectedHistoryParams) => {
		const { userID, historyID, activityType } = params;
		const response = (await fetchSelectedHistory(
			userID,
			historyID,
			activityType
		)) as AwaitedResponse<SelectedHistory>;
		const data = response.Data;
		return data as SelectedHistory;
	}
);

export { getSelectedHistory };
