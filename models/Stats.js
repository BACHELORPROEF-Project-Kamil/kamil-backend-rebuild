const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: "global_counters",
			unique: true,
		},
		totalUrlsChecked: {
			type: Number,
			default: 0,
		},
		totalChecksPerformed: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Stats", StatsSchema);
