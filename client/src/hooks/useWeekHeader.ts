import { useState } from "react";
import { formatDate } from "../utils/utils_dates";

const useWeekHeader = (
	base: Date | string = new Date(),
	onSelect?: (date: Date | string) => void
) => {
	const baseDate: string = formatDate(base, "url");
	const [selectedDate, setSelectedDate] = useState<Date | string>(baseDate);
	const selectDate = (date: Date | string) => {
		// const newDate = formatDate(date, "url");
		setSelectedDate(date);

		return onSelect && onSelect(date);
	};

	return {
		selectedDate,
		selectDate,
	};
};

export { useWeekHeader };
