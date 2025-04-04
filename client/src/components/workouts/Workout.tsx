import sprite from "../../assets/icons/main.svg";
import styles from "../../css/workouts/Workout.module.scss";
import { Workout as IWorkout } from "../../features/workouts/types";
import { Activity } from "../../features/activity/types";
import { getActivityStyles } from "../../utils/utils_activity";
import { useNavigate } from "react-router";
import { RefObject, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ModalSM from "../shared/ModalSM";
import ViewWorkout from "./ViewWorkout";

type Props = {
	workout: IWorkout;
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

type MenuProps = {
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
	onClose: () => void;
};

const Menu = ({ onView, onEdit, onDelete, onClose }: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef as RefObject<HTMLDivElement>, onClose);

	return (
		<div ref={menuRef} className={styles.Menu}>
			<ul className={styles.Menu_list}>
				<li onClick={onView} className={styles.Menu_list_item}>
					View
				</li>
				<li onClick={onEdit} className={styles.Menu_list_item}>
					Edit
				</li>
				<li onClick={onDelete} className={styles.Menu_list_item}>
					Delete
				</li>
			</ul>
		</div>
	);
};

type ModalType = "VIEW" | "EDIT" | "DELETE";

const Workout = ({ workout }: Props) => {
	const navigate = useNavigate();
	const { activityType, workoutName, duration } = workout;
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [modalType, setModalType] = useState<ModalType | null>(null);

	const openMenu = () => {
		setShowMenu(true);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	const goTo = () => {
		const id = workout.workoutID;
		navigate(id);
	};

	const onView = () => {
		setShowMenu(false);
		setModalType("VIEW");
	};
	const onEdit = () => {
		setShowMenu(false);
		setModalType("EDIT");
	};
	const onDelete = () => {
		setShowMenu(false);
		setModalType("DELETE");
	};

	const closeModal = () => {
		setModalType(null);
	};

	return (
		<div className={styles.Workout}>
			<div className={styles.Workout_top}>
				<div className={styles.Workout_top_badge}>
					<TypeBadge activityType={activityType} />
				</div>
				<div className={styles.Workout_top_title} onClick={goTo}>
					<h6>{workoutName}</h6>
					<div className={styles.Workout_top_title_about}>{duration} min.</div>
				</div>
				<div className={styles.Workout_top_more}>
					<svg onClick={openMenu} className={styles.Workout_top_more_icon}>
						<use xlinkHref={`${sprite}#icon-dots-three-horizontal`}></use>
					</svg>
					{showMenu && (
						<Menu
							onView={onView}
							onEdit={onEdit}
							onDelete={onDelete}
							onClose={closeMenu}
						/>
					)}
				</div>
			</div>

			{/* MODALS */}
			{modalType === "VIEW" && (
				<ModalSM onClose={closeModal}>
					<ViewWorkout
						workoutID={workout.workoutID}
						activityType={workout.activityType}
					/>
				</ModalSM>
			)}
			{modalType === "EDIT" && (
				<ModalSM onClose={closeModal}>
					{/*  */}
					{/*  */}
				</ModalSM>
			)}
			{modalType === "DELETE" && (
				<ModalSM onClose={closeModal}>
					{/*  */}
					{/*  */}
				</ModalSM>
			)}
		</div>
	);
};

export default Workout;
