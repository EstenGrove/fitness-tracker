import { useState } from "react";
import { formatDate } from "../utils/utils_dates";

const useWeekHeader = (
	base: Date = new Date(),
	onSelect?: (date: Date | string) => void
) => {
	const baseDate = formatDate(base, "url");
	const [selectedDate, setSelectedDate] = useState<string>(baseDate);

	const selectDate = (date: Date | string) => {
		const newDate = formatDate(date, "url");
		setSelectedDate(newDate);

		return onSelect && onSelect(newDate);
	};

	return {
		selectedDate,
		selectDate,
	};
};

export { useWeekHeader };
