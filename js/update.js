
function update() {
	sendPost("version/app", {
		version: plus.runtime.version,
		code: "app_doc"
	}, null, function(res) {
		if (res.status == 200) {
			if (res.url) {
				mui.confirm("发现新版本，下载更新？", "更新", ["立即更新", "取　　消"], function(event) {
					if (0 == event.index) {
						plus.runtime.openURL(res.url);
					}
				});
			}
		}
	})
}

mui.plusReady(update);