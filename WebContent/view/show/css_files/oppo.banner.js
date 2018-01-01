(function($){
	$.fn.banner = function(options){
		var opts = {
			'index':0
		};
		$.extend(opts,options);
		$bannerImages = $(this).find("div.banner_images");
		$bannerTips = $(this).find("div.banner_bar");
		var len = $bannerImages.find("a").length;
		var i = opts.index;
		var timerid ;
		var init = function(){
			$bannerImages.find("a:eq(0)").addClass("active");
			$bannerImages.find("a:eq(0)").fadeIn(1000);
			$bannerTips.find("span:eq(0)").addClass("tip_pg");
		};
		var convert = function(){
			i++;
			if(i>len-1){i=0};
			//$bannerImages.find("a.active").finish();
			$bannerImages.find("a.active").fadeOut(500,function(){
				$bannerImages.find("a").eq(i).fadeIn(1000);
			});
			$bannerImages.find("a.active").removeClass("active");
			$bannerTips.find("span.tip_pg").removeClass("tip_pg");
			$bannerImages.find("a").eq(i).addClass("active");
			$bannerTips.find("span").eq(i).addClass("tip_pg");
			timerid = setTimeout(convert,3000)
			return false;
		};
		if(len>0){
			init();
			if(len>1){
				timerid = setTimeout(convert,3000);
			};
		}else{
			return false;
		};
		if(len>1){
			$.each($bannerTips.find("a"),function(index,item){
				$(this).click(function(){
					i = index-1;
					clearInterval(timerid);
					convert();
				});
			});
		}
	};
}(jQuery));