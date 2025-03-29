import { ReactNode, RefObject, useRef } from "react";
import styles from "../../css/shared/MenuDropdown.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
	closeMenu: () => void;
	children?: ReactNode;
};

const MenuDropdown = ({ closeMenu, children }: Props) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef as RefObject<HTMLInputElement>, closeMenu);
	return (
		<div ref={menuRef} className={styles.MenuDropdown}>
			<ul className={styles.MenuDropdown_list}>{children}</ul>
		</div>
	);
};

export default MenuDropdown;
