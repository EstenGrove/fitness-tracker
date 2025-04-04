import { ReactNode } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/WalkDetails.module.scss";
import { WalkWorkout } from "../../features/workouts/types";
import TypeBadge from "../activity/TypeBadge";

type Props = { workout: WalkWorkout };

type DetailsProps = {
	label: string;
	icon: string;
	children?: ReactNode;
};

const icons = {
	sets: "weightlift-2",
	reps: "pushups",
	weight: "weight-pound",
	steps: "walking-2",
	miles: "step-length",
	pace: "time-2",
	exercise: "exercise",
	duration: "time",
};

const DetailsItem = ({ label, icon, children }: DetailsProps) => {
	const iconName = icons[icon as keyof object];
	return (
		<div className={styles.DetailsItem}>
			<div className={styles.DetailsItem_item}>
				<svg className={styles.DetailsItem_item_icon}>
					<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
				</svg>
				<span>{label}</span>
			</div>
			<div className={styles.DetailsItem_main}>{children}</div>
		</div>
	);
};

const WalkDetails = ({ workout }: Props) => {
	const { workoutName, workoutDesc, steps, miles, pace, duration } = workout;
	return (
		<div className={styles.WalkDetails}>
			<div className={styles.WalkDetails_header}>
				<TypeBadge activityType="Walk" />
				<div className={styles.WalkDetails_header_about}>
					<h3 className={styles.WalkDetails_header_about_name}>
						{workoutName}
					</h3>
					<div className={styles.WalkDetails_header_about_desc}>
						{workoutDesc}
					</div>
				</div>
			</div>
			<div className={styles.WalkDetails_main}>
				<DetailsItem icon="steps" label="Steps: ">
					<span>{steps}</span>
				</DetailsItem>
				<DetailsItem icon="miles" label="Miles: ">
					<span>{miles}</span>
				</DetailsItem>
				<DetailsItem icon="pace" label="Pace: ">
					<span>{pace}</span>
				</DetailsItem>
				<DetailsItem icon="duration" label="Duration: ">
					<span>{duration} min.</span>
				</DetailsItem>
				{/*  */}
			</div>
		</div>
	);
};

export default WalkDetails;
