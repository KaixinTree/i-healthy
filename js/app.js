//var openWebview = function(url) {
//	if ((typeof url == 'string') && url.constructor == String) {
//		mui.openWindow({
//			url: url,
//			id: getId(url)
//		});
//	} else if ((typeof url == 'object') && url.constructor == Object) {
//
//		mui.openWindow({
//			url: url.url,
//			id: getId(url.url),
//			extras: url.extras || {}
//		});
//	}
//
//}
//
//var openWebview1 = function(url) {
//		mui.openWindow({
//			url: url,
//			id: url.split(".")[0]
//		});
//	}

var openWebview = function(url1) {
	mui.openWindow({
		id: getId(url1),
		url: url1,
		waiting:{
			autoShow:false
		}
	})
}

var getId = function(url) {
	var aStr = url.split("/");
	var aid = null;
	if (aStr.length != 0) {
		aid = aStr[aStr.length - 1].split(".");
	} else {
		aid = aStr.split(".");
	}
	return aid[0];
}

/**
 * 带参数跳转
 * @param {string} url
 * @param {json} extrasParam
 */
var openWebviewExtras = function(url,extraspa) {
	mui.openWindow({
		url: url,
		id: getId(url),
		extras:extraspa
	})
}

//var getId = function(url) {
//	if (url.indexOf("?") > 0) {
//		url = url.substr(0, url.indexOf("?"));
//	}
//	var aStr = url.split("/");
//	var aid = null;
//	if (aStr.length != 0) {
//		aid = aStr[aStr.length - 1].split(".");
//	} else {
//		aid = aStr.split(".");
//	}
//	if (aid != null) {
//		return aid[0];
//	} else {
//		return null;
//	}
//
//}





var serverURL = "http://172.19.103.77:8080/wlyy/";
//var serverUrl = "http://180.76.129.165:8080/ssgg";
//var serverUrl = "http://192.168.3.120:8080/ssgg";

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//测试的账号
var commonPatientCode = "20160322000001";
var commonDoctorCode = "20160322000001";
var commonUserName = "张三";
var commonServerUrl = 'http://180.76.129.165:8080';