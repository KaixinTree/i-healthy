+ function($) {
	$.fn.chatBar = function(options) {
		var defaultsettings = {
			txtPlaceholder: '请输入内容...',
			cancelBack: null,
			sendBack: null,
			cancelValue: '取消',
			okValue: '发送',
		};
		if (this.length == 0) return this;
		if (this.length > 1) {
			this.each(function() {
				$(this).chatBar(options)
			});
			return this;
		}
		var opts = $.extend(defaultsettings, options);
		var $this = $(this),
			el = this;
		var wh=$(window).height();
		var chatTextWarp =
			'<div class="chat-wrap" style="height:'+wh+'px;"><div class="chat-textarea">' +
			'<textarea placeholder="' + defaultsettings.txtPlaceholder + '"></textarea>' +
			'</div><ul class="chat-btn-group">' +
			'<li class="chat-btn-cancel">' + defaultsettings.cancelValue + '</li><li class="chat-btn-send disabled">' +
			defaultsettings.okValue + '</li></ul></div>';
		$this.append(chatTextWarp);
		$this.on("click", ".chat-input", function() {
			if ($(".chat-wrap").length > 0) {
				$(".chat-wrap").addClass("chat-show");
				$(".chat-textarea textarea").val("").focus();
				$(".chat-btn-send").addClass("disabled");
				
				setTimeout(function(){
					$("body,html").scrollTop(0);
					},800)
			}/* else {
				
				setTimeout(function() {
					$(".chat-wrap").addClass("chat-show");	
				}, 100);
				setTimeout(function() {
					$(".chat-textarea textarea").focus();
				}, 400);
				
			}*/
		});
		/* 取消按钮 */
		$this.on("click", ".chat-btn-cancel", function() {
			setTimeout(function() {
				$(".chat-wrap").removeClass("chat-show");
			}, 200)

		});
		/* 发送按钮 */
		$this.on("click", ".chat-btn-send", function() {

			setTimeout(function() {
				$(".chat-wrap").removeClass("chat-show");
			}, 200)
			if (opts.sendBack) {
				var sendtxt = $(".chat-textarea textarea").val();
				opts.sendBack(sendtxt);
			};
		});
		$this.on("input propertychange", "textarea", function() {
			if ($(this).val() != "") {
				$(".chat-btn-send").removeClass("disabled");
			} else {
				$(".chat-btn-send").addClass("disabled");
			}
		});
		return this;
	}
}(jQuery);