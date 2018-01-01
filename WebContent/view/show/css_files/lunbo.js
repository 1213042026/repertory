(function($){
	$.fn.lunbo=function(settings){
		settings = jQuery.extend({
        	speed : "normal",
			num : 4,
			timer : 1000,
			width:549,//图片宽度
			height:289,//图片高度
			flowWidth:15,//切换框的宽度
			flowHeight:15//切换框的高度
    	}, settings);
		return this.each(function() {
			$.fn.lunbo.scllor( $(this), settings );
    	});
	};
	
	$.fn.lunbo.scllor=function($this,settings){
		var index=0;
		var li=$(".flash_item li");
		li.eq(index).css({"background":"none no-repeat scroll 0 0 #9C9E9F"});
		var showImg=$(".flash_img li");
		$('.flash_img').css({"width":settings.width,"height":settings.height});
		$('.flash_img img').css({"width":settings.width,"height":settings.height});
		$(".flash_item").css({"top":settings.height-settings.flowHeight-5,"left":settings.width-(settings.num*settings.flowWidth)-5-settings.num*7,"width":settings.num*settings.flowWidth+settings.num*7,"height":settings.flowHeight+2});
		li.css({"width":settings.flowWidth,"height":settings.flowHeight});
		var flag = false;
		li.hover(function(){
			if(intervalTime){
				clearInterval(intervalTime);
			}
			index=li.index(this);
			$(this).css({"background":"none no-repeat scroll 0 0 #9C9E9F"});
			ShowAD(index);
			index++;
			if(index==settings.num){
				index=0;
			}
			flag=true;
		},function(){
				clearInterval(intervalTime);
				intervalTime=setInterval(function(){
						ShowAD(index);
						index++;
						if (index == settings.num) {
							index = 0;
						}
					}, settings.timer);
				//$(this).css({"background":"none no-repeat scroll 0 0 #F7F7F7"});
		});
		
		var intervalTime= setInterval(function(){
			ShowAD(index);
			index++;
			if(index==settings.num){
				index=0;
			}
		},settings.timer);
		var ShowAD=function(i){
			li.each(function() {
				if (li.index(this)==i) {					
					$(this).css({"background":"none no-repeat scroll 0 0 #9C9E9F"});
				} else {					
					$(this).css({"background":"none no-repeat scroll 0 0 #F7F7F7"});
				}
			});
			showImg.eq(i).animate({opacity:1},settings.speed).css({"z-index": "1"}).siblings().animate({opacity: 0},settings.speed).css({"z-index":"0"});
		};
	};
})(jQuery);

