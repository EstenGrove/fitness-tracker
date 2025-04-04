import React from "react";
import styles from "../../css/history/ConfirmEndedWorkout.module.scss";
import { Workout, WorkoutDetails } from "../../features/workouts/types";

type Props = { workout: Workout; workoutDetails: WorkoutDetails };

const ConfirmEndedWorkout = ({ workout, workoutDetails }: Props) => {
	const type = workout.activityType;
	return (
		<div className={styles.ConfirmEndedWorkout}>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ConfirmEndedWorkout;
