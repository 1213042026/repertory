<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>成品管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">

$(function() {
	$("#dg").datagrid({
		onClickRow : function(rowIndex, rowData) {
		    $('body').layout('add',{
			    region: 'south',
			    height: 280,
			    title: '成品明细',
			    split: true,
			    content: '<div class="easyui-panel" style="padding:10px;" data-options="fit:true">' +
			             '<table id="panelView" class="easyui-propertygrid"></table>' +
						 '</div>'
		    });
		    
			var panelData = [];
			var item = {};
			for(var key in rowData) {
				item = {
					"name" : key,
					"value" : rowData[key]
				}
				panelData.push(item)
			}

		    $('#panelView').propertygrid({
				data : panelData,
				fit : true
			});
		}
	})
})

var url;

function searchFinishedMaterial(){
	$('#dg').datagrid('load',{
		finishedMaterialNumber:$('#finishedMaterialNumber').val()
	});
}

function deleteFinishedMaterial(){
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
			$.post("repertory/finishedMaterial!delete",{delIds:ids},function(data){
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


function openFinishedMaterialAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加成品信息");
	url="repertory/finishedMaterial!save";
}

function openFinishedMaterialModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑成品信息");
	// $("#fm").form("load",row);
	$("#dlg_finishedMaterialNumber").val(row.number);
	$("#dlg_name").val(row.name);
	$("#dlg_price").val(row.price);
	$("#dlg_danwei").val(row.danwei);
	$("#dlg_catagory").val(row.catagory);
	url="repertory/finishedMaterial!save?finishedMaterialId="+row.id;
}

function closeFinishedMaterialDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_finishedMaterialNumber").val("");
	$("#dlg_name").val("");
	$("#dlg_price").val("");
	$("#dlg_danwei").val("");
	$("#dlg_catagory").val("");
}


function saveFinishedMaterial(){
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
<body class="easyui-layout">
<div data-options="region:'center'">
	<table id="dg" title="成品信息" class="easyui-datagrid" fitColumns="true"
		 pagination="true" rownumbers="true" url="repertory/finishedMaterial" fit="true" toolbar="#tb">
		<thead>
			<tr>
				<th data-options="field:'cb',checkbox:true"></th>
				<th data-options="field:'number',width:50,align:'center'">成品编码</th>
				<th data-options="field:'name',width:100,align:'center'">成品名称</th>
				<th data-options="field:'catagory',width:100,align:'center'">类别</th>
				<th data-options="field:'price',width:100,align:'center'">单价</th>
				<th data-options="field:'danwei',width:100,align:'center'">单位</th>
			</tr>
		</thead>	
	</table>
</div>

<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >成品编码:</td>
				<td><input type="text" name="finishedMaterial.number" id="dlg_finishedMaterialNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>成品名称:</td>
				<td><input type="text" name="finishedMaterial.name" id="dlg_name" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>类别:</td>
				<td>
				    <select id="dlg_catagory" class="easyui-combobox" name="finishedMaterial.catagory" style="width:200px;">
					    <option value="类别1">类别1</option>
					    <option>类别1</option>
					    <option>类别2</option>
					    <option>类别3</option>
				    </select>
				</td>
			</tr>
			<tr>
				<td>单价:</td>
				<td><input type="text" name="finishedMaterial.price" id="dlg_price" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>单位:</td>
				<td><input type="text" name="finishedMaterial.danWei" id="dlg_danwei" class="easyui-validatebox" required="true"/></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveFinishedMaterial()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeFinishedMaterialDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openFinishedMaterialAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openFinishedMaterialModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteFinishedMaterial()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		原材料编码:<input type="text" name="finishedMaterialNumber" id="finishedMaterialNumber" /><a href="javascript:searchFinishedMaterial()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>