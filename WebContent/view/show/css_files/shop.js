_GLOBAL = {};
var goods_zk_flag = true;
function goods_zk(obj) {
	var span = $(obj).find('span:first');
	if (goods_zk_flag) {
		$('.cl_tr_zk').slideDown();
		span.removeClass('cl_hidden');
		span.addClass('cl_show');
		var margin_top = parseInt(span.css('margin-top'));
		span.css({'margin-top':margin_top+4});
		goods_zk_flag = false;
	} else {
		$('.cl_tr_zk').hide();
		span.removeClass('cl_show');
		span.addClass('cl_hidden');
		var margin_top = parseInt(span.css('margin-top'));
		span.css({'margin-top':margin_top-4});
		goods_zk_flag = true;
	}
}
//浏览器判断
function isBrowser(){
	var userAgent = navigator.userAgent; 
	var isOpera = userAgent.indexOf("Opera") > -1;
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera ;
	var isFF = userAgent.indexOf("Firefox") > -1 ; 
	var isSafari = userAgent.indexOf("Safari") > -1 ; 
	 
	if(isIE){
	   var IE5 = IE55 = IE6 = IE7 = IE8 = false;
	   var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	   reIE.test(userAgent);
	   var fIEVersion = parseFloat(RegExp["$1"]);
	 
	   IE55 = fIEVersion == 5.5 ;
	   IE6 = fIEVersion == 6.0 ;
	   IE7 = fIEVersion == 7.0 ;
	   IE8 = fIEVersion == 8.0 ;
	 
	   if(IE55){ return "IE55"; }
	   if(IE6){ return "IE6"; }
	   if(IE7){ return "IE7"; }
	   if(IE8){ return "IE8"; }
	}
	if(isFF){ return "FF"; }
	if(isOpera){ return "Opera"; }
	if(isSafari){ return "Safari"; }
}

//ie6 PNG透明处理
function correctIEPNG(obj)
{
	var pngl=$(obj);
	if(isBrowser()=="IE6"){
		for(var i=0; i<pngl.length; i++)
		{
			
			var img = pngl[i];
			$(img).wrap(function(){
				return '<div style="margin:0;padding:0;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+$(this).attr('src')+'); height:'+$(this).height()+'px; width:'+$(this).width()+'px; display:inline-block;"></div>';	
			});
			$(img).css("display","none");
			
		}
	}
}

function int_menu(obj,mtop,mleft,pos){
	var $drop=$('.'+obj);
	var $drop_menu=$('#'+obj+'_menu');
	
	$drop.mouseover(function(){
		$(this).addClass('current');
		$drop_menu.css({top:$(this).offset().top+mtop,left:$(this).offset().left+mleft,position:'absolute'});
		$drop_menu.show();
	});
	
	
	$drop.mouseleave(function(){
		
		if(!pos){
			//if(event.target!=$drop_menu.get(0)){$drop_menu.hide(); $(this).removeClass('current');}
		}
	});
	
	$drop_menu.mouseleave(function(){
		$(this).hide();	
		$drop.removeClass('current');
	});
	
	$drop_menu.find('a').click(function(){
		$drop_menu.hide();	
		$drop.removeClass('current');
	});
	
	if(isBrowser()!='FF'){
		$(document).mouseup(function(event){  
			if (event.target != $drop.get(0) || event.target != $drop_menu.get(0)) { 
				$drop_menu.hide();
				$drop.removeClass('current');
			}
		});
	}
	
}


//对话框开起

function dialog_show(dialog_id){
	$('#static_dialog .dialog_tips').hide();
	glob_dialog=dialog_id;
	var box=$(dialog_id);
	$('#static_dialog').show(100,function(){
		imask();
		$('#static_dialog i.mask').show();
		box.fadeIn(300);
		dialog_pos(dialog_id);
	});
}

//对话框关闭
function dialog_close(dialog_id){
	$(dialog_id).fadeOut(300,function(){
		$('#static_dialog .dialog_tips').hide();
		$('#static_dialog').hide();	
	});
}
//对话框定位
function dialog_pos(dialog_id){
	var box=$(dialog_id);
	var pw=$(document).width() / 2  - box.width() / 2;
	var ph=$(document).scrollTop() + ($(window).height() / 2 - box.height() / 2);
	box.css({top:ph,left:pw});	
}
//MASK定位
function imask(){
	$('#static_dialog i.mask').css({height:$(document).height()});
}
//验证码
function change_captcha(name, id) {
	$(id).attr('src', '/captcha/' + name + '?' + (new Date()).getTime());
}

//详细页商品图片切换
function goods_slide(box, num){

	$('.dialog').attr('id', 'static_dialog');

	snapshotbox=$(box);
	snapshotc=$(box+" ul");
	snapshotitem=$(box+" ul li");

	var total = snapshotitem.size();
	var width = snapshotitem.width()+5;
	var current = 0; // 
	var step = num; //
	snapshotc.css("width", width * total);
	
	if (total <= step) {
		$('.goods_pic_control a.prev').addClass("none");
		$('.goods_pic_control a.next').addClass("none");
		return;
	}

	$('.goods_pic_control a.prev').click(function(){
		if (snapshotc.is(":animated") || current == 0) return false;
		current = Math.max(current - step, 0); //
		snapshotc.animate({ left : -width*current}, 500);
		if (current == 0) {
			$(this).addClass("none");
		}
		if (current < total - step) {
			$('.goods_pic_control a.next').removeClass("none");
		}
		return false;
	});
		
	$('.goods_pic_control a.next').click(function(){
		if (snapshotc.is(":animated") || current >= total - step) return false;
		current = Math.min(current + step, total - step); // 
		snapshotc.animate({ left : -width*current}, 500);
		if (current >= total - step) {
			$(this).addClass("none");
		}
		if (current > 0) {
			$('.goods_pic_control a.prev').removeClass("none");
		}
		return false;
	});
	$('.goods_pic_control a.prev').addClass("none");
}

function formatPrice(p) {
	p = p + '';
	var idx = p.indexOf('.');
	if (idx > 0) {
		p = p.substr(0, idx + 3);
	}
	return p;
}


$(function(){
	// 商品图片切换
	$('.goods_pic_control li a').click(function(){
			$('.goods_pic_control li a.current').removeClass('current');
			$('.goods_pic_show img').attr('src', $(this).attr('href'));
			$('.goods_pic_show img').attr('fullpath', $(this).attr('fullpath'));
			$(this).addClass('current');
			return false;
	});

	//商品数量选择
	$('a.buy_count').click(function(){
		if ($(this).hasClass('limit')) {
			$('.buy_count_tips').stop().clearQueue().fadeTo('slow', 1).delay(5000).fadeOut('slow');
			return false;
		}
		if($('.buy_count_menu').is(':visible')){
			$(this).removeClass('current');
			$('.buy_count_menu').hide();
		}else{
			$(this).addClass('current');
			$('.buy_count_menu').css({top:$(this).offset().top+27,left:$(this).offset().left});
			var size = $(this).attr('size');
			var option_html = '';
			for(i=1;i<=size;i++) {
				option_html += '<dd><a href="#">' + i + '</a></dd>'
			}
			option_html += ' <dd class="menu_end"></dd>';
			$('.buy_count_menu').html(option_html);
			$('.buy_count_menu').show();
			
			//选定商品数量
			$('.buy_count_menu dd a').click(function(){
				$(this).parent().parent().hide();
				var cnt = parseInt($(this).text());

				if ($('.buy_count_menu').attr('target_id')) { // 有id的是购物车页面
					var target = $('#' + $('.buy_count_menu').attr('target_id'));
					target.text(cnt);
					$('.buy_count').removeClass('current');
					OPPO.cart.update(target.attr('cid'), cnt);
				} else {
					var price = parseFloat($('#goods_price').text());
					$('.buy_count').html(cnt);
					$('#goods_total').text(formatPrice(cnt * price));
					$('#goods_cnt').html(cnt);
					$('.buy_count').removeClass('current');
				}
				return false;
			});
	
	
			if ($(this).attr('cid')) { // 有cid的是购物车页面
				$('.buy_count_menu').attr('target_id', $(this).attr('id'));
			}
		}
		return false;
	});
	
	//刻字商品颜色选择
	$('.gift_color dd a').click(function(){
			$(this).parent().addClass('current').siblings().removeClass('current');
			var imgUrl = $(this).find("img").attr("src");
			var $good = $(this).parent().parent().parent().parent().find(".gift_mian").find("a");
			$good.attr("href", $(this).attr("href"));
			$good.find("img").attr("src", imgUrl);
			return false;
	});
	$('.gift_color dd').eq(0).find('a').trigger('click');
	

	$('.buy_count_menu').mouseleave(function(){
		$(this).hide();
		$('.buy_count').removeClass('current');
	});
	
	
	//if(isBrowser()!='FF'){
		$('body').mouseup(function(event){  
			if (event.target != $('.buy_count').get(0) || event.target != $('.buy_count_menu').get(0)) { 
				$('.buy_count_menu').hide();
				$('.buy_count').removeClass('current');
			}
		});
	//} 
	 
	//套餐选择
	$('.select_goods a').click(function(){
		if($(this).attr('class')=='current'){
			$(this).removeClass('current');
		}else{
			$(this).addClass('current');
		}
		var total = parseFloat($('#goods_price').text());
		var ora_total = total;
		var cnt=0;
		$('.select_goods a.current').each(function(){
			total += parseFloat($(this).attr('price'));
			ora_total += parseFloat($(this).attr('oraprice'));
			cnt++;
		});
		
		$("#parts_cnt").html(cnt);
		$('#group_price').text(formatPrice(ora_total));
		$('#group_total_price').text(formatPrice(total));
		return false; 
	});

	// 购买套餐
	$('.group_goods_price a').click(function(){
		var ids = [];
		$('.select_goods a.current').each(function() {
			ids.push($(this).attr('goods_id'));
		});
		OPPO.cart.add($(this).attr('goods_id'), 1, ids.join(','));
		return false;
	});

	//客户咨询
//	$('.service_talk .small_top').fadeOut(1);
//	$('.service_talk .small_top').click(function(){$('html, body').animate({scrollTop: 0});return false;});
	$('.service_talk .big_top').click(function(){$('html, body').animate({scrollTop: 0});return false;});
	$('.service_talk .close_talk').click(function(){
		$('.service_talk .talk_link').fadeOut(300);
		$('.service_talk .big_top').fadeOut(300,function(){
			$(window).trigger('resize');
			$('.service_talk .small_top').fadeIn(300);
		});
		return false;
	});
	
	$('.block_bottom a').mousedown(function() {
		if ($('.cl_helpcenter').css('display') != 'none') {
			if ($(this).attr('class') == 'close_click') {
				$(this).removeClass('close_click');
			} else {
				$(this).addClass('close_click');
			}
		} else {
			if ($(this).attr('class') == 'open_click') {
				$(this).removeClass('open_click');
			} else {
				$(this).addClass('open_click');
			}
		}
	}).mouseup(function() {
		$(this).removeClass('close_click');
		$(this).removeClass('open_click');
	}).click(function() {
		if ($(this).attr('class') == 'cl_current') {
			$('.cl_helpcenter').show();
			$('.cl_feedback').show();
			$('.share_chat_400').show();
			$('.share_chat_800').show();
			$(this).removeClass('cl_current');
		} else {
			$('.cl_feedback').hide();
			$('.cl_helpcenter').hide();
			$('.share_chat_400').hide();
			$('.share_chat_800').hide();
			$(this).addClass('cl_current');
		}
	}) ;

	//对话框
	$('.alert_button').click(function() {
		var target = $(this).attr('href');
		dialog_show(target);
		if (target == '#goodsalertbox') {
			change_captcha('goodsalert', '#goodsalertcaptcha');
			$('#goodsalertbox_captcha').val('');
			$('#goodsalertbox_phone').val('');
			$('#goodsalertbox .content').show();
			$('#goodsalertbox .success_tip').hide();
		}
		return false;
	});

	// 到货提醒
	$('#goodsalertbox .btn').click(function() {
		var btn = $(this);
		if (btn.attr('sending') == '1') return;
		btn.attr('sending', '1');

		A('goods/addalert', {
			goods_id: $('#goodsalertbox_goodsid').val(),
			captcha: $('#goodsalertbox_captcha').val(),
			phone: $('#goodsalertbox_phone').val()},
			function() {
				btn.attr('sending', '0');
				$('#goodsalertbox .success_tip').show();
				$('#goodsalertbox .content').hide();
				if ($('#goodsalertbox .success_tip .time').size() == 0) return;
				if (_GLOBAL.goodsalertinterval) clearInterval(_GLOBAL.goodsalertinterval);
				$('#goodsalertbox .success_tip .time').text(3);
				_GLOBAL.goodsalertinterval = setInterval(function() {
					var time = parseInt($('#goodsalertbox .success_tip .time').text());
					if (time <= 1) {
						clearInterval(_GLOBAL.goodsalertinterval);
						_GLOBAL.goodsalertinterval = false;
						dialog_close('#goodsalertbox');
					} else {
						$('#goodsalertbox .success_tip .time').text(time - 1);
					}
				}, 1000);
			},
			function(no, msg) {
				btn.attr('sending', '0');
				alert(msg);
			});
	});
	
	// 弹出物流信息
	$(".delivery_tips").click(function(){
		var btn = $(this);
		var order_no = btn.attr('order_no');
		if ( !order_no || btn.attr('sending') == '1' ) return ;
		var delivery_box = $("#delivery_tips_box");
		btn.attr('sending', '1');
		
		var pos = btn.position();
		delivery_box.hide(); // hide
		delivery_box.css('top', pos.top + 20 );
		delivery_box.css('left', pos.left - 130 );
		delivery_box.find("#shipping_data").hide();
		delivery_box.find("#shipping_loading").show();
		delivery_box.show();
		
		A('user/delivery', {
			order_no: order_no},
			function(data) {
				btn.attr('sending', '0');
				var delivery_box = $("#delivery_tips_box");
				var pos = btn.position();
				delivery_box.css('top', pos.top + 20 );
				delivery_box.css('left', pos.left - 130 );
				delivery_box.find("#shipping_name").html( data.shipping['name'] );
				 
				// todo add shipping log
				delivery_box.find("#shipping_no").hide();
				
				delivery_box.find("#shipping_data").show();
				delivery_box.find("#shipping_loading").hide();
				delivery_box.show(); 
			},
			function(no, msg) {
				btn.attr('sending', '0');
				delivery_box.hide(); 
				alert(msg);
			}
		);
	});
	$("#delivery_tips_box").mouseleave(function(){
		$(this).fadeOut();
	});
	
	// 退货换货 列表 折叠
	$(".order_section .record_more .more").click(function() {
		$(this).parent().parent().find(".record_track").show();
		$(this).parent().find(".expand").show();
		$(this).hide();
	});
	$(".order_section .record_more .expand").click(function() {
		$(this).parent().parent().find(".record_track").hide();
		$(this).parent().find(".more").show();
		$(this).hide();
	});
	
	$(window).bind('scroll', function() {
			if(isBrowser()=="IE6") {
				$('.service_talk').css({'top': $(document).scrollTop() + $(window).height() - 250});
				if ($('.choose_bar').size() > 0) {
					if($(document).scrollTop()>$('.choose_bar').offset().top){
						$('.choose_bar').css({'top':65+($(document).scrollTop()-$('.choose_bar').offset().top)});
					}else{
						$('.choose_bar').css({'top':65});
					}
				}
			}else{
				if ($('.choose_bar').size() > 0) {
					if($(document).scrollTop()>=180){
						$('.choose_bar').css({'top':0});
					}else{
						if($(document).scrollTop()<=0){v=0}else{v=$(document).scrollTop()}
						$('.choose_bar').css({'top':180-v});
					}
				}
			}
	});
	$(window).bind('resize',function(){
		if ($('.service_talk').size() > 0) {
			var w = $('.service_talk .big_top').is(':visible') ? $('.service_talk').width() : $('.service_talk .small_top').width();
			var left = Math.max(
				960 - w,
				Math.min(
					$(window).width() / 2 + 960 / 2 + 5,
					$(document.body).width() - w - 5
				),
				$(document.body).width() - w - 5
			);
			$('.service_talk').css({'left': left + 'px'});
		}


		if ($('.choose_bar').size() > 0) {
			if(isBrowser()=="IE6") {
				$('.choose_bar').css({'left': -10});
			}else{
				$('.choose_bar').css({'left': $(window).width()/2-960 / 2});
			}
		}
	});
	
	$(window).trigger('resize');
	$(window).trigger('scroll');
	
	
	//对话框输入框效果
	$('span.dbox_input input').bind('focus',function(){
			$(this).parent().addClass('current');
	}).bind('blur',function(){
			$(this).parent().removeClass('current');
	});
	
	
	
	correctIEPNG('.iepng');
	
	goods_slide('.snapshot',4);
	
	int_menu('quick_btn',-5,-4,true);
})