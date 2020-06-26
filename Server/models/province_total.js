module.exports = function (db, callback) {
	db.define("province_total", {
		id: Number,
		province: String,
		confirmed: Number,
		suspected: Number,
		cured: Number,
		dead: Number
	}, {
		table: "province_total"
	});
	return callback();
}