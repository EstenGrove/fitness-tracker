import styles from "../../css/history/WorkoutSummary.module.scss";
import { Workout } from "../../features/workouts/types";
import { addEllipsis } from "../../utils/utils_misc";
import ActivityType from "../activity/ActivityType";

type Props = {
	workout: Workout;
	details: Details;
};

interface Details {
	startTime: string;
	endTime: string;
	recordedDuration: number;
	targetDuration: number;
	totalTime: string;
}

const Set = () => {};

const WorkoutSummary = ({ workout, details }: Props) => {
	const name = addEllipsis(workout?.workoutName ?? "", 20);
	const type = workout?.activityType;
	return (
		<div className={styles.WorkoutSummary}>
			<div className={styles.WorkoutSummary_header}>
				<div className={styles.WorkoutSummary_header_type}>
					<ActivityType type={type} />
				</div>
				<div className={styles.WorkoutSummary_header_name}>
					<h2>{name}</h2>
				</div>
			</div>
			<div className={styles.WorkoutSummary_main}>
				<div>
					Workout Time: <b>{details.totalTime}</b>
				</div>
			</div>
		</div>
	);
};

export default WorkoutSummary;
