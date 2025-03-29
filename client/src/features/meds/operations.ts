import { createAsyncThunk } from "@reduxjs/toolkit";
import { AwaitedResponse } from "../types";
import { MedicationLog, MedSummariesByDate, MedSummaryByDate } from "./types";
import {
	fetchMedSummariesByDate,
	fetchMedSummaryByDate,
	saveMedicationLog,
} from "../../utils/utils_meds";

export interface MedLogBody {
	userID: string;
	medID: number;
	amountTaken: number;
	action: "Taken" | "Skipped";
	loggedAt: Date | string;
}

export interface MedSummaryParams {
	userID: string;
	scheduleID: number;
	targetDate: string;
}

interface MedLogParams {
	userID: string;
	medLog: MedLogBody;
}

const logMedication = createAsyncThunk(
	"medications/logMedication",
	async (params: MedLogParams) => {
		const { userID, medLog } = params;
		const response = (await saveMedicationLog(
			userID,
			medLog
		)) as AwaitedResponse<{ newLog: MedicationLog }>;
		const data = response.Data;
		return data as { newLog: MedicationLog };
	}
);

const getMedSummaryByDate = createAsyncThunk(
	"medications/getMedSummaryByDate",
	async (params: MedSummaryParams) => {
		const { userID } = params;
		const response = (await fetchMedSummaryByDate(
			userID,
			params
		)) as AwaitedResponse<MedSummaryByDate>;
		const data = response.Data;

		return data as MedSummaryByDate;
	}
);
const getMedSummariesByDate = createAsyncThunk(
	"medications/getMedSummariesByDate",
	async (params: { userID: string; targetDate: string }) => {
		const { userID, targetDate } = params;
		const response = (await fetchMedSummariesByDate(
			userID,
			targetDate
		)) as AwaitedResponse<MedSummariesByDate>;
		const data = response.Data;

		return data as MedSummaryByDate;
	}
);

export { logMedication, getMedSummaryByDate, getMedSummariesByDate };
