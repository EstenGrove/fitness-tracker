import { RepeatType } from "../shared/types";

export interface Medication {
	medID: number;
	scheduleID: number;
	scheduleStart: string;
	scheduleEnd: string;
	medName: string;
	dosage: string | number;
	quantity: number;
	refillDate: string;
	refillInterval: Uppercase<RepeatType>;
}

export interface MedicationSchedule {
	userID: string;
	medID: number;
	scheduleID: number;
	startDate: string;
	endDate: string;
	dosageDesc: string;
	scheduleDose: number;
	scheduleFrequency: string;
	scheduleQuantity: number;
	isActive: boolean;
	createdDate: string;
}

// aka. MedLogEntry
export interface MedicationLog {
	logID: number;
	scheduleID: number;
	loggedAt: string;
	dose: number;
	notes: string;
	pillSizeInMg: number;
}

export interface PillSummary {
	scheduleID?: number;
	daysLeft: number;
	totalPills: number;
	pillsTaken: number;
	pillsRemaining: number;
	pillsTakenToday: number;
}

export interface MedScheduleSummary {
	scheduleID: number;
	startDate: string;
	endDate: string;
	daysLeft: number;
	createdDate: string;
}

export interface SummaryForDate {
	date: string;
	summaries: PillSummary[];
	logs: MedicationLog[];
}

export interface MedSummaryByDate {
	scheduleID: number;
	date: string;
	summaries: PillSummary[];
	logs: MedicationLog[];
}
export interface MedSummariesByDate {
	date: string;
	summaries: PillSummary[];
	logs: MedicationLog[];
}
