var express = require('express');
var router = express.Router();
var path = require("path");

// 获取验证模块
var authorization = require(path.join(process.cwd(), "/modules/authorization"));

// 通过验证模块获取用户管理服务
var mgrServ = authorization.getService("StudentsService");


// 查询学生列表
router.get("/",
	// 验证参数
	function (req, res, next) {
		// 参数验证
		if (!req.query.pagenum || req.query.pagenum <= 0) return res.sendResult(null, 400, "pagenum 参数错误");
		if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "pagesize 参数错误");
		next();
	},
	// 处理业务逻辑
	function (req, res, next) {
		mgrServ.getAllStudents(
			{
				"query": req.query.query,
				"pagenum": req.query.pagenum,
				"pagesize": req.query.pagesize
			},
			function (err, result) {
				if (err) return res.sendResult(null, 400, err);
				res.sendResult(result, 200, "获取学生列表成功");
			}
		)(req, res, next);

	}
);


// 创建学生
router.post("/",
	// 验证参数
	function (req, res, next) {
		if (!req.body.sxh) {
			return res.sendResult(null, 400, "学号不能为空");
		}
		if (!req.body.snd) {
			return res.sendResult(null, 400, "年度不能为空");
		}
		next();
	},
	// 处理业务逻辑
	function (req, res, next) {
		params = {
			"snd": req.body.snd,
			"sxh": req.body.sxh,
			"sxb": req.body.sxb,
			"sbyqx": req.body.sbyqx,
			"ssjdw": req.body.ssjdw,
			"sdwszd": req.body.sdwszd,
			"sxf": req.body.sxf,
			"sdwxz": req.body.sdwxz,
			"sdwlx": req.body.sdwlx,
			"shyxz": req.body.shyxz
		}
		mgrServ.createStudent(params, function (err, student) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(student, 201, "创建成功");
		})(req, res, next);
	}
);

// 删除学生信息
router.delete("/:stu_id",
	// 验证参数
	function (req, res, next) {
		if (!req.params.stu_id) return res.sendResult(null, 400, "学生学号不能为空");
		next();
	},
	// 处理业务逻辑
	function (req, res, next) {
		mgrServ.deleteStudent(req.params.stu_id, function (err) {
			if (err) return res.sendResult(null, 400, err);
			return res.sendResult(null, 200, "删除成功");
		})(req, res, next);
	}
);

// 根据id获取学生信息
router.get("/:stu_id",
	// 参数验证
	function (req, res, next) {
		if (!req.params.stu_id) {
			return res.sendResult(null, 400, "学生ID不能为空");
		}
		if (isNaN(parseInt(req.params.stu_id))) return res.sendResult(null, 400, "学生ID必须是数字");
		next();
	},
	function (req, res, next) {
		mgrServ.getStudent(req.params.stu_id, function (err, student) {
			if (err) return res.sendResult(null, 400, err);
			res.sendResult(student, 200, "获取成功");
		})(req, res, next);
	}
);

// 根据id修改学生信息
router.put("/:stu_id",
	// 参数验证
	function (req, res, next) {
		if (!req.params.stu_id) {
			return res.sendResult(null, 400, "学生ID不能为空");
		}
		if (isNaN(parseInt(req.params.stu_id))) return res.sendResult(null, 400, "学生ID必须是数字");
		next();
	},
	// 处理业务逻辑
	function (req, res, next) {
		mgrServ.updateStudent(
			{
				"stu_id": req.params.stu_id,
				"snd": req.body.snd,
				"sxh": req.body.sxh,
				"sxb": req.body.sxb,
				"sbyqx": req.body.sbyqx,
				"ssjdw": req.body.ssjdw,
				"sdwszd": req.body.sdwszd,
				"sxf": req.body.sxf,
				"sdwxz": req.body.sdwxz,
				"sdwlx": req.body.sdwlx,
				"shyxz": req.body.shyxz
			},
			function (err, student) {
				if (err) return res.sendResult(null, 400, err);
				res.sendResult(student, 200, "更新成功");
			}
		)(req, res, next);
	}
);

module.exports = router;