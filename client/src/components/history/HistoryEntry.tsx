import { ReactNode, useState } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/history/HistoryEntry.module.scss";
import { WorkoutHistory } from "../../features/history/types";
import MenuDropdown, { MenuAction, MenuIcon } from "../shared/MenuDropdown";
import { formatDateAsWeekDay, formatDateTime } from "../../utils/utils_dates";
import { EMenuAction } from "../../features/types";

type Props = {
	entry: WorkoutHistory;
	children?: ReactNode;
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

const HistoryEntry = ({ entry, onMenuAction, children }: Props) => {
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
		<div className={styles.HistoryEntry}>
			<div className={styles.HistoryEntry_top}>
				<div className={styles.HistoryEntry_top_title}>
					<h2>{name}</h2>
					<div className={styles.HistoryEntry_top_title_day}>{day}</div>
				</div>

				<div className={styles.HistoryEntry_top_icon}>
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
			<div className={styles.HistoryEntry_bottom}>
				<MinsBadge mins={entry.duration} />
				{children}
				<WhenBadge startTime={entry.startTime} />
			</div>
		</div>
	);
};

export default HistoryEntry;
