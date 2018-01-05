//切换发布版本 true：正式版，连接生产环境；false：测试版，连接测试环境。
//var upload_publish_version = true;
var upload_publish_version = false;

var server = "";

if(upload_publish_version == true) {
	//正式服务器
	server = "http://www.xmtyw.cn/wlyy/";

} else {
	//	alert("注意：这是测试版！");
	//测试服务器
	server = "http://weixin.xmtyw.cn/wlyy/";
}

//上传图片
function uploadImg(uploadImgUrl, fuUploadSucc) {
	var task = plus.uploader.createUpload(server + "upload/image", {
		method: "POST",
		timeout: 3000
	}, function(uploadObj, status) {
		//		console.log(uploadObj.responseText);
		if(status == 200) {
			//			console.log("上传成功 " + uploadObj.url);
			//			clearImg();
			fuUploadSucc(uploadObj);
			//			var resText=uploadObj.responseText;
			//			var oRes=JSON.parse(resText);
			//			var imgNames=oRes.images;
			//			var imgUrls=oRes.urls;
			//			sendPost(server+"doctor/consult_public/reply",{consult:consultId,content:content,imageCodes:imgNames,imageUrls:imgUrls});

		} else {
			mui.toast('上传失败:  ' + status);
		}
		plus.nativeUI.closeWaiting();
	});

	var len = uploadImgUrl.length;
	if(len > 0) {
		for(var i = 0; i < len; i++) {
			//			console.log(uploadImgUrl[i]);
			task.addFile(uploadImgUrl[i], {});
		}
		task.start();
	}

}
//获取压缩图片路径
function getCompressImg() {
	var pressImgUrl = [];
	var imgs = document.querySelectorAll(".add-img li img");
	if(imgs.length > 0) {
		plus.nativeUI.showWaiting();
		var path, prepath = "_doc/press_img/";
		for(var i = 0; i < imgs.length; i++) {
			path = imgs[i].getAttribute("src");
			var aImg = path.split("/");
			var imgName = aImg[aImg.length - 1];
			compressImg(path, prepath + imgName, pressImgUrl);
		}
		return pressImgUrl;
	} else {
		return null;
	}
}
//压缩图片
function compressImg(path, dstpath, imgurl) {
	plus.zip.compressImage({
		src: path,
		dst: dstpath,
		quality: 20,
		overwrite: true
	}, function(succ) {
		var url = succ.target;
		var size = succ.size;
		var width = succ.width;
		var height = succ.height;
		//		console.log("压缩成功   " + url);
		imgurl.push(url);
	}, function(err) {
		console.error("压缩失败:" + err.message);
		if(err.message == "文件不存在") {
			mui.toast(err.message);
			plus.nativeUI.closeWaiting();
			plus.webview.currentWebview().reload();
		}
	});
}
//删除图片
//			function delImgItem() {
//				mui(".add-img").on("tap", ".icon-del", function() {
//					var oli = this.parentElement;
//					var oul = this.parentElement.parentElement;
//					oul.removeChild(oli);
//				});
//			};
//上传成功后清空所有图片
function clearImg() {
	var imgArea = document.querySelector(".add-img");
	var imgItems = imgArea.children;
	var len = imgItems.length;
	for(var j = len - 1; j >= 0; j--) {
		//		var node = imgItems[j].nodeName;
		imgArea.removeChild(imgItems[j]);
	}
}
// 弹出选择照片方式
function showActionSheet(imgArea, imgFlag) {
	plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: [{
				title: "从相册选择"
			}, {
				title: "拍照"
			}]
		},
		function(event) {
			if(event.index == 1) {
				getGallery(imgArea, imgFlag);
			} else if(event.index == 2) {
				getCamera(imgArea, imgFlag);
			}
		}
	);
};
//获取相册
function getGallery(imgArea, imgFlag) {
	//	plus.gallery.pick(function(scb) { //scb：SuccessCallBack
	plus.gallery.pick(function(cbFile) { //scb：SuccessCallBack
		//		var filePaths = scb.files;
		//		console.log("选择图片的数量： " + filePaths.length);
		//		for (var i in filePaths) {
		//					console.log("单个图片的path:" + "第" + (i * 1 + 1) + "张图片的path-->" + filePaths[i]);
		var li = document.createElement("li");
		//					span.innerHTML = '<img src="' + filePaths[i] + '" /><a class="mui-badge mui-badge-red">X</a>'
		li.innerHTML = '<img src="' + cbFile + '" /><i class="icon-del"></i>';
		imgArea.insertBefore(li, imgFlag);
		//		}
	}, function(ecb) { //ecb：ErrorCallBack
		//		console.log("取消选择图片");
		//console.log("取消选择图片" + "   错误代码： " + ecb.code + "   错误描述： " + ecb.message);
	}, {
		//		multiple: true,
		filename: "_doc/gallery/",
		filter: "image"
	});
}
// 调用系统摄像头
function getCamera(imgArea, imgFlag) {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(path) {
		/**
		 * 拍照成功后，图片本保存在本地，这时候我们需要调用本地文件
		 * http://www.html5plus.org/doc/zh_cn/io.html#plus.io.resolveLocalFileSystemURL
		 */
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			/*
			 * 将获取目录路径转换为本地路径URL地址
			 * http://www.html5plus.org/doc/zh_cn/io.html#plus.io.DirectoryEntry.toLocalURL
			 */
			var li = document.createElement("li");
			li.innerHTML = '<img src="' + entry.toLocalURL() + '" /><i class="icon-del"></i>';
			imgArea.insertBefore(li, imgFlag);
		});
	}, function(error) {
		//		console.log(error.message);
	}, {
		filename: "_doc/camera/",
		index: 1 //ios指定主摄像头
	});
}