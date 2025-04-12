import React from "react";
import styles from "../../css/history/HistoryCalendarSelector.module.scss";
import { eachDayOfInterval, subMonths } from "date-fns";

// REQUIREMENTS:
// - Scrollable calendar picker for date ranges
// - Shows month prefix for the start of each month with a divider
// - Shows preset buttons on a fixed sidebar or footer panel for: 'Last Month', 'This Month', 'Today', 'This Week' etc
// - Shows Confirm/Clear actinos in the footer for confirmation

type Props = {};

const getLastXMonths = (last: number = 3) => {
	const now = new Date();
	const start = subMonths(now, last);
	const end = now;
	const dates = eachDayOfInterval({ start, end });

	return dates;
};

const HistoryCalendarSelector = ({}: Props) => {
	return (
		<div className={styles.HistoryCalendarSelector}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryCalendarSelector;
