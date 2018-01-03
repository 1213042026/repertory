<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>员工信息管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchEmployee(){
	$('#dg').datagrid('load',{
		employeeNumber:$('#employeeNumber').val()
	});
}

function deleteEmployee(){
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
			$.post("repertory/employee!delete",{delIds:ids},function(data){
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


function openEmployeeAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加员工信息");
	url="repertory/employee!save";
}

function openEmplyeeModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑员工信息");
	// $("#fm").form("load",row);
	$("#dlg_employeeNumber").val(row.number);
	$("#dlg_roleNumber").val(row.rolenumber);
	$("#dlg_userName").val(row.username);
	$("#dlg_userPwd").val(row.userpwd);
	$("#dlg_joindate").val(row.joindate);
	url="repertory/employee!save?employeeId="+row.id;
}

function closeEmployeeDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_employeeNumber").val("");
	$("#dlg_roleNumber").val("");
	$("#dlg_userName").val("");
	$("#dlg_userPwd").val("");
	$("#dlg_joindate").val("");
}


function saveEmployee(){
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
<table id="dg" title="员工信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/employee" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'number',width:50,align:'center'">员工编码</th>
			<th data-options="field:'rolenumber',width:100,align:'center'">角色编码</th>
			<th data-options="field:'username',width:100,align:'center'">姓名</th>
			<th data-options="field:'userpwd',width:100,align:'center'">密码</th>
			<th data-options="field:'joindate',width:200,align:'center'">入职日期</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >员工编码:</td>
				<td><input type="text" name="user.number" id="dlg_employeeNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>角色编码:</td>
				<td><input type="text" name="user.roleNumber" id="dlg_roleNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>姓名:</td>
				<td><input type="text" name="user.userName" id="dlg_userName" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>密码:</td>
				<td><input type="text" name="user.userPwd" id="dlg_userPwd" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>入职日期:</td>
				<td><input class="easyui-datetimebox" name="user.date" id="dlg_joindate" data-options="required:true" style="width:150px"></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveEmployee()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeEmployeeDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openEmployeeAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openEmplyeeModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteEmployee()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		员工编码:<input type="text" name="employeeNumber" id="employeeNumber" /><a href="javascript:searchEmployee()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>