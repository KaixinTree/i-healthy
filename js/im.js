var g_group_sendmsg = group_sendmsg;

//function saveGroupMsg(group_id, data) {
//	var num = 0;
//	if (group_id != null && group_id != '') {
//		var n = plus.storage.getItem(group_id);
//		if (n == null) {
//			num = 0;
//		} else {
//			num = parseInt(n);
//		}
//	}
//	var key = group_id + '_' + num;
//	num = num + 1;
//	plus.storage.setItem(group_id, num.toString());
//	plus.storage.setItem(key, data);
//}

// 注意：index从1算起
//function getGroupMsg(group_id, index, count) {
//	var num = 0;
//	if (group_id != null && group_id != '') {
//		var n = plus.storage.getItem(group_id);
//		if (n == null) {
//			num = 0;
//		} else {
//			num = parseInt(n);
//		}
//	}
//	if (index > num) {
//		return null;
//	}
//	var msg = new Array();
//	var idx = 0;
//	for (var i = 0; i < count; i++) {
//		var n = num - (i + index);
//		if (n < 0) {
//			break;
//		}
//		var key = group_id + '_' + n;
//		var data = plus.storage.getItem(key);
//		if (data != null) {
//			var jdata = JSON.parse(data);
//			msg[idx] = {};
//			msg[idx].from_uid = jdata.from_uid;
//			msg[idx].content = jdata.content;
//			idx++;
//		}
//	}
//
//	return msg;
//}

//function savePushMsg(data) {
//	var num = 0;
//	var n = plus.storage.getItem('pushmsg');
//	if (n == null) {
//		num = 0;
//	} else {
//		num = parseInt(n);
//	}
//
//	var key = 'pushmsg_' + num;
//	num = num + 1;
//	plus.storage.setItem('pushmsg', num.toString());
//	plus.storage.setItem(key, data);
//}
//
//function getPushMsg(index, count) {
//	var num = 0;
//	var n = plus.storage.getItem('pushmsg');
//	if (n == null) {
//		num = 0;
//	} else {
//		num = parseInt(n);
//	}
//	if (index > num) {
//		return null;
//	}
//	
//	var msg = new Array();
//	var idx = 0;
//	for (var i = 0; i < count; i++) {
//		var n = num - (i + index);
//		if (n < 0) {
//			break;
//		}
//		var key = 'pushmsg_' + n;
//		var data = plus.storage.getItem(key);
//		if (data != null) {
//			var jdata = JSON.parse(data);
//			msg[idx] = {};
//			msg[idx].time = jdata.time;
//			msg[idx].content = jdata.content;
//			idx++;
//		}
//	}
//
//	return msg;
//}

function sendMessage(from_gid, from_uid, content) {
	var ret = true;
	mui.ajax(g_group_sendmsg, {
		data: {
			from_gid: from_gid,
			from_uid: from_uid,
			content: content
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		async: false,
		success: function(data) {
			if (data.errno == 0) {
				ret = true;
			} else {
				alert('发送失败');
				ret = false;
			}
		},
		error: function(xhr, type, errorThrown) {
			alert('发送失败');
			ret = false;
		}
	});

	return ret;
}
