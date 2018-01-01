<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>供应商管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchCustomer(){
	$('#dg').datagrid('load',{
		s_customerNumber:$('#s_customerNumber').val()
	});
}

function deleteCustomer(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].customerId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("kucunManage/customer!delete",{delIds:ids},function(result){
				if(result.success){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+result.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示','<font color=red>'+selectedRows[result.errorIndex].customerName+'</font>'+result.error);
				}
			},"json");
		}
	});
}


function openCustomerAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加供应商信息");
	url="kucunManage/customer!save";
}

function openCustomerModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑供应商信息");
	// $("#fm").form("load",row);
	$("#dlg_customerName").val(row.customerName);
	$("#dlg_Desc").val(row.customerDesc);
	$("#dlg_customerNumber").val(row.customerNumber);
	$("#dlg_linkman").val(row.linkman);
	$("#dlg_phone").val(row.phone);
	url="kucunManage/customer!save?customerId="+row.customerId;
}

function closeCustomerDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_customerNumber").val("");
	$("#dlg_customerName").val("");
	$("#dlg_linkman").val("");
	$("#dlg_phone").val("");
	$("#dlg_Desc").val("");
}


function saveCustomer(){
	$("#fm").form("submit",{
		url:url,
		onSubmit:function(){
			return $(this).form("validate");
		},
		success:function(result){
			if(result.errorMsg){
				$.messager.alert("系统提示",result.errorMsg);
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
function exportUser(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要导出的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].customerId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要导出这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			window.open('kucunManage/customer!export?exportIds='+ids);
		}
	});
}
</script>
</head>
<body>
<table id="dg" title="供应商信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="kucunManage/customer" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'customerId',width:50,align:'center'">编号</th>
			<th data-options="field:'customerNumber',width:100,align:'center'">供应商编码</th>
			<th data-options="field:'customerName',width:100,align:'center'">供应商名称</th>
			<th data-options="field:'linkman',width:100,align:'center'">联系人</th>
			<th data-options="field:'phone',width:200,align:'center'">联系电话</th>
			<th data-options="field:'customerDesc',width:400,align:'center'">备注</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >供应商编码:</td>
				<td><input type="text" name="customer.customerNumber" id="dlg_customerNumber" class="easyui-validatebox" required="true"/></td>
				<td>供应商名称:</td>
				<td><input type="text" name="customer.customerName" id="dlg_customerName" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>联系人:</td>
				<td><input type="text" name="customer.linkman" id="dlg_linkman" class="easyui-validatebox" required="true"/></td>
				<td>联系电话:</td>
				<td><input type="text" name="customer.phone" id="dlg_phone" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>备注:</td>
				<td colspan="3"><textarea rows="7" cols="50" id="dlg_Desc" name="customer.Desc"></textarea></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveCustomer()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeCustomerDialog()" class="easyui-linkbutton" iconCls="icon-cancel">关闭</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openCustomerAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openCustomerModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteCustomer()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="exportUser()">导出用户</a>
	</div>
	<div>
		用户编码:<input type="text" name="s_customerNumber" id="s_customerNumber" /><a href="javascript:searchCustomer()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>