<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>原材料管理</title>
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
			    title: '原材料明细',
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

function searchRawMaterial(){
	$('#dg').datagrid('load',{
		rawMaterialNumber:$('#rawMaterialNumber').val()
	});
}

function deleteRawMaterial(){
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
			$.post("repertory/rawMaterial!delete",{delIds:ids},function(data){
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


function openRawMaterialAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加原材料信息");
	url="repertory/rawMaterial!save";
}

function openRawMaterialModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑原材料信息");
	// $("#fm").form("load",row);
	$("#dlg_rawMaterialNumber").val(row.number);
	$("#dlg_name").val(row.name);
	$("#dlg_price").val(row.price);
	$("#dlg_buyer").val(row.buyer);
	$('#dlg_buydate').datetimebox('setValue', row.buydate);
	$("#dlg_catagory").val(row.catagory);
	url="repertory/rawMaterial!save?rawMaterialId="+row.id;
}

function closeRawMaterialDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_rawMaterialNumber").val("");
	$("#dlg_name").val("");
	$("#dlg_price").val("");
	$("#dlg_buyer").val("");
	$("#dlg_buydate").val("");
	$("#dlg_catagory").val("");
}


function saveRawMaterial(){
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
	<table id="dg" title="原材料信息" class="easyui-datagrid" fitColumns="true"
		 pagination="true" rownumbers="true" url="repertory/rawMaterial" fit="true" toolbar="#tb">
		<thead>
			<tr>
				<th data-options="field:'cb',checkbox:true"></th>
				<th data-options="field:'number',width:50,align:'center'">原材料编码</th>
				<th data-options="field:'name',width:100,align:'center'">原材料名称</th>
				<th data-options="field:'catagory',width:100,align:'center'">类别</th>
				<th data-options="field:'price',width:100,align:'center'">单价</th>
				<th data-options="field:'buyer',width:100,align:'center'">采购员</th>
				<th data-options="field:'buydate',width:100,align:'center'">采购日期</th>
			</tr>
		</thead>	
	</table>
</div>

<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >原材料编码:</td>
				<td><input type="text" name="rawMaterial.number" id="dlg_rawMaterialNumber" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>原材料名称:</td>
				<td><input type="text" name="rawMaterial.name" id="dlg_name" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>类别:</td>
				<td>
				    <select id="dlg_catagory" class="easyui-combobox" name="rawMaterial.catagory" style="width:200px;">
					    <option value="管材">管材</option>
					    <option>电阻发热丝</option>
					    <option>引出棒</option>
					    <option>氧化镁</option>
					    <option>封口材料</option>
				    </select>
				</td>
			</tr>
			<tr>
				<td>单价:</td>
				<td><input type="text" name="rawMaterial.price" id="dlg_price" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>采购员:</td>
				<td>
				<select id="dlg_buyer" class="easyui-combobox" name="rawMaterial.buyer" style="width:200px;">
					    <option value="张三">张三</option>
					    <option>李四</option>
					    <option>王五</option>
				    </select>
				</td>
			</tr>
			<tr>
				<td>采购日期:</td>
				<td><input class="easyui-datetimebox" name="rawMaterial.buyDate" id="dlg_buydate" data-options="required:true" style="width:150px" required="true"></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveRawMaterial()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeRawMaterialDialog()" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openRawMaterialAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openRawMaterialModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteRawMaterial()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		原材料编码:<input type="text" name="rawMaterialNumber" id="rawMaterialNumber" /><a href="javascript:searchRawMaterial()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>