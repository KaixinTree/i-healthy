mui.plusReady(function() {
//	mui(".c-list").on("tap", "li", function() {
//		openWebview("my-doctor-advice-detail.html");
//	});
	//查询列表
//	clearHTML();
//	queryList(); 
});

function queryList() {
	plus.nativeUI.showWaiting();
	//拼请求内容
	var params = {};
	params.id = 0;
	params.pagesize = 10;
	//发送ajax请求
	sendPost("doctor/comments", params,queryListFailed, queryListSuccesss);
}

function queryListFailed(res) {
	if (res && res.msg) {
		plus.nativeUI.toast(res.msg);
	} else {
		plus.nativeUI.toast("数据加载失败");
	}
	plus.nativeUI.closeWaiting();
}

function queryListSuccesss(res) {
	if (res.status == 200) {
		//成功 
		showList(res.list);
	} else {
		//非200则为失败
		queryListFailed(res);
	}
	
	plus.nativeUI.closeWaiting();
	
	
}

/**
 * 清空tbody
 */
function clearHTML() {
	$("#doc_list").html("");
}
/**
 * 显示查询结果
 * @param {Object} list
 */
function showList(list) {
	clearHTML();
	var _html = "";
	for (var i = 0; i < list.length; i++) {
		var data = list[i];
		if (!data) {
			continue; 
		}
		if(data.photo==null || data.photo==""|| data.photo=="undefined"){
			data.photo="../images/face.png";			
		}
		_html+="<li class='c-list-link c-list-function'>"
        _html+=    "<div class='c-avatar-m'><img src='"+data.photo+"' class='c-images-cycle'></div>"
        _html+=    "<div class='c-list-info'>"
        _html+=        "<h4 class='c-nowrap'>"+data.name+"</h4>"
        _html+=        "<p class='c-nowrap'>  </p>"
        _html+=    "</div>"
        _html+="</li>"
		
		
	}
	$("#doc_list").html(_html); 	
	
}
	
//	$("#equ_list").on("click","li",function(){
//	 	var attr_code = $(this).attr('attr_code');
//	 	var attr_name = $(this).attr('attr_name');
//	 	var attr_sn = $(this).attr('attr_sn');
//	 	
//	 	//获取现在有的设备类别以及名称
//      var params = {}
//      params.code = attr_code;
//      var dev_list={};
//      
//		//发送ajax请求， 查询设备列表信息
//		sendPost("patient/device/info", params, "json", "post", queryListFailed,device_info_Successs);				
//		function device_info_Successs(res){		
//			var category=res.data.category;
//			var type_name='';
//			//发送ajax请求， 查询设备类型
//			sendPost("patient/device/category"," ", "json", "post", queryListFailed,device_type_Successs);
//			function device_type_Successs(reso){
//				dev_list=reso.list;	
//				for(var i=0;i<reso.list.length;i++){
//					if(reso.list[i].code==category){
//						type_name=reso.list[i].name;
//						
//						mui.openWindow({
//							url: "equipment-detail.html",
//							id:"equipment-detail",
//							extras: {
//								code:attr_code,
//								category:category,
//								type_name:type_name,
//								name:attr_name,
//								sn:attr_sn,
//							},
//						});
//					
//					}
//				
//				}
//				
//			}
////			
////						
//		}
//	 	
//	 	
//	})
//}

//function li_click(content){
//	mui.openWindow({
//			url: "my-doctor-advice-detail.html",
//			extras: {
//				content: content
//			},
//		});
//}
//
//function addRow(content, czrq) {
//	var ul = document.querySelector("#item");
//	var li = document.createElement("li");
//	li.className = "c-list-text";
//	li.onclick = function() {
//		mui.openWindow({
//			url: "my-doctor-advice-detail.html",
//			extras: {
//				content: content
//			},
//		});
//	};
//
//	var html = '<div class="c-list-info">';
//	html += '<h4 class="c-nowrap">' + content + '</h4></div>'
//	html += '<div class="c-list-value">' + czrq.substring(0, 10) + '</div>';
//
//	li.innerHTML = html;
//	ul.appendChild(li);
//}




//添加数据添加监听
window.addEventListener("update_info", function(e) {
	clearHTML();
	//刷新列表
	queryList();
	
});