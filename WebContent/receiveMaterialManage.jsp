<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>采购订单列表</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchReceiveOrder(){
	$('#dg').datagrid('load',{
		receiveOrderNumber:$('#receiveOrderNumber').val()
	});
}

function deleteReceiveOrder(){
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
			$.post("repertory/receiveOrder!delete",{delIds:ids},function(data){
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


function openReceiveOrderAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加采购订单");
	url="repertory/receiveOrder!save";
}

function openReceiveOrderModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑采购订单");
	$("#dlg_orderNumber").val(row.number);
	$("#dlg_rawmaterialnumber").val(row.rawmaterialnumber);
	$("#dlg_rawmaterialname").val(row.rawmaterialname);
	$("#dlg_singleprice").val(row.singleprice);
	$("#dlg_count").val(row.count);
	$('#dlg_buydate').datetimebox('setValue', row.buydate);
	$("#dlg_suppliernumber").val(row.suppliernumber);
	$("#dlg_totalprice").val(row.totalprice);
	$("#dlg_storenumber").val(row.storenumber);
	$("#dlg_placenumber").val(row.placenumber);
	$("#dlg_reviewstatus").val(row.reviewstatus);
	url="repertory/receiveOrder!save?receiveOrderId="+row.id;
}

function closeReceiveOrderDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_orderNumber").val("");
	$("#dlg_rawmaterialnumber").val("");
	$("#dlg_rawmaterialname").val("");
	$("#dlg_singleprice").val("");
	$("#dlg_count").val("");
	$("#dlg_buydate").val("");
	$("#dlg_suppliernumber").val("");
	$("#dlg_totalprice").val("");
	$("#dlg_storenumber").val("");
	$("#dlg_placenumber").val("");
	$("#dlg_reviewstatus").val("");
}


function saveReceiveOrder(){
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


function review(id) {
	// console.log(id)
	$.ajax({
		type:'get',
		url:'repertory/receiveOrder',
		data:{receiveOrderId:id},
		dataType:'json',
		success:function(data) {
			
		},
		error:function(data){
			
		}
	});
}

var formatReview = function(value,rawData,index) {
	if (rawData.reviewstatus == "未审核")　{
		return '<a href="#" onclick="review(' + rawData.id + ')" class="rw-btn">审核</a>';
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
<table id="dg" title="采购订单信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/receiveOrder" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
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
			<th data-options="field:'reviewstatus',width:200,align:'center',formatter:formatReview">审核状态</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >订单编码:</td>
				<td><input type="text" name="receiveOrder.number" id="dlg_orderNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>原材料编码:</td>
				<td><input type="text" name="receiveOrder.rawMaterialNumber" id="dlg_rawmaterialnumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>原材料名称:</td>
				<td><input type="text" name="receiveOrder.rawMaterialName" id="dlg_rawmaterialname" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>单价:</td>
				<td><input type="text" name="receiveOrder.singlePrice" id="dlg_singleprice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>数量:</td>
				<td><input type="text" name="receiveOrder.count" id="dlg_count" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>采购时间:</td>
				<td><input class="easyui-datetimebox" name="receiveOrder.buyDate" id="dlg_buydate" data-options="required:true" style="width:150px"></td>
			</tr>
			<tr>
				<td>供货商编码:</td>
				<td><input type="text" name="receiveOrder.supplierNumber" id="dlg_suppliernumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>总金额:</td>
				<td><input type="text" name="receiveOrder.totalPrice" id="dlg_totalprice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>仓库编码:</td>
				<td><input type="text" name="receiveOrder.storeNumber" id="dlg_storenumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>仓位编码:</td>
				<td><input type="text" name="receiveOrder.placeNumber" id="dlg_placenumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>审核状态:</td>
				<td>
				<select id="dlg_reviewstatus" class="easyui-combobox" name="receiveOrder.reviewStatus" style="width:200px;">
				    <option value="未审核">未审核</option>
				    <option>已审核</option>
			    </select>
				</td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveReceiveOrder()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeReceiveOrderDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openReceiveOrderAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openReceiveOrderModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteReceiveOrder()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		订单编码:<input type="text" name="receiveOrderNumber" id="receiveOrderNumber" /><a href="javascript:searchReceiveOrder()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>