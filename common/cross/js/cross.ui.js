/**
 * cross ui_form.js
 */
$(function(){
    $.fn.formFocus = function (){
        var $this = $(this);

        if($this.parents('.input-group').find('span.input-group-addon').length>0 && $this.attr('data-form')=="focus"){
            $span = $this.parents('.input-group').find('span.input-group-addon');
            $span.addClass('focus');
            $this.on('blur',function(){
                $span.removeClass('focus');
            });
        }

        if($this.attr('data-form')=="clear"){
            var $clear = $('<div class="input-clear"></div>').insertAfter($this);
            $this.on('blur',function(){
                setTimeout(function(){$clear.remove();},200);
            });
            $clear.on('click',function(){
                $this.val('').focus();
            });
        }
    }

    $(document).on('focus','input[data-form="focus"],input[data-form="clear"]',function(){
        $(this).formFocus();
    });


    $('body').on('click','label.input-group-checkbox',function(e){
        if (e || e.preventDefault()) e.preventDefault(); else window.event.returnValue = false;
            var $el=$(this),
            $div=$el.children('.input-group-pack'),
            $input=$div.children(':checkbox');

            if($div.is('.input-group-pack-disabled')){
                return false;
            }
            if($div.is('.checked')) {
                $div.removeClass('checked');
                $input.prop({'checked':false});
        } else {
            $div.addClass('checked');
            $input.prop({'checked':true});
        }
    });

    $('body').on('click','label.input-group-radio',function(e){
        if (e || e.preventDefault()) e.preventDefault(); else window.event.returnValue = false;
        var $el=$(this),
        $div=$el.children('.input-group-pack'),
        $input=$div.children(':radio');
        if($div.is('.input-group-pack-disabled')){
            return false;
        }
        $el.parent().find('.input-group-radio').children('.input-group-pack').removeClass('checked').find(':radio').prop({'checked':false});
        $div.addClass('checked');
        $input.prop({'checked':true});
    });
});

var myLayer = {
	alert: function(content,time,callback){
		if($(".c-alert-box").is(":visible")){
			$(".c-alert-box").remove();
		}
		if(time == undefined || time == "" || time == null){
			time = 3000;
		}
		var ahtml = '<div class="c-alert-box">'+content+'</div><div class="c-al-screen"></div>';
		$("body").append(ahtml);
		var aleL = ($(window).width() - $(".c-alert-box").width() - 20) / 2;
		$(".c-alert-box").css('left', aleL + "px");
		setTimeout(function(){
			$(".c-alert-box,.c-al-screen").remove();
			if (callback){callback();}
		},time);
	},
	load: function(content){
		if($(".c-load-box").is(":visible")){
			$(".c-load-box").remove();
		}
		if(content == undefined || content == "" || content == null){
			content = "\u52a0\u8f7d\u4e2d..."
		}
		var lhtml = '<div class="c-load-box"><span class="loadgif"></span><p>'+content+'</p></div><div class="c-al-screen"></div>';
		$("body").append(lhtml);
		var totW = $(window).width();
		var aleL = (totW - $(".c-load-box").width() - 60) / 2;
		$(".c-load-box").css('left', aleL + "px");
	},
	clear: function(){
		$(".c-load-box,.c-al-screen").remove();
	},
	confirm: function(options){
		var dft= {
			title:'',
			con:'',
			cancel: null,
			cancelValue:'\u53d6\u6d88',
			ok: null,
			okValue:'\u786e\u5b9a'
		}
		var ops = $.extend(dft,options);
		var chtml = '<div class="c-conf-screen"></div>';
		chtml += '<div class="c-conf-box">';
		if(ops.title != ""){
			chtml += '<div class="conftitle">'+ops.title+'</div>';
		}
		chtml += '<div class="confcontent">'+ops.con+'</div>';
		if(ops.cancel != null){
			chtml += '<div class="c-confbtn"><a href="javascript:;" class="c-twobtn" id="popcanclebtn">'+ops.cancelValue+'</a><a href="javascript:;" class="c-twobtn" id="popsurebtn">'+ops.okValue+'</a></div>';
		}else{
			chtml += '<div class="c-confbtn"><a href="javascript:;" class="c-onebtn" id="popsurebtn">'+ops.okValue+'</a></div>';	
		}
		chtml += '</div></div>';
		$("body").append(chtml);
		var aleT = ($(".c-conf-box").height() + 15) / 2;
		$(".c-conf-box").css('margin-top', -aleT);
		$("#popcanclebtn").click(function(){
			if (ops.cancel){ops.cancel();}
			$(".c-conf-box,.c-conf-screen").remove();
		});
		$("#popsurebtn").click(function(){
			if (ops.ok){ops.ok();}
			$(".c-conf-box,.c-conf-screen").remove();
		});
	}
}