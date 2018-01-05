/**
 * 健康记录添加失败处理方法
 */
function addHealthRecordFailed(res) {
	if (res && res.msg) {
		plus.nativeUI.toast(res.msg);
	} else {
		plus.nativeUI.toast("保存失败");
	}
}

/**
 * 运动添加成功处理方法
 */
function addSportSuccess(res) {
	if (res.status == 200) {
		//添加成功
		var val=document.getElementById("yd_val").value;		
		var wv_history = plus.webview.getWebviewById("health-record-sport");		
		//健康指标页面添加新数据
		mui.fire(wv_history, "add-item", {});		
		//提示添加成功
		plus.nativeUI.toast(res.msg);
	} else {
		//非200则为失败
		addHealthRecordFailed(res);
	}
}

/**
 * 用药添加成功处理方法
 */
function addDrugSuccess(res) {
	if (res.status == 200) {
		//添加成功
//		var val=document.getElementById("yd_val").value;		
		var wv_history = plus.webview.getWebviewById("health-record-drug");		
		//健康指标页面添加新数据
		mui.fire(wv_history, "add-item", {});		
		//提示添加成功
		plus.nativeUI.toast(res.msg);
	} else {
		//非200则为失败
		addHealthRecordFailed(res);
	}
}

/**
 * 饮食添加成功处理方法
 */
function addDietSuccess(res) {
	
	if (res.status == 200) {
		//添加成功
//		var val=document.getElementById("yd_val").value;		
		var wv_history = plus.webview.getWebviewById("health-record-diet");		
		//健康指标页面添加新数据
		mui.fire(wv_history, "add-item", {});		
		//提示添加成功
		plus.nativeUI.toast(res.msg);
	} else {
		//非200则为失败
		addHealthRecordFailed(res);
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
		var wv_history = plus.webview.getWebviewById("health-index-weight-history-sub");
		
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

/////////////////////////////////////////////////////////////////////////////////健康指标历史记录查询///////////////////////////////////////////////////////////////////////////
/**
 * 健康指标历史记录查询
 * @param {Object} type 健康指标类型（1血糖，2血压，3体重，4腰围）
 * @param {Object} page 当前分页
 * @param {Object} pagesize 分页大小
 */

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