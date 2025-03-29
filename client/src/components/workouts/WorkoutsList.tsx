import styles from "../../css/workouts/WorkoutsList.module.scss";
import { Workout as IWorkout } from "../../features/workouts/types";
import Workout from "./Workout";

type Props = {
	workouts: IWorkout[];
};

const WorkoutsList = ({ workouts }: Props) => {
	return (
		<div className={styles.WorkoutsList}>
			<div className={styles.WorkoutsList_inner}>
				{workouts &&
					workouts.map((workout) => {
						const { activityType: type, workoutID: id } = workout;
						const key = type + "-" + id;
						return <Workout key={key} workout={workout} />;
					})}
			</div>
		</div>
	);
};

export default WorkoutsList;
