import { useNavigate } from "react-router";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/workouts/TodaysWorkout.module.scss";
import { Activity } from "../../features/activity/types";
import { Workout } from "../../features/workouts/types";
import { getActivityStyles } from "../../utils/utils_activity";

type Props = {
	workout: Workout;
};

const TypeBadge = ({ activityType }: { activityType: Activity }) => {
	const { icon, color, bg } = getActivityStyles(activityType);
	const iconCSS = { fill: color };
	const bgCSS = { backgroundColor: bg };
	return (
		<div className={styles.TypeBadge} style={bgCSS}>
			<svg className={styles.TypeBadge_icon} style={iconCSS}>
				<use xlinkHref={`${sprite}#icon-${icon}`} />
			</svg>
		</div>
	);
};

const StartButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.StartButton}>
			<svg className={styles.StartButton_icon}>
				<use xlinkHref={`${sprite}#icon-play`}></use>
			</svg>
		</button>
	);
};

const TodaysWorkout = ({ workout }: Props) => {
	const navigate = useNavigate();
	const { activityType, workoutName, duration } = workout;

	const goTo = () => {
		const id = workout.workoutID;
		navigate(id);
	};

	const goToStartWorkout = () => {
		const id = workout.workoutID;
		navigate(`/active/${id}`);
	};

	return (
		<div className={styles.TodaysWorkout}>
			<div className={styles.TodaysWorkout_top}>
				<div className={styles.TodaysWorkout_top_badge}>
					<TypeBadge activityType={activityType} />
				</div>
				<div className={styles.TodaysWorkout_top_title} onClick={goTo}>
					<h6>{workoutName}</h6>
					<div className={styles.TodaysWorkout_top_title_about}>{length}</div>
				</div>
				<div className={styles.TodaysWorkout_top_more}>
					<svg className={styles.TodaysWorkout_top_more_icon}>
						<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
					</svg>
				</div>
			</div>
			{/* <div className={styles.Workout_bottom}>
				<StartButton onClick={goToStartWorkout} />
			</div> */}
		</div>
	);
};

export default TodaysWorkout;
