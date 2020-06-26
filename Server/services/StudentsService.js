var path = require("path");
var studentsDAO = require(path.join(process.cwd(), "dao/StudentsDAO"));
/**
 * 获取所有学生
 * @param  {[type]}   conditions 查询条件
 * 查询条件统一规范
 * conditions
	{
		"query" : 关键词查询,
		"pagenum" : 页数,
		"pagesize" : 每页长度
	}
 * @param  {Function} cb         回调函数
 */
module.exports.getAllStudents = function (conditions, cb) {

	if (!conditions.pagenum) return cb("pagenum 参数不合法");
	if (!conditions.pagesize) return cb("pagesize 参数不合法");

	// 通过关键词获取学生数量
	studentsDAO.countByKey(conditions["query"], function (err, count) {
		key = conditions["query"];
		pagenum = parseInt(conditions["pagenum"]);
		pagesize = parseInt(conditions["pagesize"]);

		pageCount = Math.ceil(count / pagesize);
		offset = (pagenum - 1) * pagesize;
		if (offset >= count) {
			offset = count;
		}
		limit = pagesize;

		studentsDAO.findByKey(key, offset, limit, function (err, students) {
			var retStudents = [];
			for (idx in students) {
				var student = students[idx];
				retStudents.push({
					"stu_id": student.stu_id,
					"snd": student.snd,
					"sxh": student.sxh,
					"sxb": student.sxb,
					"sbyqx": student.sbyqx,
					"ssjdw": student.ssjdw,
					"sdwszd": student.sdwszd,
					"sxf": student.sxf,
					"sdwxz": student.sdwxz,
					"sdwlx": student.sdwlx,
					"shyxz": student.shyxz,
				});
			}
			var resultDta = {};
			resultDta["total"] = count;
			resultDta["pagenum"] = pagenum;
			resultDta["users"] = retStudents;
			cb(err, resultDta);
		});
	});
}
/**
 * 创建学生
 * 
 * @param  {[type]}   student 学生数据集
 * @param  {Function} cb   回调函数
 */
module.exports.createStudent = function (params, cb) {

	studentsDAO.exists(params.sxh, params.snd, function (err, isExists) {
		if (err) return cb(err);

		if (isExists) {
			return cb("用户名已存在");
		}

		studentsDAO.create({
			"snd": params.snd,
			"sxh": params.sxh,
			"sxb": params.sxb,
			"sbyqx": params.sbyqx,
			"ssjdw": params.ssjdw,
			"sdwszd": params.sdwszd,
			"sxf": params.sxf,
			"sdwxz": params.sdwxz,
			"sdwlx": params.sdwlx,
			"shyxz": params.shyxz
		}, function (err, student) {
			if (err) return cb("创建失败");
			result = {
				"stu_id": student.stu_id,
				"snd": student.snd,
				"sxh": student.sxh,
				"sxb": student.sxb,
				"sbyqx": student.sbyqx,
				"ssjdw": student.ssjdw,
				"sdwszd": student.sdwszd,
				"sxf": student.sxf,
				"sdwxz": student.sdwxz,
				"sdwlx": student.sdwlx,
				"shyxz": student.shyxz
			};
			cb(null, result);
		});
	});
}

/**
 * 通过学生学号 年度进行删除操作
 * 
 * @param  {[type]}   id 管理员ID
 * @param  {Function} cb 回调函数
 */
module.exports.deleteStudent = function (stu_id, cb) {
	studentsDAO.destroy(stu_id, function (err) {
		if (err) return cb("删除失败");
		cb(null);
	});
}


/**
 * 通过学生 ID 获取学生信息
 * 
 * @param  {[type]}   id 管理员 ID
 * @param  {Function} cb 回调函数
 */
module.exports.getStudent = function (stu_id, cb) {
	studentsDAO.show(stu_id, function (err, student) {
		if (err) return cb(err);
		if (!student) return cb("该学生不存在");
		cb(
			null,
			{
				"stu_id": student.stu_id,
				"snd": student.snd,
				"sxh": student.sxh,
				"sxb": student.sxb,
				"sbyqx": student.sbyqx,
				"ssjdw": student.ssjdw,
				"sdwszd": student.sdwszd,
				"sxf": student.sxf,
				"sdwxz": student.sdwxz,
				"sdwlx": student.sdwlx,
				"shyxz": student.shyxz
			}
		);
	});
}

/**
 * 更新学生信息
 * 
 * @param  {[type]}   params 管理员信息
 * @param  {Function} cb     回调函数
 */
module.exports.updateStudent = function (params, cb) {
	studentsDAO.update(
		{
			"stu_id": params.stu_id,
			"snd": params.snd,
			"sxh": params.sxh,
			"sxb": params.sxb,
			"sbyqx": params.sbyqx,
			"ssjdw": params.ssjdw,
			"sdwszd": params.sdwszd,
			"sxf": params.sxf,
			"sdwxz": params.sdwxz,
			"sdwlx": params.sdwlx,
			"shyxz": params.shyxz
		},
		function (err, student) {
			if (err) return cb(err);
			cb(null, {
				"stu_id": student.stu_id,
				"snd": student.snd,
				"sxh": student.sxh,
				"sxb": student.sxb,
				"sbyqx": student.sbyqx,
				"ssjdw": student.ssjdw,
				"sdwszd": student.sdwszd,
				"sxf": student.sxf,
				"sdwxz": student.sdwxz,
				"sdwlx": student.sdwlx,
				"shyxz": student.shyxz
			});
		}
	)
}
