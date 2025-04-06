import { useState } from "react";
import styles from "../../css/workouts/ActiveWorkout.module.scss";
import { Workout } from "../../features/workouts/types";
import { addEllipsis } from "../../utils/utils_misc";
import WorkoutTimer from "../timer/WorkoutTimer";

type Props = {
	workout: Workout;
};

type HeaderProps = {
	workout: Workout;
};

const getDuration = (workout: Workout) => {
	const mins = workout?.duration;

	if (mins > 0) {
		return mins + " min.";
	} else {
		return "Open";
	}
};

const Header = ({ workout }: HeaderProps) => {
	const name = addEllipsis(workout?.workoutName ?? "Active Workout", 25);
	const durationMins = getDuration(workout);
	return (
		<header className={styles.Header}>
			<h2 className={styles.Header_title}>{name}</h2>
			<div className={styles.Header_duration}>{durationMins} workout</div>
		</header>
	);
};

interface WorkoutDetails {
	startedAt: string;
	endedAt: string;
	totalTime: string;
}

const ActiveWorkout = ({ workout }: Props) => {
	const [details, setDetails] = useState<WorkoutDetails>({
		startedAt: "",
		endedAt: "",
		totalTime: "",
	});

	const startWorkout = () => {
		//
	};
	const endWorkout = () => {
		//
	};

	return (
		<div className={styles.ActiveWorkout}>
			<div className={styles.ActiveWorkout_header}>
				<Header workout={workout} />
			</div>
			<WorkoutTimer title={""} onStart={startWorkout} onEnd={endWorkout} />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ActiveWorkout;
