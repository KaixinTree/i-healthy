function send2Server(url, phone, func) {
	mui.ajax(url, {
		data: {
			moblie: phone,
			type: 3
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			var status = data.status;
//			if (status == 200) {
				//				mui.openWindow({
				//					url: "forget-2vertify.html",
				//					id: "forget-2vertify",
				//					waiting: {
				//						autoShow: false
				//					},
				//					extras: {
				//						mobile: phone
				//					}
				//				});
				func;
//			} else {
				mui.toast(data.msg);
//			}
		},
		error: function(xhr, type, errorThrown) {
			mui.toast(type);
		}
	});
}

/*
 * 计时
 */
function countTime() {
	var timer = "";
	timer = setInterval(function() {
		time--;
		if (time < 10) {
			time = "0" + time;
		}
		var oBtn = document.getElementById("time");
		oBtn.innerText = time + " 秒";
		if (time <= 0) {
			clearInterval(timer);
			oBtn.disabled = false;
			oBtn.innerText = "重新发送";
		}
	}, 1000)
}
/*
 * 验证完成后，跳转
 */
var verifiedToNext = function(phone,verify) {
	mui.openWindow('forget-3newpwd.html', 'forget-3newpwd', {
		extras: {
			mobile: phone,
			verifycode: verify
		}
	});
//	if (timer==null) {
//		clearInterval(timer);
//	}
}

function resetPwd(url, phone, verifyCode, pwd) {
	mui.ajax(url, {
		data: {
			type: 2,
			mobile: phone,
			captcha: verifyCode,
			newpwd: pwd
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {

//			if (data.status == 200) {
				mui.toast(data.msg);
				setTimeout(function() {
					mui.back();
				}, 1500);
//			} else {
//				mui.toast(data.msg);
//			}
		},
		error: function(xhr, type, errorThrown) {
		mui.toast(err.message);
		}
	});
}