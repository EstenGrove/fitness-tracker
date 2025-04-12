import { useSelector } from "react-redux";
import { useQueryParams } from "./useQueryParams";
import { DateRange } from "../features/types";
import { useCallback, useMemo } from "react";
import { selectHistoryRange } from "../features/history/historySlice";

const useHistoryRange = () => {
	const params = useQueryParams();
	const rangeState = useSelector(selectHistoryRange);
	const baseRange = params.getParams() as Record<string, string>;

	const getRange = useCallback(() => {
		if ("startDate" in baseRange && "endDate" in baseRange) {
			return baseRange as unknown as DateRange;
		} else {
			return rangeState as DateRange;
		}
	}, [baseRange, rangeState]);

	const dateRange = useMemo(() => {
		return getRange();
	}, [getRange]);

	return dateRange;
};

export { useHistoryRange };
