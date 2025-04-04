import { useEffect } from "react";
import styles from "../../css/workouts/EditWorkout.module.scss";
import { Activity } from "../../features/activity/types";
import { getSelectedWorkout } from "../../features/workouts/operations";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";
import { selectSelectedWorkout } from "../../features/workouts/workoutsSlice";

type Props = { workoutID: number; activityType: Activity };

const EditWorkout = ({ workoutID, activityType }: Props) => {
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
		<div className={styles.EditWorkout}>
			<div className={styles.EditWorkout_header}>
				<h2>{workout.workoutName}</h2>
				<div>{workout.duration}</div>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default EditWorkout;
