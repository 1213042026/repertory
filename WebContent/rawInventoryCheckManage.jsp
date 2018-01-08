<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>库存盘点</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchInventory(){
	$('#dg').datagrid('load',{
		materialNumber:$('#materialNumber').val()
	});
}

function deleteInventory(){
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
			$.post("repertory/rawInventory!delete",{delIds:ids},function(data){
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


function openInventoryAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加库存信息");
	url="repertory/rawInventory!save";
}

function openInventoryModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑库存信息");
	// $("#fm").form("load",row);
	$("#dlg_materialNumber").val(row.rawmaterialnumber);
	$("#dlg_count").val(row.restcount);
	url="repertory/rawInventory!save?rawInventoryId="+row.id;
}

function closeInventoryDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_materialNumber").val("");
	$("#dlg_count").val("");
}


function saveInventory(){
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
<table id="dg" title="原材料库存信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/rawInventory" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'rawmaterialnumber',width:50,align:'center'">原材料编码</th>
			<th data-options="field:'restcount',width:100,align:'center'">原材料库存量</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >原材料编码:</td>
				<td><input type="text" name="rawInventory.rawMaterialNumber" id="dlg_materialNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>原材料库存量:</td>
				<td><input type="text" name="rawInventory.restCount" id="dlg_count" class="easyui-validatebox" required="true"/></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveInventory()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeInventoryDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openInventoryAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openInventoryModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteInventory()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		原材料编码:<input type="text" name="materialNumber" id="materialNumber" /><a href="javascript:searchInventory()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>