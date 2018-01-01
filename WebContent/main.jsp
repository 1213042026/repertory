<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>
<%
	if(session.getAttribute("currentuser")==null){
		response.sendRedirect("login.jsp");
	}
%>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
	$("document").ready(function(){
		var treeDate=[{
			text:"库存管理",
			children:[{
				text:"供应商管理",
				attributes:{
					url:"customerManage.jsp"
				}
			},{
				text:"商品类别管理",
				attributes:{
					url:"mailtypeManage.jsp"
				}
			},{
				text:"商品管理",
				attributes:{
					url:"mailManage.jsp"
				}
			},{
				text:"商品入库管理",
				attributes:{
					url:"indbManage.jsp"
				}
			},{
				text:"商品库存管理",
				attributes:{
					url:"stockManage.jsp"
				}
			},{
				text:"商品出库管理",
				attributes:{
					url:"outdbManage.jsp"
				}
			}]
		}];
	$("#tree").tree({
		data:treeDate,
		lines:true,
		onClick:function(node){
			if(node.attributes){
				openTab(node.text,node.attributes.url);
			}
		}
	});
	//新增tab
	function openTab(text,url){
		var content="<iframe src="+url+" frameborder='0'scrolling='auto' style='width:100%;height:100%'></iframe>";
		if($("#tabs").tabs("exists",text)){
			$("#tabs").tabs("select",text);
		}else{
			$("#tabs").tabs("add",{
				title:text,
				closable:true,
				content:content
			});
		}
	}
	});
</script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:60px;background:#B3DFDA;padding:10px">
		欢迎您:<font color="red"><%=session.getAttribute("currentuser") %></font>
		<a href="kucunManage/login!loginOut">注销</a>
	</div>
	<div data-options="region:'west',split:true,title:'导航栏'" style="width:150px;padding:10px;"><ul id="tree" class="easyui-tree" data-options="animate:true"></ul></div>
	<div data-options="region:'south',border:false" style="height:50px;background:#A9FACD;padding:10px;">南部区域</div>
	<div data-options="region:'center'">
		<div class="easyui-tabs" data-options="fit:true,border:false" id="tabs">
			<div title="首页" style="padding: 10px">
				<div style="padding-top: 100px" align="center"><font color="red" size="20">欢迎使用</font></div>
			</div>
		</div>
	</div>
</body>
</html>