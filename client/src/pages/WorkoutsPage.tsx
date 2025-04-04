import sprite2 from "../assets/icons/calendar2.svg";
import sprite3 from "../assets/icons/dashboard.svg";
import sprite from "../assets/icons/main2.svg";
import styles from "../css/pages/WorkoutsPage.module.scss";
import { format } from "date-fns";
import { ReactNode, RefObject, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import ModalSM from "../components/shared/ModalSM";
import LogStrengthWorkout from "../components/history/LogStrengthWorkout";
import TodaysWorkouts from "../components/workouts/TodaysWorkouts";
import { useGetTodaysWorkoutsQuery } from "../features/workouts/todaysWorkoutsApi";
import { formatDate } from "../utils/utils_dates";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { TodaysWorkout } from "../features/workouts/types";

type ActionItemProps = {
	icon: string;
	label: string;
	onClick: () => void;
};

const ActionItem = ({ icon, onClick, label }: ActionItemProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.ActionItem}>
			<svg className={styles.ActionItem_icon}>
				<use xlinkHref={`${sprite2}#icon-${icon}`}></use>
			</svg>
			<div className={styles.ActionItem_label}>{label}</div>
		</button>
	);
};

type HeaderActionProps = {
	selectAction: (action: QuickAction) => void;
	onClose: () => void;
};

const HeaderActions = ({ selectAction, onClose }: HeaderActionProps) => {
	const headerRef = useRef<HTMLDivElement>(null);
	useOutsideClick(headerRef as RefObject<HTMLDivElement>, onClose);
	return (
		<div ref={headerRef} className={styles.HeaderActions}>
			<div className={styles.HeaderActions_item}>
				<ActionItem
					key="Create Workout"
					icon="add_task"
					label="Create Workout"
					onClick={() => selectAction("CreateWorkout")}
				/>
			</div>
			<div className={styles.HeaderActions_item}>
				<ActionItem
					key="Log Workout"
					icon="add_task"
					label="Log Workout"
					onClick={() => selectAction("LogWorkout")}
				/>
			</div>
		</div>
	);
};

const getTodaysDate = (date?: Date | string) => {
	if (!date) {
		const now = new Date();
		const today = format(now, "EEE, MMM do");

		return today;
	} else {
		const today = format(date, "EEE, MMM do");
		return today;
	}
};

const ActionButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.ActionButton}>
			<svg className={styles.ActionButton_icon}>
				<use xlinkHref={`${sprite3}#icon-auto_fix_high`}></use>
			</svg>
			<span> New</span>
		</button>
	);
};

const WorkoutHeader = ({
	title,
	children,
}: {
	title: string;
	children?: ReactNode;
}) => {
	const today = getTodaysDate();
	return (
		<div className={styles.WorkoutHeader}>
			<div className={styles.WorkoutHeader_main}>
				<div className={styles.WorkoutHeader_main_today}>{today}</div>
				<h2 className={styles.WorkoutHeader_main_label}>{title}</h2>
			</div>
			<div className={styles.WorkoutHeader_actions}>{children}</div>
		</div>
	);
};

type QuickAction = "CreateWorkout" | "LogWorkout";

const SearchButton = () => {
	return (
		<button className={styles.SearchButton}>
			<svg className={styles.SearchButton_icon}>
				<use xlinkHref={`${sprite2}#icon-search`}></use>
			</svg>
		</button>
	);
};
const CalendarButton = () => {
	return (
		<button className={styles.CalendarButton}>
			<svg className={styles.CalendarButton_icon}>
				<use xlinkHref={`${sprite2}#icon-calendar_today`}></use>
			</svg>
		</button>
	);
};
const GoalsButton = () => {
	return (
		<button className={styles.GoalsButton}>
			<svg className={styles.GoalsButton_icon}>
				<use xlinkHref={`${sprite}#icon-goal`}></use>
			</svg>
		</button>
	);
};

const ActionsPanel = () => {
	return (
		<div className={styles.ActionsPanel}>
			<GoalsButton />
			<CalendarButton />
			<SearchButton />
		</div>
	);
};

// const testDate = new Date(2025, 2, 22);
const testDate = new Date();
const WorkoutsPage = () => {
	const baseDate = formatDate(testDate, "db");
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading } = useGetTodaysWorkoutsQuery({
		userID: currentUser.userID,
		targetDate: baseDate,
	});
	const [quickAction, setQuickAction] = useState<QuickAction | null>(null);
	const [showQuickActions, setShowQuickActions] = useState<boolean>(false);

	const openQuickActions = () => setShowQuickActions(true);
	const closeQuickActions = () => setShowQuickActions(false);

	const closeModal = () => {
		setQuickAction(null);
	};

	const selectAction = (action: QuickAction) => {
		setQuickAction(action);
		closeQuickActions();
	};

	return (
		<div className={styles.WorkoutsPage}>
			<div className={styles.WorkoutsPage_header}>
				<WorkoutHeader title="Workouts">
					<ActionButton onClick={openQuickActions} />

					{showQuickActions && (
						<HeaderActions
							selectAction={selectAction}
							onClose={closeQuickActions}
						/>
					)}
				</WorkoutHeader>
			</div>
			<div className={styles.WorkoutsPage_main}>
				<div className={styles.WorkoutsPage_main_top}>
					<ActionsPanel />
				</div>
				<div className={styles.WorkoutsPage_main_list}>
					<TodaysWorkouts
						workouts={data as TodaysWorkout[]}
						isLoading={isLoading}
					/>
				</div>
				{/* <Outlet /> */}
			</div>

			{/* Quick Actions' Modals */}
			{quickAction === "CreateWorkout" && (
				<LogStrengthWorkout onClose={closeModal}>
					{/*  */}
					{/*  */}
				</LogStrengthWorkout>
			)}
			{quickAction === "LogWorkout" && (
				<ModalSM onClose={closeModal}>
					{/*  */}
					{/*  */}
				</ModalSM>
			)}
		</div>
	);
};

export default WorkoutsPage;
