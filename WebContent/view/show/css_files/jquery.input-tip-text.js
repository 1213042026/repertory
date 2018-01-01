(function($){
	$.fn.inputTipText=function(settings,focus_fun,blur_fun){
		if ($(this).is('input:text') || $(this).is('textarea')) {
			settings = jQuery.extend({
	        	default_color : "#cacaca",//未输入文字的字体颜色
	        	color : "#000000",//输入框字体颜色
				text : "请输入内容"//默认显示文字
	    	}, settings);
			$(this).val(settings.text);
			$(this).css({"color":settings.default_color});
			$(this).blur(function() {
				if ($(this).val() == '') {
					$(this).val(settings.text);
					$(this).attr('editable',0);
					$(this).css({"color":settings.default_color});
				} else {
					$(this).attr('editable',1);
					$(this).css({"color":settings.color});
				}
				if (blur_fun) {
					blur_fun();
				}
			}).focus(function() {
				$(this).css({"color":settings.color});
				if ($(this).val() == settings.text) {
					$(this).val('');
					$(this).attr('editable',0);
				}
				if (focus_fun) {
					focus_fun();
				}
			});			
		}		
		
	};
})(jQuery);