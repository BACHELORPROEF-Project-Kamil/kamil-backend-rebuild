// Axios over regular fetch. Axios is more robust and is nicer to work with.
const axios = require("axios");

async function getDomainAgeInMonths(hostname) {
	try {
		const apiKey = process.env.WHOIS_API_KEY;

		const response = await axios.get(`https://www.whoisjson.com/api/v1/whois/?domain=${hostname}`, {
			headers: {
				Authorization: `TOKEN=${apiKey}`,
			},
		});

		const ageInMonths = response.data?.age?.months;

		if (ageInMonths === undefined) {
			return 0;
		}

		return ageInMonths;
	} catch (error) {
		console.error("Error while fetching WHOIS data: ", error);
		return 0;
	}
}

module.exports = {
	getDomainAgeInMonths,
};
