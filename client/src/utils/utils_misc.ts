const addEllipsis = (str: string, maxLength: number = 30) => {
	if (!str) return "";
	if (str.length <= maxLength) return str;

	return str.slice(0, maxLength - 3) + "...";
};

const formatThousand = (num: number) => {
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
	}
	return num.toString();
};

export { addEllipsis, formatThousand };
