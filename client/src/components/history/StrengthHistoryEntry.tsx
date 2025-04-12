import { useState } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/history/StrengthHistoryEntry.module.scss";
import { StrengthHistory } from "../../features/history/types";
import MenuDropdown, { MenuIcon } from "../shared/MenuDropdown";

type Props = {
	entry: StrengthHistory;
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

const WhenBadge = () => {
	return (
		<div className="WhenBadge">
			{/*  */}
			{/*  */}
		</div>
	);
};

const StrengthHistoryEntry = ({ entry }: Props) => {
	const name = entry.workoutName;
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const openMoreOpts = () => {
		setShowMenu(true);
	};
	const closeMoreOpts = () => {
		setShowMenu(false);
	};

	return (
		<div className={styles.StrengthHistoryEntry}>
			<div className={styles.StrengthHistoryEntry_top}>
				<h2>{name}</h2>
				<div className={styles.StrengthHistoryEntry_top_icon}>
					<MenuIcon openMenu={openMoreOpts} />
					{showMenu && (
						<MenuDropdown closeMenu={closeMoreOpts}>
							<li>View</li>
							<li>Edit</li>
							<li>Delete</li>
						</MenuDropdown>
					)}
				</div>
			</div>
			<div className={styles.StrengthHistoryEntry_bottom}>
				<MinsBadge mins={entry.duration} />
			</div>
		</div>
	);
};

export default StrengthHistoryEntry;
