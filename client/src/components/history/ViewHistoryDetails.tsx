import styles from "../../css/history/ViewHistoryDetails.module.scss";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";
import {
	selectLoadingWorkout,
	selectSelectedWorkout,
} from "../../features/workouts/workoutsSlice";
import { getSelectedWorkout } from "../../features/workouts/operations";
import { Activity } from "../../features/activity/types";
import WorkoutHistoryDetails from "../details/WorkoutHistoryDetails";
import { WorkoutHistory } from "../../features/history/types";
import { formatDate } from "../../utils/utils_dates";
import { sortHistoryByDate } from "../../utils/utils_history";
import { getSelectedHistory } from "../../features/history/operations";
import { selectSelectedHistory } from "../../features/history/historySlice";

type Props = {
	historyID: number;
	activityType: Activity;
};

const fakeHistory: WorkoutHistory = {
	userID: "",
	historyID: 1,
	workoutID: 2,
	workoutName: "Weekly Curls (3x/week)",
	workoutDate: formatDate(new Date(), "long"),
	startTime: new Date().toString(),
	endTime: new Date().toString(),
	effort: "Moderate",
	duration: 26,
	createdDate: new Date().toString(),
};

const ViewHistoryDetails = ({ historyID, activityType }: Props) => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const selectedHistory = useSelector(selectSelectedHistory);
	const selectedWorkout = selectedHistory.workout;
	const historyEntry = selectedHistory?.entry;

	const getWorkout = useCallback(() => {
		dispatch(
			getSelectedHistory({
				userID: currentUser.userID,
				historyID: historyID,
				activityType,
			})
		);
	}, [activityType, currentUser.userID, dispatch, historyID]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		getWorkout();

		return () => {
			isMounted = false;
		};
	}, [getWorkout]);
	return (
		<div className={styles.ViewWorkoutHistory}>
			{historyEntry && (
				<WorkoutHistoryDetails
					activityType={activityType}
					history={{
						...historyEntry,
						workoutName: selectedWorkout.workoutName,
					}}
				/>
			)}
		</div>
	);
};

export default ViewHistoryDetails;
