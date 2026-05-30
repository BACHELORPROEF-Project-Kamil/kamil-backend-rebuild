const Stats = require("../models/Stats");

async function syncStats(req, res) {
	try {
		const { urlsChecked, checksPerformed } = req.body;

		if (urlsChecked === undefined || checksPerformed === undefined) {
			return res.status(400).json({ error: "Missing urlsChecked or checksPerformed in request body" });
		}

		console.log(`Syncing stats: ${urlsChecked} URLs checked, ${checksPerformed} checks performed`);

		await Stats.updateOne(
			{ name: "global_counters" },
			{
				$inc: {
					totalUrlsChecked: urlsChecked,
					totalChecksPerformed: checksPerformed,
				},
			},
			{ upsert: true },
		);

		return res.status(200).json({
			success: true,
			message: "Statistics synced successfully",
		});
	} catch (err) {
		console.log("Error in syncStats: ", err);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function getGlobalStats(req, res) {
	try {
		const stats = await Stats.findOne({ name: "global_counters" });

		if (!stats) {
			return res.status(200).json({
				totalUrlsChecked: 0,
				totalChecksPerformed: 0,
			});
		}

		return res.status(200).json({
			totalUrlsChecked: stats.totalUrlsChecked,
			totalChecksPerformed: stats.totalChecksPerformed,
		});
	} catch (err) {
		console.log("Error in getGlobalStats: ", err);
		res.status(500).json({ error: "Internal server error" });
	}
}

module.exports = {
	syncStats,
	getGlobalStats,
};
