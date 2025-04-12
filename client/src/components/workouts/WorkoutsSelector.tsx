import { ChangeEvent, RefObject, useMemo, useRef, useState } from "react";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/workouts/WorkoutsSelector.module.scss";
import { Activity, ActivityType } from "../../features/activity/types";
import { ACTIVITIES } from "../../utils/utils_activity";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Workout } from "../../features/workouts/types";

type Props = {
	name: string;
	id?: string;
	options: Workout[];
	onSelect: (name: string, value: Workout) => void;
	activityTypes: ActivityType[];
};
type TypeProps = {
	type: Filter;
	isSelected: boolean;
	onClick: () => void;
};
type SelectAllTypeProps = {
	type: Filter;
	isSelected: boolean;
	onClick: () => void;
};

const Type = ({ type, onClick, isSelected = false }: TypeProps) => {
	const css = {
		backgroundColor: isSelected ? "var(--accent-blue)" : "",
	};
	return (
		<button onClick={onClick} className={styles.Type} style={css}>
			{type}
		</button>
	);
};
const SelectAllType = ({
	type,
	onClick,
	isSelected = false,
}: SelectAllTypeProps) => {
	const css = {
		backgroundColor: isSelected ? "var(--accent-blue)" : "",
	};
	return (
		<button onClick={onClick} className={styles.Type} style={css}>
			{type}
		</button>
	);
};

type WorkoutOptProps = {
	item: Workout;
	isSelected: boolean;
	onClick: () => void;
};

const WorkoutOption = ({ item, isSelected, onClick }: WorkoutOptProps) => {
	const css = {
		backgroundColor: isSelected ? "var(--bg-foreground-dark)" : "",
		color: isSelected ? "var(--accent-blue)" : "",
	};
	const name = item.workoutName;
	return (
		<li onClick={onClick} className={styles.WorkoutOption} style={css}>
			<div className={styles.WorkoutOption_item}>{name}</div>
			<div className={styles.WorkoutOption_selected}>
				{isSelected && (
					<svg className={styles.WorkoutOption_selected_check}>
						<use xlinkHref={`${sprite}#icon-check1`}></use>
					</svg>
				)}
			</div>
		</li>
	);
};

type DropdownProps = {
	name: string;
	id: string;
	value: Workout | null;
	searchVal: string;
	types: Filter[];
	options: Workout[];
	onSelect: (name: string, value: Workout) => void;
	onSearch: (value: string) => void;
	onFilter: (type: Filter) => void;
	onClose: () => void;
};

// const fakeItems = [
// 	"Weekly Curls",
// 	"Pushups",
// 	"Situps",
// 	"Stretching (Open)",
// 	"Strength Training (Open)",
// 	"Walk (Open)",
// ];
const fakeItems = [
	{ workoutID: 1, activityType: "Strength", workoutName: "Weekly Curls" },
	{ workoutID: 2, activityType: "Cardio", workoutName: "Pushups" },
	{ workoutID: 3, activityType: "Cardio", workoutName: "Situps" },
	{ workoutID: 4, activityType: "Walk", workoutName: "Walk (Open)" },
	{
		workoutID: 5,
		activityType: "Strength",
		workoutName: "Strength Training (Open)",
	},
	{ workoutID: 6, activityType: "Stretch", workoutName: "Stretching (Open)" },
	{
		workoutID: 7,
		activityType: "Cardio",
		workoutName: "Weekly Pushup Bars (3x/wk)",
	},
];

const OptionsDropdown = ({
	name,
	id,
	value,
	searchVal,
	onSelect,
	onSearch,
	onFilter,
	onClose,
	types = [],
	options = [],
}: DropdownProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	useOutsideClick(menuRef as RefObject<HTMLDivElement>, onClose);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		onSearch(value);
	};

	return (
		<div ref={menuRef} className={styles.OptionsDropdown}>
			<div className={styles.OptionsDropdown_label}>Activities:</div>
			<div className={styles.OptionsDropdown_types}>
				<SelectAllType
					key={"All"}
					type={"All"}
					isSelected={false}
					onClick={() => onFilter("All")}
				/>
				{types &&
					types.map((type, idx) => {
						return (
							<Type
								key={type + idx}
								type={type}
								isSelected={false}
								onClick={() => onFilter(type)}
							/>
						);
					})}
			</div>
			<div className={styles.OptionsDropdown_wrapper}>
				<input
					type="text"
					name={name}
					id={id}
					value={searchVal}
					onChange={handleChange}
					className={styles.OptionsDropdown_wrapper_input}
					placeholder="Search for workout..."
				/>
			</div>
			<ul className={styles.OptionsDropdown_list}>
				{options &&
					options.map((option, idx) => (
						<WorkoutOption
							key={option.workoutName + idx}
							item={option}
							isSelected={value?.workoutName === option?.workoutName}
							onClick={() => onSelect(name, option)}
						/>
					))}
			</ul>
		</div>
	);
};

const applyFilters = (filters: Filter[], items: Workout[]) => {
	if (!items) return [];
	if (!filters || !filters.length) return items;
	return items.filter((item) => {
		return filters.includes(item.activityType);
	});
};

const applySearch = (value: string, items: Workout[]) => {
	if (!value || value === "") return items;
	const lowerVal = value.toLowerCase();
	const includes = (val: string, itemVal: string) => {
		return itemVal.includes(val) || itemVal.startsWith(val);
	};
	return items.filter((item) => {
		const { workoutName, activityType } = item;
		const lowerName = workoutName.toLowerCase();
		const lowerType = activityType.toLowerCase();

		return includes(lowerVal, lowerName) || includes(lowerVal, lowerType);
	});
};

type Filter = Activity | "All";
interface SearchOpts {
	filters: Filter[];
	search: string;
}
const applySearchAndFilters = (items: Workout[], options: SearchOpts) => {
	const { filters, search } = options;
	const filtered = applyFilters(filters, items);
	const results = applySearch(search, filtered);
	return results;
};

const WorkoutsSelector = ({
	name,
	id,
	onSelect,
	options = fakeItems as Workout[],
}: Props) => {
	const types = [...ACTIVITIES];
	const [showOptions, setShowOptions] = useState(false);
	const [searchVal, setSearchVal] = useState<string>("");
	const [selectedItem, setSelectedItem] = useState<Workout | null>(null);
	const [clonedOptions] = useState<Workout[]>(options);
	const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
	const filteredItems = useMemo(() => {
		return applySearchAndFilters(clonedOptions, {
			filters: selectedFilters,
			search: searchVal,
		});
	}, [clonedOptions, searchVal, selectedFilters]);

	console.log("filteredItems", filteredItems);

	const openDropdown = () => setShowOptions(true);
	const closeDropdown = () => setShowOptions(false);

	const selectOption = (name: string, option: Workout) => {
		setSelectedItem(option);

		return onSelect && onSelect(name, option);
	};

	const selectFilter = (filter: Filter) => {
		if (filter === "All") {
			return setSelectedFilters([]);
		}
		if (selectedFilters.includes(filter)) {
			setSelectedFilters(
				[...selectedFilters].filter((item) => item !== filter)
			);
		} else {
			setSelectedFilters([...selectedFilters, filter]);
		}
	};

	const searchItems = (value: string) => {
		setSearchVal(value);

		// search items
	};

	return (
		<div className={styles.WorkoutsSelector}>
			<div className={styles.WorkoutsSelector_input} onClick={openDropdown}>
				{selectedItem ? selectedItem.workoutName : "Select item..."}
			</div>
			<div className={styles.WorkoutsSelector_dropdown}>
				{showOptions && (
					<OptionsDropdown
						id={id}
						name={name}
						types={types}
						value={selectedItem}
						searchVal={searchVal}
						onClose={closeDropdown}
						onSearch={searchItems}
						onSelect={selectOption}
						onFilter={selectFilter}
						options={filteredItems}
					/>
				)}
			</div>
		</div>
	);
};

export default WorkoutsSelector;
