import styles from "../css/views/HistoryStretchView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { useHistoryRange } from "../hooks/useHistoryRange";

const HistoryStretchView = () => {
	const range = useHistoryRange();
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading, error } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Stretch",
		...range,
	});

	console.log("data", data);
	return (
		<div className={styles.HistoryStretchView}>
			<h2>Stretch Page</h2>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryStretchView;
