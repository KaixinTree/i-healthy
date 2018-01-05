mui.plusReady(function() {
//	mui(".c-list").on("tap", "li", function() {
//		openWebview("my-doctor-advice-detail.html");
//	});
	//查询列表
//	clearHTML();
	queryList();
});

function queryList() {
	plus.nativeUI.showWaiting();
	//拼请求内容
	var params = {};	
	//发送ajax请求
	sendPost("doctor/team/list", params,queryListFailed, queryListSuccesss);
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
	$("#my_work_team").html("");
}
/**
 * 显示查询结果
 * @param {Object} list
 */
function showList(list) {
//	clearHTML();
	var _html = "";		
	var arry1=[];
	
	for (var i = 0; i < list.length; i++) {		
		var data = list[i];		
		_html+="<div class='patient-list'>"
		_html+=	"<div class='patient-type'>"
		_html+=		"<div class='arrow'> <i class='ui-arrow ui-arrow-b'></i></div>"
		_html+=		"<h3 class='t c-f14'>"+data.name+"<em class='c-ccc ml10 c-f10'><!--(3人)--></em></h3>"
		_html+=	"</div>"
		_html+=	"<ul id='doc_ul' class='n-list'></ul>"
		_html+="</div>"		
		arry1.push(_html);	
				
	}
	
	$("#my_work_team").html(_html);
	
	for (var i=0;i<list.length;i++){	
		var data1 = list[i];
		var _html2 = "";	
		var my_work_team_ul=$("#my_work_team>div:eq("+i+")>ul:eq(0)");
	
		for(var j=0;j<data1.doctors.length;j++){
			var data_doc=data1.doctors[j];
			var data_doc_type="";
			switch(data_doc.type)			
			{
			case 1:
			  data_doc_type="专科医生";
			  break;
			case 2:
			  data_doc_type="全科医生";
			  break;
			 case 3:
			  data_doc_type="健康管理师";
			  break;
			}			
			if(data_doc.photo==null ||data_doc.photo==""){
				data_doc.photo="../images/d-default.png";				
			}
			
			_html2+="<li class='n-list-link' attr_code='"+data_doc.code+"' list-arrow-r n-list-cover' >"
			_html2+=	"<div class='patient-face'><img src='"+data_doc.photo+"' /></div>"
			_html2+=	"<div class='n-list-info'>"
			_html2+=		"<h4 class='c-nowrap c-f14'>"+data_doc.name+"<em class='ml5 c-f12 c-909090'><!--男45岁--></em></h4>"
			_html2+=		"<p class='c-f12 c-909090 pt5'>"+data_doc_type+"</p>"
			_html2+=		"<em class='red-point'></em> </div>"
			_html2+=	"<div class='n-list-info c-t-right c-909090'><!--16-02-15--></div>"
			_html2+="</li>"
			
		}
		
		my_work_team_ul.html(_html2);
	}
	
	/* 展开居民列表  */
	$(".patient-type").on('click', function() {
		var $this = $(this);
		if ($this.parent('.patient-list').hasClass("current")) {
			$this.find('.arrow').removeClass('open');
			$this.next(".n-list").hide().parent('.patient-list').removeClass("current");
			$this.siblings().find('.n-list').hide();
			$this.siblings().find('.patient-list').removeClass('current');
			$this.siblings().find('.arrow').removeClass('open');
		} else {
			$this.find('.arrow').addClass('open');
			$this.next(".n-list").show().parent('.patient-list').addClass("current");
		};
	})
	
	
	
	mui("body").on("tap",".n-list-link",function () {
		var doc_code=$(this).attr("attr_code");
		
		mui.openWindow({
			url: "zuyuanziliao.html",
			id:"zuyuanziliao",
			extras: {
				code:doc_code,
				
			},
		});
	})
	

		
		
}
	
	
//	$("#Id_work_team").html(_html);
//	
//	$("#Id_work_team").on("click","li",function(){
//		var attr_code = $(this).attr('attr_code');
//	 	var attr_first_doc = $(this).attr('attr_first_doc');
//	 	var attr_icon = $(this).attr('attr_icon');
//	 	var attr_name = $(this).attr('attr_name');
//		
//		mui.openWindow({
//			url: "../../message/html/qunzu_duihua.html",
//			id:"qunzu_duihua",
//			extras: {
//				code:attr_code,
//				first_doc:attr_first_doc,
//				icon:attr_icon,
//				name:attr_name,				
//			}
//		});
//		
//	});
//	
	
	

	
//添加数据添加监听
window.addEventListener("update_info", function(e) {
	clearHTML();
	//刷新列表
	queryList();
	
});