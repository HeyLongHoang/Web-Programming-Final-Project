import type { BookingPeriod, IBookingService } from './types';

const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

function extractUrl(inputString: string) {
	const regex = /(https?:\/\/[^\s]+)/g;
	const matches = inputString.match(regex);
	if (matches && matches.length > 0) {
		return matches[0];
	} else {
		return '';
	}
}

function extractDate(dateString: string) {
	const date = new Date(dateString);
	if (dateString.length != 0) {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${month} ${day} ${year}`;
	} else {	
		return `None`;
	}
}

export function calculateDaysBetween(startDateStr: string, endDateStr: string): number {
	if (startDateStr.length !== 0 && endDateStr.length !== 0) {
	  const startDate = new Date(startDateStr);
	  const endDate = new Date(endDateStr);
	  const millisecondsPerDay = 24 * 60 * 60 * 1000;
	  const daysBetween = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / millisecondsPerDay));
	  return daysBetween;
	}
	return 0;
}

function formatDateForBooking(dateStr: string) {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

function getTomomorowOfDate(date: Date) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 1);
	return newDate;
}

function findFarthestPossibleDate(checkin_date: string, bookingPeriods: BookingPeriod[]): string {
	const specifiedDate = new Date(checkin_date);
	const dates = bookingPeriods
		.map((obj) => new Date(obj.from))
		.filter((date) => date > specifiedDate); // Filter out dates smaller than the specified date
	if (dates.length == 0) return '';
	else {
		const date = dates[0];
		date.setDate(date.getDate() - 1);
		return formatDate(dates[0]);
	}
}

function getDaysDiff(checkinTime: string, checkoutTime: string) {
	try {
		if (checkinTime == '' || checkoutTime == '') return 0;
		const startDate = new Date(checkinTime);
		const endDate = new Date(checkoutTime);
		const timeDiff = endDate.getTime() - startDate.getTime();
		// Convert milliseconds to days
		const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
		return clamp(daysDiff, 0, 999);
	} catch (err) {
		return 0;
	}
}
function getSericesPrice(bookingServices: IBookingService[]) {
	let totalServicePrice = 0;
	for (const bookingService of bookingServices) {
		if (bookingService.checked) {
			totalServicePrice += bookingService.price;
		}
	}
	return totalServicePrice;
}

export {
	clamp,
	extractUrl,
	formatDateForBooking,
	formatDate,
	getTomomorowOfDate,
	findFarthestPossibleDate,
	getSericesPrice,
	getDaysDiff,
	extractDate
};
