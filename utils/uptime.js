/**
 * @param {number} totaluptime - Number in ms that represents time that will be converted to text
 * @returns {string}
 */
module.exports = (totaluptime) => {
	const hours = Math.floor(totaluptime / 3600000); // get total hours
	totaluptime %= 3600000; // subtract total hours
	const minutes = Math.floor(totaluptime / 60000); // get total minutes
	totaluptime %= 60000; // subtract total minutes
	const seconds = Math.floor(totaluptime / 1000); // get total seconds
	totaluptime %= 1000; // subtract total miliseconds
	const ms = totaluptime; // get total ms
	return(`${hours > 0 ? hours + ' hours,' : ''} ${minutes > 0 ? minutes + ' minutes, ' : ''} ${seconds} seconds and ${ms} ms`);
};