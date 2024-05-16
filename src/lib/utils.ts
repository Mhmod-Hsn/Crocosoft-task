import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateId = () => {
	return Number(Math.random().toString().substring(2, 15));
};

export const padNumber = (n: number) => {
	return n.toString().padStart(2, '0');
};

// get current datetime with this format
// 2020-09-09 09:26:39
export const getCurrentDateTime = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return `${year}-${padNumber(month)}-${padNumber(day)} ${padNumber(
		hour
	)}:${padNumber(minute)}:${padNumber(second)}`;
};

export const compareDates = (date1?: string, date2?: string) => {
	if (!date1 || !date2) return 0;
	const d1 = new Date(date1);
	const d2 = new Date(date2);
	return d2.getTime() - d1.getTime();
};
