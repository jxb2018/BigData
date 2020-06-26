module.exports = function (db, callback) {
	// 用户模型
	db.define("StudentsModel", {
		stu_id: { type: 'serial', key: true },
		snd: String,
		sxh: String,
		sxb: String,
		sbyqx: String,
		ssjdw: String,
		sdwszd: String,
		sxf: String,
		sdwxz: String,
		sdwlx: String,
		shyxz: String
	}, {
		table: "sp_students"
	});
	return callback();
}