import styles from "../../css/details/StrengthDetails.module.scss";
import { StrengthHistory } from "../../features/history/types";
import { StrengthWorkout } from "../../features/workouts/types";
import TypeBadge from "../activity/TypeBadge";
import DetailsBlock from "./DetailsBlock";

type Props = { workout: StrengthWorkout };

const formatDuration = (duration: number) => {
	const secs = ":00";
	const time = duration + secs;

	return time;
};

const StrengthDetails = ({ workout }: Props) => {
	const {
		workoutName,
		workoutDesc,
		duration,
		sets = 4,
		reps = 20,
		weight = 20,
	} = workout;
	const mins = formatDuration(duration);
	return (
		<div className={styles.StrengthDetails}>
			<div className={styles.StrengthDetails_title}>Workout Details:</div>
			<div className={styles.StrengthDetails_details}>
				<DetailsBlock type="Duration" label="Duration" value={mins} />
				<DetailsBlock type="Effort" label="Effort" value="Moderate" />
				<DetailsBlock type="Calories" label="Calories" value={52.5} />
				<DetailsBlock type="Reps" label="Reps" value={reps} />
				<DetailsBlock type="Sets" label="Sets" value={sets + " sets"} />
				<DetailsBlock type="Weight" label="Weight" value={weight} />
			</div>
		</div>
	);
};

export default StrengthDetails;
