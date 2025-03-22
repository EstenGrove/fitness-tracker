const addEllipsis = (str: string, maxLength: number = 30) => {
	if (str.length <= maxLength) return str;

	return str.slice(0, maxLength - 3) + "...";
};

export { addEllipsis };
