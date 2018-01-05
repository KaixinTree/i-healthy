var patient = "";
var sortDate = "";
var pageSize = 10;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	if (self.pCode) {
		patient = self.pCode;
	}
	clearHTML();
	queryList(patient, sortDate, pageSize);
	//点击加载更多            
	document.getElementById('view_more').addEventListener("tap", function() {
		queryList(patient, sortDate, pageSize);
	});

});

function queryList(patient, sortDate, pageSize) {

	//拼请求内容
	var params = {};
	params.patient = patient;
	params.sortDate = sortDate;
	params.pagesize = pageSize;
	//发送ajax请求
	sendPost("doctor/health_record/list_medication", params, queryListFailed, queryListSuccesss);

}

/**
 * 健康指标图表查询成功处理方法
 */
function queryListSuccesss(res) {
	if (res.status == 200) {
		if (res.list.length > 0) {
			//成功
			showList(res.list);
		} else {
			//无更多数据
			document.querySelector("#view_more").innerText = "已无更多数据";

		}
	} else {
		//非200则为失败
		queryListFailed(res);
	}
	plus.nativeUI.closeWaiting();
}

/**
 * 显示查询结果
 * @param {Object} list
 */
function showList(list) {
	//	clearHTML();
	for (var i = 0; i < list.length; i++) {
		var data = list[i];
		if (!data) {
			continue;
		}
		//data.date.substr(5, 5) --只有月-日
		addRow(data.record_date, data.medicines);
		sortDate = list[i].sortDate;
	}
	document.getElementById("view_more").style.display="";

}

/**
 * 清空tbody
 */
function clearHTML() {
	$("#drug_list").html("");
}

/**
 * tbody添加一行tr
 * @param {Object} dateStr
 * @param {Object} value1
 * @param {Object} value2
 */
function addRow(date, medicines) {
	//	if(dateStr.length > 5){
	//		dateStr = dateStr.substr(5, 5);
	//	}
	var tb = document.querySelector("#drug_list");
	var tr = document.createElement("tr");
	var html = "";

	html += "<tr>"
	html += "<td class='width-30'>" + date + "</td>"
	html += "<td class='width-70'>" + medicines + "</td>"
	html += "</tr>"

	tr.innerHTML = html;
	tb.appendChild(tr);
	$("#view_more").css("display"," ");
}

//添加数据添加监听
window.addEventListener("add-item", function(e) {
	clearHTML();
	queryList();

});