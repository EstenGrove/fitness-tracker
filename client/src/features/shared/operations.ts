import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSharedAppData, SharedData } from "../../utils/utils_shared";
import { AwaitedResponse } from "../types";

const getSharedAppData = createAsyncThunk(
	"shared/getSharedAppData",
	async () => {
		const response =
			(await fetchSharedAppData()) as AwaitedResponse<SharedData>;
		const data = response.Data;

		return data as SharedData;
	}
);

export { getSharedAppData };
