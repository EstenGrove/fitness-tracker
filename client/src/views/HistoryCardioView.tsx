import styles from "../css/views/HistoryCardioView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { getLastXMonthsRange } from "../utils/utils_calendar";
import { formatDate } from "../utils/utils_dates";

const HistoryCardioView = () => {
	const range = getLastXMonthsRange(3);
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading, error } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Cardio",
		startDate: formatDate(range.startDate, "db"),
		endDate: formatDate(range.endDate, "db"),
	});

	console.log("data", data);
	return (
		<div className={styles.HistoryCardioView}>
			<h2>Cardio Page</h2>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryCardioView;
