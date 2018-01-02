<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品类别管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchMailType(){
	$('#dg').datagrid('load',{
		s_mailtypeName:$('#s_mailtypeName').val()
	});
}

function deleteMailType(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].mailtypeId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("repertory/mailtype!delete",{delIds:ids},function(result){
				if(result.success){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+result.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示','<font color=red>'+selectedRows[result.errorIndex].mailtypeName+'</font>'+result.error);
				}
			},"json");
		}
	});
}
function openMailTypeAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加商品类别信息");
	url="repertory/mailtype!save";
}

function openMailTypeModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑商品类别信息");
	// $("#fm").form("load",row);
	$("#dlg_mailtypeName").val(row.mailtypeName);
	$("#dlg_mailtypeDesc").val(row.mailtypeDesc);
	url="repertory/mailtype!save?mailtypeId="+row.mailtypeId;
}

function closeMailTypeDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_mailtypeName").val("");
	$("#dlg_mailtypeDesc").val("");
}


function saveMailType(){
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
		strIds.push(selectedRows[i].mailtypeId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要导出这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			window.open('repertory/mailtype!export?exportIds='+ids);
		}
	});
}
</script>
</head>
<body>
<table id="dg" title="商品类别信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/mailtype" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'mailtypeId',width:50,align:'center'">编号</th>
			<th data-options="field:'mailtypeName',width:100,align:'center'">商品类别名称</th>
			<th data-options="field:'mailtypeDesc',width:100,align:'center'">商品类别描述</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:300px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >商品类别名称:</td>
				<td><input type="text" name="mailtype.mailtypeName" id="dlg_mailtypeName" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>商品类别描述:</td>
				<td colspan="5"><textarea rows="7" cols="50" id="dlg_mailtypeDesc" name="mailtype.mailtypeDesc"></textarea></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveMailType()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeMailTypeDialog()" class="easyui-linkbutton" iconCls="icon-cancel">关闭</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openMailTypeAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openMailTypeModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteMailType()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="exportUser()">导出用户</a>
	</div>
	<div>
		商品类别名称:<input type="text" name="s_mailtypeName" id="s_mailtypeName" /><a href="javascript:searchMailType()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>