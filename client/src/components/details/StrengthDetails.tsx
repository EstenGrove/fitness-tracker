import { ReactNode } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/StrengthDetails.module.scss";
import { StrengthWorkout } from "../../features/workouts/types";
import TypeBadge from "../activity/TypeBadge";

type Props = { workout: StrengthWorkout };

type DetailsProps = {
	label: string;
	icon: string;
	children?: ReactNode;
};

const icons = {
	sets: "weightlift-2",
	reps: "dumbbell-2",
	weight: "weight-pound",
	steps: "walking",
	miles: "distance",
	pace: "time",
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

const StrengthDetails = ({ workout }: Props) => {
	const { workoutName, workoutDesc, duration, sets, reps, weight } = workout;
	return (
		<div className={styles.StrengthDetails}>
			<div className={styles.StrengthDetails_header}>
				<TypeBadge activityType="Strength" />
				<div className={styles.StrengthDetails_header_about}>
					<h3 className={styles.StrengthDetails_header_about_name}>
						{workoutName}
					</h3>
					<div className={styles.StrengthDetails_header_about_desc}>
						{workoutDesc}
					</div>
				</div>
			</div>
			<div className={styles.StrengthDetails_main}>
				<DetailsItem icon="sets" label="Sets: ">
					<span>{sets}</span>
				</DetailsItem>
				<DetailsItem icon="reps" label="Reps: ">
					<span>{reps}</span>
				</DetailsItem>
				<DetailsItem icon="weight" label="Weight: ">
					<span>{weight}</span>
				</DetailsItem>
				<DetailsItem icon="duration" label="Duration: ">
					<span>{duration} min.</span>
				</DetailsItem>

				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default StrengthDetails;
