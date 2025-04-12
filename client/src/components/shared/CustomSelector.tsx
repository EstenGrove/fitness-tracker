import React, { useMemo, useState } from "react";
import styles from "../../css/shared/CustomSelector.module.scss";

type Props = {
	options: string[];
};

const OptionsDropdown = ({ name, id, value, onSelect, onSearch }) => {
	return (
		<div className={styles.OptionsDropdown}>
			<div className={styles.OptionsDropdown_wrapper}>
				<input
					type="text"
					name={name}
					id={id}
					className={styles.OptionsDropdown_wrapper_input}
				/>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

const CustomSelector = ({ name, id, value, options, onSelect }: Props) => {
	const [selectedItem, setSelectedItem] = useState<string>("");
	const [clonedOptions, setClonedOptions] = useState<string[]>(options);
	const filteredItems = useMemo(() => {
		return clonedOptions;
	}, [clonedOptions]);

	const selectOption = (option: string) => {
		setSelectedItem(option);
	};

	return (
		<div className={styles.CustomSelector}>
			<div className={styles.CustomSelector_input}>
				{selectedItem ? selectedItem : "Select item..."}
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default CustomSelector;
