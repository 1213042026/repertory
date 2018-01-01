function replace_file_name(filename) {
	if (filename != null && filename!= '') {
		var lastIdx = filename.lastIndexOf('.');
		if (lastIdx > 0) {
			return filename.substr(0,lastIdx)+'_hover'+filename.substr(lastIdx);
		}
	}
	return filename;
}
function lunbo() {
	var liSize = $('#lunbo_ul li').size();
	 $("#lunbo").lunbo({
       	speed : "slow",
			num : liSize,
			timer : 7000,
			width:223,//图片宽度
			height:361,//图片高度
			flowWidth:10,//切换框的宽度
			flowHeight:10//切换框的高度
   	});
}
function initProblem() {
    $('.cl_hotproblem_list li a').truncate(690).hover(function(){
		    var curEm = $('em:first',$(this).parent());
		    curEm.removeClass('cl_no_hover');
		    curEm.addClass('cl_hover');

		    $(this).css({'text-decoration':'underline','color':'#000000'});
	    },function(){
	    	var curEm = $('em:first',$(this).parent());
		    curEm.removeClass('cl_hover');
		    curEm.addClass('cl_no_hover');
		    $(this).css({'text-decoration':'none','color':'#6A6A6A'});
		});
}
function initSelfService() {
	$('.h_sb_c_new a').mouseover(function(){
		$(this).find('img').each(function(){
			$(this).attr('src',replace_file_name($(this).attr('source')));
		});
		}).mouseout(function(){
			$(this).find('img').each(function(){
				$(this).attr('src',$(this).attr('source'));
			});
		});
}

