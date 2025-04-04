import { ReactNode } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/CardioDetails.module.scss";
import { CardioWorkout } from "../../features/workouts/types";
import TypeBadge from "../activity/TypeBadge";

type Props = { workout: CardioWorkout };

type DetailsProps = {
	label: string;
	icon: string;
	children?: ReactNode;
};

const icons = {
	sets: "weightlift-2",
	reps: "pushups",
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

const CardioDetails = ({ workout }: Props) => {
	const { workoutName, workoutDesc, duration, exercise, reps } = workout;
	return (
		<div className={styles.CardioDetails}>
			<div className={styles.CardioDetails_header}>
				<TypeBadge activityType="Cardio" />
				<div className={styles.CardioDetails_header_about}>
					<h3 className={styles.CardioDetails_header_about_name}>
						{workoutName}
					</h3>
					<div className={styles.CardioDetails_header_about_desc}>
						{workoutDesc}
					</div>
				</div>
			</div>
			<div className={styles.CardioDetails_main}>
				<DetailsItem icon="exercise" label="Exercise: ">
					<span>{exercise}</span>
				</DetailsItem>
				<DetailsItem icon="reps" label="Reps: ">
					<span>{reps}</span>
				</DetailsItem>
				<DetailsItem icon="duration" label="Duration: ">
					<span>{duration} min.</span>
				</DetailsItem>
			</div>
		</div>
	);
};

export default CardioDetails;
