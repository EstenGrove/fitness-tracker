import { ReactNode, useState } from "react";
import sprite from "../assets/icons/dashboard.svg";
import styles from "../css/pages/AllWorkoutsPage.module.scss";
import { getTodaysDate } from "../utils/utils_dates";
import { useSelector } from "react-redux";
import { useGetAllUserWorkoutsQuery } from "../features/workouts/workoutsApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { useGetActivityTypesQuery } from "../features/activity/activityApi";
import NavArrows from "../components/layout/NavArrows";
import AllWorkouts from "../components/workouts/AllWorkouts";

const Header = ({
	title,
	children,
}: {
	title: string;
	children?: ReactNode;
}) => {
	const today = getTodaysDate();
	return (
		<header className={styles.Header}>
			<div className={styles.Header_main}>
				<div className={styles.Header_main_today}>{today}</div>
				<h2 className={styles.Header_main_label}>{title}</h2>
			</div>
			<div className={styles.Header_right}>{children}</div>
		</header>
	);
};

const NewButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.NewButton}>
			{/* New */}
			<svg className={styles.NewButton_icon}>
				<use xlinkHref={`${sprite}#icon-auto_fix_high`}></use>
			</svg>
			<span>New</span>
		</button>
	);
};

const AllWorkoutsPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const { data: types } = useGetActivityTypesQuery();
	const { data, isLoading } = useGetAllUserWorkoutsQuery(currentUser.userID);
	const [openNewMenu, setOpenNewMenu] = useState<boolean>(false);
	const activityTypes = types || [];
	const userWorkouts = data ?? [];

	const onNew = () => {
		setOpenNewMenu(true);
	};

	return (
		<div className={styles.AllWorkoutsPage}>
			<div className={styles.AllWorkoutsPage_nav}>
				<NavArrows />
			</div>
			<div className={styles.AllWorkoutsPage_header}>
				<Header title="Your Workouts">
					<NewButton onClick={onNew} />
				</Header>
			</div>
			<div className={styles.AllWorkoutsPage_main}>
				{userWorkouts && !isLoading && (
					<AllWorkouts workouts={userWorkouts} activityTypes={activityTypes} />
				)}
			</div>
		</div>
	);
};

export default AllWorkoutsPage;
