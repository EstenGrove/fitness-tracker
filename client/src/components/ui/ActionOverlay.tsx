import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import styles from "../../css/ui/ActionOverlay.module.scss";

type Props = {
	blur?: string;
	opacity?: number | string;
	zIndex?: number;
	darken?: number;
	style?: CSSProperties | undefined;
	children?: ReactNode;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
};

interface BtnProps {
	children: ReactNode;
	className?: string;
	onClick: () => void;
}

// @ts-expect-error: this is fine
interface ActionBtnProps extends BtnProps, ComponentPropsWithoutRef<"button"> {}

const ActionButton = ({
	children,
	onClick,
	className,
	...rest
}: ActionBtnProps) => {
	const cssClass = [styles.ActionButton, className].join(" ");
	return (
		<button onClick={onClick} className={cssClass} {...rest}>
			{children}
		</button>
	);
};

const ActionOverlay = ({
	children,
	blur = "50px",
	opacity = 0.6,
	darken = 0.4, // new: how much dark background to add (0–1)
	zIndex = 800,
	style = {},
}: Props) => {
	const darkBgStyle: CSSProperties = {
		position: "absolute",
		inset: 0,
		backgroundColor: `rgba(0, 0, 0, ${darken})`, // semi-transparent dark layer
		zIndex,
		pointerEvents: "none",
	};

	const gradientStyle: CSSProperties = {
		position: "absolute",
		inset: 0,
		background: `linear-gradient(135deg, rgb(0, 226, 189), rgba(0, 226, 189, 0.3))`,
		opacity,
		filter: `blur(${blur})`,
		zIndex: zIndex + 10,
		pointerEvents: "none",
		...style,
	};

	const containerStyle: CSSProperties = {
		position: "absolute",
		inset: 0,
		zIndex: zIndex + 20,
		pointerEvents: "auto",
	};

	return (
		<>
			<div style={darkBgStyle} />
			<div className={styles.ActionOverlay} style={gradientStyle} />
			<div style={containerStyle} className={styles.Container}>
				{children}
			</div>
		</>
	);
};
export { ActionButton };
export default ActionOverlay;
