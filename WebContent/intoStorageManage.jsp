<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>入库管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchIntoStorage(){
	$('#dg').datagrid('load',{
		finishedMaterialNumber:$('#finishedMaterialNumber').val()
	});
}

function deleteIntoStorage(){
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
			$.post("repertory/intoStorage!delete",{delIds:ids},function(data){
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


function openIntoStorageAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加入库记录");
	url="repertory/intoStorage!save";
}

function openIntoStorageModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑入库记录");
	$("#dlg_finishedmaterialnumber").val(row.finishedmaterialnumber);
	$("#dlg_finishedmaterialname").val(row.finishedmaterialname);
	$("#dlg_count").val(row.count);
	$("#dlg_producecenter").val(row.producecenter);
	$("#dlg_storenumber").val(row.storenumber);
	$("#dlg_placenumber").val(row.placenumber);
	$("#dlg_remark").val(row.remark);
	url="repertory/intoStorage!save?intoStorageId="+row.id;
}

function closeIntoStorageDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_finishedmaterialnumber").val("");
	$("#dlg_finishedmaterialname").val("");
	$("#dlg_count").val("");
	$("#dlg_producecenter").val("");
	$("#dlg_storenumber").val("");
	$("#dlg_placenumber").val("");
	$("#dlg_remark").val("");
}


function saveIntoStorageDialog(){
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


function into(id, rawmaterialnumber) {
	// console.log(id)
	$.ajax({
		type:'get',
		url:'repertory/intoStorage!into',
		data:{
			intoStorageId:id
		},
		dataType:'json',
		success:function(data) {
			// data = JSON.parse(data)
			if(data.result != 'success'){
				$.messager.alert("系统提示",'入库失败');
			}else{
				$.messager.alert("系统提示","入库成功");
				$("#dg").datagrid("reload");
			}
		},
		error:function(data){
			$.messager.alert("系统提示","入库失败");
		}
	});
}

var formatInto = function(value,rawData,index) {
	if (rawData.isinto == "未入库")　{
		return '<a href="#" onclick="into(\'' + rawData.id + '\')" class="rw-btn">入库</a>';
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
<table id="dg" title="入库记录信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/intoStorage" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'finishedmaterialnumber',width:50,align:'center'">成品编码</th>
			<th data-options="field:'finishedmaterialname',width:100,align:'center'">成品名称</th>
			<th data-options="field:'count',width:200,align:'center'">数量</th>
			<th data-options="field:'producecenter',width:100,align:'center'">生产中心</th>
			<th data-options="field:'storenumber',width:200,align:'center'">仓库编码</th>
			<th data-options="field:'placenumber',width:200,align:'center'">仓位编码</th>
			<th data-options="field:'remark',width:100,align:'center'">备注</th>
			<th data-options="field:'isinto',width:200,align:'center',formatter:formatInto">入库状态</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >成品编码:</td>
				<td><input type="text" name="intoStorage.finishedMaterialNumber" id="dlg_finishedmaterialnumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>成品名称:</td>
				<td><input type="text" name="intoStorage.finishedMaterialName" id="dlg_finishedmaterialname" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>数量:</td>
				<td><input type="text" name="intoStorage.count" id="dlg_count" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>生产中心:</td>
				<td><input type="text" name="intoStorage.produceCenter" id="dlg_producecenter" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>仓库编码:</td>
				<td><input type="text" name="intoStorage.storeNumber" id="dlg_storenumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>仓位编码:</td>
				<td><input type="text" name="intoStorage.placeNumber" id="dlg_placenumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>备注:</td>
				<td><input type="text" name="intoStorage.remark" id="dlg_remark" class="easyui-validatebox" required="true"/></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveIntoStorageDialog()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeIntoStorageDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openIntoStorageAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openIntoStorageModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteIntoStorage()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		成品编码:<input type="text" name="finishedMaterialNumber" id="finishedMaterialNumber" /><a href="javascript:searchIntoStorage()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>