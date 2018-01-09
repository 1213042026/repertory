<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>客户信息管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchCustomer(){
	$('#dg').datagrid('load',{
		customerNumber:$('#customerNumber').val()
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
		strIds.push(selectedRows[i].id);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("repertory/customer!delete",{delIds:ids},function(data){
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


function openCustomerAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加客户信息");
	url="repertory/customer!save";
}

function openCustomerModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑客户信息");
	// $("#fm").form("load",row);
	$("#dlg_customerNumber").val(row.number);
	$("#dlg_name").val(row.name);
	$("#dlg_tel").val(row.tel);
	$("#dlg_address").val(row.address);
	$("#dlg_fax").val(row.fax);
	$("#dlg_remark").val(row.remark);
	url="repertory/customer!save?customerId="+row.id;
}

function closeCustomerDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_customerNumber").val("");
	$("#dlg_name").val("");
	$("#dlg_tel").val("");
	$("#dlg_address").val("");
	$("#dlg_fax").val("");
	$("#dlg_remark").val("");
}


function saveCustomer(){
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
</script>
</head>
<body>
<table id="dg" title="客户信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/customer" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'number',width:50,align:'center'">客户编码</th>
			<th data-options="field:'name',width:100,align:'center'">客户名称</th>
			<th data-options="field:'tel',width:100,align:'center'">联系电话</th>
			<th data-options="field:'address',width:100,align:'center'">公司地址</th>
			<th data-options="field:'fax',width:100,align:'center'">传真</th>
			<th data-options="field:'remark',width:100,align:'center'">备注</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >客户编码:</td>
				<td><input type="text" name="customer.number" id="dlg_customerNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>客户名称:</td>
				<td><input type="text" name="customer.name" id="dlg_name" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>联系电话:</td>
				<td><input type="text" name="customer.tel" id="dlg_tel" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>公司地址:</td>
				<td><input type="text" name="customer.address" id="dlg_address" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>传真:</td>
				<td><input type="text" name="customer.fax" id="dlg_fax" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>备注:</td>
				<td><input type="text" name="customer.remark" id="dlg_remark" class="easyui-validatebox" required="true"/></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveCustomer()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeCustomerDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openCustomerAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openCustomerModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteCustomer()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		客户编码:<input type="text" name="customerNumber" id="customerNumber" /><a href="javascript:searchCustomer()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>