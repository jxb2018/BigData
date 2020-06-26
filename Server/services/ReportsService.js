var _ = require('lodash');
var path = require("path");
var dao = require(path.join(process.cwd(), "dao/DAO"));
var studentsDAO = require(path.join(process.cwd(), "dao/StudentsDAO"));

function reportOne(cb) {
	dao.list("china_total_with_date", null, function (err, result) {
		if (err) return cb("获取疫情数据失败");
		var dateKeys = _.union(_.map(result, "date"));
		// 格式输出
		var series = [];
		var data = [];
		series.push({
			name: '确诊人数',
			type: 'line',
			stack: '总量',
			areaStyle: { normal: {} },
			data: _.map(result, "confirmed")
		})
		series.push({
			name: '疑似人数',
			type: 'line',
			stack: '总量',
			areaStyle: { normal: {} },
			data: _.map(result, "suspected")
		})
		series.push({
			name: '治愈人数',
			type: 'line',
			stack: '总量',
			areaStyle: { normal: {} },
			data: _.map(result, "cured")
		})
		series.push({
			name: '死亡人数',
			type: 'line',
			stack: '总量',
			areaStyle: { normal: {} },
			data: _.map(result, "dead")
		})
		data = {
			legend: {
				top: '6%',
				data: ['确诊人数', '疑似人数', '治愈人数', '死亡人数']
			},
			yAxis: [
				{
					type: 'value'
				}
			],
			xAxis: [
				{
					data: dateKeys
				}
			],
			series: series
		};


		cb(null, data);
	});
}

function reportTwo(cb) {
	dao.list("StudentsModel", null, function (err, result) {
		if (err) return cb("获取学生数据失败");
		var areaKeys = _.union(_.map(result, "sbyqx"));
		var dateKeys = _.union(_.map(result, "snd"));
		// 格式输出
		var data = []
		var tmp = []
		var hours = areaKeys
		var days = dateKeys

		var byqx = _.groupBy(result, 'sbyqx');
		_(areaKeys).forEach(function (areaKey) {
			var nd = _.groupBy(byqx[areaKey], 'snd');
			_(dateKeys).forEach(function (dateKey) {
				tmp.push(_.size(nd[dateKey]))
			})
		})
		data = [
			[0, 0, tmp[0]],
			[1, 0, tmp[1]],
			[2, 0, tmp[2]],
			[0, 1, tmp[3]],
			[1, 1, tmp[4]],
			[2, 1, tmp[5]],
			[0, 2, tmp[6]],
			[1, 2, tmp[7]],
			[2, 2, tmp[8]],
			[0, 3, tmp[9]],
			[1, 3, tmp[10]],
			[2, 3, tmp[11]],
			[0, 4, tmp[12]],
			[1, 4, tmp[13]],
			[2, 4, tmp[14]]
			[0, 5, tmp[15]],
			[1, 5, tmp[16]],
			[2, 5, tmp[17]]
		]
		data = {
			title: {
				text: '2016-2018届毕业生去向',
				subtext: '中国石油大学计算机专业',
				x: 'center'
			},
			tooltip: {},
			visualMap: {
				max: 20,
				inRange: {
					color: [
						'#313695',
						'#4575b4',
						'#74add1',
						'#abd9e9',
						'#e0f3f8',
						'#ffffbf',
						'#fee090',
						'#fdae61',
						'#f46d43',
						'#d73027',
						'#a50026'
					]
				}
			},
			xAxis3D: {
				type: 'category',
				data: hours
			},
			yAxis3D: {
				type: 'category',
				data: days
			},
			zAxis3D: {
				type: 'value'
			},
			grid3D: {
				boxWidth: 200,
				boxDepth: 80,
				viewControl: {
					// projection: 'orthographic'
				},
				light: {
					main: {
						intensity: 1.2,
						shadow: true
					},
					ambient: {
						intensity: 0.4
					}
				}
			},
			series: [
				{
					type: 'bar3D',
					data: data.map(function (item) {
						return {
							value: [item[1], item[0], item[2]]
						}
					}),
					shading: 'lambert',

					label: {
						textStyle: {
							fontSize: 16,
							borderWidth: 1
						}
					},

					emphasis: {
						label: {
							textStyle: {
								fontSize: 20,
								color: '#900'
							}
						},
						itemStyle: {
							color: '#900'
						}
					}
				}
			]
		}
		cb(null, data);
	});

}
function reportThree(cb) {
	dao.list("StudentsModel", null, function (err, result) {
		if (err) return cb("获取学生数据失败");
		var areaKeyResult = {};
		var areaKeys = _.union(_.map(result, "sxb"));
		var dateKeys = _.union(_.map(result, "snd"));
		// 格式输出
		var series = [];
		var byqx = _.groupBy(result, 'sxb');
		_(areaKeys).forEach(function (areaKey) {
			var data = []
			var nd = _.groupBy(byqx[areaKey], 'snd');
			_(dateKeys).forEach(function (dateKey) {
				data.push(_.size(nd[dateKey]))
			})
			series.push({
				type: 'bar',
				data: data,
				coordinateSystem: 'polar',
				name: areaKey,
				stack: 'a'
			})

		});
		data = {
			title: {
				text: '2016-2018年毕业生人数',
				x: 'center'
			},
			angleAxis: {
				type: 'category',
				data: dateKeys
			},
			radiusAxis: {
			},
			polar: {
			},
			series: series,
			legend: {
				top: '8%',
				show: true,
				data: areaKeys,
				x: 'right'
			}
		};
		cb(null, data);
	});

}

function reportFour(cb) {
	dao.list("china_total_with_date", null, function (err, result) {
		if (err) return cb("获取疫情数据失败");
		var dateKeys = _.map(result, "date");
		var confirmed = _.map(result, "confirmed");
		var dead = _.map(result, "dead");
		var tmp = confirmed[0]
		var data1 = [];
		var data2 = [];
		confirmed.forEach(function (cfd) {
			data1.push(cfd - tmp)
			tmp = cfd;
		})
		tmp = dead[0]
		dead.forEach(function(de){
			data2.push(de - tmp);
			tmp = de;
		})
		var colors = ['#5793f3', '#d14a61', '#675bba'];
		var option = {
			color: colors,
			tooltip: {
				trigger: 'none',
				axisPointer: {
					type: 'cross'
				}
			},
			legend: {
				data: ['每日新增确诊', '每日新增死亡']
			},
			grid: {
				top: 70,
				bottom: 50
			},
			xAxis: [
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						onZero: false,
						lineStyle: {
							color: colors[1]
						}
					},
					axisPointer: {
						label: {
							formatter: function (params) {
								return '确诊  ' + params.value
									+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
							}
						}
					},
					data: dateKeys
				},
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						onZero: false,
						lineStyle: {
							color: colors[0]
						}
					},
					axisPointer: {
						label: {
							formatter: function (params) {
								return '死亡  ' + params.value
									+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
							}
						}
					},
					data: dateKeys
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '每日新增确诊',
					type: 'line',
					xAxisIndex: 1,
					smooth: true,
					data: data1
				},
				{
					name: '每日新增死亡',
					type: 'line',
					smooth: true,
					data: data2
				}
			]
		};
		cb(null, option);
	});

}

function reportFive(cb) {
	dao.list("StudentsModel", null, function (err, result) {
		if (err) return cb("获取学生数据失败");
		var areaKeyResult = {};
		var areaKeys = _.union(_.map(result, "sdwlx"));
		var dateKeys = _.union(_.map(result, "snd"));
		// 格式输出
		var series = [];
		var byqx = _.groupBy(result, 'sdwlx');
		_(areaKeys).forEach(function (areaKey) {
			var data = []
			var nd = _.groupBy(byqx[areaKey], 'snd');
			_(dateKeys).forEach(function (dateKey) {
				data.push(_.size(nd[dateKey]))
			})
			series.push({
				type: 'bar',
				data: data,
				coordinateSystem: 'polar',
				name: areaKey,
				stack: 'a'
			})

		});
		data = {
			title: {
				text: '2016-2018年毕业生所选单位类型',
				x: 'center'
			},
			angleAxis: {
				type: 'category',
				data: dateKeys
			},
			radiusAxis: {
			},
			polar: {
			},
			series: series,
			legend: {
				top: '4%',
				show: true,
				data: areaKeys
			}
		};
		cb(null, data);
	});

}
// 分布地图
function reportSix(cb) {
	dao.list("province_total", null, function (err, result) {
		if (err) return cb("获取学生数据失败");
		// 确诊人数
		var data = [];
		var series = [];
		var tmp = [];
		_(result).forEach(function (r) {
			series.push({
				name: r['province'],
				value: r['confirmed']
			})
		})
		tmp = {
			title: {
				text: '全国疫情分布情况',
				subtext: '累计确诊人数',
				x: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['确诊人数']
			},
			dataRange: {
				x: 'left',
				y: 'bottom',
				splitList: [
					{ start: 50000 },
					{ start: 5000, end: 500000 },
					{ start: 2000, end: 5000 },
					{ start: 1000, end: 2000 },
					{ start: 500, end: 1000 },
					{ start: 100, end: 500 },
					{ end: 100 }
				],
				color: ['maroon', 'purple', 'red', 'orange', 'yellow', 'lightgreen', 'lightblue']
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				x: 'right',
				y: 'center',
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			roamController: {
				show: true,
				x: 'right',
				mapTypeControl: {
					china: true
				}
			},
			series: [
				{
					name: '确诊人数',
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle: {
						normal: {
							label: {
								show: true,
								textStyle: {
									color: 'rgb(249, 249, 249)'
								}
							}
						},
						emphasis: { label: { show: true } }
					},
					data: series
				}
			]
		}
		data.push(tmp);
		// 疑似人数
		tmp = [];
		series = [];
		_(result).forEach(function (r) {
			series.push({
				name: r['province'],
				value: r['suspected']
			})
		})
		tmp = {
			title: {
				text: '全国疫情分布情况',
				subtext: '累计疑似人数',
				x: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['疑似人数']
			},
			dataRange: {
				x: 'left',
				y: 'bottom',
				splitList: [
					{ start: 5000 },
					{ start: 1000, end: 5000 },
					{ start: 500, end: 1000 },
					{ start: 100, end: 500 },
					{ start: 20, end: 100 },
					{ start: 10, end: 20 },
					{ end: 10 }
				],
				color: ['maroon', 'purple', 'red', 'orange', 'yellow', 'lightgreen', 'lightblue']
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				x: 'right',
				y: 'center',
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			roamController: {
				show: true,
				x: 'right',
				mapTypeControl: {
					china: true
				}
			},
			series: [
				{
					name: '疑似人数',
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle: {
						normal: {
							label: {
								show: true,
								textStyle: {
									color: 'rgb(249, 249, 249)'
								}
							}
						},
						emphasis: { label: { show: true } }
					},
					data: series
				}
			]
		}
		data.push(tmp);
		//治愈人数
		tmp = [];
		series = [];
		_(result).forEach(function (r) {
			series.push({
				name: r['province'],
				value: r['cured']
			})
		})
		tmp = {
			title: {
				text: '全国疫情分布情况',
				subtext: '累计治愈人数',
				x: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['治愈人数']
			},
			dataRange: {
				x: 'left',
				y: 'bottom',
				splitList: [
					{ start: 5000 },
					{ start: 1000, end: 5000 },
					{ start: 500, end: 1000 },
					{ start: 100, end: 500 },
					{ start: 50, end: 100 },
					{ start: 10, end: 50 },
					{ end: 10 }
				],
				color: ['maroon', 'purple', 'red', 'orange', 'yellow', 'lightgreen', 'lightblue']
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				x: 'right',
				y: 'center',
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			roamController: {
				show: true,
				x: 'right',
				mapTypeControl: {
					china: true
				}
			},
			series: [
				{
					name: '治愈人数',
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle: {
						normal: {
							label: {
								show: true,
								textStyle: {
									color: 'rgb(249, 249, 249)'
								}
							}
						},
						emphasis: { label: { show: true } }
					},
					data: series
				}
			]
		}
		data.push(tmp);
		//死亡人数
		tmp = [];
		series = [];
		_(result).forEach(function (r) {
			series.push({
				name: r['province'],
				value: r['dead']
			})
		})
		tmp = {
			title: {
				text: '全国疫情分布情况',
				subtext: '累计死亡人数',
				x: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['死亡人数']
			},
			dataRange: {
				x: 'left',
				y: 'bottom',
				splitList: [
					{ start: 1000 },
					{ start: 50, end: 100 },
					{ start: 20, end: 50 },
					{ start: 5, end: 20 },
					{ start: 2, end: 5 },
					{ start: 1, end: 2 },
					{ end: 1 }
				],
				color: ['maroon', 'purple', 'red', 'orange', 'yellow', 'lightgreen', 'lightblue']
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				x: 'right',
				y: 'center',
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			roamController: {
				show: true,
				x: 'right',
				mapTypeControl: {
					china: true
				}
			},
			series: [
				{
					name: '死亡人数',
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle: {
						normal: {
							label: {
								show: true,
								textStyle: {
									color: 'rgb(249, 249, 249)'
								}
							}
						},
						emphasis: { label: { show: true } }
					},
					data: series
				}
			]
		}
		data.push(tmp);






		cb(null, data);
	});

}
function reportSeven(cb) {
	dao.list("StudentsModel", null, function (err, result) {
		if (err) return cb("获取学生数据失败");
		var areaKeyResult = {};
		var areaKeys = _.union(_.map(result, "shyxz"));
		var dateKeys = _.union(_.map(result, "snd"));
		// 格式输出
		var series = [];
		var data = []
		var nd = _.groupBy(result, 'snd');
		_(dateKeys).forEach(function (dateKey) {
			var hyxz = _.groupBy(nd[dateKey], 'shyxz');
			_(areaKeys).forEach(function (areaKey) {
				series.push({
					value: _.size(hyxz[areaKey]),
					name: areaKey
				})
			})
			data.push(series);
			series = [];
		})
		data = {
			title: {
				text: '2016-2018届毕业生所选行业性质',
				subtext: '中国石油大学计算机专业',
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				left: 'center',
				top: 'bottom',
				data: areaKeys
			},
			toolbox: {
				show: true,
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			series: [
				{
					name: '2016年毕业生',
					type: 'pie',
					radius: [30, 110],
					center: ['15%', '35%'],
					roseType: 'area',
					data: data[0]
				},
				{
					name: '2017年毕业生',
					type: 'pie',
					radius: [30, 110],
					center: ['50%', '65%'],
					roseType: 'area',
					data: data[1]
				},
				{
					name: '2018年毕业生',
					type: 'pie',
					radius: [30, 110],
					center: ['85%', '35%'],
					roseType: 'area',
					data: data[2]
				}
			]
		}
		cb(null, data);
	});

}

function reportEight(cb) {
	dao.list("StudentsModel", null, function (err, result) {
		if (err) return cb("获取学生数据失败");
		var areaKeys = _.union(_.map(result, "sdwlx"));
		var dateKeys = _.union(_.map(result, "snd"));
		// 格式输出
		var data = []
		var tmp = []
		var hours = areaKeys
		var days = dateKeys

		var byqx = _.groupBy(result, 'sdwlx');
		_(areaKeys).forEach(function (areaKey) {
			var nd = _.groupBy(byqx[areaKey], 'snd');
			_(dateKeys).forEach(function (dateKey) {
				tmp.push(_.size(nd[dateKey]))
			})
		})
		data = [
			[0, 0 * 2, tmp[0]],
			[1, 0 * 2, tmp[1]],
			[2, 0 * 2, tmp[2]],
			[0, 1 * 2, tmp[3]],
			[1, 1 * 2, tmp[4]],
			[2, 1 * 2, tmp[5]],
			[0, 2 * 2, tmp[6]],
			[1, 2 * 2, tmp[7]],
			[2, 2 * 2, tmp[8]],
			[0, 3 * 2, tmp[9]],
			[1, 3 * 2, tmp[10]],
			[2, 3 * 2, tmp[11]],
			[0, 4 * 2, tmp[12]],
			[1, 4 * 2, tmp[13]],
			[2, 4 * 2, tmp[14]],
			[0, 5 * 2, tmp[15]],
			[1, 5 * 2, tmp[16]],
			[2, 5 * 2, tmp[17]]
		]
		data = {
			tooltip: {},
			title: {
				text: "2016-2018届毕业生所选单位类型",
				x: "center"
			},
			visualMap: {
				max: 20,
				inRange: {
					color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
				}
			},
			xAxis3D: {
				type: 'category',
				data: hours
			},
			yAxis3D: {
				type: 'category',
				data: days
			},
			zAxis3D: {
				type: 'value'
			},
			grid3D: {
				boxWidth: 200,
				boxDepth: 80,
				light: {
					main: {
						intensity: 1.2
					},
					ambient: {
						intensity: 0.3
					}
				}
			},
			series: [{
				type: 'bar3D',
				data: data.map(function (item) {
					return {
						value: [item[1], item[0], item[2]]
					}
				}),
				shading: 'color',

				label: {
					show: false,
					textStyle: {
						fontSize: 16,
						borderWidth: 1
					}
				},

				itemStyle: {
					opacity: 0.4
				},

				emphasis: {
					label: {
						textStyle: {
							fontSize: 20,
							color: '#900'
						}
					},
					itemStyle: {
						color: '#900'
					}
				}
			}]
		}
		cb(null, data);
	});

}
module.exports.reports = function (typeid, cb) {
	console.log(typeid);
	switch (parseInt(typeid)) {
		case 1:
			reportOne(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 2:
			reportTwo(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 3:
			reportThree(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 4:
			reportFour(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 5:
			reportFive(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 6:
			reportSix(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 7:
			reportSeven(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		case 8:
			reportEight(function (err, result) {
				if (err) return cb(err);
				cb(null, result);
			});
			break;
		default:
			cb("类型出错");
			break;
	}
}
