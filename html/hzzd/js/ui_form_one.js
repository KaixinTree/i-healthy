+function ($) {
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
			var $clear = $('<div class="input-clear"><span class="close"></span></div>').appendTo($this.parents('.input-group'));
			$this.on('blur',function(){
				setTimeout(function(){$clear.remove();},200)
			});
			$clear.on('click',function(){
				$this.val('').focus();	
			})
		}
	}
	$(document).on('focus','input[data-form="focus"],input[data-form="clear"]',function(){
		$(this).formFocus();
	});
	
	// data-checked="true"
	
	$(document).on('click','div.input-group-pack[data-checked="true"]',function(){
		var $el=$(this),
			$input=$el.children('input');
		if($input.attr("checked")){
			 return;
		}else{
			$el.toggleClass('checked');
			$input.attr("checked",true);
		}
		alert(2)
	});
}(jQuery);