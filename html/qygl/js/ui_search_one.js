+function ($) {
	$.fn.formFocus = function (){
		var $this = $(this);
		if($this.attr('data-form')=="clear"){
			var $clear = $('<div class="input-clear"><span class="close"></span></div>').appendTo($this.parents('.c-ser-main'));
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
	})
}(jQuery);