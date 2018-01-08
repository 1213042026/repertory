<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>领料管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">

function review(id) {
	$.ajax({
		type:'get',
		url:'repertory/receiveOrder!pick',
		data:{
			receiveOrderId:id
		},
		dataType:'json',
		success:function(data) {
			if(data.result != 'success'){
				$.messager.alert("系统提示",'领料失败');
			}else{
				$.messager.alert("系统提示","领料成功");
				$("#dg").datagrid("reload");
			}
		},
		error:function(data){
			$.messager.alert("系统提示","领料失败");
		}
	});
}

var formatReview = function(value,rawData,index) {
	if (rawData.ispick == "未领料")　{
		return '<a href="#" onclick="review(\'' + rawData.id + '\')" class="rw-btn">领料</a>';
	} else {
		return value;
	}
}

$(function() {
	$('#dg').datagrid({
		onLoadSuccess : function() {
			$(".rw-btn").linkbutton({
				iconCls: 'icon-ok'
			});
		}
	});
})
</script>
</head>
<body>
<table id="dg" title="所有领料单信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/receiveOrder!pickList" fit="true">
	<thead>
		<tr>
			<th data-options="field:'number',width:50,align:'center'">订单编码</th>
			<th data-options="field:'rawmaterialnumber',width:100,align:'center'">原材料编码</th>
			<th data-options="field:'rawmaterialname',width:100,align:'center'">原材料名称</th>
			<th data-options="field:'singleprice',width:100,align:'center'">单价</th>
			<th data-options="field:'count',width:200,align:'center'">数量</th>
			<th data-options="field:'buydate',width:200,align:'center'">采购时间</th>
			<th data-options="field:'suppliernumber',width:200,align:'center'">供货商编码</th>
			<th data-options="field:'totalprice',width:200,align:'center'">总金额</th>
			<th data-options="field:'storenumber',width:200,align:'center'">仓库编码</th>
			<th data-options="field:'placenumber',width:200,align:'center'">仓位编码</th>
			<th data-options="field:'ispick',width:200,align:'center',formatter:formatReview">领料</th>
		</tr>
	</thead>	
</table>
</body>
</html>