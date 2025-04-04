import React, { useCallback, useEffect } from "react";
import styles from "../../css/workouts/ViewWorkout.module.scss";
import { Activity } from "../../features/activity/types";
import { useSelector } from "react-redux";
import {
	selectLoadingWorkout,
	selectSelectedWorkout,
} from "../../features/workouts/workoutsSlice";
import { useAppDispatch } from "../../store/store";
import { getSelectedWorkout } from "../../features/workouts/operations";
import { selectCurrentUser } from "../../features/user/userSlice";
import Loader from "../layout/Loader";
import {
	CardioWorkout,
	OtherWorkout,
	StrengthWorkout,
	StretchWorkout,
	TimedWorkout,
	WalkWorkout,
} from "../../features/workouts/types";
import StrengthDetails from "../details/StrengthDetails";
import StretchDetails from "../details/StretchDetails";
import WalkDetails from "../details/WalkDetails";
import CardioDetails from "../details/CardioDetails";
import TimedDetails from "../details/TimedDetails";
import OtherDetails from "../details/OtherDetails";
import ScheduleDetails from "../details/ScheduleDetails";

type Props = {
	workoutID: number;
	activityType: Activity;
};

const ViewWorkout = ({ workoutID, activityType }: Props) => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectLoadingWorkout);
	const selectedWorkout = useSelector(selectSelectedWorkout);
	const { workout, history, schedule } = selectedWorkout;

	const getWorkout = useCallback(() => {
		dispatch(
			getSelectedWorkout({
				userID: currentUser.userID,
				workoutID,
				activityType,
			})
		);
	}, [activityType, currentUser.userID, dispatch, workoutID]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		getWorkout();

		return () => {
			isMounted = false;
		};
	}, [getWorkout]);

	return (
		<div className={styles.ViewWorkout}>
			{isLoading && (
				<Loader>
					<span>Loading details...</span>
				</Loader>
			)}
			{!isLoading && !!workout && (
				<>
					{activityType === "Strength" && (
						<>
							<StrengthDetails workout={workout as StrengthWorkout} />
							<ScheduleDetails schedule={schedule} />
						</>
					)}
					{activityType === "Stretch" && (
						<>
							<StretchDetails workout={workout as StretchWorkout} />
							<ScheduleDetails schedule={schedule} />
						</>
					)}
					{activityType === "Walk" && (
						<>
							<WalkDetails workout={workout as WalkWorkout} />
							<ScheduleDetails schedule={schedule} />
						</>
					)}
					{activityType === "Cardio" && (
						<>
							<CardioDetails workout={workout as CardioWorkout} />
							<ScheduleDetails schedule={schedule} />
						</>
					)}
					{activityType === "Timed" && (
						<>
							<TimedDetails workout={workout as TimedWorkout} />
							<ScheduleDetails schedule={schedule} />
						</>
					)}
					{activityType === "Other" && (
						<>
							<OtherDetails workout={workout as OtherWorkout} />
							<ScheduleDetails schedule={schedule} />
						</>
					)}
				</>
			)}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ViewWorkout;
