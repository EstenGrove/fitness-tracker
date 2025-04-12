import { ReactNode } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/CardioDetails.module.scss";
import { CardioWorkout } from "../../features/workouts/types";
import TypeBadge from "../activity/TypeBadge";
import { CardioHistory } from "../../features/history/types";
import DetailsBlock from "./DetailsBlock";

type Props = { entry: CardioWorkout | CardioHistory };

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

const CardioDetails = ({ entry }: Props) => {
	const { duration, reps } = entry;
	const mins = duration + ":00";
	const kcals = "72.5";
	const exercise = entry?.exercise || "Cardio";
	return (
		<div className={styles.CardioDetails}>
			<div className={styles.CardioDetails_title}>Workout Details:</div>
			<div className={styles.CardioDetails_details}>
				<DetailsBlock type="Duration" label="Duration" value={mins} />
				<DetailsBlock type="Effort" label="Effort" value="Moderate" />
				<DetailsBlock type="Calories" label="Calories" value={kcals} />
				<DetailsBlock type="Reps" label="Reps" value={reps} />
				<DetailsBlock type="Cardio" label="Exercise" value={exercise} />
			</div>
		</div>
	);
};

export default CardioDetails;
