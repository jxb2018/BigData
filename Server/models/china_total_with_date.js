module.exports = function (db, callback) {
	db.define("china_total_with_date", {
		id: String,
		date: String,
		confirmed: Number,
		suspected: Number,
		cured: Number,
		dead: Number
	}, {
		table: "china_total_with_date"
	});
	return callback();
}