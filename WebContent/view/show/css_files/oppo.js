//20120913
var receipt_tips1_msg_online = '商城默认为您开具普通发票，如需开具增值税专用发票，请您务必在付款前联系客服协助办理；';
var receipt_tips1_msg_cod = '货到付款订单默认开具普通发票，如需开具增值税专用发票，请选择在线支付并在付款前联系客服协助办理；';
function A(url, param, success, error) {
	if (url[0] != '/') {
		url = '/' + url;
	}
	var ajax = {type: "POST", url: url, dataType: 'json'};
	if (param) ajax.data = param;
	ajax.success = function(data) {
		if (data.no == 0) {
			if (success) success(data.data);
		} else {
			if (error) error(data.no, data.msg);
		}
	};
	if (error) {
		ajax.error = function() {
			error(500, '访问网络失败，请检查您的网络连接并重试');
		}
	}
	$.ajax(ajax);
}
function m_A(url, param, success, error) {
	if (url[0] != '/') {
		url = '/' + url;
	}
	var ajax = {type: "POST", url: url, dataType: 'json'};
	if (param) ajax.data = param;
	ajax.success = function(data) {
		if (data.no == 0) {
			if (success) success(data.data);
		} else {
			if (error) error(data.no, data.msg);
		}
	};
	if (error) {
		ajax.error = function() {
			error(500, '秒杀已结束');
		}
	}
	$.ajax(ajax);
}

var OPPO = {};
var realshop_query_city_id = 3;

OPPO.util = {
	strlen: function(txt) {
		var newvalue = txt.replace(/[^\x00-\xff]/g, "**");
		return newvalue.length;
	},
	cutoff: function(txt, len) {
		while(OPPO.util.strlen(txt) > len) {
			txt = txt.substr(0, txt.length - 1);
		}
		return txt;
	}
};

OPPO.ui = {
	html: {
		popup: '<div class="dialog" id="ui_popup" style="display:none;"><i class="mask"></i><div class="popup_content" style="display:none"></div></div>',
		alert: '<div class="dialog_box dialog_tips limit_purchase" id="ui_alert"><div class="dialog_title"><a href="javascript:void(0);" class="close confirm"></a></div><div class="dialog_content"><h3></h3><div class="confirm_btn"><a href="#" class="btn confirm"></a></div></div></div>',
		confirm: '<div class="dialog_box dialog_confirm" id="ui_confirm"><div class="dialog_title"></div><div class="dialog_content"><h3></h3><div class="btn"><a href="#" class="confirm delete"></a><a href="#" class="cancle"></a></div></div></div>',
                cartselect:'<div class="dialog_box popup"><div class="dialog_title" style="height:0px;"><a href="javascript:void(0);" class="close confirm"></a></div><div id="goodsName" class="popup_top"></div><div class="popup_center"><ul id="cartwrapper" class="wrapper"></ul><div class="confirmBox"><a id="popBuy" href="javascript:void(0);"><img src="http://store.oppo.com/static/image/home/new/btn_confirm.png"/></a></div></div><div class="popup_bottom"></div></div>'
            },
	init: function() {
		var container = $('#ui_popup');
		if (container.size() == 0) {
			$(OPPO.ui.html.popup).appendTo($(document.body));
		}
	},

	openPopup: function() {
		$('#ui_popup').show(100, function(){
			$('#ui_popup i.mask').css({height:$(document).height()});
			$('#ui_popup i.mask').show();
			$('#ui_popup .popup_content').fadeIn(300);
			OPPO.ui.relocatePopup();
		});
	},

	relocatePopup: function() {
		var box = $('#ui_popup .dialog_box');
		var pw = $(document).width() / 2  - box.width() / 2;
		var ph = $(document).scrollTop() + ($(window).height() / 2 - box.height() / 2);
		box.css({top:ph,left:pw});
	},

	closePopup: function() {
		$('#ui_popup .popup_content').fadeOut(300,function(){
			$('#ui_popup i.mask').hide();
			$('#ui_popup').hide();
		});
	},

	alert : function(opt) {
		OPPO.ui.init();
		$('#ui_popup .popup_content').html(OPPO.ui.html.alert);
		if (opt.is_html) {
			$('#ui_popup .popup_content #ui_alert h3').html(opt.content);
		} else {
			$('#ui_popup .popup_content #ui_alert h3').text(opt.content);
		}
		$('#ui_popup .popup_content .confirm').click(function() {
			OPPO.ui.closePopup();
			if ( $(this).hasClass('btn') && opt.callback) opt.callback();
			return false;
		});
		OPPO.ui.openPopup();
	},

	confirm : function(opt) {
		OPPO.ui.init();
		$('#ui_popup .popup_content').html(OPPO.ui.html.confirm);
		if (opt.is_html) {
			$('#ui_popup .popup_content #ui_confirm h3').html(opt.content);
		} else {
			$('#ui_popup .popup_content #ui_confirm h3').text(opt.content);
		}
		$('#ui_popup .popup_content .confirm').click(function() {
			OPPO.ui.closePopup();
			if ( opt.onConfirm ) opt.onConfirm();
			return false;
		});
		$('#ui_popup .popup_content .cancle').click(function() {
			OPPO.ui.closePopup();
			if ( opt.onCancel ) opt.onCancel();
			return false;
		});
		OPPO.ui.openPopup();
	},
        cartselect : function(opt){
                OPPO.ui.init();
		$('#ui_popup .popup_content').html(OPPO.ui.html.cartselect);
                if(opt.goodsname){
                    $('#goodsName').html(opt.goodsname);
                }
                if(opt.subgoods){
                    $('#cartwrapper').html(opt.subgoods);
                }
		$('#ui_popup .popup_content .confirm').click(function() {
			OPPO.ui.closePopup();
			if ( opt.onConfirm ) opt.onConfirm();
			return false;
		});
		$('#ui_popup .popup_content .cancle').click(function() {
			OPPO.ui.closePopup();
			if ( opt.onCancel ) opt.onCancel();
			return false;
		});
		OPPO.ui.openPopup();
        }
};

OPPO.goods = {

	init: function() {
                //$('.noteInfo span').text($('#goodsStyle li.active a').attr('title'));
                $('#goods_cnt').bind('blur',function(){
                    if(parseInt($(this).val())<1 || $(this).val().match('([^0-9])+')){
                        $(this).val('1');
                    }
                });
		if ($('#mouse_area').size() > 0 && isBrowser() == "IE6") {
			var area = $('#mouse_area');
			var src = area.css('background-image');
			if (src) {
				src = src.substr(5, src.length - 7);
				area.css({
					'background-image': 'none'
				});
				area.html('<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=\'scale\', src=\''+src+'\'); height:'+area.height()+'px; width:'+area.width()+'px;"></div>');
			}
		}
		$('.goods_gallery .goods_pic_show').mouseleave(function(e) {
			$('#imgmax').hide();
			$('#mouse_area').hide();
		}).mouseover(function(e) {
			$(this).mousemove();
		}).mousemove(function(e) {
			var imgmax = $('#imgmax');
			if (imgmax.size() == 0) {
				$('<div id="imgmax"><img style="width:800px;height:800px;position:relative;"/></div>').appendTo($(document.body));
				imgmax = $('#imgmax');
				imgmax.css({
					position:'absolute',
					border:'1px solid #e5e5e5',
					backgroundColor:'#fff',
					overflow: 'hidden'
				});
			}

			var width = 500;
			var height = 500;
			var imgwidth = 800;
			var imgheight = 800;
			var padding = 80; // half size of mask;
			var top = $(this).offset().top;
			var left = $(this).offset().left + $(this).width() ;

			var offsetX = e.pageX - $(this).offset().left;
			var offsetY = e.pageY - $(this).offset().top;

			var srcw = $(this).width() - padding * 2;
			var srch = $(this).height() - padding * 2;
			offsetX -= padding;
			if (offsetX < 0) offsetX = 0;
			if (offsetX > srcw) offsetX = srcw;
			offsetY -= padding;
			if (offsetY < 0) offsetY = 0;
			if (offsetY > srch) offsetY = srch;

			var x = -(imgwidth - width) * offsetX / srcw;
			var y = -(imgheight - height) * offsetY / srch;

			imgmax.css({
				width:width+'px',
				height:height+'px',
				left:left+'px',
				top:top+'px'
			});
			$('#imgmax img').attr('src', $(this).find('img').attr('fullpath'))
			.css({
				left: x + 'px',
				top: y + 'px'
			});
			imgmax.show();


			var imgmask = $("#mouse_area");
			var maskOffsetX =  offsetX;
			var maskOffsetY = offsetY;
			if ( maskOffsetX < 1 ) maskOffsetX = 1;
			if ( maskOffsetY < 1 ) maskOffsetY = 1;
			if ( maskOffsetX + padding * 2 > width + 2) maskOffsetX = width - padding * 2 + 2;
			if ( maskOffsetY + padding * 2 > height + 2) maskOffsetY = height - padding * 2 + 2;
			imgmask.css({
				left:maskOffsetX + 'px',
				top: maskOffsetY + 'px'

			});
			imgmask.show();
		});
	}
        /* reduce:function(){
            var obj = $('#goods_cnt');
            var num = parseInt(obj.val());
            if(num>1){
                obj.val(num-1);
            }
        },
        add:function(){
            var obj = $('#goods_cnt');
            var num = parseInt(obj.val());
            obj.val(num+1);
        } */
};

OPPO.lettering = {
	max: 14,
	check: function() {
		if ($('.text_oper').is(':visible')) {
			$('.ex_info').show();
			return false;
		} else {
			$('.ex_info').hide();
			return true;
		}
	},
	edit: function(id) {
		$('#lettering_status_'+id).hide();
		$('#lettering_edit_'+id).show();
		OPPO.lettering.check();
		return false;
	},
	skip: function(id) {
		$('#lettering_text_'+id).val('');
		$('#lettering_status_'+id+' .yes_lettering').hide();
		$('#lettering_status_'+id+' .no_lettering').show();
		$('#lettering_'+id).val('');
		$('#lettering_status_'+id).show();
		$('#lettering_edit_'+id).hide();
		$('.kezi_section .font_view').text('');
		OPPO.lettering.check();
		return false;
	},
	skipall: function(id) {
		for(var i = 0; i < id; ++i) OPPO.lettering.skip(i);
		return false;
	},
	save: function(id) {
		var text = $('#lettering_text_'+id).val();
		if ( $.trim(text) == '') {
			OPPO.ui.alert({
				content: '请输入您要镌刻的内容',
				callback: function() {
					$('#lettering_text_'+id).focus();
				}
			});
			return false;
		}
		var length = OPPO.util.strlen(text);
		if (length > OPPO.lettering.max) {
			OPPO.ui.alert({
				content: '您输入的镌刻的内容太长',
				callback: function() {
					$('#lettering_text_'+id).focus();
				}
			});
			return false;
		}
		$('#lettering_status_'+id+' .no_lettering').hide();
		$('#lettering_status_'+id+' .yes_lettering').show();
		$('#lettering_'+id).val($('#lettering_text_'+id).val());
		$('#lettering_status_'+id+' .text').text(text);
		$('#lettering_status_'+id).show();
		$('#lettering_edit_'+id).hide();
		OPPO.lettering.check();
		return false;
	},
	init: function() {
		$('.kezi_buy a.edit').click(function() {
			OPPO.lettering.edit($(this).attr('lid'));
			return false;
		});
		$('.kezi_buy a.save').click(function() {
			OPPO.lettering.save($(this).attr('lid'));
			return false;
		});
		$('.kezi_buy a.skip').click(function() {
			OPPO.lettering.skip($(this).attr('lid'));
			return false;
		});
		$('.kezi_buy a.skipall').click(function() {
			OPPO.lettering.skipall($(this).attr('lid'));
			return false;
		});
		$('.kezi_buy .lettering_text').bind(
			'focus keydown keyup mouseup blur',
			function() {
				var text = $(this).val();
				var length = OPPO.util.strlen(text);
				if (length > OPPO.lettering.max) {
					var before = text.length;
					while(length > OPPO.lettering.max) {
						text = text.substring(0, text.length - 1);
						length = OPPO.util.strlen(text);
					}
					$(this).parent().siblings('.tips').children('b').text(before - text.length);
					$(this).parent().siblings('.tips').css({visibility:'visible'});
				} else {
					$(this).parent().siblings('.tips').css({visibility:'hidden'});
				}
				$('.kezi_section .font_view').text(text);
			}
		).focus(function(){$('#lettering_text_tip').hide();})
		.blur(function() {if ($(this).val() == ''){$('#lettering_text_tip').show();}});
		$('.kezi_next_step a.btn').click(OPPO.lettering.submit);
		//OPPO.lettering.check();
	},
	submit: function() {
		var lock = $('kezi_next_step a.btn');
		if (lock.attr('sending') == '1') return;
		if (!OPPO.lettering.check()) {
			//alert("您还没有保存镌刻信息");
			return false;
		}
		lock.attr('sending', '1');

		$('.gift_box ul li').each(function() {
			$(this).find('.sub_val').val($(this).find('dd.current a').attr('gid'));
		});

		document.getElementById('lettering_form').submit();
		return false;
	}
};

OPPO.share = {

	weibo: function() {
		var img = '';
		if ($(this).attr('pic') != null) {
			img = $(this).attr('pic');
			if (img.indexOf('http') != 0) {
				img = 'http://'+location.host + img;
			}
		}
		var title = '';
		if ($(this).attr('title') != null) {
			title = $(this).attr('title');
		} else {
			title = document.title;
		}

		var sina_url = "http://v.t.sina.com.cn/share/share.php?";
		sina_url += "appkey=1534821515&ralateUid=1710173801&url="+encodeURIComponent(location.href)+"&pic="+img+"&title="+encodeURIComponent(title);
		window.open( sina_url,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		return false;
 	},

	renren: function() {
		var title = '';
		if ($(this).attr('title') != null) {
			title = $(this).attr('title');
		} else {
			title = document.title;
		}
		var rr_rul = "http://www.connect.renren.com/share/sharer?url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(title);
		window.open(rr_rul,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		return false;
 	},

	qq: function() {
		var _pic = '';
		if ($(this).attr('pic') != null) {
			_pic = $(this).attr('pic');
			if (_pic.indexOf('http') != 0) {
				_pic = 'http://'+location.host + _pic;
			}
		}
		var _t = '';
		if ($(this).attr('title') != null) {
			_t = $(this).attr('title');
		} else {
			_t = document.title;
		}
		var _url = encodeURIComponent(location.href);
		var _appkey = "be7413ed39374017b96d9217651521ac";
		var _site = location.href;
		var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&title='+_t+'&pic='+_pic;
		window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		return false;
	},

	qzone: function() {
		var title = '';
		if ($(this).attr('title') != null) {
			title = $(this).attr('title');
		} else {
			title = document.title;
		}
		var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ encodeURIComponent(location.href)+ '&title='+encodeURIComponent(title);
		window.open(url,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		return false;
	},
	getservice: function(){
        $('#customer-service .kf_a').hover(function(){
			$('#customer-service .pendant_k').show();
			$('#customer-service .pendant_kf').css('background','url("/static/image/help/common/kf_h.png") no-repeat center top transparent');
		},function(){
			$('#customer-service .pendant_k').hide();
			$('#customer-service .pendant_kf').css('background','url("/static/image/help/common/kf.png") no-repeat center top transparent');
		});

		$('#customer-service .wx_a').hover(function(){
			$('#customer-service .pendant_w').show();
			$('#customer-service .pendant_wx').css('background','url("/static/image/help/common/wx_h.png") no-repeat center top transparent');
		},function(){
			$('#customer-service .pendant_w').hide();
			$('#customer-service .pendant_wx').css('background','url("/static/image/help/common/wx.png") no-repeat center top transparent');
		});

	},

	servicenum: 400,
	chat_url: false,
	chat: function() {
		if (!OPPO.share.chat_url||1) {

			/*if(parseInt(Math.random()*10)<5){
				var urls =['http://bizapp.qq.com/webc.htm?new=0&sid=800098768&o=b.qq.com&q=7'];
			}else{*/
				var urls =['http://crm2.qq.com/page/portalpage/wpa.php?uin=4001666888&cref=&f=1&ty=1&ap=&as=&aty=&a=&dm=undefined&sv=&sp='];
			//}
			OPPO.share.chat_url = urls[parseInt(Math.random() * 1000) % urls.length];
		}
		window.open(OPPO.share.chat_url,'', 'width=500, height=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		return false;
	},

	init: function() {
		$('.share_weibo').click(OPPO.share.weibo);
		$('.share_renren').click(OPPO.share.renren);
		$('.share_qq').click(OPPO.share.qq);
		$('.share_qzone').click(OPPO.share.qzone);
		$('.pendant .online a').click(function(){
		OPPO.share.servicenum = 800;
		OPPO.share.chat();
		});
		$('.foot-zxkf').click(function(){
		OPPO.share.servicenum = 400;
		OPPO.share.chat();
		});

		//秒杀页面
		if ($('.ms_share_xl')) {
			$('.ms_share_xl').click(OPPO.share.weibo);
		}
		if ($('.ms_share_tx')) {
			$('.ms_share_tx').click(OPPO.share.qq);
		}
		//新客服页面
		OPPO.share.getservice();
	}
};

OPPO.cart = {

/*	add : function(goods_id, cnt, children) {

			应PETE要求，加入购物车环节这里需要临时加入一个用户确认的提示
			待预售订单发货完毕后修改为原来的逻辑
			代码修改： 将原来的 OPPO.cart.add 动作移入 OPPO.cart.add_do 。
			OPPO.cart.add 更改为新的实现。
			P.L.R  2012-6-28

			如何回滚 ：  两个方法 ——
				 1、 直接在 add 动作内 调用 OPPO.cart.add_do(goods_id, cnt, children)
			     2、 将 add删除，将add_do 更名为 add  即可

		var confirm_goods = new Array('22'); //需要弹出提示框的商品ID，数组,元素为字符串


			if(jQuery.inArray(goods_id, confirm_goods) > -1){  //此处逻辑先写上 以备不时之需
		 		OPPO.ui.confirm({
		 			content: '因预售期订单量大，您选购的商品将于7月5日起发货，请谅解。',
					onConfirm: function() {
						OPPO.cart.add_do(goods_id, cnt, children)
					},
					onCancel : function(){
						history.back();
					}
				 });
				 $("#ui_confirm a.confirm").remove("delete").addClass("yes");  // 将原来的“删除”按钮更换为“继续购买”按钮
				 $("#ui_confirm a.cancle").addClass("goback");  // 将原来的“取消”按钮更换为“返回”按钮
			}else{

			OPPO.cart.add_do(goods_id, cnt, children)
		}
	},
 	*/
 	add : function (goods_id, cnt, children){
 		var data = {goods_id:goods_id};
				if (cnt) data.cnt = cnt;
				if (children) data.children = children;
				A('cart/add', data,
					function(data) {
						location.href = data.returnurl;
						return;

					},
					function(no, msg) {
						if (no == 1 && msg) {
							OPPO.ui.alert({content: msg});
							return;
						} else {
							OPPO.ui.alert({content: '添加失败，请重试'});
							return;
						}
					}
				);

 	},

	showDelTip : function(obj) {
		var $delTip = $(obj).next();
		var leftPos = $(obj).parent().width() * 0.5 - 147;
		$delTip.show();
		$delTip.css("left", leftPos+"px").css("top", "26px");
	},
	hidDelTip : function(obj) {
		$(obj).parent().hide();
	},
	remove : function(id) {
		A('cart/remove', {id: id},
			function(cnt) {
				$('#item' + id).slideUp();
				location.href = location.href;
			},
			function(no, msg) {
				OPPO.ui.alert({content: '修改失败，请重试'});
			}
		);
	},
		
	update : function(id, obj) {
		var cnt = obj.val();
		//校验是否为数字
		if(isNaN(cnt)){
			obj.parent().find(".errorTip").show();
			obj.val(obj.parent().find(".purchaseNum").val());
			setTimeout(hidErrTip,1000);
			return false;
		}
		function hidErrTip(){
			$(".errorTip").hide();
		}
		if (0 >= parseInt(cnt)) {
			obj.parent().find(".delTip3").show();
			return false;
		}
		A('cart/update', {id: id, cnt : cnt, set:1},

			function(cnt) {
				location.href = location.href;
			},
			function(no, msg) {
				if (!msg || msg.length == 0) {
					msg = '修改失败，请重试';
				}
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						location.href = location.href;
					}
				});
			}
		);
	},

        changecolor: function(id,goods_id,cnt) {
	  A('cart/changecolor', {id: id,goods_id:goods_id,cnt:cnt},
		  function(msg) {
			  if(parseInt(msg)==1){
				  window.location='/cart';
			   }else{
				  OPPO.ui.alert({content: '修改失败，请重试'});
				 }
		  },
		  function(no, msg) {
			  OPPO.ui.alert({content: '修改失败，请重试'});
		  }
	  );
	},
        totalprice:0,
        activity:false,
        popupSelect:function(goods,count,cnt){
            var subgoods = '<li><div class="photoBox"><a class="goodsLink" target="_blank" href="/goods/'+ goods.goods.goods_id +'"><img style="width:100px;height:100px;" src="'+ goods.goods.image.small_thumb_path +'"/></a></div><div class="infoBox"><p><a class="goodsLink" target="_blank" href="/goods/'+ goods.goods.goods_id +'">'+ goods.goods.name +'</a></p><div class="colorWrapper"><div class="title">颜色:</div><div><ul class="color_list">';
            for(var i=0;i<count;i++){
                subgoods += '<li><a href="javascript:void(0)"><img src="'+ goods['colors'][i]['image']['small_thumb_path'] +'" title="'+ goods['colors'][i]['color_name'] +'" goods_id="'+ goods['colors'][i]['goods_id'] +'"';
                if(goods.goods.goods_id == goods['colors'][i]['goods_id']){subgoods +=' class="active"';}
                subgoods +=' style="width:40px;height:40px;"/></a></li>';
            }
            subgoods += '</ul></div><div class="clear"></div></div></div><div class="clear"></div></li>';
            OPPO.ui.cartselect({goodsname:goods.goods.name,subgoods:subgoods});
            $('#popBuy').bind('click',function(){
                    var goods_id = goods.goods.goods_id;
                    OPPO.cart.addSelect(goods_id, cnt);
                    OPPO.miaozhen.btn_click(goods_id,'加入购物车',1);
                    //OPPO.ui.closePopup();  //加入购物车弹出框一闪而逝的问题解决暂定为注释这里
                    return false;
            });
            OPPO.cart.initSelect();
        },
        initSelect:function(){
            $('.color_list li a').bind('click',function(){
                var _this = $(this).find('img');
                $('.color_list li a img').removeClass('active');
                _this.addClass('active');
                $('#popBuy').unbind('click');
                $('#popBuy').bind('click',function(){
                    var goods_id = $('.color_list li a img.active').attr('goods_id');
                    OPPO.cart.addSelect(goods_id, '1');
                    OPPO.miaozhen.btn_click(goods_id,'加入购物车',1);;
                    //OPPO.ui.closePopup();//加入购物车弹出框一闪而逝的问题解决暂定为注释这里
                    return false;
                });
            });
        },
        popupPackage:function(goods,cnt){
            var goodsCount = goods['children'].length;
            var subgoods = '';
            var datas = {goods_id:goods.goods.goods_id,cnt:cnt,is_bind:1,children:[]};
            for(var i=0;i<goodsCount;i++){
                subgoods += '<li><div class="photoBox"><a class="goodsLink" target="_blank" href="/goods/'+ goods['children'][i]['goods']['goods_id'] +'"><img style="width:100px;height:100px;" src="'+ goods['children'][i]['goods']['image']['small_thumb_path'] +'"/></a></div><div class="infoBox"><p><a class="goodsLink" target="_blank" href="/goods/'+ goods['children'][i]['goods']['goods_id'] +'">'+ goods['children'][i]['goods']['name'] +'</a></p><div class="colorWrapper"><div class="title">颜色:</div><div><ul class="color_list">';
                var count = goods['children'][i]['same_color'].length;
                var children = goods['children'][i]['same_color'];
                var goods_id = goods['children'][i]['goods']['goods_id'];
                datas['children'][i] = goods_id;
                for(var j=0;j<count;j++){
                    subgoods += '<li><a href="javascript:void(0)"><img src="'+ children[j]['goods']['image']['small_thumb_path'] +'" title="'+ children[j]['goods']['color_name'] +'"index="'+ i +'" goods_id="'+ children[j]['goods']['goods_id'] +'"';
                    if(goods_id == children[j]['goods']['goods_id']){subgoods +=' class="active"';}
                    subgoods +=' style="width:40px;height:40px;"/></a></li>';
                }
                subgoods += '</ul></div><div class="clear"></div></div></div><div class="clear"></div></li>';
            }
            OPPO.ui.cartselect({goodsname:goods.goods.name,subgoods:subgoods});
            $('#popBuy').bind('click',function(){
                    OPPO.cart.addPackage(datas);
                    OPPO.miaozhen.btn_click(goods.goods.goods_id,'加入购物车',1);
                    OPPO.ui.closePopup();
                    return false;
            });
            OPPO.cart.initPackage(datas);
        },
        initPackage:function(datas){
            $('.color_list li').bind('click',function(){
                var _this = $(this).find('img');
                $(this).parent().find('img').removeClass('active');
                _this.addClass('active');
                var change_index = _this.attr('index');
                var change_id = _this.attr('goods_id');
                datas['children'][change_index] = change_id;
                $('#popBuy').unbind('click');
                $('#popBuy').bind('click',function(){
                    OPPO.cart.addPackage(datas);
                    OPPO.miaozhen.btn_click(datas.goods_id,'加入购物车',1);
                    OPPO.ui.closePopup();
                    return false;
                });
            });
        },
        addPackage:function(datas){
            A('cart/savefloat', datas,
                function(data) {
                    $('#goodsNum').text(data.cnt);
                    $('#cart_cnt').text(data.cnt);
                    $('.emptyInfo').css('display','none');
                    $('#floatCart').css('display','block');
                    if(data.cart){
                        if(OPPO.cart.activity == true){
                            OPPO.cart.activity = false;
                            window.location.href = "/order/create?gid="+datas.goods_id;
                        }
                        var cart = data.cart;
                        var template = '';
                                                        OPPO.cart.totalprice = 0;
                        for(var i=0;i<cart.length;i++){
                            template += '<li><div class="photoBox"><a href="goods/'+ cart[i]['goods']['goods_id'] +'"><img style="width:60px;height:60px;" src="'+ cart[i]['goods']['image']['small_thumb_path'] +'"/></a></div><div class="InfoBox"><p><a href="goods/'+ cart[i]['goods']['goods_id'] +'">'+ cart[i]['goods']['name'] +'</a></p><div class="numBox"><span class="price">￥'+ Math.ceil(cart[i]['goods']['price']) +'</span><a href="javascript:void(0);" class="reduce" onclick="OPPO.cart.goodsreduce($(this),\''+ cart[i]['cid'] +'\')"></a><span class="num" price="'+ Math.ceil(cart[i]['goods']['price']) +'">'+ cart[i]['cnt'] +'</span><a href="javascript:void(0);" class="add" onclick="OPPO.cart.goodsadd($(this),\''+ cart[i]['cid'] +'\')"></a></div></div><div class="clear"></div><div class="close"><a href="javascript:void(0);" onclick=\'OPPO.cart.deletefloat($(this),"'+ cart[i]['cid'] +'")\'><img src="../static/image/home/new/btn_close.png" /></a></div></li>';
                            OPPO.cart.totalprice += parseInt(cart[i]['goods']['price']*cart[i]['cnt']);
                        }
                        $('#floatCart ul').html(template);
                                                        $('#floatCart ul li:odd').addClass('gray');
                        OPPO.cart.close();
                    }
                    $('#cartBox').attr('href',data.returnurl);
                    $('#fixCart').attr('href',data.returnurl);
                    $('#toBuy span').text(OPPO.cart.totalprice);
                    $('#toBuy a').attr('href',data.orderurl);
                },
                function(no, msg) {
                        if (no == 1 && msg) {
                                OPPO.ui.alert({content: msg});
                        } else {
                                OPPO.ui.alert({content: '添加失败，请重试'});
                        }
                }
            );
        },
        goodsSelect:function(datas){
            A('cart/goodsSelect',datas,
                function(data){
                    if(data.item.count>1){
                        OPPO.cart.popupSelect(data.item,data.item.count,datas.cnt);
                    }else if(data.item.is_bind == 1){
                        OPPO.cart.popupPackage(data.item,datas.cnt);
                    }else{
                        OPPO.cart.addcart(datas);
                    }
                },function(no,msg){
                    if (no == 1 && msg) {
                            OPPO.ui.alert({content: msg});
                    } else {
                            OPPO.ui.alert({content: '添加失败，请重试'});
                    }
                    return false;
                });
        },
        addSelect:function(goods_id, cnt, children){
                var data = {goods_id:goods_id};
                if (cnt) data.cnt = cnt;
                if (children) data.children = children;
                OPPO.cart.addcart(data);
        },
        addfloat:function(goods_id, cnt, children){
                var data = {goods_id:goods_id};
                if (cnt) data.cnt = cnt;
                if (children) data.children = children;
                OPPO.cart.goodsSelect(data)
        },
        addActivity:function(goods_id, cnt, children){
                var data = {goods_id:goods_id};
                if (cnt) data.cnt = cnt;
                if (children) data.children = children;
                OPPO.cart.activity = true;
                OPPO.cart.goodsSelect(data)
        },
        addcart:function(datas){
            A('cart/addfloat', datas,
                function(data) {
                    $('#goodsNum').text(data.cnt);
                    $('#cart_cnt').text(data.cnt);
                    $('.emptyInfo').css('display','none');
                    $('#floatCart').css('display','block');
                    if(data.cart){
                        if(OPPO.cart.activity == true){
                            OPPO.cart.activity = false;
                            window.location.href = "/order/create?gid="+datas.goods_id;
                        }
                        var cart = data.cart;
                        var template = '';
                                                        OPPO.cart.totalprice = 0;
                        for(var i=0;i<cart.length;i++){
                            template += '<li><div class="photoBox"><a href="goods/'+ cart[i]['goods']['goods_id'] +'"><img style="width:60px;height:60px;" src="'+ cart[i]['goods']['image']['small_thumb_path'] +'"/></a></div><div class="InfoBox"><p><a href="goods/'+ cart[i]['goods']['goods_id'] +'">'+ cart[i]['goods']['name'] +'</a></p><div class="numBox"><span class="price">￥'+ Math.ceil(cart[i]['goods']['price']) +'</span><a href="javascript:void(0);" class="reduce" onclick="OPPO.cart.goodsreduce($(this),\''+ cart[i]['cid'] +'\')"></a><span class="num" price="'+ Math.ceil(cart[i]['goods']['price']) +'">'+ cart[i]['cnt'] +'</span><a href="javascript:void(0);" class="add" onclick="OPPO.cart.goodsadd($(this),\''+ cart[i]['cid'] +'\')"></a></div></div><div class="clear"></div><div class="close"><a href="javascript:void(0);" onclick=\'OPPO.cart.deletefloat($(this),"'+ cart[i]['cid'] +'")\'><img src="../static/image/home/new/btn_close.png" /></a></div></li>';
                            OPPO.cart.totalprice += parseInt(cart[i]['goods']['price']*cart[i]['cnt']);
                        }
                        $('#floatCart ul').html(template);
                                                        $('#floatCart ul li:odd').addClass('gray');
                        OPPO.cart.close();
                                            OPPO.ui.alert({content: '购物车添加成功！'});
                    }
                    $('#cartBox').attr('href',data.returnurl);
                    $('#toBuy span').text(OPPO.cart.totalprice);
                    $('#toBuy a').attr('href',data.orderurl);

                },
                function(no, msg) {
                        if (no == 1 && msg) {
                                OPPO.ui.alert({content: msg});
                        } else {
                                OPPO.ui.alert({content: '添加失败，请重试'});
                        }
                }
            );
        },
        addBuy:function(data){
            A('cart/addfloat', data,
                function(data) {
                    if(data.cart){
                        var cart = data.cart;
                        var template = '';
                                                        OPPO.cart.totalprice = 0;
                        for(var i=0;i<cart.length;i++){
                            template += '<li><div class="photoBox"><a href="goods/'+ cart[i]['goods']['goods_id'] +'"><img style="width:60px;height:60px;" src="'+ cart[i]['goods']['image']['small_thumb_path'] +'"/></a></div><div class="InfoBox"><p><a href="goods/'+ cart[i]['goods']['goods_id'] +'">'+ cart[i]['goods']['name'] +'</a></p><div class="numBox"><span class="price">￥'+ Math.ceil(cart[i]['goods']['price']) +'</span><a href="javascript:void(0);" class="reduce" onclick="OPPO.cart.goodsreduce($(this),\''+ cart[i]['cid'] +'\')"></a><span class="num" price="'+ Math.ceil(cart[i]['goods']['price']) +'">'+ cart[i]['cnt'] +'</span><a href="javascript:void(0);" class="add" onclick="OPPO.cart.goodsadd($(this),\''+ cart[i]['cid'] +'\')"></a></div></div><div class="clear"></div><div class="close"><a href="javascript:void(0);" onclick=\'OPPO.cart.deletefloat($(this),"'+ cart[i]['cid'] +'")\'><img src="../static/image/home/new/btn_close.png" /></a></div></li>';
                            OPPO.cart.totalprice += parseInt(cart[i]['goods']['price']*cart[i]['cnt']);
                        }
                        $('#floatCart ul').html(template);
                                                        $('#floatCart ul li:odd').addClass('gray');
                        OPPO.cart.close();
                        OPPO.ui.alert({content: '购物车添加成功！'});
                    }
                },
                function(no, msg) {
                        if (no == 1 && msg) {
                                OPPO.ui.alert({content: msg});
                        } else {
                                OPPO.ui.alert({content: '添加失败，请重试'});
                        }
                }
            );
        },
        goodsreduce:function(obj,id) {
                var num = obj.parent().find('.num');
                var price = parseInt(num.attr('price'));
                var cnt = parseInt(num.html());
                cnt = cnt > 0? cnt-1:cnt;
		A('cart/update', {id: id, cnt : cnt, set:1},
			function(data) {
                                if(data.info == 1){
                                    num.text(data.cnt);
                                    var totalCnt = parseInt($('#goodsNum').text());
                                    $('#goodsNum').text(parseInt(totalCnt-1));
                                    $('#cart_cnt').text(parseInt(totalCnt-1));
                                    OPPO.cart.totalprice -= parseInt(price);
                                    $('#toBuy span').text(OPPO.cart.totalprice);
                                }
			},
			function(no, msg) {
				if (!msg || msg.length == 0) {
					msg = '修改失败，请重试';
				}
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						location.href = location.href;
					}
				});
			}
		)
        },
        goodsadd:function(obj,id){
                var num = obj.parent().find('.num');
                var price = parseInt(num.attr('price'));
                var cnt = parseInt(num.html());
                cnt = cnt >= 0? cnt+1:cnt;
                A('cart/update', {id: id, cnt : cnt, set:1},
			function(data) {
                                if(data.info == 1){
                                    num.text(data.cnt);
                                    var totalCnt = parseInt($('#goodsNum').text());
                                    $('#goodsNum').text(parseInt(totalCnt+1));
                                    $('#cart_cnt').text(parseInt(totalCnt+1));
                                    OPPO.cart.totalprice += parseInt(price);
                                    $('#toBuy span').text(OPPO.cart.totalprice);
                                }
			},
			function(no, msg) {
				if (!msg || msg.length == 0) {
					msg = '修改失败，请重试';
				}
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						location.href = location.href;
					}
				});
			}
		)
        },
        deletefloat:function(obj,id){
            var el = obj.parent().parent();
            var price = parseInt(el.find('.num').attr('price'));
            var cnt = parseInt(el.find('.num').text());;
            A('cart/remove', {id: id},
			function(data) {
				el.remove();
                                OPPO.cart.totalprice -= parseInt(price*cnt)
                                $('#cartBox').attr('href',data.returnurl);
                                $('#fixCart').attr('href',data.returnurl);
                                $('#toBuy span').text(OPPO.cart.totalprice);
                                $('#toBuy a').attr('href',data.orderurl);
                                var totalCnt = parseInt($('#goodsNum').text()-cnt);
                                $('#goodsNum').text(parseInt(totalCnt));
                                $('#cart_cnt').text(parseInt(totalCnt));
                                var floatLi = parseInt($('#floatCart ul li').length);
                                if(floatLi == 0){
                                    totalCnt = 0;
                                    $('#goodsNum').text('0');
                                    $('#cart_cnt').text('0');
                                }
                                if(totalCnt == 0){
                                    $('#floatCart').css('display','none');
                                    $('.emptyInfo').css('display','block');
                                }
			},
			function(no, msg) {
				OPPO.ui.alert({content: '修改失败，请重试'});
			}
		);
        },
        close:function(){
            $('#floatCart ul li').hover(function(){
                $(this).find('.close').css('display','block');
            },function(){
                $(this).find('.close').css('display','none');
            });
        },
        floatBox:function(){
			var top = parseInt($(document).scrollTop());
			var siteHight = parseInt($('#floatBox').height());
            if(top > 108){
                $('#floatBox').addClass('floatBox');
                if($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
                    $('#floatBox').css({'position':'absolute','top':parseInt(top-119)+'px'});
                }
				$('#siteBox').css({'height':siteHight+'px','display':'block'});
            }else{
                $('#floatBox').removeClass('floatBox');
                if($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
                    $('#floatBox').css({'position':'static','top':'0px'});
                }
				$('#siteBox').css({'height':'0px','display':'none'});
            }
        },
        cartreduce:function(obj,id) {
                var num = obj.parent().find('.cartNum');
                var price = parseInt(num.attr('price'));
                var cnt = parseInt(num.val());
                if(1>=cnt){
        			obj.parent().find(".delTip2").show();
                	return false;
                }
                cnt = cnt > 0? cnt-1:cnt;
		A('cart/update', {id: id, cnt : cnt, set:1},
			function(data) {
                                if(data.info == 1){
                                   /* num.val(data.cnt);
                                    OPPO.cart.totalprice = parseInt($('#total').text());
                                    OPPO.cart.totalprice -= parseInt(price);
                                    $('#total').text(OPPO.cart.totalprice);
                                    $('#item'+id).find('.singlePrice').text(OPPO.cart.totalprice);*/
                                location.href = location.href;
                                }
			},
			function(no, msg) {
				if (!msg || msg.length == 0) {
					msg = '修改失败，请重试';
				}
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						location.href = location.href;
					}
				});
			}
		)
        },
        cartadd:function(obj,id){
                var num = obj.parent().find('.cartNum');
                var price = parseInt(num.attr('price'));
                var cnt = parseInt(num.val());
                cnt = cnt >= 0? cnt+1:cnt;
                A('cart/update', {id: id, cnt : cnt, set:1},
			function(data) {
                                if(data.info == 1){
                                    /*num.val(data.cnt);
                                    OPPO.cart.totalprice = parseInt($('#total').text());
                                    OPPO.cart.totalprice += parseInt(price);
                                    $('#total').text(OPPO.cart.totalprice);
                                    $('#item'+id).find('.singlePrice').text(OPPO.cart.totalprice);*/
                                location.href = location.href;
                                }
			},
			function(no, msg) {
				if (!msg || msg.length == 0) {
					msg = '修改失败，请重试';
				}
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						location.href = location.href;
					}
				});
			}
		)
        },
        init:function(){
            $('#floatCart ul li:odd').addClass('gray');
            OPPO.cart.close();
            OPPO.cart.totalprice = parseInt($('#toBuy span').text());
            $(window).scroll(OPPO.cart.floatBox);
        }
};

OPPO.region = {
	city_dest : false,
	district_dest : false,
	init : function() {
		if ($('#shipping_provice').size() > 0 && $('#shipping_city').size() > 0 ) {
			$('#shipping_provice').change(function() {
				var value = $('#shipping_provice').val();
				$('#shipping_city').empty();
				$("#shipping_city").append("<option value=''>请选择</option>");
				$('#shipping_district').empty();
				$("#shipping_district").append("<option value=''>请选择</option>");
				if (value == '') return;
				A('region/get/'+value, {}, function(data) {
					if (data.parent_id == value) {
						for(var i in data.children) {
							if (OPPO.region.city_dest && OPPO.region.city_dest == data.children[i].value) {
								$("#shipping_city").append("<option value='"+data.children[i].value+"' selected>"+data.children[i].text+"</option>");
							} else {
								$("#shipping_city").append("<option value='"+data.children[i].value+"'>"+data.children[i].text+"</option>");
							}
						}
					}
					if (OPPO.region.city_dest) {
						$("#shipping_city").change();
					}
					OPPO.region.city_dest = false;
					setAddressDisplay();
					if($('#getrealshopajax').val()=='999'){
						$('#shipping_city > option').each(function() {
							if ($(this).val() == realshop_query_city_id) {
								var curSel = $(this);
								setTimeout(function() {
									curSel.attr("selected",true);
								}, 1);
							}
						});
						setTimeout(function() {
							$('#shipping_city').change();
						}, 1);

					}
				}, function() {
					OPPO.ui.alert({content: '获取地址列表失败'});
				});
			});
		}

		if ( $('#shipping_city').size() > 0 && $('#shipping_district').size() > 0 ) {
			$('#shipping_city').change(function() {
				var value = $('#shipping_city').val();
				$('#shipping_district').empty();
				$("#shipping_district").append("<option value=''>请选择</option>");
				if (value == '') return;
				A('region/get/'+value, {}, function(data) {
					if (data.parent_id == value)
					for(var i in data.children) {
						if (OPPO.region.district_dest && OPPO.region.district_dest == data.children[i].value) {
							$("#shipping_district").append("<option value='"+data.children[i].value+"' selected>"+data.children[i].text+"</option>");
						} else {
							$("#shipping_district").append("<option value='"+data.children[i].value+"'>"+data.children[i].text+"</option>");
						}
					}
					$("#shipping_district").bind('change',setAddressDisplay);
					OPPO.region.district_dest = false;
					setAddressDisplay();
				}, function() {
					OPPO.ui.alert({content: '获取地址列表失败'});
				});
			});
		}
		if($('#getrealshopajax').val()=='999'){  //自提点加截页面
			//获取默认位置
			$("#shipping_city").bind('change', function(){
				if ( $("#shipping_city").val() != -1 ) {

				 //获取该省所有数据 2013-03-18 add
				 if($("#shipping_city").val()=='' && $("#shipping_provice").val() ){
					$.get('/getProvinceRealshopAjax/'+$("#shipping_provice").val(),function(data){
						$('.ziti_search_list').replaceWith(data);
					});
					return;
				}
					$.get('/getRealshopAjax/'+$(this).val(),function(data){
						$('.ziti_search_list').replaceWith(data);
						});
					}
			});
			A('region/matchCity', {'province':remote_ip_info["province"],
				'city':remote_ip_info["city"]},
					function(data) {
						//重置选择
						$('#shipping_provice > option').each(function() {
							if ($(this).val() == data['province_id']) {
								var curSel = $(this);
								setTimeout(function() {
									curSel.attr("selected",true);
								}, 1);
							}
						});
						setTimeout(function() {
							realshop_query_city_id = data['city_id'];
							$('#shipping_provice').change();
						}, 1);
					},
					function(no, msg) {

					}
				);
		}
			if ($('#refund_bank_province').size() > 0 ){ //银行点
			$('#refund_bank_province').bind('change',function() {
				var value = $('#refund_bank_province').val();
				$("#refund_bank_province1").val($('#refund_bank_province').find("option:selected").text());//中文
				$('#refund_bank_city').empty();
				$("#refund_bank_city").append("<option value=''>请选择</option>");
				if (value == '') return;
				A('region/get/'+value, {}, function(data) {
					if (data.parent_id == value) {
						for(var i in data.children) {
							if (OPPO.region.city_dest && OPPO.region.city_dest == data.children[i].value) {
								$("#refund_bank_city").append("<option value='"+data.children[i].value+"' selected>"+data.children[i].text+"</option>");
							} else {
								$("#refund_bank_city").append("<option value='"+data.children[i].value+"'>"+data.children[i].text+"</option>");
							}
						}
					}
				}, function() {
					OPPO.ui.alert({content: '获取地址列表失败'});
				});
			});
		}
	}
};

OPPO.alert = {
	add : function(goods_id, phone) {
		A('goods/addalert',{goods_id:goods_id, phone:phone},
			function(data) {
				alert(data);
			},
			function(no, msg) {
				alert(msg);
			}
		);
	}
};

OPPO.newaddress = {
	addresses : false,
	selected: false,
	selectedIndex:false,
	address_type: 'order/create',
        setDefault: function(index){
            var params = OPPO.newaddress.addresses[index];
            params['default'] = 1;
            params['address_type'] = OPPO.newaddress.address_type;
            A('address/setdefault', params,
                    function(data) {
                            $('#all_new_address_list').html(data.html);
                            $('#newAdress').css('display','none');
                            OPPO.newaddress.addresses = data.data;
                            OPPO.newaddress.init();
                            if (OPPO.neworder.order == false) {
                                    return;
                            }
                            for(var i in OPPO.newaddress.addresses) {
									is_default=false;
                                    if (OPPO.newaddress.addresses[i].user_address_id == data.id) {
                                            OPPO.newaddress.select(i);
                                            $('#user_address_id').val(data.id);
											is_default=true;
                                            return;
                                    }

                            }
                    },
                    function(no, msg) {
                            if (no == 1) {
                                    OPPO.ui.alert({content: '您的会话已经过期,请重新登录'});
                            } else {
                                    OPPO.ui.alert({content: '保存地址失败,请重试'});
                            }
                    }
            );
        },
	add: function() {
            $('#all_new_address_list li.active').removeClass('active');
            $('#newAdress').css('display','block');
            if($('#all_new_address_list .edit').html()){
                var html = $('#all_new_address_list .edit .rightBox').html();
                $('#all_new_address_list .edit .rightBox').remove();
                $('#all_new_address_list .edit .clear').remove();
                $('#newAdress').append('<div class="rightBox">'+html+'</div><div class="clear"></div>');
                $('#all_new_address_list .edit').removeClass('modify edit');
                $('.newAdd').text('新建收货地址');
            }
            $('#all_new_address_list li').unbind('mouseover');
            $('.input_shipping').val('');
	},
	save: function() {
		// check form
		$('.input_shipping').each(function() {
			var val = $(this).val();
			var trimed = $.trim(val);
			if (val != trimed) $(this).val(trimed);
		});
		$("#new_address .input_tips").hide();
		var ret = true;
		if ( is_empty_string($("#shipping_receiver").val())) {
			$("#tips_shipping_receiver span.tips").text('请填写收件人姓名');
			$("#tips_shipping_receiver").show();
			ret = false;
		} else if ( OPPO.util.strlen( $("#shipping_receiver").val() ) > 40) {
			$("#tips_shipping_receiver span.tips").text('收件人姓名不能超过40个字符');
			$("#tips_shipping_receiver").show();
			ret = false;
		}
		$('#shipping_name').val(OPPO.util.cutoff($("#shipping_receiver").val(), 6));
//		if (OPPO.util.strlen($("#shipping_name").val()) > 6) {
//			$("#tips_shipping_name").show(); ret = false;
//		}
		if ( !$("#shipping_provice").val() || !$("#shipping_city").val() ||
			!$("#shipping_district").val() ) {
			$("#tips_shipping_district").show();ret = false;
		}
		if ( is_empty_string($("#shipping_address").val()) ) {
			$("#tips_shipping_address").show();ret = false;
		}
                if (OPPO.util.strlen($("#shipping_address").val()) > 80) {
			$("#tips2_shipping_address").show();
                        $("#tips2_shipping_address span").text("您填写的信息已超出"+ parseInt(OPPO.util.strlen($("#shipping_address").val())-80) +"字符");
                        ret = false;
		}

		// 联系方式
		var contact_msg = '';
		if ( !is_empty_string( $("#shipping_mobile").val() ) ) {
			if ( !is_mobile( $("#shipping_mobile").val() )  ) {
				contact_msg = '手机号码格式不正确';ret = false;
			}
		}else {
			if ( is_empty_string( $("#shipping_phone_area_code").val() ) && is_empty_string( $("#shipping_phone").val() ) ) {
				contact_msg = '请至少选择手机或固定电话中的一项填写，推荐使用手机';ret = false;
			} else {
				// 手机号码为空， 填写固定电话
				if ( is_empty_string( $("#shipping_phone_area_code").val() ) ) {
					contact_msg = '请填写区号';ret = false;
				}else if( !is_num( $("#shipping_phone_area_code").val()) ) {
					contact_msg = '区号格式不正确';ret = false;
				} else {
					if ( is_empty_string( $("#shipping_phone").val() ) ) {
						contact_msg = '请填写固定电话';ret = false;
					}else if ( !is_num( $("#shipping_phone").val() ) ){
						contact_msg = '固定电话格式不正确';ret = false;
					} else {
						if ( !is_empty_string( $("#shipping_phone_ext_code").val() ) && !is_num( $("#shipping_phone_ext_code").val() ) ) {
							contact_msg = '分机号格式不正确';ret = false;
						}
					}

				}
			}

		}
		if ( contact_msg != '') {
			$("#tips_shipping_contact").show();
			$("#tips_shipping_contact").find('span').html(contact_msg);
		}

		if ( !is_empty_string( $("#shipping_postcode").val() ) && !is_postcode( $("#shipping_postcode").val() ) ) {
			$("#tips_shipping_postcode").show();ret = false;
		}

		if ( $("#shipping_email").val() != '' && !is_email( $("#shipping_email").val() ) ) {
			$("#tips_shipping_email").show();ret = false;
		}
		if ( !ret ) return ret;
		// end check form

		var params = {};
		$('.input_shipping').each(function() {
			params[$(this).attr('id')] = $(this).val();
		});
		params['default'] = $('.set_default').attr("checked") ? 1 : 0;
		params['address_type'] = OPPO.newaddress.address_type;

		var name = $("#shipping_name").val();
		if (name == '') {
			params[$("#shipping_name").attr('id')] = OPPO.util.cutoff($("#shipping_receiver").val());
		}
		A('address/add', params,
			function(data) {
				$('#all_new_address_list').html(data.html);
                $('#newAdress').css('display','none');
				OPPO.newaddress.addresses = data.data;

				for(var i in data.data) {
					if (OPPO.newaddress.addresses[i].user_address_id == data.id) {
						OPPO.newaddress.select(i);
						break;
					}
				}
				if (OPPO.neworder.order == false) {
					return;
				}
                OPPO.newaddress.start();
			},
			function(no, msg) {
				if (no == 1) {
					OPPO.ui.alert({content: '您的会话已经过期,请重新登录'});
				} else {
					OPPO.ui.alert({content: '保存地址失败,请重试'});
				}
			}
		);

	},

	edit: function(index) {
                OPPO.newaddress.start();
                $('.input_shipping').val('');
                $('#newAdress').css('display','block');
		var html = $('#newAdress .rightBox').html();
                if(html){
                    $('#newAdress .rightBox').remove();
                    $('#newAdress .clear').remove();
                    $('#all_new_address_list li.active').addClass('modify edit').append('<div class="rightBox">'+html+'</div><div class="clear"></div>');
                    $('.newAdd').text('');
                }
                $('#all_new_address_list .operate').css('display','none');
                OPPO.region.init();
                $('#all_new_address_list li').unbind('mouseover');
		for(var i in OPPO.newaddress.addresses) {
			if (i == index) {
				//$('#address_list_previous').html(html);
				html = '';
				var address = OPPO.newaddress.addresses[i];
				OPPO.region.city_dest = address.city_id;
				OPPO.region.district_dest = address.district_id;
				//$('#new_address .an_title h2 span').text(address.name);
				$('#shipping_name').val(address.name);
				$('#shipping_receiver').val(address.receiver);
				$('#shipping_provice').val(address.provice_id);
				$('#shipping_provice').change();
				$('#shipping_address').val(address.address);
				$('#shipping_postcode').val(address.postcode);
				$('#shipping_phone').val(address.phone);
				$('#shipping_phone_area_code').val(address.phone_area_code);
				$('#shipping_phone_ext_code').val(address.phone_ext_code);
				$('#shipping_mobile').val(address.mobile);
				$('#shipping_email').val(address.email);
				$('#shipping_address_id').val(address.user_address_id);
				$('#user_address_id').val(address.user_address_id);
				continue;
			}
		}
	},

	closeEdit: function() {
                $('.input_shipping').val('');
                $('#newAdress').css('display','none');
                var html = $('#all_new_address_list .edit .rightBox').html();
                if(html){
                    $('#all_new_address_list .edit .rightBox').remove();
                    $('#all_new_address_list .edit .clear').remove();
                    $('#newAdress').append('<div class="rightBox">'+html+'</div><div class="clear"></div>');
                    $('#all_new_address_list .edit').removeClass('modify edit');
                    $('.newAdd').text('新建收货地址');
                }else{
                    $('#all_new_address_list li').each(function(){
                        if($(this).find('.radioCheck').attr('checked')){
                            $(this).addClass('active');
                        }
                    });

                }
                OPPO.newaddress.start();
	},

	remove: function(i) {
		var current_address_name = OPPO.newaddress.addresses[i].name!='' ? ': '+OPPO.newaddress.addresses[i].name : '';
		OPPO.ui.confirm({

				content: '确定删除地址'+current_address_name+' ?',
				onConfirm: function() {
					A('address/remove/' + OPPO.newaddress.addresses[i].user_address_id, {address_type: OPPO.newaddress.address_type, sid:OPPO.newaddress.selected.user_address_id},
						function(data) {

							$('#all_new_address_list').html(data.html);
							if(data.data.length==1){
								OPPO.newaddress.select(0, true);
								$('#all_new_address_list li').first().find("input[type=radio]").attr('checked',true);
							}
							OPPO.newaddress.start();
							if(OPPO.newaddress.selectedIndex>=0 && i==OPPO.newaddress.selectedIndex){
								if(OPPO.newaddress.selectedIndex==i){
									$('#display_receiver').html('');
									$('#display_address').html('');
									OPPO.newaddress.selected=false;
								}
							}
							OPPO.newaddress.addresses = data.data;
							if ( OPPO.newaddress.addresses.length == 0 ) {
								OPPO.newaddress.add();
							}
						},
						function(no, msg) {
							if (no == 1) {
								OPPO.ui.alert({content: '您的会话已经过期,请重新登录'});
							} else {
								OPPO.ui.alert({content: '添加地址失败,请重试'});
							}
						}
					);
				}
		});
	},
	select: function(i) {
		//if (OPPO.order.order == false && OPPO.order.returnrequest.request == false  && $('#is_ms_page').attr('id') == undefined) return;
		OPPO.newaddress.selected = OPPO.newaddress.addresses[i];
		OPPO.newaddress.selectedIndex = i;
		var address = OPPO.newaddress.addresses[i];
		$('#display_address').text(address.provice + address.city + address.district + address.address);

		$('#user_address_id').val(address.user_address_id);

		var phone = '';
		if (address.mobile != '') {
			phone += address.mobile+"(手机) ";
		}
		if (address.phone_area_code != '' && address.phone != '') {
			phone += address.phone_area_code+"-"+address.phone;
			if (address.phone_ext_code != '') {
				phone += '-'+address.phone_ext_code;
			}
			phone += "(座机)";
		}
        $('#display_receiver').text(address.receiver+','+phone);

		// update invoice
        $('#invoice_title').val(address.receiver);
        $('.invoice_title').text('（发票抬头：'+address.receiver+'）');
        $('#invoiceCheck').attr('checked',true);

        OPPO.newinvoice.selected = {
                type: 'personal',
                title: address.receiver
        };
        /*
		$('input.radioCheck[name=checkaddress]').each(function(){
			if($(this).attr('cid')==i){
				$(this).attr('checked', 'checked');
			}
		});
		*/
		// 更新物流支付方式
		if (OPPO.neworder.order != false ) {
			OPPO.passpay.find(address.district_id, OPPO.neworder.order.goods_fee, OPPO.neworder.order.goods_weight,address.user_address_id);
		}
	},
	init: function() {
		OPPO.newaddress.start();
		if (OPPO.newaddress.addresses == false && typeof(OPPO.newaddress.addresses) == typeof(false)) {
			return;
		}
		if(OPPO.newaddress.addresses.length == 1){
			OPPO.newaddress.select(0, true);
				return;
		}
		for(var i in OPPO.newaddress.addresses) {
			if (OPPO.newaddress.addresses[i].is_default == '1') {
				OPPO.newaddress.select(i, true);
				return;
			}
		}
	},
    start:function(){
        //新的开始
        $('#all_new_address_list li').bind('mouseover',function(){
            $(this).parent().find('li').removeClass('active');
            $(this).addClass('active');
        });
        $('#all_new_address_list .operate').css('display','block');
        $('input:radio[name="checkaddress"]').bind('click',function(){
            var cid = $(this).attr('cid');
            OPPO.newaddress.select(cid);
        });
    },
	change: function() {
		/*$('#shipping_tips').show();
		$('#shipping_area').hide();
		$('#shipping_selected').hide();
		$('#all_address_list').show();
		$('#default_address').hide();
		$('#shipping_limit').show();
		$('#address_block i').addClass('current');*/
		OPPO.address.selected = false;
		OPPO.shipping.reset();
	}
};

OPPO.address = {
	addresses : false,
	selected: false,
	address_type: 'order/create',
	add: function(index) {
		if ($('#shipping_edit_area').is(':visible')) {
			$('html, body').animate({scrollTop: $('#new_address').offset().top});
			return;
		}
		$('.input_shipping').val('');
		$('#new_address .an_title h2 span').text('新建收货地址');
		$('.set_default span.checkbox a').addClass("current");
		$('#address_list_next').html('');
		$('#address_list_previous').html('');
		$('#shipping_edit_area').show();
		$("#new_address .input_tips").hide();
		$('#new_address #lblAreaName').text('');
		$('#new_address #lblAreaName').css({'display':'none'});
		if ( OPPO.address.addresses != false && OPPO.address.addresses.length != 0 ) {
			$("#new_address .close").show();
		} else {
			$("#new_address .close").hide();
			$("#new_address .address_n").addClass( ( OPPO.address.address_type == 'order/create' ) ? "set_select" : "set" );
		}
		//$('html, body').animate({scrollTop: $('#new_address').offset().top});
	},

	setSelect: function(index) {
		$('.address_n').each(function() {
			if ($(this).attr('cid') == index) {
				$(this).removeClass('normal_select').addClass('set_select');
			} else {
				$(this).removeClass('set_select').addClass('normal_select');
			}
		});
		// add 2013-01-27 wei 23:55 检测是否是偏远地区
		//if(parseInt($('#risk_area'+index).val())){
		    //OPPO.ui.alert({content: '尊敬的用户，由于天气与物流原因，该订单可能无法在年前送达您所在的地区。OPPO承诺:凡是因快递投递时间过长导致在2月10日前因未能成功签收货品的用户，均可凭订单号以及对应的快递单号到OPPO商城领取"Find 5 保护壳"一个，对您的谅解以示谢意！ '});
		//}
	},

	save: function() {
		// check form
		$('.input_shipping').each(function() {
			var val = $(this).val();
			var trimed = $.trim(val);
			if (val != trimed) $(this).val(trimed);
		});
		$("#new_address .input_tips").hide();
		var ret = true;
		if ( is_empty_string($("#shipping_receiver").val())) {
			$("#tips_shipping_receiver span.tips").text('请填写收件人姓名');
			$("#tips_shipping_receiver").show();
			ret = false;
		} else if ( OPPO.util.strlen( $("#shipping_receiver").val() ) > 40) {
			$("#tips_shipping_receiver span.tips").text('收件人姓名不能超过40个字符');
			$("#tips_shipping_receiver").show();
			ret = false;
		}
		$('#shipping_name').val(OPPO.util.cutoff($("#shipping_receiver").val(), 6));
//		if (OPPO.util.strlen($("#shipping_name").val()) > 6) {
//			$("#tips_shipping_name").show(); ret = false;
//		}
		if ( !$("#shipping_provice").val() || !$("#shipping_city").val() ||
			!$("#shipping_district").val() ) {
			$("#tips_shipping_district").show();ret = false;
		}
		if ( is_empty_string($("#shipping_address").val()) ) {
			$("#tips_shipping_address").show();ret = false;
		}
                if (OPPO.util.strlen($("#shipping_address").val()) > 80) {
			$("#tips2_shipping_address").show();
                        $("#tips2_shipping_address span").text("您填写的信息已超出"+ parseInt(OPPO.util.strlen($("#shipping_address").val())-80) +"字符");
                        ret = false;
		}

		// 联系方式
		var contact_msg = '';
		if ( !is_empty_string( $("#shipping_mobile").val() ) ) {
			if ( !is_mobile( $("#shipping_mobile").val() )  ) {
				contact_msg = '手机号码格式不正确';ret = false;
			}
		}else {
			if ( is_empty_string( $("#shipping_phone_area_code").val() ) && is_empty_string( $("#shipping_phone").val() ) ) {
				contact_msg = '请至少选择手机或固定电话中的一项填写，推荐使用手机';ret = false;
			} else {
				// 手机号码为空， 填写固定电话
				if ( is_empty_string( $("#shipping_phone_area_code").val() ) ) {
					contact_msg = '请填写区号';ret = false;
				}else if( !is_num( $("#shipping_phone_area_code").val()) ) {
					contact_msg = '区号格式不正确';ret = false;
				} else {
					if ( is_empty_string( $("#shipping_phone").val() ) ) {
						contact_msg = '请填写固定电话';ret = false;
					}else if ( !is_num( $("#shipping_phone").val() ) ){
						contact_msg = '固定电话格式不正确';ret = false;
					} else {
						if ( !is_empty_string( $("#shipping_phone_ext_code").val() ) && !is_num( $("#shipping_phone_ext_code").val() ) ) {
							contact_msg = '分机号格式不正确';ret = false;
						}
					}

				}
			}

		}
		if ( contact_msg != '') {
			$("#tips_shipping_contact").show();
			$("#tips_shipping_contact").find('span').html(contact_msg);
		}

		if ( !is_empty_string( $("#shipping_postcode").val() ) && !is_postcode( $("#shipping_postcode").val() ) ) {
			$("#tips_shipping_postcode").show();ret = false;
		}

		if ( $("#shipping_email").val() != '' && !is_email( $("#shipping_email").val() ) ) {
			$("#tips_shipping_email").show();ret = false;
		}
		if ( !ret ) return ret;
		// end check form

		var params = {};
		$('.input_shipping').each(function() {
			params[$(this).attr('id')] = $(this).val();
		});
		params['default'] = $('.set_default span.checkbox a').hasClass("current") ? 1 : 0;
		params['address_type'] = OPPO.address.address_type;

		var name = $("#shipping_name").val();
		if (name == '') {
			params[$("#shipping_name").attr('id')] = OPPO.util.cutoff($("#shipping_receiver").val());
		}

		A('address/add', params,
			function(data) {
				$('#all_address_list').html(data.html);
				OPPO.address.addresses = data.data;
				$('#shipping_edit_area').hide();
				$('#all_address_list').show();
				if (OPPO.order.order == false) {
					$('.select_name a.select').hide();
					return;
				}
				for(var i in OPPO.address.addresses) {
					if (OPPO.address.addresses[i].user_address_id == data.id) {
						OPPO.address.select(i);
						$('#user_address_id').val(data.id);
						return;
					}
				}
				$('html, body').animate({scrollTop: $('#address_block').offset().top});
			},
			function(no, msg) {
				if (no == 1) {
					OPPO.ui.alert({content: '您的会话已经过期,请重新登录'});
				} else {
					OPPO.ui.alert({content: '保存地址失败,请重试'});
				}
			}
		);
	},

	edit: function(index) {
		$("#new_address .input_tips").hide();
		$('#default_address').hide();
		$('#shipping_limit').show();
		$('#all_address_list').hide();
		var html = '';
		for(var i in OPPO.address.addresses) {
			if (i == index) {
				$('#address_list_previous').html(html);
				html = '';
				var address = OPPO.address.addresses[i];
				OPPO.region.city_dest = address.city_id;
				OPPO.region.district_dest = address.district_id;
				$('#new_address .an_title h2 span').text(address.name);
				$('#new_address #shipping_name').val(address.name);
				$('#new_address #shipping_receiver').val(address.receiver);
				$('#new_address #shipping_provice').val(address.provice_id);
				$('#new_address #shipping_provice').change();
				$('#new_address #shipping_address').val(address.address);
				$('#new_address #shipping_postcode').val(address.postcode);
				$('#new_address #shipping_phone').val(address.phone);
				$('#new_address #shipping_phone_area_code').val(address.phone_area_code);
				$('#new_address #shipping_phone_ext_code').val(address.phone_ext_code);
				$('#new_address #shipping_mobile').val(address.mobile);
				$('#new_address #shipping_email').val(address.email);
				$('#new_address #shipping_address_id').val(address.user_address_id);
				$('#user_address_id').val(address.user_address_id);
				if (address.is_default == '1') {
					$('.set_default span.checkbox a').addClass("current");
				} else {
					$('.set_default span.checkbox a').removeClass("current");
				}

				continue;
			}
			html += '<div class="address_n ' + ((OPPO.address.address_type=='order/create') ? 'normal_select':'normal' ) + '"><div class="an_title cl"><h2 cid="'+i+'"><span>'+OPPO.address.addresses[i].name+'</span></h2><a href="#" class="edit" cid="'+i+'">[编辑]</a><a href="#" class="delete" cid="'+i+'" style="display:none">[删除]</a></div></div>';
		}
		$('#address_list_next').html(html);
		$('#shipping_edit_area').show();
		$('#shipping_edit_area a.edit').click(function() {
			OPPO.address.edit(parseInt($(this).attr('cid')));
			return false;
		});
		$('#shipping_edit_area a.delete').click(function() {
			OPPO.address.remove(parseInt($(this).attr('cid')));
			return false;
		});
		$('#shipping_edit_area h2').click(function() {
			if ($(this).attr('cid')) {
				OPPO.address.select(parseInt($(this).attr('cid')));
			}
		});
		$('html, body').animate({scrollTop: $('#new_address').offset().top});
	},

	closeEdit: function() {
		$('#shipping_edit_area').hide();
		$('#shipping_selected').hide();
		$('#all_address_list').show();
		$('#all_address_list .add').show();
		$('#default_address').hide();
		$('#shipping_limit').show();
		$('html, body').animate({scrollTop: $('#all_address_list').offset().top + $('#all_address_list').height() - $(window).height()});
	},

	remove: function(i) {
		OPPO.ui.confirm({
				content: '确定删除地址：' + OPPO.address.addresses[i].name + '？',
				onConfirm: function() {
					A('address/remove/' + OPPO.address.addresses[i].user_address_id, {address_type: OPPO.address.address_type},
						function(data) {
							$('#all_address_list').html(data.html);
							OPPO.address.addresses = data.data;
							if ( OPPO.address.addresses.length == 0 ) {
								OPPO.address.add();
							}
							if (OPPO.order.order == false) {
								$('.select_name a.select').hide();
								return;
							}
						},
						function(no, msg) {
							if (no == 1) {
								OPPO.ui.alert({content: '您的会话已经过期,请重新登录'});
							} else {
								OPPO.ui.alert({content: '添加地址失败,请重试'});
							}
						}
					);
				}
		});
	},
	select: function(i, noscroll) {
		if (OPPO.order.order == false && OPPO.order.returnrequest.request == false  && $('#is_ms_page').attr('id') == undefined) return;
		OPPO.address.setSelect(i);
		OPPO.address.selected = OPPO.address.addresses[i];
		$('#default_address').show();
		$('#shipping_limit').hide();
		$('#all_address_list').hide();
		$('#shipping_edit_area').hide();
		var address = OPPO.address.addresses[i];
		$('#display_address').text(address.provice + address.city + address.district + address.address);
		$('#display_receiver').text(address.receiver);
		$('#user_address_id').val(address.user_address_id);

		var phone = '';
		if (address.mobile != '') {
			phone += address.mobile+"(手机) ";
		}
		if (address.phone_area_code != '' && address.phone != '') {
			phone += address.phone_area_code+"-"+address.phone;
			if (address.phone_ext_code != '') {
				phone += '-'+address.phone_ext_code;
			}
			phone += "(座机)";
		}
		$('#display_phone').text(phone);
		$('#display_postcode').text(address.postcode);
		$('#display_email').text(address.email);
		$('#address_block i').removeClass('current');
		if (!noscroll) $('html, body').animate({scrollTop: $('#address_block').offset().top});

		// update invoice
		if (!OPPO.invoice.selected && $('#invoice_personal').is(":visible")) {
			$('#invoice_title').val(address.receiver);
		}

		// 更新物流方式
		if (OPPO.order.order != false ) {
			$('#shipping_tips').hide();
			OPPO.shipping.find(address.district_id, OPPO.order.order.goods_fee, OPPO.order.order.goods_weight,address.user_address_id);
		}
	},
	init: function() {
//		$('#shipping_address').blur(function() {
//			var shipping_address=$(this).val();
//			var reg=/[\s,\.;:\_\-——\uff0c\u3002\u3002\uff1b\uff1a]/g;
//			$(this).val(shipping_address.replace(reg,''));
//		});
		$("#new_address .input_tips").hide();
		if (OPPO.address.addresses == false && typeof(OPPO.address.addresses) == typeof(false)) {
			return;
		}
		if (OPPO.order.order == false  && OPPO.order.returnrequest.request == false && $('#is_ms_page').attr('id') == undefined) {
			$('.select_name a.select').hide();
			return;
		}
		if (OPPO.address.addresses.length == 0) {
			$('#default_address').hide();
			$('#shipping_limit').show();
			$('#all_address_list').hide();
			OPPO.address.add();
			return;
		}
		for(var i in OPPO.address.addresses) {
			if (OPPO.address.addresses[i].is_default == '1') {
				OPPO.address.select(i, true);
				return;
			}
		}
		$('#default_address').hide();
		$('#shipping_limit').show();
		$('#all_address_list').show();
		$('#shipping_edit_area').hide();

	},
	change: function() {
		$('#shipping_tips').show();
		$('#shipping_area').hide();
		$('#shipping_selected').hide();
		$('#all_address_list').show();
		$('#default_address').hide();
		$('#shipping_limit').show();
		$('#address_block i').addClass('current');
		OPPO.address.selected = false;
		OPPO.shipping.reset();
	}
};

OPPO.passpay = {
    passpay : false,
	selected: false,
	find : function(region_id, fee, weight,user_address_id) {
		A('shipping/findnew', {region_id: region_id, fee : fee, weight : weight,user_address_id : user_address_id},
			function(data) {
				OPPO.passpay.passpay = data;
                                var html = '';
				for(var i in data) {
                                        if(data[i].payment_type=='online'&&data[i].shipping_id==2){
                                            html += "<li class='active'><label><input type='radio' checked='checked' name='passpay' sid='"+ i +"' pid='"+ data[i].payment_id +"' seed='shipping_"+data[i].shipping_id+"'/></a><span class='passpayname'>"+data[i].name+" / "+data[i].payment_name+"</span>";
                                            OPPO.passpay.selected = OPPO.passpay.passpay[i];
                                        }else{
                                            html += "<li><label><input type='radio' name='passpay' sid='"+ i +"' pid='"+ data[i].payment_id +"' seed='shipping_"+data[i].shipping_id+"'/></a><span class='passpayname'>"+data[i].name+" / "+data[i].payment_name+"</span>";

                                        }
					if (data[i].service_range_link) {
						html += "<a href='"+data[i].service_range_link+"' class='link' target=_blank>配送范围</a>";
					}
					if (data[i].desc) {
						html += '<span class="des">' + data[i].desc + '</span>';
						if (data[i].is_realshop == '0') {
                                                    // html += '<br><span class="tips" style="margin-left: 85px;">';
                                                    // html += '尊敬的用户，OPPO商城承诺，凡是在2月10日前因快递派送原因未能成功签收货品的用户，均可凭订单号以及对应的快递单号到OPPO商城领取“Find 5 保护壳”一个.对您的谅解以示谢意！<a href=http://store.opposhop.com.cn/help/75 target=_blank>查看详情>></a></span>';
                                                                            //清空以上内容

                                                }
					}
					html += "</label></li>";
				}
                                $('#passpay').html(html);
                                OPPO.neworder.updateFee();
                                OPPO.passpay.init();
			},
			function(no, msg) {
				OPPO.ui.alert({content: '获取物流状态失败，请重试'});
			}
		);
	},

	change : function(obj) {

		var id = obj.attr('sid');
		var cfg = OPPO.passpay.passpay[id];
		OPPO.passpay.selected = OPPO.passpay.passpay[id];

		// 保存自提点
		if( cfg.is_realshop == 1 && cfg.realshop_list != null) {
			var html = '<div class="choosePlace">选择自提点：<div>';
                        var data = cfg.realshop_list;
                        for(var i in data){
                            if(i==0){
                                html += '<label><input checked="checked" type="radio" name="passaddress" rid="'+ data[i].realshop_id +'"/>'+ data[i].name +'：'+ data[i].desc +' 电话：'+ data[i].phone +'</label></br>';
                                OPPO.passpay.selected.realshop_id = data[i].realshop_id;
                            }else{
                                html += '<label><input type="radio" name="passaddress" rid="'+ data[i].realshop_id +'"/>'+ data[i].name +'：'+ data[i].desc +' 电话：'+ data[i].phone +'</label></br>';
                            }
                        }
                        html += '</div></div>';
                        $('#passpay li.active').append(html);
                        $('input:radio[name="passaddress"]').bind('click',function(){
                            var realshopid = $(this).attr('rid');
                            OPPO.passpay.selected.realshop_id = realshopid;
                        });
		}
		OPPO.neworder.updateFee();
	},
	reset: function() {
		OPPO.passpay.slected = false;
		OPPO.neworder.updateFee();
	},
        init:function(){
            $('input:radio[name="passpay"]').bind('click',function(){
                OPPO.passpay.selected.realshop_id = 0;
                $('.choosePlace').remove();
                OPPO.passpay.change($(this));
            });
            $('#passpay li').bind('mouseover',function(){
                $(this).parent().find('li').removeClass('active');
                $(this).addClass('active');
            });
        }
};

OPPO.shipping = {
	shippings : false,
	selected: false,
	shipdetail:function(shipping_no,shipping_name,query_url){
		var x=$('#shipDetail').position().left;
		var newX=(x+50);
		var y=$('#shipDetail').position().top;
		var newY=(y-200);
		var url="/ship/shippingdetail/"+shipping_no;
			A("/ship/shippingdetail/"+shipping_no,null,
			   function(data){
				   var htmlSta="<div class='order_block' id='orderShipDetail'>"+
					   "<div class='ob_title cl'><h3 class='order_deliver'>物流信息</h3><a  class='expc constriction'>收起</a></div>"+
					   "<div class='ob_info ob_deliver'>"+
					   "<ul>";
					var htmlMid = "";
					for ( var i = 0; i < data.length; i++) {
						htmlMid = htmlMid + "<li class='cl'><span class='t'>"
								+ data[i].time + "</span><span class='i'>"
								+ data[i].status + "</span><span class='c'>"
								+ data[i].location + "</span></li>";
					}
				   var htmlEnd="</ul>"+
 					   "<div class='exp_info cl'><span>承运人： "
							+ shipping_name + "</span><span>货运单号："
							+ shipping_no
							+ "</span><span><a target='_blank' href='"
							+ query_url + "'>在" + shipping_name
							+ "官网查询</a></span></div>" +
					   "</div>"+
					   "</div>";
				   var  htmlStr=htmlSta+htmlMid+htmlEnd;
			     $('#shipDiv').html(htmlStr).css({'left':newX,'top':newY});
				  $("#shipDiv a:first").click(function(){
					  $("#orderShipDetail").fadeOut();
				  });
			   },
			   function(no, msg) {
				OPPO.ui.alert({content: '获取物流状态失败，请重试'});
			});

	},
	find : function(region_id, fee, weight,user_address_id) {
		$('.payment_edit .self_get div').html('');
		$('.payment_edit .self_get').hide();
		A('shipping/find', {region_id: region_id, fee : fee, weight : weight,user_address_id : user_address_id},
			function(data) {
				var html = '';
				var realshop_html = '';
				for(var i in data) {
					html += "<p><span class='radio'><a href='#' class='radio' sid='"+ i +"' seed='shipping_"+data[i].shipping_id+"'></a>"+data[i].name+"</span>";
					if (data[i].service_range_link) {
						html += "<a href='"+data[i].service_range_link+"' class='link' target=_blank>配送范围</a>";
					}
					if (data[i].desc) {
						html += '<span class="des">' + data[i].desc + '</span>';
						if (data[i].is_realshop == '0') {
                            // html += '<br><span class="tips" style="margin-left: 85px;">';
                            // html += '尊敬的用户，OPPO商城承诺，凡是在2月10日前因快递派送原因未能成功签收货品的用户，均可凭订单号以及对应的快递单号到OPPO商城领取“Find 5 保护壳”一个.对您的谅解以示谢意！<a href=http://store.opposhop.com.cn/help/75 target=_blank>查看详情>></a></span>';
						    //清空以上内容

                        }
					}
					html += "</p>";
				}
                                alert(html);
				OPPO.shipping.shippings = data;
				$('#shipping_list').html(html);
				$('#shipping_list a.radio').click(function() {
					$('#shipping_list a.radio').removeClass('current');
					$(this).addClass('current');
					var i = parseInt($(this).attr('sid'));
					if (OPPO.shipping.shippings[i].is_realshop == 1 && OPPO.shipping.shippings[i].realshop_list != null ) {
						var html = '';
						for(var j in OPPO.shipping.shippings[i].realshop_list ) {

							html += '<dl class="cl"><dt><span class="radio"><a href="#" onclick="return false;"' + ( j==-1 ? 'class="current"' : '')+ ' cid="'+j+'"></a>'+OPPO.shipping.shippings[i].realshop_list[j].name+'</span></dt><dd>';
//							html += '<dl class="cl"><dt><span class="radio"><a href="#" onclick="return false; cid="'+j+'"></a>'+OPPO.shipping.shippings[i].realshop_list[j].name+'</span></dt><dd>';
							if (OPPO.shipping.shippings[i].realshop_list[j].address && OPPO.shipping.shippings[i].realshop_list[j].address.length > 0) {
								html += '地点：' + OPPO.shipping.shippings[i].realshop_list[j].address + ' ';
							}
							if (OPPO.shipping.shippings[i].realshop_list[j].phone && OPPO.shipping.shippings[i].realshop_list[j].phone.length > 0) {
								html += '电话：' + OPPO.shipping.shippings[i].realshop_list[j].phone + '  ';
							}

							html += '</dd></dl>';
						}
						$('.payment_edit .self_get div').html(html);
						$('.payment_edit .self_get div a').click(function() {
							$('.payment_edit .self_get div a').removeClass('current');
							$(this).addClass('current');
							OPPO.shipping.save();
						});
						$('.payment_edit .self_get').show();
					} else {
						$('.payment_edit .self_get div').html('');
						$('.payment_edit .self_get').hide();
						OPPO.shipping.save();
					}
					return false;
				});
				$('#shipping_area').show();
			},
			function(no, msg) {
				OPPO.ui.alert({content: '获取物流状态失败，请重试'});
			}
		);
		$('#shipping_block i').addClass('current');
		$('#shipping_select_tip').hide();
	},

	save : function() {
		var shipping = $('#shipping_list a.radio.current');
		if (shipping.size() == 0) {
			$('#shipping_select_tip').show();
			return;
		}
		$('#shipping_select_tip').hide();
		var id = shipping.attr('sid');
		var cfg = OPPO.shipping.shippings[id];
		OPPO.shipping.selected = OPPO.shipping.shippings[id];

//		var shipping_selected_content = cfg.name + "(运费:"+cfg.shipping_fee+"元)";
		var shipping_selected_content = cfg.name;

		// 保存自提点
		if( cfg.is_realshop == 1 && cfg.realshop_list != null ) {
			var index = $('.payment_edit .self_get div a.current').attr('cid');
			if (index) {
				OPPO.shipping.selected.realshop_id = cfg.realshop_list[index].realshop_id;
				shipping_selected_content += '    ' + cfg.realshop_list[index].name;
				if (cfg.realshop_list[index].address && cfg.realshop_list[index].address.length > 0) {
					shipping_selected_content += '  地址：' + cfg.realshop_list[index].address;
				}
				if (cfg.realshop_list[index].phone && cfg.realshop_list[index].phone.length > 0) {
					shipping_selected_content += '  ' + cfg.realshop_list[index].phone;
				}
			} else {
				OPPO.ui.alert({content: '请选择自提点'});
				return false;
			}
		}
		$('#shipping_area').hide();
		$('#shipping_selected label').text('配送方式：');
		$('#shipping_selected span').text(shipping_selected_content);
		$('#shipping_selected').show();
		// 更新支付方式
		$('#payment_tips').hide();
		$('#shipping_block i').removeClass('current');

		var support_cod = cfg.support_cod;
		if ( OPPO.order.order != false ) {
			// has lettring or is realshop, do not support cod
			//if ( OPPO.order.order.has_lettering == 1 ) support_cod = 0;
		}
		OPPO.payment.find(cfg.shipping_id, support_cod, OPPO.order.order.goods_fee + cfg.shipping_fee);
		OPPO.order.updateFee();
	},

	edit : function() {
		if (!OPPO.shipping.shippings || !OPPO.address.selected) return;
		$('#shipping_select_tip').hide();
		$('#shipping_area').show();
		$('#shipping_selected').hide();
		$('#shipping_block i').addClass('current');
		OPPO.payment.reset();
	},

	reset: function() {
		OPPO.shipping.slected = false;
		OPPO.order.updateFee();
		$('#shipping_select_tip').hide();
		$('#shipping_block i').removeClass('current');
		$('#shipping_area').hide();
		$('#shipping_tip').show();
		$('#shipping_selected').hide();
		OPPO.payment.reset();
	}
};

OPPO.payment = {
	payments : false,
	selected: false,
	find : function(shipping_id, support_cod, fee) {
		A('payment/find', {shipping_id: shipping_id, support_cod:support_cod, fee : fee},
			function(data) {
				var html = '<b></b>';
				for(var i in data) {
					html += "<p><span class='radio'><a href='#' class='radio' sid='"+ i +"' seed='payment_"+data[i].type+"'></a>"+data[i].name+"</span>";
					html += "<span class='des'>"+data[i].desc+"</span></p>";
				}

				OPPO.payment.payments = data;
				$('#payment_list').html(html);
				$('#payment_list a.radio').click(function() {
					$('#payment_list a.radio').removeClass('current');
					$(this).addClass('current');
					OPPO.payment.save();
					return false;
				});
				OPPO.payment.edit();
			},
			function(no, msg) {
				OPPO.ui.alert({content: '获取支付方式失败，请重试'});
				$('#payment_area').hide();
				$('#payment_tips').show();
				$('#payment_selected').hide();
			}
		);
	},

	save : function() {
		var payment = $('#payment_list a.radio.current');
		if (payment.size() == 0) {
			$('#payment_select_tip').show();
			return;
		}
		$('#payment_select_tip').hide();
		var id = payment.attr('sid');
		var cfg = OPPO.payment.payments[id];

		if (cfg.type == 'cod') {
			$('#receipt_tips1').html(receipt_tips1_msg_cod);
		} else {
			$('#receipt_tips1').html(receipt_tips1_msg_online);
		}

		OPPO.payment.selected = cfg;
		$('#payment_area').hide();
		$('#payment_selected .content').text(cfg.name);
//		$('#payment_selected .content').text(cfg.name + "(手续费:"+cfg.payment_fee+"元)");
		$('#payment_selected').show();
		$('#payment_block i').removeClass('current');
		OPPO.order.updateFee();
		$('#invoice_title').focus();
	},

	edit : function() {
		if (!OPPO.payment.payments) return;
		$('#payment_block i').addClass('current');
		$('#payment_area').show();
		$('#payment_selected').hide();
		$('#payment_select_tip').hide();
	},

	reset: function() {
		$('#payment_block i').removeClass('current');
		OPPO.order.updateFee();
		OPPO.payment.slected = false;
		$('#payment_area').hide();
		$('#payment_tips').show();
		$('#payment_selected').hide();
		$('#payment_select_tip').hide();
	}
};

OPPO.invoice = {
	selected: false,

	edit : function() {
		//$('#invoice_block i').addClass('current');
		$('#invoice_selected').hide();
		if (OPPO.invoice.selected && OPPO.invoice.selected.type == 'vat') {
			$('#invoice_personal').hide();
			$('#invoice_vat').show();
			$('#open_invoice_vat').hide();
		} else {
			$('#invoice_personal').show();
			$('#invoice_title').focus();
			$('#invoice_vat').hide();
			$('#open_invoice_vat').show();
		}
		OPPO.invoice.selected = false;
	},

	savePersonal : function() {
		var title = $('#invoice_title').val();
		if (title == '' || title.length > 100) {
			$("#invoice_title_tip").show();
//			$("#invoice_title").focus();
			return false;
		}
		$("#invoice_title_tip").hide();
		$('#invoice_content').html("<li class='cl'><label>发票抬头：</label><span></span></li>");
		$('#invoice_content span').text(title);
		$('#invoice_selected').show();
		$('#invoice_personal').hide();
		$('#invoice_vat').hide();
		$('#open_invoice_vat').hide();
		OPPO.invoice.selected = {
			type: 'personal',
			title: title
		};
		//$('#invoice_block i').removeClass('current');
	},

	saveVAT : function() {
		var error = false;
		$('#invoice_vat .new_tips').hide();
		if ($("#vat_name").val() == '') {
			$("#vat_name_tip").show();
			error = true;
		}
		if ($("#vat_tax_no").val() == '') {
			$("#vat_tax_no_tip").show();
			error = true;
		}
		if ($("#vat_address").val() == '') {
			$("#vat_address_tip").show();
			error = true;
		}
		if ($("#vat_bank").val() == '') {
			$("#vat_bank_tip").show();
			error = true;
		}
		if ($("#vat_account").val() == '') {
			$("#vat_account_tip").show();
			error = true;
		}
		if (error) return;

		var html = "";
		html += "<li class='cl'><label>单位名称</label><span id='saved_vat_name'></span></li>";
		html += "<li class='cl'><label>纳税人识别号</label><span id='saved_vat_tax_no'></span></li>";
		html += "<li class='cl'><label>注册地址</label><span id='saved_vat_address'></span></li>";
		html += "<li class='cl'><label>开户银行</label><span id='saved_vat_bank'></span></li>";
		html += "<li class='cl'><label>银行账户</label><span id='saved_vat_account'></span></li>";
		$('#invoice_content').html(html);
		$('#saved_vat_name').text($("#vat_name").val());
		$('#saved_vat_tax_no').text($("#vat_tax_no").val());
		$('#saved_vat_address').text($("#vat_address").val());
		$('#saved_vat_bank').text($("#vat_bank").val());
		$('#saved_vat_account').text($("#vat_account").val());

		$('#invoice_selected').show();
		$('#invoice_personal').hide();
		$('#invoice_vat').hide();
		$('#open_invoice_vat').hide();
		OPPO.invoice.selected = {
			type: 'vat',
			name: $("#vat_name").val(),
			tax_no: $("#vat_tax_no").val(),
			address: $("#vat_address").val(),
			bank: $("#vat_bank").val(),
			account: $("#vat_account").val()
		};
		//$('#invoice_block i').removeClass('current');
	},

	switchTo : function(type) {
		if (type == 'vat') {
			$("#open_invoice_vat").hide();
			$("#invoice_vat").show();
			$("#invoice_personal").hide();
		} else {
			$("#open_invoice_vat").show();
			$("#invoice_vat").hide();
			$("#invoice_personal").show();
			$('#invoice_title').focus();
		}
	}
};

OPPO.newinvoice = {
	selected: false,

	edit : function() {
		//$('#invoice_block i').addClass('current');
		$('#invoice .modify').show();
		OPPO.invoice.selected = false;
                $('#invoiceCheck').attr('checked',false);
	},
        closeEdit:function(){
                $('#invoice .modify').hide();
                $('#invoiceCheck').attr('checked',true);
        },

	savePersonal : function() {
		var title = $('#invoice_title').val();
		if (title == '' || title.length > 100) {
			$("#invoice_title_tip").show();
//			$("#invoice_title").focus();
			return false;
		}
		$("#invoice_title_tip").hide();
		$('.invoice_title').text('（发票抬头：'+title+'）');
                OPPO.newinvoice.selected = {
			type: 'personal',
			title: title
		};
                $('#invoice .modify').hide();
                $('#invoiceCheck').attr('checked',true);
	}
};

OPPO.order = {
	order:false,

	updateFee : function() {
		var total = OPPO.order.order.goods_fee;

		if (OPPO.shipping.selected) {
			if(OPPO.freeshipping.is_free==1){
			  $('#freeshipping_fee').val(OPPO.shipping.selected.shipping_fee);
			  $('#fee_shipping').text('邮费:  ¥' + OPPO.shipping.selected.shipping_fee+'   优惠：'+OPPO.shipping.selected.shipping_fee);
			  //$('#fee_voucher').css({"display":"block"});
			 // $('#fee_voucher').html('优惠：'+OPPO.shipping.selected.shipping_fee);

			}else{
				//$('#fee_voucher').css({"display":"none"});

				$('#fee_shipping').text('邮费:  ¥' + OPPO.shipping.selected.shipping_fee);
			total += OPPO.shipping.selected.shipping_fee;
			}
			if(OPPO.peijian.is_peijian_discount==1){
				$('#fee_voucher').html('优惠：'+OPPO.peijian.peijian_fee);
				total -= OPPO.peijian.peijian_fee;
			}

		} else {
			$('#fee_shipping').text('邮费:  ¥0');
		}

		if (OPPO.payment.selected) {
			total +=parseFloat(OPPO.payment.selected.payment_fee);
			if ( OPPO.payment.selected.type == 'cod' ) {
				$('#fee_payment').show().text('支付手续费:  ¥' + OPPO.payment.selected.payment_fee);
			} else {
				$('#fee_payment').hide();
			}
		}
		if ($('#voucher_href_modify').css('display') == 'block') {
			total-=parseFloat($('#voucher_fee').val());
		}
		if ($('#g_discount').val() != '') {
			total-=parseFloat($('#g_discount').val());
		}
		if(total<0){
			total=0;
			}
		$('#fee_order').text('总计: ¥' +  total);
	},

	init : function() {
		$('.remark #comment').bind(
				'focus keydown keyup mouseup blur',
				function() {
					var text = $(this).val();
					var length = OPPO.util.strlen(text);
					if (length > 100) {
						var before = text.length;
						while(length > 100) {
							text = text.substring(0, text.length - 1);
							length = OPPO.util.strlen(text);
						}
						$('#comment_text_tips .tips').children('b').text(before - text.length);
						$('#comment_text_tips').css({visibility:'visible'});
					} else {
						$('#comment_text_tips').css({visibility:'hidden'});
					}
				}
			);
	},

	submit: function() {

		var error = false;
		var msg = '';



		if (!OPPO.address.selected) {
			error = true;
			msg = '"收货地址"';
		}
		if (!OPPO.shipping.selected || !OPPO.payment.selected) {
			if (error) msg += "，";
			msg += '"支付与配送"';
			error = true;
		}
		if (!OPPO.invoice.selected) {
			if (error) msg += "，";
			msg += '"发票信息"';
			error = true;
		}

		if (error) {
			$('#submit_tips span').text('请先保存' + msg);
			$('#submit_tips').show();
			return;
		}

//		if ( OPPO.util.strlen($("#comment").val()) > 100 ) {
//			$('#submit_tips span').text("备注不能超过100个字符");
//			$("#submit_tips").show();
//			return ;
//		}
        var user_address_id=$('#user_address_id').val();
		var order = {
			goods: OPPO.order.order.goods,
			goods_fee: OPPO.order.order.goods_fee,
			goods_weight: OPPO.order.order.goods_weight,
			user_address_id:user_address_id,

			shipping_receiver: OPPO.address.selected.receiver,
			shipping_provice: OPPO.address.selected.provice_id,
			shipping_city: OPPO.address.selected.city_id,
			shipping_district: OPPO.address.selected.district_id,
			shipping_address: OPPO.address.selected.address,
			shipping_postcode: OPPO.address.selected.postcode,
			shipping_email: OPPO.address.selected.email,
			shipping_phone: OPPO.address.selected.phone,
			shipping_phone_area_code: OPPO.address.selected.phone_area_code,
			shipping_phone_ext_code: OPPO.address.selected.phone_ext_code,
			shipping_mobile: OPPO.address.selected.mobile,

			shipping_id: OPPO.shipping.selected.shipping_id,
			shipping_fee: OPPO.shipping.selected.shipping_fee,
			shipping_realshop_id: OPPO.shipping.selected.realshop_id,

			payment_id: OPPO.payment.selected.payment_id,
			payment_fee: OPPO.payment.selected.payment_fee,

			receipt_type: OPPO.invoice.selected.type,
			receipt_title: OPPO.invoice.selected.title,
			receipt_vat_name: OPPO.invoice.selected.name,
			receipt_vat_tax_no: OPPO.invoice.selected.tax_no,
			receipt_vat_address: OPPO.invoice.selected.address,
			receipt_vat_bank: OPPO.invoice.selected.bank,
			receipt_vat_account: OPPO.invoice.selected.account,

			comment: $('#comment').val(),
			voucher:$('#voucher').val(),
			vname:$('#vname').val(),
			freeshipping:$('#freeshipping').val(),
			freeshipping_name:$('#freeshipping_name').val(),
			freeshipping_fee:$('#freeshipping_fee').val(),
			special_goods:$('#special_goods').val()
		};

		var submit_btn = $(".submit_order_btn");
		if ( submit_btn.attr('submitting') == '1' ) return false;
		submit_btn.attr('submitting', '1');
		A('order/create', order, function(url) {
			// add
			//ds_stat('jiesuan');
			//setTimeout(function() {
				submit_btn.attr('submitting', '0');
				location.href = url;
			//}, 1000);
		}, function(no, msg) {
			submit_btn.attr('submitting', '0');
			if (no == 1) {
				OPPO.ui.alert({content: msg});
			} else {
				OPPO.ui.alert({content: '创建订单失败，请重试'});
			}
		});
	},
	cancel : function(order_no) {
		A('user/cancelorder/' + order_no,
			{},
			function(data){
				window.location.reload();
			}, function(no, msg) {
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						window.location.reload();
					}
				});
			});
	},
	confirm : function(order_no) {

		A('user/confirmorder/' + order_no,
			{},
			function(data){
				window.location.reload();
			}, function(no, msg) {
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						window.location.reload();
					}
				});
			});
	},

	checkpay : function(order_no, payment_code, payment_method, payment_bankcode) {
		var btn = $("#payment_submit_btn");
		if ( btn.attr('submitting') == '1' ) return ;
		btn.attr('submitting', '1');
		A('order/checkpay/' + order_no,
			{
				payment_code: payment_code,
				payment_method: payment_method,
				payment_bankcode: payment_bankcode
			},
			function(data) {
				btn.attr('submitting', '0');
				return true;
			},
			function(no, msg) {
				btn.attr('submitting', '0');
				OPPO.ui.alert({content: msg});
				return false;
			}

		);
		$("#submit_form_btn").click();
	}
};
OPPO.neworder = {
	order:false,

	updateFee : function() {
		var total = OPPO.neworder.order.goods_fee;

		if (OPPO.passpay.selected) {

                        $('#fee_shipping').text(OPPO.passpay.selected.shipping_fee);
                        total += OPPO.passpay.selected.shipping_fee;

		} else {
			$('#fee_shipping').text(0);
		}

		if (OPPO.passpay.selected) {
			total +=parseFloat(OPPO.passpay.selected.payment_fee);
			if ( OPPO.passpay.selected.payment_fee > 0 ) {
				$('#fee_payment').text(OPPO.passpay.selected.payment_fee);
			}else{
                                $('#fee_payment').text(0);
                        }
		}
		if ($('#vouvher_id .success').css('display') == 'block') {
			total=parseFloat(total)*100-parseFloat($('#voucher_fee').val())*100;
			total=total/100;
		}
		if ($('#g_discount').val() != '') {
			total=parseFloat(total)*100-parseFloat($('#g_discount').val())*100;
			total=total/100;
		}
		if(total<0){
			total=0;
			}
		$('#fee_order').text(total);
	},

	init : function() {
		$('.remark #comment').bind(
				'focus keydown keyup mouseup blur',
				function() {
					var text = $(this).val();
					var length = OPPO.util.strlen(text);
					if (length > 100) {
						var before = text.length;
						while(length > 100) {
							text = text.substring(0, text.length - 1);
							length = OPPO.util.strlen(text);
						}
						$('#comment_text_tips .tips').children('b').text(before - text.length);
						$('#comment_text_tips').css({visibility:'visible'});
					} else {
						$('#comment_text_tips').css({visibility:'hidden'});
					}
				}
			);
	},

	submit: function() {

		var error = false;
		var msg = '';



		if (!OPPO.newaddress.selected) {
			error = true;
			msg = '"收货地址"';
		}
		if (!OPPO.passpay.selected) {
			if (error) msg += "，";
			msg += '"支付与配送"';
			error = true;
		}
		if (!OPPO.newinvoice.selected) {
			if (error) msg += "，";
			msg += '"发票信息"';
			error = true;
		}

		if (error) {
			$('#submit_tips').html('<font color="red">请先保存' + msg + '</font>');
			$('.commit .gBtn').val('提交订单').attr('onclick', 'OPPO.neworder.submit();return false;');
			return;
		}

//		if ( OPPO.util.strlen($("#comment").val()) > 100 ) {
//			$('#submit_tips span').text("备注不能超过100个字符");
//			$("#submit_tips").show();
//			return ;
//		}

		$('.commit .gBtn').val('正在提交...').attr('onclick', '');
        var user_address_id=$('#user_address_id').val();
		var order = {
			goods: OPPO.neworder.order.goods,
			goods_fee: OPPO.neworder.order.goods_fee,
			goods_weight: OPPO.neworder.order.goods_weight,
			user_address_id:user_address_id,

			shipping_receiver: OPPO.newaddress.selected.receiver,
			shipping_provice: OPPO.newaddress.selected.provice_id,
			shipping_city: OPPO.newaddress.selected.city_id,
			shipping_district: OPPO.newaddress.selected.district_id,
			shipping_address: OPPO.newaddress.selected.address,
			shipping_postcode: OPPO.newaddress.selected.postcode,
			shipping_email: OPPO.newaddress.selected.email,
			shipping_phone: OPPO.newaddress.selected.phone,
			shipping_phone_area_code: OPPO.newaddress.selected.phone_area_code,
			shipping_phone_ext_code: OPPO.newaddress.selected.phone_ext_code,
			shipping_mobile: OPPO.newaddress.selected.mobile,

			shipping_id: OPPO.passpay.selected.shipping_id,
			shipping_fee: OPPO.passpay.selected.shipping_fee,
			shipping_realshop_id: OPPO.passpay.selected.realshop_id,

			payment_id: OPPO.passpay.selected.payment_id,
			payment_fee: OPPO.passpay.selected.payment_fee,

			receipt_type: OPPO.newinvoice.selected.type,
			receipt_title: OPPO.newinvoice.selected.title,
			receipt_vat_name: OPPO.newinvoice.selected.name,
			receipt_vat_tax_no: OPPO.newinvoice.selected.tax_no,
			receipt_vat_address: OPPO.newinvoice.selected.address,
			receipt_vat_bank: OPPO.newinvoice.selected.bank,
			receipt_vat_account: OPPO.newinvoice.selected.account,

			comment: $('#comment').val(),
			voucher:$('#voucher').val(),
			vname:$('#vname').val()
		};

		var submit_btn = $(".submit_order_btn");
		if ( submit_btn.attr('submitting') == '1' ) return false;
		submit_btn.attr('submitting', '1');
		A('order/create', order, function(url) {
			// add
			//ds_stat('jiesuan');
			//setTimeout(function() {

				submit_btn.attr('submitting', '0');
				location.href = url;
			//}, 1000);
		}, function(no, msg) {
			submit_btn.attr('submitting', '0');
			if (no == 1) {
				OPPO.ui.alert({content: msg});
			} else {
				OPPO.ui.alert({content: '创建订单失败，请重试'});
			}
			$('.commit .gBtn').val('提交订单').attr('onclick', 'OPPO.neworder.submit();return false;');
		});
	},
	cancel : function(order_no) {
		A('user/cancelorder/' + order_no,
			{},
			function(data){
				window.location.reload();
			}, function(no, msg) {
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						window.location.reload();
					}
				});
			});
	},
	confirm : function(order_no) {

		A('user/confirmorder/' + order_no,
			{},
			function(data){
				window.location.reload();
			}, function(no, msg) {
				OPPO.ui.alert({
					content: msg,
					callback: function() {
						window.location.reload();
					}
				});
			});
	},

	checkpay : function(order_no, payment_code, payment_method, payment_bankcode) {
		var btn = $("#payment_submit_btn");
		if ( btn.attr('submitting') == '1' ) return ;
		btn.attr('submitting', '1');
		A('order/checkpay/' + order_no,
			{
				payment_code: payment_code,
				payment_method: payment_method,
				payment_bankcode: payment_bankcode
			},
			function(data) {
				btn.attr('submitting', '0');
				return true;
			},
			function(no, msg) {
				btn.attr('submitting', '0');
				OPPO.ui.alert({content: msg});
				return false;
			}

		);
		$("#submit_form_btn").click();
	}
};

OPPO.order.returnrequest = {
	request:false,

	init : function(provice_id, city_id, district_id) {
		OPPO.region.city_dest = city_id;
		OPPO.region.district_dest = district_id;
		$("#shipping_provice").val(provice_id);
		$("#shipping_provice").change();
		$("#shipping_city").val(city_id);
		$("#shipping_city").change();
		$("#shipping_district").val(district_id);
		$("#request_edit_info_btn").show();
	},

	submit: function() {
		if( !check_request_form() ) return false;

		var request = {};
		$('.input_shipping').each(function() {
			request[$(this).attr('id')] = $(this).val();
		});

		request.order_goods_idx = OPPO.order.returnrequest.request.order_goods_idx;
		request.order_no = OPPO.order.returnrequest.request.order_no;

		A('user/return/create', request, function(url) {
			location.href = url;
		}, function(no, msg) {
			OPPO.ui.alert({content:msg});
		});
	},

	editinfo: function() {
		$('#request_default_address').hide();
		$('#request_edit_address').show();
		$("#request_edit_info_btn").hide();

	},
	saveinfo: function() {
		if( !check_request_form() ) return false;
		if ( $("#refund_bank_account").length > 0 ) { //vod
			var refund_bank_account =  $('#display_refund_bank_account').attr('name') + $("#refund_bank_account").val();
			//var format_refund_bank_account = '';
			//if( refund_bank_account != '' ) {
				//var start = 0, size = 4;
				//while( start < refund_bank_account.length ) {
				//	format_refund_bank_account += refund_bank_account.substr(start, size) + ' ';
				//	start += size;
				//}
			//}
			$('#display_refund_bank_account').text( refund_bank_account);
			$('#display_refund_bank_username').text( $('#display_refund_bank_username').attr('name') +			$("#refund_bank_username").val() );
			$('#display_refund_bank_name').text($('#display_refund_bank_name').attr('name') +	$('#refund_bank_name').val());
			$('#display_refund_bank_address').text($('#display_refund_bank_address').attr('name') +	$("#refund_bank_province").find("option:selected").text()+$('#refund_bank_city').find("option:selected").text());
			$('#display_refund_bank_info').text($('#display_refund_bank_info').attr('name') +	$('#refund_bank_info').val());
			$('#display_refund_contact_user').text($('#display_refund_contact_user').attr('name') +	 $('#refund_contact_user').val());
			$('#display_refund_contact_tel').text($('#display_refund_contact_tel').attr('name') +	$('#refund_contact_tel').val());
		}
		else{ //online
			var shipping_provice = $("#shipping_provice option:selected").text();
		    var shipping_city = $("#shipping_city option:selected").text();
		    var shipping_district = $("#shipping_district option:selected").text();
		    var shipping_address = $("#shipping_address").val();


		   $('#display_address').text( $('#display_address').attr('name') +  shipping_provice + shipping_city + shipping_district + shipping_address );
		   $('#display_receiver').text( $('#display_receiver').attr('name') + $("#shipping_receiver").val() );

		   var phone = '';
		   if ( $("#shipping_mobile").val() != '' ) {
			phone += $("#shipping_mobile").val() + '(手机) ';
		   }
		   if ( $("#shipping_phone").val() != '' ) {
			phone += $("#shipping_phone_area_code").val() + '-' + $("#shipping_phone").val() ;
			if ( $("#shipping_phone_ext_code").val() != ''  ) {
				phone += '-' + $("#shipping_phone_ext_code").val();
			}
			phone += '(座机)';
		}

		   $('#display_phone').text( $('#display_phone').attr('name') + phone );
		   $('#display_postcode').text( $('#display_postcode').attr('name') + $("#shipping_postcode").val());
		   $('#display_email').text( $('#display_email').attr('name') + $("#shipping_email").val() );

			}

		   $('#request_default_address').show();
		   $('#request_edit_address').hide();
		   $("#request_edit_info_btn").show();
	   }
};
OPPO.voucher = {
		error_num : 0,
		use:function(voucherid,vname) {
			var code = $(voucherid).val();
			$('#voucher_err > span').text('');
			$('#voucher_err > span').css({"display":"none"});
			A('voucher/use', {'code': code,'error_num':this.error_num,'vname':vname},
				function(data) {
					$('#voucher_err > span').css({"display":"none"});
					$('#voucher_err > em').css({"display":"none"});
					$(voucherid).attr('readonly', 'readonly');
					$('#fee_voucher').css({"display":"inline"});
					$('#fee_voucher').text(data.fee);
					$('#huodong_title').css({"display":"inline"});
					$('#voucher_href_modify').css({"display":"block"});
					$('#voucher_href').css({"display":"none"});
					$('span.info').text(data.msg);
					$('#voucher_fee').val(data.fee);
					OPPO.order.updateFee();
				},
				function(no, msg) {
					OPPO.voucher.error_num++;
					$('#voucher_err > span').css({"display":"block"});
					$('#voucher_err > em').css({"display":"block"});
					$('#fee_voucher').css({"display":"none"});
					$('#fee_voucher').text('');
					$('#voucher_err > span').text(msg);
					$('#huodong_title').css({"display":"none"});
					$('#voucher_err > em').css({"visibility":"visible"});
			});
		},
		modify : function(voucherid) {
			$(voucherid).removeAttr('readonly');
			$('#voucher_href_modify').css({"display":"none"});
			$('#fee_voucher').css({"display":"none"});
			$('#fee_voucher').text('');
			$('#voucher').focus();
			OPPO.order.updateFee();
		},
		changefee : function(obj) {
			var code = $(obj).val();
			if (code == '' || code.length != 8) {
				$('#fee_voucher').css({"display":"none"});
				$('#fee_voucher').text('');
			}
		}
};

OPPO.newvoucher = {
		error_num : 0,
		use:function(voucherid,vname) {
			var code = $(voucherid).val();
			A('voucher/use', {'code': code,'error_num':this.error_num,'vname':vname},
				function(data) {
					$('#vouvher_id .errorBox').css({"display":"none"});
					$('#vouvher_id .success').css({"display":"block"}).find('.freeNum').text(code);
					var discount = $('#g_discount').val()?parseFloat($('#g_discount').val()):0;
					$('#fee_voucher').text(parseFloat(discount)+parseFloat(data.fee)); //+parseFloat($('#fee_voucher').text())
					$('#voucher_fee').val(data.fee);
					OPPO.neworder.updateFee();
				},
				function(no, msg) {
					OPPO.voucher.error_num++;
					$('#vouvher_id .errorBox').css({"display":"none"});
					$('#vouvher_id .wrong').html(msg || "您的优惠券<span class='freeNum'></span>有误");
					$('#vouvher_id .wrong').css({"display":"block"}).find('.freeNum').text(code);

					$('#fee_voucher').text('0');
					$('#voucher_fee').val(0);
					OPPO.neworder.updateFee();

			});
		},
		modify : function(voucherid) {
			$(voucherid).removeAttr('readonly');
			$('#voucher_href_modify').css({"display":"none"});
			$('#fee_voucher').css({"display":"none"});
			$('#fee_voucher').text('');
			$('#voucher').focus();
			OPPO.order.updateFee();
		},
		changefee : function(obj) {
			var code = $(obj).val();
			if (code == '' || code.length != 8) {
				$('#fee_voucher').css({"display":"none"});
				$('#fee_voucher').text('');
			}
		}
};
OPPO.freeshipping = {
		error_num : 0,
		is_free:0,
		use:function(freeshippingid,vname) {
			var code = $(freeshippingid).val();
			$('#freeshipping_err > span').text('');
			$('#freeshipping_err > span').css({"display":"none"});
			A('freeshipping/use', {'code': code,'error_num':this.error_num,'vname':vname},
				function(data) {
					$('#freeshipping_err > span').css({"display":"none"});
					$('#freeshipping_err > em').css({"display":"none"});
					$(freeshippingid).attr('readonly', 'readonly');
					$('#fee_shipping').css({"display":"inline"});
					$('#fee_shipping').text(OPPO.shipping.selected.shipping_fee);
					$('#huodong_title').css({"display":"inline"});
					$('#freeshipping_href_modify').css({"display":"block"});
					$('#freeshipping_href').css({"display":"none"});
					//$('span.info').text(data.msg);

				  //$('#freeshipping_fee').val(OPPO.shipping.selected.shipping_fee);
					OPPO.freeshipping.is_free=1;
					OPPO.order.updateFee();
				},
				function(no, msg) {
					OPPO.freeshipping.error_num++;
					$('#freeshipping_err > span').css({"display":"block"});
					$('#freeshipping_err > em').css({"display":"block"});
					$('#freeshipping_err').css({"display":"block"});
					$('#freeshipping_err > span').text(msg);
					$('#huodong_title').css({"display":"none"});
					$('#freeshipping_err > em').css({"visibility":"visible"});
					OPPO.freeshipping.is_free=0;
					OPPO.order.updateFee();
			});
		},
		modify : function(freeshippingid) {
			$(freeshippingid).removeAttr('readonly');
			$('#freeshipping_href_modify').css({"display":"none"});
			$('#freeshipping_href').css({"display":"block"});
			$('#fee_voucher').css({"display":"none"});
			$('#fee_voucher').text('');
			$('#freeshipping').focus();
			OPPO.freeshipping.is_free=0;
			OPPO.order.updateFee();
		},
		changefee : function(obj) {
			var code = $(obj).val();
			if (code == '' || code.length != 8) {
				$('#fee_shipping').css({"display":"none"});
				$('#fee_shipping').text('');
			}
		}
};
OPPO.peijian = {
		error_num : 0,
		is_peijian_discount:0,
		use:function(peijianid,vname) {
			var code = $(peijianid).val();
			$('#peijian_err > span').text('');
			$('#peijian_err > span').css({"display":"none"});
			A('peijian/use', {'code': code,'error_num':this.error_num,'vname':vname},
				function(data) {
					$('#peijian_err > span').css({"display":"none"});
					$('#peijian_err > em').css({"display":"none"});
					$(peijianid).attr('readonly', 'readonly');
					$('#fee_voucher').css({"display":"inline"});
					$('#fee_voucher').text(data.fee);
					$('#fee_voucher').show();
					$('#huodong_title').css({"display":"inline"});
					$('#peijian_href_modify').css({"display":"block"});
					$('#peijian_href').css({"display":"none"});
					$('peijian_tips').text(data.msg);
					$('#peijian_fee').val(data.fee);
					OPPO.peijian.peijian_fee=data.fee;
					OPPO.peijian.is_peijian_discount=1;

					OPPO.order.updateFee();
				},
				function(no, msg) {
					OPPO.voucher.error_num++;
					$('#peijian_err > span').css({"display":"block"});
					$('#peijian_err > em').css({"display":"block"});
					$('#fee_voucher').css({"display":"none"});
					$('#fee_voucher').text('');
					$('#peijian_err > span').text(msg);
					$('#huodong_title').css({"display":"none"});
					$('#peijian_err > em').css({"visibility":"visible"});
			});
		},
		modify : function(peijianid) {
			$(peijianid).removeAttr('readonly');
			$('#voucher_href_modify').css({"display":"none"});
			$('#fee_voucher').css({"display":"none"});
			$('#fee_voucher').text('');
			$('#voucher').focus();
			OPPO.order.updateFee();
		},
		changefee : function(obj) {
			var code = $(obj).val();
			if (code == '' || code.length != 8) {
				$('#fee_voucher').css({"display":"none"});
				$('#fee_voucher').text('');
			}
		}
};
OPPO.stat = {
	clickPay : function(order_no) {
		$.ajax({
			type:'get',
			url:'/stat/clickPay',
			data:{'order_no':order_no},
			success:function(data) {
				//do nothing
			}
		});
	}
};
OPPO.miaozhen = {
		btn_click : function(goods_id,btn_name,btn_num) {
			if (goods_id == 22) {
				CClicki._trackEvent({
				    type: 1,
				    labels: [
				    {"按钮名称":btn_name}    /*填入按钮名称*/
				    ],
				    values: [
				    {"点击次数":btn_num}
				    ]
				});
			}
		}
	};
OPPO.miaosha = {
		seconds:10,
		intervalObj:null,
		action:function() {
			$('.cl_button').hide();
			$('.cl_voucher').show();
		},
		actionSubmit:function() {
			var msError = $('.miaosha_error');
			msError.hide();
			msError.html('');

			$.ajax({
				'url':'/miaosha/action/'+$('#aid').val(),
				'data': {'vcode': $('#vcode').val(),'vname': $('#vname').val()},
				'type':'post',
				'dataType':'json',
				success:function(data) {
					if (data.no == 0) {
						window.location.href="/miaosha/index?token="+encodeURIComponent(data.data.token);
					} else if (data.no == 9) {
						window.location.href=data.msg;
					} else {
						msError.html(data.msg);
						msError.show();
					}
				},
				error:function() {
					curTips.html('秒杀已结束');
					curTipsParent.show();
				}
			});
		},
		create:function() {
			var error = false;
			var msg = '';

			if (!OPPO.address.selected) {
				error = true;
				msg = '"收货地址"';
			}
			if (error) {
				$('#submit_tips span').text('请先保存' + msg);
				$('#submit_tips').show();
				return;
			}
	        var user_address_id=$('#user_address_id').val();
			var order = {
				token: OPPO.miaosha.token,
				shipping_receiver: OPPO.address.selected.receiver,
				shipping_provice: OPPO.address.selected.provice_id,
				shipping_city: OPPO.address.selected.city_id,
				shipping_district: OPPO.address.selected.district_id,
				shipping_address: OPPO.address.selected.address,
				shipping_postcode: OPPO.address.selected.postcode,
				shipping_email: OPPO.address.selected.email,
				shipping_mobile: OPPO.address.selected.mobile
			};


			var submit_btn = $(".submit_order_btn");
			if ( submit_btn.attr('submitting') == '1' ) return false;
			submit_btn.attr('submitting', '1');
			$.ajax({
				'url':'/miaosha/create',
				'data': order,
				'type':'post',
				'dataType':'json',
				success:function(data) {
					if (data.no == 0) {
						submit_btn.attr('submitting', '0');
						location.href = data.data;
					} else {
						submit_btn.attr('submitting', '0');
						if (data.no == 1) {
							OPPO.ui.alert({content: data.msg});
						} else {
							OPPO.ui.alert({content: '创建订单失败，请重试'});
						}
					}
				},
				error:function() {
					OPPO.ui.alert({content: '创建订单失败，请重试'});
				}
			});
		},
		countdown:function(s) {
			OPPO.miaosha.seconds = s;
			if (OPPO.miaosha.intervalObj != null) {
				clearInterval(OPPO.miaosha.intervalObj);
			}
			$('#countdown').html(formatSeconds(OPPO.miaosha.seconds));
			OPPO.miaosha.intervalObj = setInterval(function(){
				if((--OPPO.miaosha.seconds)>0) {
					$('#countdown').html(formatSeconds(OPPO.miaosha.seconds));
				} else {
					if (OPPO.miaosha.intervalObj != null) {
						$('.cl_button').html('<a class="miaosha_btn" href="javascript:void(0)" onclick="OPPO.miaosha.action();return false;"></a>');
						clearInterval(OPPO.miaosha.intervalObj);
						$('.cl_wenzi').parent().remove();
					}
					if (timeInterval != null) {
						clearInterval(timeInterval);
					}
				}
			},1000);
		}
};
OPPO.lottery = {
		create:function() {
			var error = false;
			var msg = '';

			if (!OPPO.address.selected) {
				error = true;
				msg = '"收货地址"';
			}
			if (error) {
				$('#submit_tips span').text('请先保存' + msg);
				$('#submit_tips').show();
				return;
			}
	        var user_address_id=$('#user_address_id').val();
			var order = {
				token: OPPO.lottery.token,
				shipping_receiver: OPPO.address.selected.receiver,
				shipping_provice: OPPO.address.selected.provice_id,
				shipping_city: OPPO.address.selected.city_id,
				shipping_district: OPPO.address.selected.district_id,
				shipping_address: OPPO.address.selected.address,
				shipping_postcode: OPPO.address.selected.postcode,
				shipping_email: OPPO.address.selected.email,
				shipping_mobile: OPPO.address.selected.mobile
			};


			var submit_btn = $(".submit_order_btn");
			if ( submit_btn.attr('submitting') == '1' ) return false;
			submit_btn.attr('submitting', '1');
			$.ajax({
				'url':'/lottery/create',
				'data': order,
				'type':'post',
				'dataType':'json',
				success:function(data) {
					if (data.no == 0) {
						submit_btn.attr('submitting', '0');
						location.href = data.data;
					} else {
						submit_btn.attr('submitting', '0');
						if (data.no == 1) {
							OPPO.ui.alert({content: data.msg});
						} else {
							OPPO.ui.alert({content: '创建订单失败，请重试'});
						}
					}
				},
				error:function() {
					OPPO.ui.alert({content: '创建订单失败，请重试'});
				}
			});
		}
};

OPPO.recommond = {
    init:function(){
        $('#goodsPackage li').bind('click',function(){
            $('#goodsPackage li').removeClass('active');
            $(this).addClass('active');
            $('.group_box').css('display','none');
            $('.group_box:eq('+ parseInt($(this).index()) +')').css('display','block');
        });
    }
};
var attachment_cnt = 0;
OPPO.feedback = {
	getlist:function() {
		var isfull = 1;
		if ($('#span_chakan_icon').attr('class') == 'shousuo') {
			isfull = 0;
		}
		A('/help/feedback/getlist', {isfull:isfull},
				function(data) {
					var html = '';
					$(data.items).each(function() {
						if (this.status=2 && this.reply != null && this.reply !='') {
							html+='<div class="cl_feedback_da">';
							html+='<div class="cl_title"></div>';
							html+='<div class="cl_jianjiao"></div>';
							html+='<div class="cl_content" style="width:'+this.da_width+'px">';
							html+='<div class="cl_clear"><span></span></div>';
							html+='<div class="top">';
							html+='<span class="left"></span>';
							html+='<span class="center" style="width:'+(this.da_width-12)+'px"></span>';
							html+='<span class="right"></span>';
							html+='</div>';
							html+='<div class="middle" style="width:'+(this.da_width-2)+'px">';
							html+='<span>'+this.reply;
							if (this.detail_url != '') {
								html+='<a target="_blank" style="color:#56A626;padding-left:5px" href="'+this.detail_url+'">查看详情</a>';
							}
							html+='</span>';


							html+='</div>';
							html+='<div class="bottom">';
							html+='<span class="left"></span>';
							html+='<span class="center" style="width:'+(this.da_width-12)+'px"></span>';
							html+='<span class="right"></span>';
							html+='</div>';
							html+='<div><span class="cl_time">'+new Date(this.processing_end*1000).format('yyyy-MM-dd hh:mm:ss')+'</span></div>';
							html+='</div></div><div style="clear:both"></div>';
						}

						html+='<div class="cl_feedback_wen">';
						html+='<div class="cl_title"></div>';
						html+='<div class="cl_jianjiao"></div>';
						html+='<div class="cl_content" style="width:'+this.wen_width+'px">';
						html+='<div class="cl_clear"><span></span></div>';
						html+='<div class="top">';
						html+='<span class="left"></span>';
						html+='<span class="center" style="width:'+(this.wen_width-12)+'px"></span>';
						html+='<span class="right"></span>';
						html+='</div>';
						html+='<div class="middle" style="width:'+(this.wen_width-2)+'px">';
						html+='<span>'+this.wen_content+'</span>';
						if (this.img_list != undefined && this.img_list != null ) {
							$(this.img_list).each(function(idx) {
								html+='<a href="javascript:void(0)" onclick="OPPO.feedback.download('+this.fid+","+(++idx)+');">';
								html+='<em></em><span>(附件'+idx+')</span></a>';
							});
						}
						html+='</div>';
						html+='<div class="bottom">';
						html+='<span class="left"></span>';
						html+='<span class="center" style="width:'+(this.wen_width-12)+'px"></span>';
						html+='<span class="right"></span>';
						html+='</div>';
						html+='<div><span class="cl_time">'+new Date(this.insert_time*1000).format('yyyy-MM-dd hh:mm:ss')+'</span></div>';
						html+='</div></div><div style="clear:both"></div>';
					});


					$('#liuyan_list').html(html);

					if (isfull) {
						$('#span_chakan_text').html('关闭留言');
						$('#span_chakan_icon').removeClass('more');
						$('#span_chakan_icon').addClass('shousuo');
					} else {
						$('#span_chakan_text').html('查看全部');
						$('#span_chakan_icon').removeClass('shousuo');
						$('#span_chakan_icon').addClass('more');
					}

				},
				function(no, msg) {
					OPPO.ui.alert({
						content: msg,
						callback: function() {
						}
					});
					return false;
				}
			);
	},
	download:function(fid,idx) {
		$('#fid').val(fid);
		$('#idx').val(idx);
		$('form').submit();
	},
	submit:function() {
		var content = $('#feedback_content').val();
		if ($('#feedback_content').attr('editable') != 1 || content == '') {
			$('#tip_message').css({'color':'#F29A00'});
			$('#tip_message').html('反馈内容为必填项！');
			$('#feedback_content').focus();
			return false;
		}

		var img_urls = '';
		$('#files a').each(function() {
			if ($(this).attr('img_id') != '') {
				img_urls+='"';
				img_urls+=$(this).attr('img_id');
				img_urls+='",';
			}
		});
		img_urls=img_urls.substr(0,img_urls.length-1);
		if (img_urls != '') {
			img_urls='['+img_urls+']';
		}
		$('#tip_message').html('');
		A('/help/feedback/create', {'mobile':$('#feedback_mobile').val().alltrim(),
			'content':content,'img_urls':img_urls},
				function(data) {
					$('#tip_message').css({'color':'#78b156'});
					$('#tip_message').html('提交成功！我们将尽快给您回复！');
					$('#files').html('');
					$('#feedback_mobile').val('');
					$('#feedback_content').val('');
					$('#feedback_mobile').trigger('blur');
					$('#feedback_content').trigger('blur');
					$('#continue_add').html('添加图片');
					attachment_cnt=0;

					OPPO.feedback.getlist();
				},
				function(no, msg) {
					$('#tip_message').css({'color':'#F29A00'});
					$('#tip_message').html(msg);
				}
			);
		return false;
	},
	del_tmp:function(img_id) {
		$.ajax({
			type:'get',
			url:'/help/feedback/del_tmp',
			data:{'img_id':img_id},
			success:function(data) {
				//do nothing
			}
		});
	},
	addImg:function() {
		if (attachment_cnt >= 5) {
			OPPO.ui.alert({
				content: '图片张数不能多余5张',
				callback: function() {

				}
			});
			return false;
		}
		$('#continue_add').html('继续添加');
		var html='';
		html+='<div class="file">';
		html+='<span class="cl_span1">&nbsp;</span>';
		html+='<span class="cl_span2">&nbsp;</span>';
		html+='<span class="cl_span3 padding_left">';
		html+='<em></em>';
		html+='<span><span id="fileupload_'+attachment_cnt+'_info"></span><b id="fileupload_'+attachment_cnt+'_loading" class="loading"></b></span>';
		html+='<input type="file" id="fileupload_'+attachment_cnt+'" name="fileupload_'+attachment_cnt+'" onchange="OPPO.feedback.upload(this);"/>';
		html+='<a href="javascript:void(0);" id="fileupload_'+attachment_cnt+'_del" img_id="">删除</a>';
		html+='<span id="fileupload_'+attachment_cnt+'_upload_message" style="padding-left:5px;color:#F29A00"></span>';
		html+='</span>';
		html+='</div><div style="clear:both"></div>';
		$('#files').append(html);


		$('#fileupload_'+attachment_cnt+'_del').click(function() {
			if ($(this).attr('img_id') != '') {
				OPPO.feedback.del_tmp($(this).attr('img_id'));
			}
			$(this).parent().parent().remove();
			attachment_cnt--;
			if (attachment_cnt==0) {
				$('#continue_add').html('添加图片');
			}
			return false;
		});

		attachment_cnt++;
	},
	upload:function(obj) {
		$('#continue_add').html('继续添加');
		$(".loading",obj)
		.ajaxStart(function(){
			$(this).show();
		})
		.ajaxComplete(function(){
			$(this).hide();
		});
		var oldId = '#'+$(obj).attr('id');
		$(oldId+'_info').html('');
		$.ajaxFileUpload
		(
			{
				url:'/help/feedback/uploadfile',
				secureuri:false,
				fileElementId:$(obj).attr('id'),
				dataType: 'json',
				data:{},
				success: function (data, status)
				{
					if(data.no != 0) {
						$(oldId+'_upload_message').css({'visibility':'visible'});
						$(oldId+'_upload_message').html(data.msg);
					} else {
						$(oldId+'_upload_message').css({'visibility':'hidden'});
						$(oldId+'_info').html(data.data.name+"<b style='padding-left:5px;'>("+data.data.size+data.data.danwei+")</b>");
						$(oldId).hide();
						$(oldId+'_del').attr('img_id', data.data.tmp_name);
					}
				},
				error: function (data, status, e)
				{
					$(oldId+'_upload_message').css({'visibility':'visible'});
				}
			}
		)
	}
};
OPPO.help={
		init:function() {
			var inputObj = $('#condition');
			if (inputObj.val() == '') {
				inputObj.inputTipText({text:'例如：订单',color:'#848484'});
			} else  {
				inputObj.attr('editable','1');
				$('#btn_search').css({'background-position':'-20px'});
			}

			inputObj.bind('keydown', function (e) {
	            var key = e.which;
	            if (key == 13) {
	            	if ($(this).val() != '') {
	            		$(this).attr('editable','1')
	            		OPPO.help.search.submit('condition');
	            	}
	            }
	        });

			var bottomInputObj = $('#bottom_condition');
			if (bottomInputObj) {
				if (bottomInputObj.val() == '') {
					bottomInputObj.inputTipText({text:'例如：订单',color:'#848484'});
				} else  {
					bottomInputObj.attr('editable','1');
					$('#btn_search').css({'background-position':'-20px'});
				}

				bottomInputObj.bind('keydown', function (e) {
		            var key = e.which;
		            if (key == 13) {
		            	if ($(this).val() != '') {
		            		$(this).attr('editable','1')
		            		OPPO.help.search.submit('bottom_condition');
		            	}
		            }
		        });
			}

		}
};
OPPO.help.search={
		submit:function(id) {
			if ($('#'+id).attr('editable') == '1') {
				var condition = encodeURIComponent($('#'+id).val());
				$.ajax({
					type:'get',
					url:'/help/search/save',
					dataType: 'json',
					data:{'condition':condition},
					success:function(data) {
						if (data.no == 0) {
							window.location='/help/search?condition='+condition;
						}
					}
				});
			} else {
				window.location='/help/search';
			}
			return false;
		},
		init:function() {
			$('.cl_search_condition_tishi a').click(function(){
				if($(this).attr('class')=='current'){
					$(this).removeClass('current');
				}else{
					$(this).addClass('current');
				}
				return false;
			});
			var inputObj = $('#condition');
			inputObj.focus(function() {
				$('#btn_search').css({'background-position':'-20px'});
			}).blur(function(){
				$('#btn_search').css({'background-position':'0px'});
			});
			inputObj.autocomplete({
				url:'/help/search/auto',
				divid:'autocomplete',
				flagid:'tipmessage_flag'
		    });

			$('#btn_search').hover(function(){
				$(this).css({'background-position':'-20px'});
			},function() {
				$(this).css({'background-position':'0px'});
			}).mousedown(function(){
				$(this).css({'background-position':'-40px'});
			}).mouseup(function(){
				$(this).css({'background-position':'-20px'});
			}).click(function() {
				OPPO.help.search.submit('condition');
			});

			var bottomInputObj = $('#condition');

			$('.cl_search_contact_online a').click(OPPO.share.chat);

			if (inputObj.attr('editable') == '1') {
				$('.cl_wen span').highlight(inputObj.val());
			}
		}
};
OPPO.help.imei={
		init:function() {
			$('#href_online').click(OPPO.share.chat);
			$('#imei').inputTipText({text:'15位的数字串',color:'#4E4F51',default_color:'#c0c0c0'});
			$('#query_btn').click(OPPO.help.imei.submit);
		},
		submit:function() {
			var obj = $('#imei');
			obj.val(obj.val().alltrim());
			if (!is_num(obj.val()) || obj.val().length != 15) {
				OPPO.ui.alert({
					content: 'IMEI号格式不正确！',
					callback: function() {
						obj.focus();
					}
				});
				return false;
			}

			$.ajax({
				type:'get',
				url:'/help/imei/query',
				data:{'imei':obj.val()},
				dataType:'json',
				success:function(data) {
					if (data.no == 0) {
						var html = '';
						html+='<div class="cl_image">';
						html+='<img src="'+data.data.img_url+'" alt="'+data.data.model+'"/>';
						html+='</div>';
						html+='<div class="cl_results">';
						html+='<ul>';
						html+='<li><label>手机型号：</label><span>'+data.data.model+'</span></li>';
						html+='<li><label>购买平台：</label><span><a href="'+data.data.flat_url+'" target="_blank">'+data.data.flat+'</a></span></li>';
						html+='<li><label>购买时间：</label><span>'+data.data.paydate+'&nbsp;&nbsp;&nbsp;星期'+data.data.weekday+'</span></li>';
						html+='</ul>';
						html+='</div>';
						$('#result').html(html);
						$('#has_imei').slideDown();
						$('#no_imei').hide();
						OPPO.help.imei.query_serivce();
					} else {
						$('#has_imei').hide();
						$('#no_imei').slideDown();
					}
				},
				error:function(data){
					OPPO.ui.alert({
						content: "访问网络失败，请检查您的网络连接并重试",
						callback: function() {
							obj.focus();
							$('#has_imei').hide();
							$('#no_imei').slideDown();
						}
					});
				}
			});
		},
		query_serivce:function() {
			var province = remote_ip_info["province"];
			var city = remote_ip_info["city"];
			A('/help/getservice', {'area':province,'city':city,'type':'service'},
					function(data) {
						var html = '';
		        		html+='<div class="cl_imei_service">';
		        		html+='<div class="cl_header">';
		        		html+='<span><em></em>离您最近的售后服务中心</span>';
		        		html+='</div>';
		        		html+='<div class="cl_service_site">';
		        		$.each(data.results,function() {
			        		html+='<ul>';
			        		html+='<li>';
			        		html+='<span class="cl_split"><span class="cl_left">地</span><span class="cl_right">址：</span></span>';
			        		html+='<span>'+this.addr+'</span>';
			        		html+='</li><li>';
			        		html+='<span class="cl_split"><span class="cl_left">电</span><span class="cl_right">话：</span></span>';
			        		html+='<span>'+this.phone+'</span></li>';
			        		html+='<li><span class="cl_split">工作时间：</span><span>'+this.worktime+'</span></li>';
			        		html+='</ul>';
		        		});
		        		html+='</div></div>';
		        		$('#getservice').html(html);
					},
					function(no, msg) {

					}
				);
		}
};
OPPO.help.category={
	init:function() {
		$('dt.current').each(function() {
			$('dd:last', $(this).parent()).css({'border-bottom':'1px solid #e0e0e0'});
		});
	},
	click:function(obj) {
		var currentObj = $(obj);
		var parentObj = currentObj.parent();
		if (currentObj.attr('class') == 'current') {
			parentObj.removeClass('current');
			parentObj.css({'background-color':''});
			currentObj.removeClass('current');
			$('dt',parentObj.prev()).css({'border-bottom':'1px solid #e0e0e0'});
			$('dd', parentObj).hide();
			$('em', currentObj).css({'visibility':'visible'});
		} else {
			$('dd').hide();
			$('dt').each(function() {
				$(this).removeClass('current');
				$(this).parent().removeClass('current');
				$(this).parent().css({'background-color':''});
				$('em',this).css({'visibility':'visible'});
			})
			$('dt',parentObj.prev()).css({'border-bottom':'none'});
			parentObj.addClass('current');
			$('em', currentObj).css({'visibility':'hidden'});
			parentObj.css({'background-color':'#ffffff'});
			currentObj.addClass('current');
			$('dd', parentObj).css({'display':'inline-block'});
			$('dd:last', parentObj).css({'border-bottom':'1px solid #e0e0e0'});
		}
	}
};
OPPO.help.voucher={
		init:function() {
			$('#query_btn').click(OPPO.help.voucher.submit);
		},
		submit:function() {
			var obj = $('#phone');
			obj.val(obj.val().alltrim());
			if (!is_num(obj.val()) || obj.val().length != 14) {
				OPPO.ui.alert({
					content: '输入的订单号码格式不正确！',
					callback: function() {
						obj.focus();
					}
				});
				return false;
			}

			$.ajax({
				type:'post',
				url:'/help/lottery/query/7',
				data:{'content':obj.val(),'vname':'国庆优惠券'},
				dataType:'json',
				success:function(data) {
					if (data.no == 0) {
						$('#voucher').html(data.msg);
						$('#has_voucher').show();
						$('#no_voucher').hide();
					} else {
						$('#has_voucher').hide();
						$('#no_voucher').show();
					}
				},
				error:function(data){
					OPPO.ui.alert({
						content: "查询失败，请重试",
						callback: function() {
							obj.focus();
							$('#has_imei').hide();
							$('#no_imei').slideDown();
						}
					});
				}
			});
		}
	};

OPPO.banks = {
    init:function(){
        $('.tinfo').bind('click',function(){
            $('.tinfo').css('background','none');
            $(this).css('background-color','#fff');
            $('.banks').css('display','none');
            if($(this).hasClass('deposit')){
                $('#deposit').css('display','block');
            }else if($(this).hasClass('credit')){
                $('#credit').css('display','block');
            }else if($(this).hasClass('platform')){
                $('#platform').css('display','block');
            }
        });
    }
};

$(document).ready(function() {
	OPPO.region.init();
	OPPO.order.init();
	OPPO.address.init();
    OPPO.newaddress.init();
	OPPO.share.init();
	OPPO.lettering.init();
	OPPO.goods.init();
	OPPO.cart.init();
	OPPO.recommond.init();
	OPPO.banks.init();
	OPPO.help.init();
	//客服漂浮代码
	window.onscroll = function(){
		var t = document.documentElement.scrollTop || document.body.scrollTop;
		if( t >= 350 ) {
			$('.pendant').css("display","inline");
		} else {
			$('.pendant').css('display', 'none');
		}
	}
});

function ds_stat(which) {
	try {
		var which_arr = new Array();

		which_arr["reg"] = [1, 0, 0, 0, 0];
		which_arr["login"] = [0, 1, 0, 0, 0];
		which_arr["jiesuan"] = [0, 0, 1, 0, 0];
		which_arr["fukuan"] = [0, 0, 0, 1, 0];
		which_arr["money"] = [0, 0, 0, 0, 100];
	 	CClicki._trackMetrics(which_arr[which]);
	} catch(e) {

	}
}
function setAddressDisplay() {
	$('#tips_shipping_district').hide();
	$('#new_address #lblAreaName').text('');
	var address_txt='';
	if ($('#new_address #shipping_provice').val() != '') {
		var shipping_provice = $('#new_address #shipping_provice').find('option:selected');
		if (shipping_provice.val() != '') {
			address_txt+=shipping_provice.text();
		}
	}
	if ($('#new_address #shipping_city').val() != '') {
		var shipping_city = $('#new_address #shipping_city').find('option:selected');
		if (shipping_city.val() != '') {
			address_txt+=shipping_city.text();
		}
	}
	if ($('#new_address #shipping_district').val() != '') {
		var shipping_district = $('#new_address #shipping_district').find('option:selected');
		if (shipping_district.val() != '') {
			address_txt+=shipping_district.text();
		}
	}
	$('#new_address #lblAreaName').text(address_txt);
	$('#new_address #lblAreaName').css({'display':'inline-block'});
}
