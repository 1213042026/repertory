<%@page import="com.ms.model.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>仓储管理系统</title>
<%
	if(session.getAttribute("currentuser")==null){
		response.sendRedirect("repertory/login!isLogin");
	}
%>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
	$("document").ready(function(){
		var rolename = "${rolename}"

		var treeDate = [];

		switch(rolename)
		{
			case '仓库主管':
			    treeDate = [
					{
						text:"仓库管理员",
						children:[{
							text:"员工信息管理",
							attributes:{
								url:"employeeManage.jsp"
							}
						},{
							text:"角色信息管理",
							attributes:{
								url:"roleManage.jsp"
							}
						},{
							text:"权限信息管理",
							attributes:{
								url:"permissionManage.jsp"
							}
						},{
							text:"角色权限管理",
							attributes:{
								url:"rolePermissionManage.jsp"
							}
						},{
							text:"仓库管理",
							attributes:{
								url:"storeManage.jsp"
							}
						},{
							text:"仓位管理",
							attributes:{
								url:"placeManage.jsp"
							}
						}]
					},
					{
						text:"原材料仓库",
						children:[{
							text:"原材料管理",
							attributes:{
								url:"rawMaterialManage.jsp"
							}
						},{
							text:"收料管理",
							attributes:{
								url:"receiveMaterialManage.jsp"
							}
						},{
							text:"领料管理",
							attributes:{
								url:"pickMaterialManage.jsp"
							}
						},{
							text:"库存盘点",
							attributes:{
								url:"rawInventoryCheckManage.jsp"
							}
						},{
							text:"供货商信息管理",
							attributes:{
								url:"supplierManage.jsp"
							}
						}]
					},
					{
						text:"成品材料仓库",
						children:[{
							text:"成品管理",
							attributes:{
								url:"finishedMaterialManage.jsp"
							}
						},{
							text:"入库管理",
							attributes:{
								url:"intoStorageManage.jsp"
							}
						},{
							text:"出库管理",
							attributes:{
								url:"outStorageManage.jsp"
							}
						},{
							text:"转储管理",
							attributes:{
								url:"dumpAllocationManage.jsp"
							}
						},{
							text:"库存盘点",
							attributes:{
								url:"finishedInventoryCheckManage.jsp"
							}
						},{
							text:"客户信息管理",
							attributes:{
								url:"customerManage.jsp"
							}
						}]
					},
					{
						text:"退出系统"
					}
				];
			  break;
			case '原材料仓库管理员':
			    treeDate = [
					{
						text:"原材料仓库",
						children:[{
							text:"原材料管理",
							attributes:{
								url:"rawMaterialManage.jsp"
							}
						},{
							text:"收料管理",
							attributes:{
								url:"receiveMaterialManage.jsp"
							}
						},{
							text:"领料管理",
							attributes:{
								url:"pickMaterialManage.jsp"
							}
						},{
							text:"库存盘点",
							attributes:{
								url:"rawInventoryCheckManage.jsp"
							}
						},{
							text:"供货商信息管理",
							attributes:{
								url:"supplierManage.jsp"
							}
						}]
					},
					{
						text:"退出系统"
					}
				];
			  break;
			case '成品仓库管理员':
			    treeDate = [
					{
						text:"成品材料仓库",
						children:[{
							text:"成品管理",
							attributes:{
								url:"finishedMaterialManage.jsp"
							}
						},{
							text:"入库管理",
							attributes:{
								url:"intoStorageManage.jsp"
							}
						},{
							text:"出库管理",
							attributes:{
								url:"outStorageManage.jsp"
							}
						},{
							text:"转储管理",
							attributes:{
								url:"dumpAllocationManage.jsp"
							}
						},{
							text:"库存盘点",
							attributes:{
								url:"finishedInventoryCheckManage.jsp"
							}
						},{
							text:"客户信息管理",
							attributes:{
								url:"customerManage.jsp"
							}
						}]
					},
					{
						text:"退出系统"
					}
				];
			  break;
			default:
			  treeDate = [{
			  	text: "无权限"
			  }]
		}

		$("#tree").tree({
			data:treeDate,
			lines:true,
			onClick:function(node){
				// console.log(node)
				if(node.attributes){
					openTab(node.text,node.attributes.url);
				} else {
					if (node.text == "退出系统") {
						window.location.href = "repertory/login!loginOut"
					}
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
	<div data-options="region:'north',border:false" style="height:60px;background:rgb(224, 236, 255);padding:10px">
		欢迎您:<font><%=(((User)session.getAttribute("currentuser")) == null ? "" : ((User)session.getAttribute("currentuser")).getUserName() )%></font>
	</div>
	<div data-options="region:'west',split:true,title:'导航栏'" style="width:150px;padding:10px;"><ul id="tree" class="easyui-tree" data-options="animate:true"></ul></div>
	<div data-options="region:'center'">
		<div class="easyui-tabs" data-options="fit:true,border:false" id="tabs">
			<div title="首页" style="padding: 10px">
				<div style="padding-top: 100px" align="center"><font color="grey" size="20">欢迎使用</font></div>
			</div>
		</div>
	</div>
</body>
</html>