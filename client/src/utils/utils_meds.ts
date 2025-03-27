import { MedLogBody, MedSummaryParams } from "../features/meds/operations";
import {
	MedicationLog,
	MedSummariesByDate,
	MedSummaryByDate,
} from "../features/meds/types";
import { AsyncResponse } from "../features/types";
import { currentEnv, medicationApis } from "./utils_env";

// Records a single medication dose log
const saveMedicationLog = async (
	userID: string,
	medLog: MedLogBody
): AsyncResponse<{ newLog: MedicationLog }> => {
	let url = currentEnv.base + medicationApis.logMed;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify(medLog),
		});
		const response = await request.json();
		console.log("response", response);
		return response as AsyncResponse<{ newLog: MedicationLog }>;
	} catch (error) {
		return error;
	}
};

// Fetches Pill Summary for a given date, defaults to today
const fetchMedSummaryByDate = async (
	userID: string,
	values: MedSummaryParams
): AsyncResponse<MedSummaryByDate> => {
	const { scheduleID, targetDate } = values;

	let url = currentEnv.base + medicationApis.getSummaryByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ scheduleID: String(scheduleID) });
	url += "&" + new URLSearchParams({ targetDate: targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response as AsyncResponse<MedSummaryByDate>;
	} catch (error) {
		return error;
	}
};
// Fetches Pill Summary for a given date, defaults to today
const fetchMedSummariesByDate = async (
	userID: string,
	targetDate: string
): AsyncResponse<MedSummariesByDate> => {
	let url = currentEnv.base + medicationApis.getSummariesByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ targetDate: targetDate });

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: { Accept: "application/json" },
		});
		const response = await request.json();

		return response as AsyncResponse<MedSummariesByDate>;
	} catch (error) {
		return error;
	}
};

export { saveMedicationLog, fetchMedSummaryByDate, fetchMedSummariesByDate };
