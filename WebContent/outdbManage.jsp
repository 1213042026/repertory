<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品出库管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;
 
function searchOutdb(){
	$('#dg').datagrid('load',{
		s_boutDate:$("#s_boutDate").datebox("getValue"),
		s_eoutDate:$("#s_eoutDate").datebox("getValue")
	});
}

function deleteOutdb(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].outdbId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("kucunManage/outdb!delete",{delIds:ids},function(result){
				if(result.success){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+result.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示','<font color=red>出库表'+selectedRows[result.errorIndex].outdbId+'</font>'+result.error);
				}
			},"json");
		}
	});
}


function openOutdbAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加入库信息");
	var quater=document.getElementById("quater").value;
	url="kucunManage/outdb!save";
}
function saveOutdb(){
	$("#fm").form("submit",{
		url:url,
		onSubmit:function(){
			return $(this).form("validate");
		},
		success:function(result){
			if(result.error){
				$.messager.alert("系统提示",result.error);
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
function openOutdbModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑入库信息");
	// $("#fm").form("load",row);
	$("#dlg_mailId").combobox("setValue",row.mailId);
	$("#dlg_salesPrice").val(row.salesPrice);
	$("#dlg_outdbDate").datebox("setValue",row.outdbDate);
	$("#dlg_outNumbers").val(row.outNumbers);
	$("#dlg_outdbDesc").val(row.outdbDesc);
	$("#dlg_quater").val(row.quarter);
	url="kucunManage/outdb!save?outdbId="+row.outdbId;
}

function closeOutdbDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_mailId").combobox("setValue","");
	$("#dlg_salesPrice").val("");
	$("#dlg_outNumbers").val("");
	$("#dlg_outdbDesc").val("");
	$("#dlg_quater").val("");
	$("#dlg_outdbDate").datebox("setValue","");
}
function exportUser(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要导出的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].outdbId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要导出这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			window.open('kucunManage/outdb!export?exportIds='+ids);
		}
	});
}
</script>
</head>
<body>
<table id="dg" title="商品出库信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="kucunManage/outdb" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'outdbId',width:50,align:'center'">编号</th>
			<th data-options="field:'mailId',width:100,align:'center',hidden:true">商品编号</th>
			<th data-options="field:'mailName',width:100,align:'center'">商品名称</th>
			<th data-options="field:'salesPrice',width:100,align:'center'">销售价</th>
			<th data-options="field:'outdbDate',width:100,align:'center'">出库日期</th>
			<th data-options="field:'outNumbers',width:200,align:'center'">数量</th>
			<th data-options="field:'outdbDesc',width:400,align:'center'">出库备注</th>
			<th data-options="field:'quarter',width:400,align:'center'">所属季度</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >商品名称:</td>
				<td><input class="easyui-combobox" id="dlg_mailId" name="outdb.mailId" data-options="editable:false,valueField:'mailId',textField:'mailName',url:'kucunManage/mail!mailComboList'"/></td>
				<td>销售价:</td>
				<td><input type="text" name="outdb.salesPrice" id="dlg_salesPrice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>出库日期:</td>
				<td><input class="easyui-datebox" id="dlg_outdbDate" name="outdb.outdbDate" editable="false" required="true"/></td>
				<td>数量:</td>
				<td><input type="text" name="outdb.outNumbers" id="dlg_outNumbers" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>所属季度:</td>
				<td><input type="text" name="outdb.quater" id="dlg_quater" class="easyui-validatebox" required="true"></td>
			</tr>
			<tr>
				<td>出库备注:</td>
				<td colspan="3"><textarea rows="7" cols="50" id="dlg_outdbDesc" name="outdb.outdbDesc"></textarea></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveOutdb()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeOutdbDialog()" class="easyui-linkbutton" iconCls="icon-cancel">关闭</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openOutdbAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openOutdbModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteOutdb()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="exportUser()">导出数据</a>
	</div>
	<div>
		出库日期:&nbsp;<input class="easyui-datebox" id="s_boutDate" name="s_boutDate" editable="false" size="10"/>-><input class="easyui-datebox" id="s_eoutDate" name="s_eoutDate" editable="false" size="10"/>
		<a href="javascript:searchOutdb()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>