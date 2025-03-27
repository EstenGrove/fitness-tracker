import styles from "../../css/workouts/TodaysWorkouts.module.scss";
import sprite from "../../assets/icons/main.svg";
import { Workout } from "../../features/workouts/types";
import Loader from "../layout/Loader";
import TodaysWorkout from "./TodaysWorkout";

type Props = {
	isLoading: boolean;
	workouts: Workout[];
};

const NoWorkoutsFound = () => {
	return (
		<div className={styles.NoWorkoutsFound}>
			<svg className={styles.NoWorkoutsFound_icon}>
				<use xlinkHref={`${sprite}#icon-empty-box-2`}></use>
			</svg>
			<div className={styles.NoWorkoutsFound_title}>No workouts found.</div>
		</div>
	);
};

const TodaysWorkouts = ({ workouts = [], isLoading = false }: Props) => {
	const noWorkouts: boolean = !workouts || !workouts.length;
	const hasWorkouts: boolean = workouts && !!workouts.length;

	return (
		<div className={styles.TodaysWorkouts}>
			<div className={styles.TodaysWorkouts_heading}>
				<h3 className={styles.TodaysWorkouts_heading_title}>
					Today's Workouts
				</h3>
				<div className={styles.TodaysWorkouts_heading_showAll}>Show All</div>
			</div>
			<div className={styles.TodaysWorkouts_main}>
				{isLoading ? (
					<Loader>
						<span>Loading today...</span>
					</Loader>
				) : (
					<>
						{noWorkouts && <NoWorkoutsFound />}
						{hasWorkouts &&
							workouts.map((workout) => (
								<TodaysWorkout key={workout.workoutID} workout={workout} />
							))}
					</>
				)}
			</div>
		</div>
	);
};

export default TodaysWorkouts;
