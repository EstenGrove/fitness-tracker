import React, { useCallback, useEffect } from "react";
import styles from "../../css/history/ViewWorkoutHistory.module.scss";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";
import {
	selectLoadingWorkout,
	selectSelectedWorkout,
} from "../../features/workouts/workoutsSlice";
import { Activity } from "../../features/activity/types";
import { WorkoutHistory } from "../../features/history/types";
import { formatDate } from "../../utils/utils_dates";
import { sortHistoryByDate } from "../../utils/utils_history";
import { getSelectedHistory } from "../../features/history/operations";
import WorkoutHistoryDetails from "../details/WorkoutHistoryDetails";

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

const ViewWorkoutHistory = ({ historyID, activityType }: Props) => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectLoadingWorkout);
	const selectedWorkout = useSelector(selectSelectedWorkout);
	const { workout, history, schedule } = selectedWorkout;
	const relatedHistory = sortHistoryByDate(history);

	const getWorkout = useCallback(() => {
		dispatch(
			getSelectedHistory({
				userID: currentUser.userID,
				historyID: historyID,
				activityType: activityType,
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
			<WorkoutHistoryDetails history={relatedHistory} />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ViewWorkoutHistory;
