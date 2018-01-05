function getNowDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}

/**
 * 获取多少天前的日期
 */
function getDateBefore(days) {
	var now = new Date();
	var date = new Date(now.getTime() - days * 24 * 3600 * 1000);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}

/**
 * 添加健康指标到服务器
 * intervene	干预标志
 * time	记录时间
 * value1 血糖/收缩压/体重/腰围
 * value2 舒张压
 * point 血糖测量点标识
 * type	健康指标类型（1血糖，2血压，3体重，4腰围）
 */
function addHealthIndex(intervene, operTime, value1, value2, value3, value4, value5, value6, value7, type, successFunction) {
	//拼请求内容
	var params = {};
	params.intervene = intervene;
	params.time = operTime;
	params.value1 = value1;
	params.value2 = value2;
	params.value3 = value3;
	params.value4 = value4;
	params.value5 = value5;
	params.value6 = value6;
	params.value7 = value7;
	params.type = type;
	//发送ajax请求
	sendPost("patient/health_index/add",params,addHealthIndexFailed, successFunction);
}

/**
 * 健康指标添加失败处理方法
 */
function addHealthIndexFailed(res) {
	if (res && res.msg) {
		plus.nativeUI.toast(res.msg);
	} else {
		plus.nativeUI.toast("保存失败");
	}
}

/**
 * 血压添加成功处理方法
 */
function addBloodPressureSuccess(res) {
	if (res.status == 200) {
		//添加成功
		var record_date = document.getElementById("date").value;
		var val_h = document.getElementById("val_h").value;
		var val_l = document.getElementById("val_l").value;
		var wv_index = plus.webview.getWebviewById("health-index");
		var wv_history = plus.webview.getWebviewById("health-index-bloodpressure-history");
		var wv_chart = plus.webview.getWebviewById("health-index-bloodpressure-chart");
		//更新健康指标首页显示数据
		mui.fire(wv_index, "input-index", {
			type: "xy",
			value: "收缩压：" + val_h + "<br/>舒张压" + val_l
		});
		//健康指标页面添加新数据
		mui.fire(wv_history, "add-item", {
			date: record_date,
			val_high: val_h,
			val_low: val_l
		});
		mui.fire(wv_chart, "refleshList", {});
		//提示添加成功
		plus.nativeUI.toast(res.msg);
		//关闭当前页面
		var self = plus.webview.currentWebview();
		self.close("none");
	} else {
		//非200则为失败
		addHealthIndexFailed(res);
	}
}

/**
 * 血糖添加成功处理方法
 */
function addBloodSugarSuccess(res) {
	if (res.status == 200) {
		//添加成功
		var record_date = document.getElementById("date").value;
		var type_str = document.getElementById("type").value;
		var val = document.getElementById("val").value;
		var type;
		switch (type_str) {
			case "空腹血糖":
				type = ".bb";
				break;
			case "早餐后血糖":
				type = ".ba";
				break;
			case "午餐前血糖":
				type = ".lb";
				break;
			case "午餐后血糖":
				type = ".la";
				break;
			case "晚餐前血糖":
				type = ".db";
				break;
			case "晚餐后血糖":
				type = ".da";
				break;
			case "睡前血糖":
				type = ".sb";
				break;
		}
		var wv_index = plus.webview.getWebviewById("health-index");
		var wv_history = plus.webview.getWebviewById("health-index-bloodsugar-history");
		//				var option={date:date,type:type,value:val};
		var wv_chart = plus.webview.getWebviewById("health-index-bloodsugar-chart");
		mui.fire(wv_index, "input-index", {
			type: "xt",
			value: type_str + "值 ：" + val
		});
		mui.fire(wv_history, "add-item", {
			date: record_date,
			type: type,
			value: val
		});
		mui.fire(wv_chart, "refleshList", {});
		//提示添加成功
		plus.nativeUI.toast(res.msg);
		//关闭当前页面
		var self = plus.webview.currentWebview();
		self.close("none");
	} else {
		//非200则为失败
		addHealthIndexFailed(res);
	}
}

/**
 * 腰围添加成功处理方法
 */
function addWaistlineSuccess(res) {
	if (res.status == 200) {
		//添加成功
		var record_date = document.getElementById("date").value;
		var val = document.getElementById("val").value;
		var wv_index = plus.webview.getWebviewById("health-index");
		var wv_history = plus.webview.getWebviewById("health-index-waistline-history");
		var wv_chart = plus.webview.getWebviewById("health-index-waistline-chart");
		//	var option={date:date,type:type,value:val};
		mui.fire(wv_index, "input-index", {
			type: "yw",
			value: val
		});
		mui.fire(wv_history, "add-item", {
			date: record_date,
			value: val
		});
		mui.fire(wv_chart, "refleshList", {});
		//提示添加成功
		plus.nativeUI.toast(res.msg);
		//关闭当前页面
		var self = plus.webview.currentWebview();
		self.close("none");
	} else {
		//非200则为失败
		addHealthIndexFailed(res);
	}
}

/**
 * 体重添加成功处理方法
 */
function addWeightSuccess(res) {
	if (res.status == 200) {
		//添加成功
		var record_date = document.getElementById("date").value;
		var val = document.getElementById("val").value;
		var wv_index = plus.webview.getWebviewById("health-index");
		var wv_history = plus.webview.getWebviewById("health-index-weight-history");
		var wv_chart = plus.webview.getWebviewById("health-index-weight-chart");
		//	var option={date:date,type:type,value:val};
		mui.fire(wv_index, "input-index", {
			type: "tz",
			value: val
		});
		mui.fire(wv_history, "add-item", {
			date: record_date,
			value: val
		});
		mui.fire(wv_chart, "refleshList", {});
		//提示添加成功
		plus.nativeUI.toast(res.msg);
		//关闭当前页面
		var self = plus.webview.currentWebview();
		self.close("none");
	} else {
		//非200则为失败
		addHealthIndexFailed(res);
	}
}

/////////////////////////////////////////////////////////////////////////////////健康指标图表数据查询///////////////////////////////////////////////////////////////////////////

/**
 * 查询健康指标图表
 * @param {Object} type 健康指标类型（1血糖，2血压，3体重，4腰围）
 * @param {Object} begin 记录开始时间
 * @param {Object} end 记录结束时间
 */
function queryChatByType(patient,type, begin, end, successFunction) {
	//拼请求内容
	var params = {};
	params.patient = patient;
	params.type = type;
	params.begin = begin;
	params.end = end;
	//发送ajax请求
	sendPost("doctor/health_index/chart", params,queryChartFailed, successFunction);
}

/**
 * 健康指标图表查询失败处理方法
 */
function queryChartFailed(res) {
	if (res && res.msg) {
		plus.nativeUI.toast(res.msg);
	} else {
		plus.nativeUI.toast("数据加载失败");
	}
	plus.nativeUI.closeWaiting();
}

/////////////////////////////////////////////////////////////////////////////////健康指标历史记录查询///////////////////////////////////////////////////////////////////////////
/**
 * 健康指标历史记录查询
 * @param {Object} type 健康指标类型（1血糖，2血压，3体重，4腰围）
 * @param {Object} page 当前分页
 * @param {Object} pagesize 分页大小
 */
function queryListByType(patient,type, beginDate, endDate, successFunction) {
	//拼请求内容
	var params = {};
	params.type = type;
	params.patient = patient;
	params.begin = beginDate;
	params.end = endDate;
	params.pagesize=999;
	//发送ajax请求
	sendPost("doctor/health_index/list", params, queryListFailed, successFunction);
}

/**
 * 健康指标历史记录查询失败处理方法
 */
function queryListFailed(res) {
	if (res && res.msg) {
		plus.nativeUI.toast(res.msg);
	} else {
		plus.nativeUI.toast("数据加载失败");
	}
	plus.nativeUI.closeWaiting();
}