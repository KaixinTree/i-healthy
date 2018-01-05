mui.init();
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var docType = plus.storage.getItem("docType");
	if (!docType) {
		alert("获取医生类型失败");
	}

	var subPages = [];
	switch(docType) {
		case "1":
			subPages = ["home1.html", "mine.html"];
			$(".mui-tab-item").eq(2).remove();
			$(".mui-tab-item").eq(1).remove();
			$(".mui-tab-item").eq(0).attr("data-src", "home1.html")
			break;
		case "2":
		case "3":
			subPages = ["home2.html", "huanzhe.html", "xiaoxi.html", "mine.html"];
			break;
		default:
			break;
	}

	var subStyles = {
		top: 0,
		bottom: "51px",
		scorllIndicator: "none"
	};
	for(var i = 0; i < subPages.length; i++) {
		var sub_wv = plus.webview.create(subPages[i], subPages[i], subStyles);
		if(i > 0) {
			sub_wv.hide();
		}
		self.append(sub_wv);
	}

	var activeSub = subPages[0];
	var aTab = document.querySelectorAll(".mui-tab-item");
	for(var i = 0; i < aTab.length; i++) {
		aTab[i].addEventListener("tap", function() {
			var targetSub = this.getAttribute("data-src");
			if(targetSub == activeSub) {
				return;
			}
			//			if(targetSub == "xiaoxi.html") {
			//				getTotalDate();
			//			}
			plus.webview.show(targetSub);
			plus.webview.hide(activeSub);
			activeSub = targetSub;
		});
	}
	/*
	 * 退出事件
	 */
	var first = null;
	mui.back = function() {
		if(!first) {
			first = new Date().getTime();
			plus.nativeUI.toast("再按一次退出");
			setTimeout(function() {
				first = null;
			}, 1000);
		} else {
			if(new Date().getTime() - first < 1000) {
				plus.runtime.quit();
			}
		}
	}

	var info = plus.storage.getItem("docInfo");
	if(!info) {
		sendPost("doctor/baseinfo", {}, null, function(res) {
			if(res.status == 200) {
				var infoStr = JSON.stringify(res.data);
				plus.storage.setItem("docInfo", infoStr);
				var docType = res.data.doctorType;
				plus.storage.setItem("docType", docType);
			} else {
				mui.toast("获取医生信息失败");
			}
		});
	}

	window.addEventListener("activeHuanzhe", function() {
		var items = $(".mui-tab-item");
		mui.trigger(items.get(1), "tap");
		items.removeClass("mui-active");
		mui.later(function() {
			items.eq(1).addClass("mui-active");
		}, 100);
	});
	window.addEventListener("activeXiaoxi", function() {
		var items = $(".mui-tab-item");
		mui.trigger(items.get(2), "tap");
		items.removeClass("mui-active");
		mui.later(function() {
			items.eq(2).addClass("mui-active");
		}, 100);
	});

});