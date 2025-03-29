import { JSX, ReactNode, RefObject, useRef } from "react";
import sprite from "../../assets/icons/dashboard.svg";
import styles from "../../css/shared/QuickActionsButton.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {};

type MenuProps = {
	onClose: () => void;
	actions: QuickActionItem[];
};

interface QuickActionItem {
	name: string;
	icon: string;
	label: string;
	onClick: (name?: string) => void;
}

type ActionItemProps = {
	actionItem: QuickActionItem;
};

const QuickAction = ({ actionItem }: ActionItemProps) => {
	const { label, icon, name, onClick } = actionItem;

	const handleClick = () => {
		return onClick && onClick(name);
	};

	return (
		<button type="button" onClick={handleClick} className={styles.QuickAction}>
			<svg className={styles.QuickAction_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
			<div className={styles.QuickAction_label}>{label}</div>
		</button>
	);
};

const QuickActionsMenu = ({ onClose, actions }: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef as RefObject<HTMLDivElement>, onClose);

	return (
		<div ref={menuRef} className={styles.QuickActionsMenu}>
			<div className={styles.QuickActionsMenu_inner}>
				{actions &&
					actions.map((actionItem, idx) => {
						return (
							<QuickAction
								actionItem={actionItem}
								key={actionItem.name + "-" + idx}
							/>
						);
					})}
			</div>
		</div>
	);
};

const QuickActionsButton = ({}: Props) => {
	const handleClick = () => {
		//
		//
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={styles.QuickActionsButton}
		>
			<svg className={styles.QuickActionsButton_icon}>
				<use xlinkHref={`${sprite}#icon-auto_fix_high`}></use>
			</svg>
		</button>
	);
};

export default QuickActionsButton;
