import { useParams, useSearchParams } from "react-router";
import sprite from "../assets/icons/main2.svg";
import styles from "../css/pages/ActiveWorkoutPage.module.scss";
import { useSelector } from "react-redux";
import {
	selectActiveWorkout,
	selectLoadingWorkout,
} from "../features/workouts/workoutsSlice";
import { TimeInfo, TimeInfoAndDuration } from "../hooks/useWorkoutTimer";
import { Workout } from "../features/workouts/types";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../features/user/userSlice";
import { useAppDispatch } from "../store/store";
import { getActiveWorkout } from "../features/workouts/operations";
import { Activity } from "../features/activity/types";
import { addEllipsis } from "../utils/utils_misc";
import Loader from "../components/layout/Loader";
import NoData from "../components/shared/NoData";
import ModalLG from "../components/shared/ModalLG";
import NavArrows from "../components/layout/NavArrows";
import WorkoutTimer from "../components/timer/WorkoutTimer";
import LogStrengthWorkout from "../components/history/LogStrengthWorkout";
import { differenceInMinutes } from "date-fns";
import WorkoutSummary from "../components/history/WorkoutSummary";
import LogStrengthSets from "../components/history/LogStrengthSets";

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

const WorkoutNotFound = () => {
	return (
		<div className={styles.WorkoutNotFound}>
			<NoData msg="No workout found." />
		</div>
	);
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

const iconsByType = {
	Strength: "",
	Stretch: "",
	Cardio: "",
	Walk: "",
	Timed: "",
	Other: "",
};

const WorkoutIcon = ({ type }: { type: Activity }) => {
	const icon = iconsByType[type];
	return (
		<div className={styles.WorkoutIcon}>
			<svg className={styles.WorkoutIcon_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
		</div>
	);
};

interface WorkoutInfo extends TimeInfo {
	workoutLength: string | number;
	targetLength: string | number;
	totalTime: string;
}

const calculateLength = (info: TimeInfo) => {
	const { startedAt, endedAt } = info;
	const start = new Date(startedAt as string);
	const end = new Date(endedAt as string);
	const amount = differenceInMinutes(end, start);

	return amount;
};

const ActiveWorkoutPage = () => {
	const { id } = useParams();
	const [params] = useSearchParams();
	const dispatch = useAppDispatch();
	const workoutID: number = Number(id);
	const currentUser = useSelector(selectCurrentUser);
	const activeData = useSelector(selectActiveWorkout);
	const isLoading = useSelector(selectLoadingWorkout);
	const workout = activeData?.workout as Workout;
	const activityType = params.get("type");
	const [workoutDetails, setWorkoutDetails] = useState<WorkoutInfo>({
		startedAt: "",
		pausedAt: "",
		resumedAt: "",
		endedAt: "",
		workoutLength: 0,
		targetLength: workout?.duration,
		totalTime: "",
	});
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

	const startWorkout = (info: TimeInfoAndDuration) => {
		console.log("info:", info);
	};

	const endWorkout = (info: TimeInfoAndDuration) => {
		console.log("info.totalTime", info.totalTime);
		const amount = calculateLength(info);
		setWorkoutDetails({
			...info,
			workoutLength: amount,
			targetLength: info.totalTime as string,
			totalTime: info.totalTime as string,
		});
		setShowConfirmModal(true);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (currentUser.userID && workoutID) {
			dispatch(
				getActiveWorkout({
					userID: currentUser.userID,
					workoutID: workoutID,
					activityType: activityType as Activity,
				})
			);
		}

		return () => {
			isMounted = false;
		};
	}, [activityType, currentUser.userID, dispatch, workoutID]);

	return (
		<div className={styles.ActiveWorkoutPage}>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<div className={styles.ActiveWorkoutPage_top}>
						<NavArrows />
						<Header workout={workout} />
					</div>
					<div className={styles.ActiveWorkoutPage_details}>
						<WorkoutTimer
							title={""}
							onStart={startWorkout}
							onEnd={endWorkout}
						/>
					</div>
				</>
			)}

			{true && (
				<ModalLG onClose={() => setShowConfirmModal(false)}>
					<WorkoutSummary
						workout={workout}
						details={{
							startTime: workoutDetails.startedAt as string,
							endTime: workoutDetails.endedAt as string,
							totalTime: workoutDetails.totalTime as string,
							targetDuration: workoutDetails.targetLength as number,
							recordedDuration: workoutDetails.workoutLength as number,
						}}
					/>
					<LogStrengthSets />
					{/* <LogStrengthWorkout
						workout={workout}
						workoutDetails={workoutDetails as WorkoutInfo}
					/> */}
				</ModalLG>
			)}
		</div>
	);
};

export default ActiveWorkoutPage;
