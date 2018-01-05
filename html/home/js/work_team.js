mui.plusReady(function() {
	//	mui(".c-list").on("tap", "li", function() {
	//		openWebview("my-doctor-advice-detail.html");
	//	});
	//查询列表
	//	clearHTML();
	queryList();
	//返回xiaoxi页面时红点消失
	var old_back = mui.back;	
	mui.back = function(){		
		var mainWv1 = plus.webview.getWebviewById("xiaoxi.html");
		mui.fire(mainWv1, "red_xinxi_none",{			 
		});
		old_back();
	}	
});

function queryList() {
	plus.nativeUI.showWaiting();
	//拼请求内容
	var params = {};
	//发送ajax请求
	sendPost("doctor/teams", params, queryListFailed, queryListSuccesss);
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
	console.log(JSON.stringify(res));
	if (res.status == 200) {
		//成功 
		showList(res.list);
//		template.helper("setIcon", function(i) {
//			return i || "../images/list-tb3.png"
//		});
//		template.helper("setJson", function(j) {
//			return JSON.stringify(j);
//		});
//		var cont = template("work_team_tmpl", res);
//		$("#work_team_list").html(cont);
	} else {
		//非200则为失败
		queryListFailed(res);
	}

	plus.nativeUI.closeWaiting();

}

/*
 * 条目点击事件
 */

//$("#work_team_list").on("click", "li", function() {
//	//		var attr_code = $(this).attr('attr_code');
//	//		var attr_first_doc = $(this).attr('attr_first_doc');
//	//		var attr_icon = $(this).attr('attr_icon');
//	//		var attr_name = $(this).attr('attr_name');
//	var infoStr = $(this).attr("data-json");
//
//	mui.openWindow('../../message/html/qunzuduihua.html', 'qunzudui', {
//		extras: {
//			info: infoStr
//		}
//	});
//
//});


/**
 * 清空tbody
 */
function clearHTML() {
	$("#work_team_list").html("");
}
/**
 * 显示查询结果
 * @param {Object} list
 */
function showList(list) {
	//	clearHTML();
	var _html = "";
	var new_num_S="";
	for (var i = 0; i < list.length; i++) {
		var data = list[i];
		if (!data) {
			continue;
		}
		var icon_url=""
		if(data.icon=="" || data.icon==null){
			icon_url="../images/list-tb3.png";			
		}	 
		
		var groupId=data.code;
		new_num_S = plus.storage.getItem(groupId + '_new');//获取新消息数量

		var new_info_num = "";
		if (new_num_S == null) {
			new_info_num = "";
		} else {
			new_info_num = new_num_S;
		}
		//组名大于15个字则后续用省略号代替
		var groupName=data.name;
		if(groupName.length>15){
			groupName=groupName.substring(0,15)+"...";
		}
		
		_html += "<li class='c-list-link c-list-function' data-json='" + JSON.stringify(data) + "' >"
		_html += "<div class='c-avatar-m'><img src='" + icon_url + "' class='c-images-cycle'></div>"
		_html += "<div class='c-list-info'>"
		_html += "<h4 class='c-nowrap'>" + groupName + "</h4>"
		_html += "<p class='c-nowrap'>创建人：" + data.doctor + "</p>"
		_html += "</div>"
		_html += "<div class='c-list-badge' style='color: red;' id='"+groupId+"'>"+new_info_num+"</div>"			
		_html += "<span class='list-icon arrow-right'></span>"
		_html += "</li>"
	}
	$("#work_team_list").html(_html);

	$("#work_team_list").on("click", "li", function() {
		var infoStr = $(this).attr("data-json");		
		var Did=infoStr.code;		
		var Didv="#"+Did;		
		$(Didv).html("");   //点击具体工作组后新消息数目清空
		mui.openWindow('../../message/html/qunzuduihua.html', 'qunzudui', {
			extras: {
				info: infoStr
			}
		});

	});

}


//添加数据添加监听
window.addEventListener("update_info", function(e) {
	clearHTML();
	//刷新列表
	queryList();

});
//退出群组对话时新消息数目设为空事件   ，事件设定在qunzuduihua.html
window.addEventListener("zero_xinxi", function() {	
//	alert(event.detail.id);
	var Did=event.detail.id;
	var Didv="#"+Did;
//	alert(Didv);
	$(Didv).html("");//html代码上显示为空
	
	var new_c=plus.storage.getItem(Did+ '_new');//将本地存储的新消息数设为空
	if(new_c!=null){
		plus.storage.removeItem(Did+ '_new');						
	}		
});

//实时更新新消息数目（当处于gongzuozu.html时）
window.addEventListener("update_xinxi", function() {	
//	alert(event.detail.id);
	var Did=event.detail.id;
	var Num=event.detail.num;
	var Didv="#"+Did;
	
	$(Didv).html(Num);
	
});