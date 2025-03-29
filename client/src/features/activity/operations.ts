import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActivityTypes } from "../../utils/utils_activity";
import { AwaitedResponse } from "../types";
import { Activity } from "./types";

const getActivityTypes = createAsyncThunk(
	"activity/getActivityTypes",
	async () => {
		const response = (await fetchActivityTypes()) as AwaitedResponse<{
			activityTypes: Activity[];
		}>;
		const data = response.Data;

		return data.activityTypes as Activity[];
	}
);

export { getActivityTypes };
