import { useState } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/history/WalkHistoryEntry.module.scss";
import { WalkHistory, WorkoutHistory } from "../../features/history/types";
import { formatDateAsWeekDay, formatDateTime } from "../../utils/utils_dates";
import MenuDropdown, { MenuAction, MenuIcon } from "../shared/MenuDropdown";
import { formatThousand } from "../../utils/utils_misc";
import { EMenuAction } from "../../features/types";

type Props = {
	entry: WalkHistory;
	onMenuAction: (action: MenuAction, entry: WorkoutHistory) => void;
};

const MinsBadge = ({ mins }: { mins: number }) => {
	return (
		<div className={styles.MinsBadge}>
			<svg className={styles.MinsBadge_icon}>
				<use xlinkHref={`${sprite}#icon-time`}></use>
			</svg>
			<span>{mins}m</span>
		</div>
	);
};

type WhenProps = {
	startTime: string;
};

const WhenBadge = ({ startTime }: WhenProps) => {
	const when = formatDateTime(startTime, "common");
	return (
		<div className={styles.WhenBadge}>
			<span className={styles.WhenBadge}>{when}</span>
		</div>
	);
};
type StepsProps = {
	steps: number;
};

const getStepsColor = (steps: number) => {
	const isHigh = steps > 1000;

	if (isHigh) {
		return {
			color: "var(--accent-green)",
			fill: "var(--accent-green)",
		};
	} else {
		return {
			color: "var(--yellowTint400)",
			fill: "var(--yellowTint400)",
		};
	}
};

const StepsBadge = ({ steps }: StepsProps) => {
	const color = getStepsColor(steps);
	const workoutSteps = formatThousand(steps);

	return (
		<div className={styles.StepsBadge} style={color}>
			<svg className={styles.StepsBadge_icon} style={color}>
				<use xlinkHref={`${sprite}#icon-walking-2`}></use>
			</svg>
			<span className={styles.StepsBadge_value}>{workoutSteps}</span>
		</div>
	);
};

const WalkHistoryEntry = ({ entry, onMenuAction }: Props) => {
	const name = entry.workoutName;
	const day = formatDateAsWeekDay(entry.workoutDate);
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const openMoreOpts = () => {
		setShowMenu(true);
	};
	const closeMoreOpts = () => {
		setShowMenu(false);
	};
	return (
		<div className={styles.WalkHistoryEntry}>
			<div className={styles.WalkHistoryEntry_top}>
				<div
					className={styles.WalkHistoryEntry_top_title}
					onDoubleClick={() => onMenuAction(EMenuAction.VIEW, entry)}
				>
					<h2>{name}</h2>
					<div className={styles.WalkHistoryEntry_top_title_day}>{day}</div>
				</div>
				<div className={styles.WalkHistoryEntry_top_icon}>
					<MenuIcon openMenu={openMoreOpts} />
					{showMenu && (
						<MenuDropdown closeMenu={closeMoreOpts}>
							<li onClick={() => onMenuAction(EMenuAction.VIEW, entry)}>
								View
							</li>
							<li onClick={() => onMenuAction(EMenuAction.EDIT, entry)}>
								Edit
							</li>
							<li onClick={() => onMenuAction(EMenuAction.DELETE, entry)}>
								Delete
							</li>
						</MenuDropdown>
					)}
				</div>
			</div>
			<div className={styles.WalkHistoryEntry_bottom}>
				<MinsBadge mins={entry.duration} />
				<StepsBadge steps={entry.steps} />
				<WhenBadge startTime={entry.startTime} />
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WalkHistoryEntry;
