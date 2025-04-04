import { useEffect } from "react";
import styles from "../../css/workouts/DeleteWorkout.module.scss";
import { Activity } from "../../features/activity/types";
import { useSelector } from "react-redux";
import { selectSelectedWorkout } from "../../features/workouts/workoutsSlice";
import { useAppDispatch } from "../../store/store";
import { getSelectedWorkout } from "../../features/workouts/operations";
import { selectCurrentUser } from "../../features/user/userSlice";

type Props = {
	workoutID: number;
	activityType: Activity;
};

const DeleteWorkout = ({ workoutID, activityType }: Props) => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const selectedWorkout = useSelector(selectSelectedWorkout);
	const { workout, history } = selectedWorkout;

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (workoutID && activityType && currentUser.userID) {
			dispatch(
				getSelectedWorkout({
					userID: currentUser.userID,
					workoutID,
					activityType,
				})
			);
		}

		return () => {
			isMounted = false;
		};
	}, [activityType, currentUser.userID, dispatch, workoutID]);

	return (
		<div className={styles.DeleteWorkout}>
			<div className={styles.DeleteWorkout_header}>
				<h2>{workout.workoutName}</h2>
				<div>{workout.duration}</div>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DeleteWorkout;
