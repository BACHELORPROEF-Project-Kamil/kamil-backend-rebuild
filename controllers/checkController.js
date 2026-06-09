const dns = require("dns").promises;
const { getDomainAgeInMonths } = require("../services/whoisService");

async function processUrlCheck(req, res) {
	try {
		const { url } = req.body;

		if (!url) {
			return res.status(400).json({ error: "No URL provided" });
		}

		const urlObject = new URL(url);
		const hostname = urlObject.hostname;

		let dnsRecordScore = -1; // Could be phishing
		try {
			await dns.lookup(hostname);
			dnsRecordScore = 1; // Likely safe // DNS record exists
		} catch (dnsErr) {
			dnsRecordScore = -1; // Could be phishing // No DNS record found
		}

		const ageInMonths = await getDomainAgeInMonths(hostname);

		let domainRegistrationLengthScore = ageInMonths > 12 ? 1 : -1;
		let ageOfDomainScore = ageInMonths >= 6 ? 1 : -1;

		res.json({
			status: "processed",
			features: {
				dnsRecord: dnsRecordScore,
				domainRegistrationLength: domainRegistrationLengthScore,
				ageOfDomain: ageOfDomainScore,
			},
		});
	} catch (err) {
		console.error("Error in checkController: ", err);
		res.status(500).json({ error: "Internal server error" });
	}
}

module.exports = {
	processUrlCheck,
};
