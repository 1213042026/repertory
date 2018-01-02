<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;

function searchMail(){
	$('#dg').datagrid('load',{
		s_mailNumber:$('#s_mailNumber').val()
	});
}

function deleteMail(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].mailId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("repertory/mail!delete",{delIds:ids},function(result){
				if(result.success){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+result.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示','<font color=red>'+selectedRows[result.errorIndex].mailName+'</font>'+result.error);
				}
			},"json");
		}
	});
}
function openMailAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加商品信息");
	url="repertory/mail!save";
}
function saveMail(){
	alert(url);
	$("#fm").form("submit",{
		url:url,
		onSubmit:function(){
			if($("#dlg_customerId").combobox("getValue")==""){
				$.messager.alert("系统提示","请选择供应商");
				return false;
			}
			if($("#dlg_mailtypeId").combobox("getValue")==""){
				$.messager.alert("系统提示","请选择所属商品类别");
				return false;
			}
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
function openMailModifyDialog(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑商品信息");
	// $("#fm").form("load",row);
	$("#dlg_mailName").val(row.mailName);
	$("#dlg_mailDesc").val(row.mailDesc);
	$("#dlg_mailNumber").val(row.mailnumber);
	//$("#dlg_customerId").val(row.customerName);
	//$("#dlg_mailtypeId").val(row.mailtypeName);
	$("#dlg_customerId").combobox("setValue",row.customerId);
	$("#dlg_mailtypeId").combobox("setValue",row.mailtypeId);
	url="repertory/mail!save?mailId="+row.mailId;
}

function closeMailDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_mailNumber").val("");
	$("#dlg_mailName").val("");
	$("#dlg_mailDesc").val("");
	$("#dlg_customerId").combobox("setValue","");
	$("#dlg_mailtypeId").combobox("setValue","");
}
function exportUser(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要导出的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].mailId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要导出这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			window.open('repertory/mail!export?exportIds='+ids);
		}
	});
}
function openUploadFileDialog(){
	$("#dlg2").dialog('open').dialog('setTitle','批量导入数据');
}

function downloadTemplate(){
	window.open('template/mail.xls');
}

function uploadFile(){
	$("#uploadForm").form("submit",{
		success:function(result){
			var result=eval('('+result+')');
			if(result.errorMsg){
				$.messager.alert("系统提示",result.errorMsg);
			}else{
				$.messager.alert("系统提示","上传成功");
				$("#dlg2").dialog("close");
				$("#dg").datagrid("reload");
			}
		}
	});
}
</script>
</head>
<body>
<table class="easyui-datagrid" id="dg" title="商品信息管理" data-options="pagination:true,
fitColumns:true,collapsible:true,rownumbers:true,fit:true,url:'repertory/mail'"toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'mailId',width:50,align:'center'">编号</th>
			<th data-options="field:'mailnumber',width:100,align:'center'">商品编码</th>
			<th data-options="field:'mailName',width:100,align:'center'">商品名称</th>
			<th data-options="field:'customerName',width:100,align:'center'">供应商</th>
			<th data-options="field:'mailtypeName',width:200,align:'center'">商品类别</th>
			<th data-options="field:'customerId',width:100,align:'center',hidden:true">供应商ID</th>
			<th data-options="field:'mailtypeId',width:200,align:'center',hidden:true">商品类别ID</th>
			<th data-options="field:'mailDesc',width:400,align:'center'">商品描述</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >商品编码:</td>
				<td><input type="text" name="mail.mailNumber" id="dlg_mailNumber" class="easyui-validatebox" required="true"/></td>
				<td>供应商:</td>
				<td><input class="easyui-combobox" id="dlg_customerId" name="mail.customerId" data-options="editable:false,valueField:'customerId',textField:'customerName',url:'repertory/customer!customerComboList'"/></td>
			</tr>
			<tr>
				<td>商品名称:</td>
				<td><input type="text" name="mail.mailName" id="dlg_mailName" class="easyui-validatebox" required="true"/></td>
				<td>商品类别:</td>
				<td><input class="easyui-combobox" id="dlg_mailtypeId" name="mail.mailtypeId" data-options="editable:false,valueField:'mailtypeId',textField:'mailtypeName',url:'repertory/mailtype!mailtypeComboList'"/></td>
			</tr>
			<tr>
				<td>商品描述:</td>
				<td colspan="3"><textarea rows="7" cols="50" id="dlg_mailDesc" name="mail.mailDesc"></textarea></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveMail()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeMailDialog()" class="easyui-linkbutton" iconCls="icon-cancel">关闭</a>
</div>
<div id="dlg2" class="easyui-dialog" style="width:400px;height:180px;padding:10px 20px"
            closed="true" buttons="#dlg-buttons2">
        <form id="uploadForm" action="repertory/mail!upload" method="post" enctype="multipart/form-data">
        	<table>
        		<tr>
        			<td>下载模版：</td>
        			<td><a href="javascript:void(0)" class="easyui-linkbutton"  onclick="downloadTemplate()">导入模版</a></td>
        		</tr>
        		<tr>
        			<td>上传文件：</td>
        			<td><input type="file" name="mailUploadFile"></td>
        		</tr>
        	</table>
        </form>
	</div>
    
	<div id="dlg-buttons2">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="uploadFile()">上传</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg2').dialog('close')">关闭</a>
	</div>
<div id="tb">
	<div >
		<a href="javascript:openMailAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openMailModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteMail()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="exportUser()">导出数据</a>
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="openUploadFileDialog()">用模板导入数据</a>
	</div>
	<div>
		商品编码:<input type="text" name="s_mailNumber" id="s_mailNumber" /><a href="javascript:searchMail()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>