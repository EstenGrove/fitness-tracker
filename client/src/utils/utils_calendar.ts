import { eachDayOfInterval, subMonths } from "date-fns";

const getLastXMonthsRange = (last: number = 3) => {
	const now = new Date();
	const start = subMonths(now, last);
	const end = now;
	const dates = eachDayOfInterval({ start, end });

	return {
		startDate: start,
		endDate: end,
		dates: dates,
	};
};

const getLastXMonths = (last: number = 3) => {
	const now = new Date();
	const start = subMonths(now, last);
	const end = now;
	const dates = eachDayOfInterval({ start, end });

	return dates;
};

export { getLastXMonths, getLastXMonthsRange };
