<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品入库管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;
 
function searchIndb(){
	$('#dg').datagrid('load',{
		s_binDate:$("#s_binDate").datebox("getValue"),
		s_einDate:$("#s_einDate").datebox("getValue")
	});
}

function deleteIndb(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].indbId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("repertory/indb!delete",{delIds:ids},function(result){
				if(result.success){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+result.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示','<font color=red>入库表'+selectedRows[result.errorIndex].indbId+'</font>'+result.error);
				}
			},"json");
		}
	});
}


function openIndbAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加入库信息");
	url="repertory/indb!save";
}
function saveIndb(){
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
	alert(url);
}
function openIndbModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑入库信息");
	// $("#fm").form("load",row);
	$("#dlg_mailId").combobox("setValue",row.mailId);
	$("#dlg_inPrice").val(row.inPrice);
	$("#dlg_indbDate").datebox("setValue",row.indbDate);
	$("#dlg_inNumbers").val(row.inNumbers);
	$("#dlg_indbDesc").val(row.indbDesc);
	url="repertory/indb!save?indbId="+row.indbId;
}

function closeIndbDialog(){
	$("#dlg").dialog("close");
	resetValue();
}
function resetValue(){
	$("#dlg_mailId").combobox("setValue","");
	$("#dlg_inPrice").val("");
	$("#dlg_inNumbers").val("");
	$("#dlg_indbDesc").val("");
	$("#dlg_indbDate").datebox("setValue","");
}
</script>
</head>
<body>
<table id="dg" title="商品入库信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/indb" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'indbId',width:50,align:'center'">编号</th>
			<th data-options="field:'mailId',width:100,align:'center',hidden:true">商品编号</th>
			<th data-options="field:'mailName',width:100,align:'center'">商品名称</th>
			<th data-options="field:'inPrice',width:100,align:'center'">进价</th>
			<th data-options="field:'indbDate',width:100,align:'center'">入库日期</th>
			<th data-options="field:'inNumbers',width:200,align:'center'">数量</th>
			<th data-options="field:'indbDesc',width:400,align:'center'">入库备注</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >商品名称:</td>
				<td><input class="easyui-combobox" id="dlg_mailId" name="indb.mailId" data-options="editable:false,valueField:'mailId',textField:'mailName',url:'repertory/mail!mailComboList'"/></td>
				<td>进价:</td>
				<td><input type="text" name="indb.inPrice" id="dlg_inPrice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>入库日期:</td>
				<td><input class="easyui-datebox" id="dlg_indbDate" name="indb.indbDate" editable="false" required="true"/></td>
				<td>数量:</td>
				<td><input type="text" name="indb.inNumbers" id="dlg_inNumbers" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>入库备注:</td>
				<td colspan="3"><textarea rows="7" cols="50" id="dlg_indbDesc" name="indb.indbDesc"></textarea></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveIndb()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeIndbDialog()" class="easyui-linkbutton" iconCls="icon-cancel">关闭</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openIndbAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openIndbModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteIndb()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		入库日期:&nbsp;<input class="easyui-datebox" id="s_binDate" name="s_binDate" editable="false" size="10"/>-><input class="easyui-datebox" id="s_einDate" name="s_einDate" editable="false" size="10"/>
		<a href="javascript:searchIndb()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>