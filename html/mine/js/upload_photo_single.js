
var fileUrl;
var fileHttpUrl;
//上传图片
var isModify = false;
var exper, intro;
var isOK = false;

function uploadSingleImg(expertise, introduce) {
	plus.nativeUI.showWaiting();
	exper = expertise;
	intro = introduce;
	if (isModify) {
		uploader();
	} else {
		var param = {
			photo: "",
			sex:"",
			province:"",
			city:"",
			expertise: exper,
			introduce: intro
		}
		sendPost("doctor/save", param, function() {

		}, handSendSucc1);
	}
}

function uploader() {
	
	var uploadServerUrl = server + "upload/image";
	var task = plus.uploader.createUpload(uploadServerUrl, {
		method: "post"
	}, function(t, status) {
		if (status == 200) {
			fileHttpUrl = JSON.parse(t.responseText).urls;
			saveInfo();
		} else {
			mui.toast("头像修改失败,请稍后重试");
			plus.nativeUI.closeWaiting();
		}
	});
	task.addFile(fileUrl, {})
	task.start();
}

function saveInfo() {
	var param = {
		photo: fileHttpUrl,
		expertise: exper,
		introduce: intro
	}
	sendPost("doctor/save", param, function() {

	}, handSendSucc);
}

function handSendSucc(res) {
	if (res.status == 200) {
		plus.nativeUI.closeWaiting();
//		mui.toast("资料修改成功");
		var wv = plus.webview.getWebviewById("mine.html");
		if (wv) {
			mui.fire(wv, 'updataPhoto', {
				photo: res.data
			});
		}
	}
		mui.toast(res.msg);
		plus.nativeUI.closeWaiting();
		isModify=false;
}

function handSendSucc1(res) {
	console.error(JSON.stringify(res));
	if (res.status == 200) {
		plus.nativeUI.closeWaiting();
//		plus.webview.currentWebview().close();
	}
		mui.toast(res.msg);
		plus.nativeUI.closeWaiting();
}

// 弹出选择照片方式
function showActionSheet(imgDom, imgFlag) {
	plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: [{
				title: "从相册选择"
			}, {
				title: "拍照"
			}]
		},
		function(event) {
			if (event.index == 1) {
				getGallery(imgDom, imgFlag);
			} else if (event.index == 2) {
				getCamera(imgDom, imgFlag);
			}
		}
	);
};
//获取相册

function getGallery(imgDom, imgFlag) {
	plus.gallery.pick(function(cbFile) { //scb：SuccessCallBack
		imgDom.src = cbFile;
		handlePickSucc(cbFile);
	}, function(ecb) { //ecb：ErrorCallBack
	}, {
		filename: "_doc/gallery/",
		filter: "image"
	});
}

function handlePickSucc(srcUrl) {
	plus.zip.compressImage({
		src: srcUrl,
		dst: "_doc/compressImg/"+srcUrl,
		quality: 20,
		overwrite: true
	}, function(succ) {
		var urlSucc = succ.target;
//		var size = succ.size;
//		var width = succ.width;
//		var height = succ.height;
		fileUrl = urlSucc;
		isModify = true; //修改标记
	}, function(err) {
		mui.toast("压缩失败:  " + err.message);
	});

}

// 调用系统摄像头
function getCamera(imgDom, imgFlag) {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(path) {
		console.log(path);
		/**
		 * 拍照成功后，图片本保存在本地，这时候我们需要调用本地文件
		 * http://www.html5plus.org/doc/zh_cn/io.html#plus.io.resolveLocalFileSystemURL
		 */
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			/*
			 * 将获取目录路径转换为本地路径URL地址
			 * http://www.html5plus.org/doc/zh_cn/io.html#plus.io.DirectoryEntry.toLocalURL
			 */
			imgDom.src = entry.toLocalURL();
			fileUrl = entry.toLocalURL();
			console.log(fileUrl);
			handlePickSucc(fileUrl);
		});
	}, function(error) {
		mui.toast(error.message)
	}, {
		filename: "_doc/camera/",
		index: 1 //ios指定主摄像头
	});
}