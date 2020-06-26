var path = require("path");
daoModule = require("./DAO");
databaseModule = require(path.join(process.cwd(), "modules/database"));

/**
 * 通过关键词查询用户
 * 
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset 
 * @param  {[type]}   limit  
 * @param  {Function} cb     回调函数
 */
module.exports.findByKey = function (key, offset, limit, cb) {
	db = databaseModule.getDatabase();
	sql = "SELECT * FROM sp_students as mgr";

	if (key) {
		sql += " WHERE sxh LIKE ? LIMIT ?,?";
		database.driver.execQuery(
			sql
			, ["%" + key + "%", offset, limit], function (err, managers) {
				if (err) return cb("查询执行出错");
				cb(null, managers);
			});
	} else {
		sql += " LIMIT ?,? ";
		database.driver.execQuery(sql, [offset, limit], function (err, managers) {
			if (err) return cb("查询执行出错");
			cb(null, managers);
		});
	}
}


/**
 * 通过关键词查询用户
 * 
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset 
 * @param  {[type]}   limit  
 * @param  {Function} cb     回调函数
 */
module.exports.groupBy = function (key, cb) {
	db = databaseModule.getDatabase();
	sql = "SELECT " + key + " as name,count(*) as value FROM sp_students group by " + key;
	database.driver.execQuery(sql, function (err, result) {
		if (err) return cb("查询执行出错");
		cb(null, result);
	});

}


/**
 * 模糊查询用户数量
 * 
 * @param  {[type]}   key 关键词
 * @param  {Function} cb  回调函数
 */
module.exports.countByKey = function (key, cb) {
	db = databaseModule.getDatabase();
	sql = "SELECT count(*) as count FROM sp_students";
	if (key) {
		sql += " WHERE sxh LIKE ?";
		database.driver.execQuery(
			sql
			, ["%" + key + "%"], function (err, result) {
				if (err) return cb("查询执行出错");
				cb(null, result[0]["count"]);
			});
	} else {
		database.driver.execQuery(sql, function (err, result) {
			if (err) return cb("查询执行出错");
			cb(null, result[0]["count"]);
		});
	} ``

}

/**
 * 判断是否存在学生
 * 
 * @param  {[type]}   username 用户名
 * @param  {Function} cb       回调函数
 * 
 */
module.exports.exists = function (sxh, snd, cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models.StudentsModel;
	Model.exists({ "sxh": sxh, "snd": snd }, function (err, isExists) {
		if (err) return cb("查询失败");
		cb(null, isExists);
	});
}

/**
 * 创建学生
 * 
 * @param  {[type]}   obj 管理员信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function (obj, cb) {
	daoModule.create("StudentsModel", obj, cb);
}

/**
 * 删除学生对象数据
 * 
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function (stu_id, cb) {
	daoModule.destroy("StudentsModel", stu_id, function (err) {
		if (err) return cb(err);
		return cb(null);
	});
}

/**
 * 通过ID获取管理员对象数据
 * 
 * @param  {[type]}   id 管理员主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.show = function (stu_id, cb) {
	daoModule.show("StudentsModel", stu_id, cb);
}

/**
 * 更新学生信息
 * 
 * @param  {[type]}   obj 管理员对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function (obj, cb) {
	daoModule.update("StudentsModel", obj.stu_id, obj, cb);
}