<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>出库管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchSaleOrder(){
	$('#dg').datagrid('load',{
		saleOrderNumber:$('#saleOrderNumber').val()
	});
}

function deleteSaleOrder(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].id);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("repertory/saleOrder!delete",{delIds:ids},function(data){
				if(data.result == "success"){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+data.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示', '删除失败');
				}
			},"json");
		}
	});
}


function openSaleOrderAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加销售订单");
	url="repertory/saleOrder!save";
}

function openSaleOrderModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑销售订单");
	$("#dlg_orderNumber").val(row.number);
	$("#dlg_finishedmaterialnumber").val(row.finishedmaterialnumber);
	$("#dlg_finishedmaterialname").val(row.finishedmaterialname);
	$("#dlg_singleprice").val(row.singleprice);
	$("#dlg_count").val(row.count);
	$('#dlg_date').datetimebox('setValue', row.date);
	$("#dlg_customernumber").val(row.customernumber);
	$("#dlg_totalprice").val(row.totalprice);
	$("#dlg_storenumber").val(row.storenumber);
	$("#dlg_placenumber").val(row.placenumber);
	$("#dlg_reviewstatus").val(row.reviewstatus);
	url="repertory/saleOrder!save?saleOrderId="+row.id;
}

function closeSaleOrderDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_orderNumber").val("");
	$("#dlg_finishedmaterialnumber").val("");
	$("#dlg_finishedmaterialname").val("");
	$("#dlg_singleprice").val("");
	$("#dlg_count").val("");
	$("#dlg_date").val("");
	$("#dlg_customernumber").val("");
	$("#dlg_totalprice").val("");
	$("#dlg_storenumber").val("");
	$("#dlg_placenumber").val("");
	$("#dlg_reviewstatus").val("");
}


function saveSaleOrder(){
	$("#fm").form("submit",{
		url:url,
		onSubmit:function(){
			return $(this).form("validate");
		},
		success:function(data){
			data = JSON.parse(data)
			if(data.result != 'success'){
				$.messager.alert("系统提示",'保存失败');
				return;
			}else{
				$.messager.alert("系统提示","保存成功");
				resetValue();
				$("#dlg").dialog("close");
				$("#dg").datagrid("reload");
			}
		}
	});
}


function review(id, finishedmaterialnumber) {
	// console.log(id)
	$.ajax({
		type:'get',
		url:'repertory/saleOrder!review',
		data:{
			saleOrderId:id,
			finishedMaterialNumber:finishedmaterialnumber
		},
		dataType:'json',
		success:function(data) {
			// data = JSON.parse(data)
			if(data.result != 'success'){
				$.messager.alert("系统提示",'审核失败');
			}else{
				$.messager.alert("系统提示","审核成功");
				window.location.href = "reviewedFinishedMaterialList.jsp";
			}
		},
		error:function(data){
			$.messager.alert("系统提示","审核失败");
		}
	});
}

var formatReview = function(value,rawData,index) {
	if (rawData.reviewstatus == "未审核")　{
		return '<a href="#" onclick="review(\'' + rawData.id + '\', \''+rawData.finishedmaterialnumber +
			'\')" class="rw-btn">审核</a>';
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
<table id="dg" title="销售订单信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/saleOrder" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'number',width:50,align:'center'">订单编码</th>
			<th data-options="field:'finishedmaterialnumber',width:100,align:'center'">成品编码</th>
			<th data-options="field:'finishedmaterialname',width:100,align:'center'">成品名称</th>
			<th data-options="field:'singleprice',width:100,align:'center'">单价</th>
			<th data-options="field:'count',width:200,align:'center'">数量</th>
			<th data-options="field:'date',width:200,align:'center'">时间</th>
			<th data-options="field:'customernumber',width:200,align:'center'">客户编码</th>
			<th data-options="field:'totalprice',width:200,align:'center'">总金额</th>
			<th data-options="field:'storenumber',width:200,align:'center'">仓库编码</th>
			<th data-options="field:'placenumber',width:200,align:'center'">仓位编码</th>
			<th data-options="field:'reviewstatus',width:200,align:'center',formatter:formatReview">审核状态</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >订单编码:</td>
				<td><input type="text" name="saleOrder.number" id="dlg_orderNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>成品编码:</td>
				<td><input type="text" name="saleOrder.finishedMaterialNumber" id="dlg_rawmaterialnumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>成品名称:</td>
				<td><input type="text" name="saleOrder.finishedMaterialName" id="dlg_rawmaterialname" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>单价:</td>
				<td><input type="text" name="saleOrder.singlePrice" id="dlg_singleprice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>数量:</td>
				<td><input type="number" name="saleOrder.count" id="dlg_count" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>时间:</td>
				<td><input class="easyui-datetimebox" name="saleOrder.date" id="dlg_buydate" data-options="required:true" style="width:150px"></td>
			</tr>
			<tr>
				<td>客户编码:</td>
				<td><input type="text" name="saleOrder.customerNumber" id="dlg_suppliernumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>总金额:</td>
				<td><input type="text" name="saleOrder.totalPrice" id="dlg_totalprice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>仓库编码:</td>
				<td><input type="text" name="saleOrder.storeNumber" id="dlg_storenumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>仓位编码:</td>
				<td><input type="text" name="saleOrder.placeNumber" id="dlg_placenumber" class="easyui-validatebox" required="true"/></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveSaleOrder()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeSaleOrderDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openSaleOrderAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openSaleOrderModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteSaleOrder()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		订单编码:<input type="text" name="saleOrderNumber" id="saleOrderNumber" /><a href="javascript:searchSaleOrder()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>