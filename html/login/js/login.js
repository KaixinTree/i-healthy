mui.init();
var self;
mui.plusReady(function() {
	self = plus.webview.currentWebview();
	if (self.exit) {
		mui.later(function() {
			exitUser();
		}, 1000)
	}
	/*
	 * 加密设置:获取public_key
	 */
	var key;

	/**
	 *登陆事件 
	 */
	document.getElementById("btn_login").addEventListener('tap', function() {
		plus.nativeUI.showWaiting("登录中...");
		var encryURL = "login/public_key";
		RSAUtils.getKeyFromServer(encryURL, handlSucc);
	});

	function handlSucc(res) {
		if (res.status == 200) {
			var mod = res.data.modulus;
			var exp = res.data.exponent;
			key = RSAUtils.getKeyPair(exp, "", mod);
			if (key) {
				var account = document.querySelector("#tel").value.trim();
				var pwd = document.querySelector("#pwd").value.trim();
				if (!account || account.length != 11) {
					plus.nativeUI.toast("请输入有效的手机号码");
					plus.nativeUI.closeWaiting();
					return;
				}
				if (!pwd || pwd.length < 6) {
					plus.nativeUI.toast("请输入不少于6位密码");
					plus.nativeUI.closeWaiting();
					return;
				}

				var encryedPwd = RSAUtils.encryStr(key, pwd);
				verifyLogin(account, encryedPwd);
			}

		}
	}
	/*
	 * 定义退出方法
	 */
	mui.back = function() {
		plus.nativeUI.confirm("确定退出？", function(e) {
			if (e.index == "0") {
				plus.runtime.quit();
			}
		}, "", ["确定", "取消"]);
	}
});

function verifyLogin(mobile, pwd) {
	sendPost("login/doctor", {
		mobile: mobile,
		password: pwd
	}, null, function(res) {
		if (res.status == 200) {
			var info = res.data;

			var iMei = plus.device.uuid;
			var docId = info.id;
			var uId = info.uid;
			var token = info.token;
			var name = info.name;
			var photo = info.photo;
			var platform = 2;
			var userAgent = plus.storage.getItem("userAgent");
			if (userAgent) {
				plus.storage.removeItem("userAgent");
			}
			var oUserAgent = {
				"id": docId,
				"uid": uId,
				"imei": iMei,
				"token": token,
				"platform": 2,
			};
			userAgent = JSON.stringify(oUserAgent);
			plus.navigator.setUserAgent(userAgent);
			plus.storage.setItem("userAgent", userAgent);

			var docInfo = {
				docName: name,
				docPhoto: photo,
				docCode: uId
			};
			var infoStr = JSON.stringify(docInfo);
			plus.storage.setItem("docInfo", infoStr);

			plus.storage.setItem("flag", "hello");
			plus.nativeUI.closeWaiting();
			mui.later(function() {
				mui.toast("登录成功");
				mui.openWindow('../../home/html/main.html', 'main');
			}, 500);
		}else{
			mui.toast(res.msg);
			plus.nativeUI.closeWaiting();
		}
	})

}

/*
 * 注册事件
 */
//document.getElementById("login_reg").addEventListener('tap', function() {
//		mui.openWindow('../../register/html/regist-1phone.html', 'regist-1phone', {});
//	})
/*
 * 忘记密码 
 */
//document.getElementById("login_forget").addEventListener('tap', function() {
//	mui.openWindow('../../forgetpwd/html/forget-1phone.html', 'forget-1phone', {})
//});

function exitUser() {
	var aWv = plus.webview.all();
	var lanWv = plus.webview.getLaunchWebview();
	for (var i = 0; i < aWv.length; i++) {
		if (aWv[i].id == self.id || aWv[i].id == lanWv.id) {
			continue;
		} else {
			aWv[i].close("none");
		}

	}

	var flag = plus.storage.getItem('flag');
	if (flag) {
		plus.storage.removeItem("flag");
	}
	var useragent = plus.storage.getItem("userAgent");
	if (useragent) {
		plus.storage.removeItem("userAgent");
	}
	var docInfo = plus.storage.getItem("docInfo");
	if (docInfo) {
		plus.storage.removeItem("docInfo");
	}
	//logout();
}

window.addEventListener("exit", function() {
	exitUser();
});