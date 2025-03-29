import { ChangeEvent, useMemo, useState } from "react";
import styles from "../../css/workouts/AllWorkouts.module.scss";
import { Workout as IWorkout } from "../../features/workouts/types";
import { Activity, ActivityType } from "../../features/activity/types";
import WorkoutsList from "./WorkoutsList";

type Props = {
	workouts: IWorkout[];
	activityTypes: ActivityType[];
};

type FilterType = Activity | "All";

type WorkoutFilterProps = {
	allFilters: FilterType[];
	selectFilter: (filter: FilterType) => void;
	selectedFilters: FilterType[];
	selectAllFilters: () => void;
};

type FilterItemProps = {
	filter: FilterType;
	isSelected: boolean;
	selectFilter: () => void;
};

const FilterItem = ({ filter, isSelected, selectFilter }: FilterItemProps) => {
	const css = isSelected
		? `${styles.FilterItem} ${styles.isSelected}`
		: styles.FilterItem;
	return (
		<button type="button" className={css} onClick={selectFilter}>
			{filter}
		</button>
	);
};
const AllItem = ({ filter, isSelected, selectFilter }: FilterItemProps) => {
	const css = isSelected
		? `${styles.FilterItem} ${styles.isSelected}`
		: styles.FilterItem;
	return (
		<button type="button" className={css} onClick={selectFilter}>
			{filter}
		</button>
	);
};

const isFilterSelected = (filter: FilterType, selected: FilterType[]) => {
	const exists = selected.includes(filter);

	return exists;
};

const isAllSelected = (
	allFilters: FilterType[],
	selectedFilters: FilterType[]
) => {
	const noSelections = !selectedFilters || !selectedFilters.length;
	const allSelected =
		selectedFilters.length > 0 && allFilters.length === selectedFilters.length;

	console.log("noSelections", noSelections);
	console.log("allSelected", allSelected);

	return noSelections || allSelected;
};

const WorkoutFilters = ({
	allFilters,
	selectFilter,
	selectedFilters,
	selectAllFilters,
}: WorkoutFilterProps) => {
	const showAll = isAllSelected(allFilters, selectedFilters);
	const filterCount = getFilterCount(selectedFilters, allFilters);
	return (
		<div className={styles.WorkoutFilters}>
			<div className={styles.WorkoutFilters_count}>{filterCount}</div>
			<div className={styles.WorkoutFilters_list}>
				<AllItem
					filter="All"
					isSelected={showAll}
					selectFilter={selectAllFilters}
				/>
				{allFilters &&
					allFilters.map((filter, idx) => (
						<FilterItem
							key={filter + idx}
							filter={filter}
							selectFilter={() => selectFilter(filter)}
							isSelected={isFilterSelected(filter, selectedFilters)}
						/>
					))}
			</div>
		</div>
	);
};

const getFilterCount = (selectedFilters: string[], filters: FilterType[]) => {
	if (!selectedFilters || selectedFilters.length <= 0) {
		const active = filters.length || 0;
		const total = filters.length || 0;
		return `${active} / ${total}`;
	} else {
		const active = selectedFilters.length || 0;
		const total = filters.length || 0;
		return `${active} / ${total}`;
	}
};

const filterWorkouts = (filters: FilterType[], workouts: IWorkout[]) => {
	if (!filters || !filters.length) return workouts;
	const showAll =
		!filters.length || (filters.length === 1 && filters?.[0] === "All");

	if (showAll) {
		return workouts;
	} else {
		const newWorkouts = [...workouts].filter((workout) => {
			const { activityType } = workout;
			return filters.includes(activityType);
		});
		return newWorkouts;
	}
};

const searchWorkouts = (search: string, workouts: IWorkout[]) => {
	if (!search) return workouts;

	const lowerSearch = search.toLowerCase();

	return [...workouts].filter((workout) => {
		const { workoutName, activityType, duration } = workout;
		const hasMatches: boolean =
			workoutName.toLowerCase().includes(lowerSearch) ||
			activityType.toLowerCase().includes(lowerSearch) ||
			String(duration).includes(lowerSearch);
		return hasMatches;
	});
};

const sortAndFilter = (
	search: string,
	filters: FilterType[],
	workouts: IWorkout[]
) => {
	const filteredWorkouts = filterWorkouts(filters, workouts);
	const searchResults = searchWorkouts(search, filteredWorkouts);

	return searchResults;
};

const AllWorkouts = ({ workouts, activityTypes }: Props) => {
	const [search, setSearch] = useState<string>("");
	const [filters, setFilters] = useState<FilterType[]>([]);
	// const [userWorkouts, setUserWorkouts] = useState<Workout[]>(workouts);
	const allFilters: FilterType[] = useMemo(() => {
		if (!activityTypes || !activityTypes.length) return [];
		const asFilters: FilterType[] = activityTypes.map(
			({ activityType }) => activityType
		);
		const filtersList = asFilters;

		return filtersList;
	}, [activityTypes]);
	const filteredWorkouts: IWorkout[] = useMemo(() => {
		if ((!filters || !filters.length) && !search) return workouts;

		return sortAndFilter(search, filters, workouts);
	}, [filters, search, workouts]);

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearch(value);
	};

	const selectFilter = (filter: FilterType) => {
		const alreadySelected = filters.includes(filter);
		if (alreadySelected) {
			const newFilters = [...filters.filter((x) => x !== filter)];
			setFilters(newFilters);
		} else {
			const newFilters = [...filters, filter];
			setFilters(newFilters);
		}
	};

	const selectAllFilters = () => {
		setFilters([]);
	};

	return (
		<div className={styles.AllWorkouts}>
			<div className={styles.AllWorkouts_filters}>
				<WorkoutFilters
					allFilters={allFilters}
					selectedFilters={filters}
					selectFilter={selectFilter}
					selectAllFilters={selectAllFilters}
				/>
			</div>
			<div className={styles.AllWorkouts_list}>
				{filteredWorkouts && <WorkoutsList workouts={filteredWorkouts} />}
			</div>
		</div>
	);
};

export default AllWorkouts;
