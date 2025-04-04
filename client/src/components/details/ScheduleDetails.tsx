import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/ScheduleDetails.module.scss";
import { WorkoutSchedule } from "../../features/workouts/types";
import DetailsItem from "./DetailsItem";
import { RepeatType } from "../../features/shared/types";
import {
	formatDate,
	formatTime,
	parseAnyTime,
	parseTime,
} from "../../utils/utils_dates";

type Props = {
	schedule: WorkoutSchedule;
};

const RepeatTypeBadge = ({ repeatType }: { repeatType: RepeatType }) => {
	return (
		<div className={styles.RepeatTypeBadge}>
			<svg className={styles.RepeatTypeBadge_icon}>
				<use xlinkHref={`${sprite}#icon-synchronize`}></use>
			</svg>
			<span>{repeatType}</span>
		</div>
	);
};

const getWhenDates = (schedule: WorkoutSchedule) => {
	const { startDate, endDate } = schedule;
	const start = formatDate(startDate, "clean");
	const end = formatDate(endDate, "clean");

	return `${start} to ${end}`;
};

// Convert start times
const getWhenTimes = (schedule: WorkoutSchedule) => {
	if (!schedule.startTime && !schedule.endTime) {
		return "All Day";
	} else {
		const startP = parseAnyTime(schedule.startTime);
		const endP = parseAnyTime(schedule.endTime);
		const start = formatTime(startP, "short");
		const end = formatTime(endP, "short");
		// convert times
		return `${start} - ${end}`;
	}
};

const ScheduleDetails = ({ schedule }: Props) => {
	console.log("schedule", schedule);
	if (!schedule) return null;
	console.log("schedule", schedule);
	const { frequency } = schedule;
	const when = getWhenTimes(schedule);
	const whenDates = getWhenDates(schedule);
	console.log("when", when);
	console.log("whenDates", whenDates);

	return (
		<div className={styles.ScheduleDetails}>
			<DetailsItem icon="freq" label="Repeats: ">
				<span>{frequency}</span>
			</DetailsItem>
			<DetailsItem icon="start" label="When: ">
				<span>{when}</span>
			</DetailsItem>
			<DetailsItem icon="start" label="From: ">
				<span>{whenDates}</span>
			</DetailsItem>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ScheduleDetails;
