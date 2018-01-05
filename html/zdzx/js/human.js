$(function(){
	var humanList;
	
	
	$('.human-list').height($('html').height());
	
			//页面初始化
	pInt();
	function pInt(){
		var wh=($(window).height()/468).toFixed(2);
		var wleft=($(window).width()-$('.wrapper').width()*wh)/2;
		$('.wrapper').css({'-webkit-transform':'scale('+wh+')','transform':'scale('+wh+')','margin-left':wleft});		
	}
	$(window).on("load resize", function () {
			setTimeout(pInt(), 500);
	});
	
	
$(window).on("load", function() {		
		
		
		TouchSlide({ 
			slideCell:"#slider-scroll",
			titCell:".hd ul",
			autoPage:true, 
			pnLoop:"false", 
			switchLoad:"_src"  
		});
		
		sexualitySelect();
		
		$('.gender-menu>ul>li>div').on('click',function(){
			var $el=$(this),
				index = $el.parent().index();
			$("#sex").val($(this).attr("sex"));
			$el.addClass('curr').parent().siblings().find('div').removeClass('curr');
			$('.human-box').eq(index).addClass('curr').siblings().removeClass('curr');
			onoffswitch(index,true);
			$('.sexuality-text').text($el.text());
		});
		$('.gender-switch-box').on('click',function(){
			var index=$('.gender-menu>ul>li>div.curr').parent().index();
			if($(this).is('.curr')){
				onoffswitch(index,true);	
			}else{
				onoffswitch(index,false);
			}
		});
		
		humanList=new IScroll('.human-list',{'click':true});
    });	
	
	$('.human-anchor').on('touchstart',function(){
		$(this).addClass('show');	
	}).on('touchend',function(){
		$(this).removeClass('show');	
	});
	
	
	function onoffswitch(index,b){
		if(b){
			$('.gender-switch-box').removeClass('curr');
			$('.human-box').eq(index).children('.human-elem').eq(0).addClass('curr').siblings().removeClass('curr');
		}else{
			$('.gender-switch-box').addClass('curr');
			$('.human-box').eq(index).children('.human-elem').eq(1).addClass('curr').siblings().removeClass('curr');
		}
	}
	
	function sexualitySelect(){
		var $text=$('.sexuality-text'),
			$box=$('.sexuality-box'),
			$div=$box.children('div'),
			$scroller=$('.human-list-scroller');
		$text.on('click',function(){
			$text.hide();
			$box.show();	
		});
		$div.on('click',function(){
			var i=$(this).index();
			$text.show().text($(this).text());
			$("#sex").val($(this).attr("sex"));
			$('.human-box').eq(parseInt($(this).attr("sex")) - 1).addClass('curr').siblings().removeClass('curr');
			$('.gender-menu>ul>li>div').eq(parseInt($(this).attr("sex")) - 1).addClass('curr').parent().siblings().find('div').removeClass('curr');
			$box.hide();
			$scroller.eq(i).addClass('curr').siblings().removeClass('curr');
			humanList.refresh();
		});
	};
	
})