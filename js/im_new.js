//切换发布版本 true：正式版，连接生产环境；false：测试版，连接测试环境。
//var publish_version = true;
var publish_version = false;

// IM服务器
var im_login;
var im_logout;
var im_send_group;
var im_get_group_msg;

if (publish_version == true) {
	// IM服务器
	im_login="http://120.41.253.95:3000/user/login.im";
	im_logout="http://120.41.253.95:3000/user/logout.im";
	im_send_group="http://120.41.253.95:3000/group/sendmsg.im";
	im_get_group_msg="http://120.41.253.95:3000/group/getmsg.im";
} else {
	// IM服务器
	im_login="http://120.41.253.95:3030/user/login.im";
	im_logout="http://120.41.253.95:3030/user/logout.im";
	im_send_group="http://120.41.253.95:3030/group/sendmsg.im";
	im_get_group_msg="http://120.41.253.95:3030/group/getmsg.im";
}

var im={
	login:function(userId,token,client_id,platform){
		$.ajax({
			type:"get",
			url:im_login,
			data:{user_id:userId,token:token,client_id:client_id,platform:platform},
			async:true,
			dataType:"json",
			success:function(data){
				//data: {errno: 0, errmsg: 'login successful'}
				console.log(JSON.stringify(data));
			},
			error:function(msg){
				
			}
		});
	},
	logout:function(userId){
		$.ajax({
			type:"get",
			url:im_logout,
			data:{user_id:userId},
			async:true,
			dataType:"json",
			success:function(data){
				//data: {errno: 0, errmsg: 'login successful'}
				console.log(JSON.stringify(data));
			},
			error:function(msg){
				
			}
		});
	},
	sendGroup:function(userId,groupId,content,type,handler){
		
		$.ajax({
			type:"get",
			url:im_send_group,
			data:{from_uid:userId,to_gid:groupId,content:content,type:type},
			async:true,
			dataType:"json",
			success:function(data){
				//data: {errno: 0, errmsg: 'login successful'}
				console.log(JSON.stringify(data));
				handler(data);
			},
			error:function(msg){
				handler(msg);
			}
		});
	},
	getGroupMsg:function(groupId,start,count,handler){
		
		$.ajax({
			type:"get",
			url:im_get_group_msg,
			data:{gid:groupId,start:start,count:count},
			async:true,
			dataType:"json",
			success:function(data){
				//data: {errno: 0, errmsg: 'login successful'}
				console.log(JSON.stringify(data));
				handler(data);
			},
			error:function(msg){
				handler(msg);
			}
		});
	}
};