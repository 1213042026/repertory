<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品库存管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var url;
 
function searchStock(){
	$('#dg').datagrid('load',{
		s_mailName:$('#s_mailName').val()
	});
}

function deleteStock(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].stockId);
	}
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删掉这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post("kucunManage/stock!delete",{delIds:ids},function(result){
				if(result.success){
					$.messager.alert("系统提示","您已成功删除<font color=red>"+result.delNums+"</font>条数据！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert('系统提示','<font color=red>库存表'+selectedRows[result.errorIndex].stockId+'</font>'+result.error);
				}
			},"json");
		}
	});
}


function openStockAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添库存信息");
	url="kucunManage/stock!save";
}
function saveStock(){
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
function openStockModifyDialog(){
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
	$("#dlg_stockNumbers").val(row.stockNumbers);
	$("#dlg_inPrice").val(row.inPrice);
	$("#dlg_stockDesc").val(row.stockDesc);
	url="kucunManage/stock!save?stockId="+row.stockId;
}

function closeStockDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

function resetValue(){
	$("#dlg_mailId").combobox("setValue","");
	$("#dlg_salesPrice").val("");
	$("#dlg_stockNumbers").val("");
	$("#dlg_stockDesc").val("");
	$("#dlg_inPrice").val("");
}
</script>
</head>
<body>
<table id="dg" title="商品库存信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="kucunManage/stock" fit="true" toolbar="#tb">
	<thead>
		<tr>
			<th data-options="field:'cb',checkbox:true"></th>
			<th data-options="field:'stockId',width:50,align:'center'">编号</th>
			<th data-options="field:'mailId',width:100,align:'center',hidden:true">商品编号</th>
			<th data-options="field:'mailName',width:100,align:'center'">商品名称</th>
			<th data-options="field:'salesPrice',width:100,align:'center'">销售价</th>
			<th data-options="field:'inPrice',width:100,align:'center'">成本价</th>
			<th data-options="field:'stockNumbers',width:200,align:'center'">数量</th>
			<th data-options="field:'stockDesc',width:400,align:'center'">库存备注</th>
		</tr>
	</thead>	
</table>
<div id="dlg" class="easyui-dialog" style="width:590px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-button">
	<form action="" method="post" id="fm">
		<table cellspacing="5px">
			<tr>
				<td >商品名称:</td>
				<td><input class="easyui-combobox" id="dlg_mailId" name="stock.mailId" data-options="editable:false,valueField:'mailId',textField:'mailName',url:'kucunManage/mail!mailComboList'"/></td>
				<td>销售价:</td>
				<td><input type="text" name="stock.salesPrice" id="dlg_salesPrice" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>成本价:</td>
				<td><input type="text" name="stock.inPrice" id="dlg_inPrice" class="easyui-validatebox" required="true"/></td>
				<td>数量:</td>
				<td><input type="text" name="stock.stockNumbers" id="dlg_stockNumbers" class="easyui-validatebox" required="true"/></td>
			</tr>
			<tr>
				<td>库存备注:</td>
				<td colspan="3"><textarea rows="7" cols="50" id="dlg_stockDesc" name="stock.stockDesc"></textarea></td>
			</tr>
		</table>
	</form>
</div>
<div id="dlg-button">
	<a href="javascript:saveStock()" class="easyui-linkbutton" iconCls="icon-add">保存</a>
	<a href="javascript:closeStockDialog()" class="easyui-linkbutton" iconCls="icon-cancel">关闭</a>
</div>
<div id="tb">
	<div >
		<a href="javascript:openStockAddDialog()" class="easyui-linkbutton" iconCls="icon-add" plain="true">添加</a>
		<a href="javascript:openStockModifyDialog()" class="easyui-linkbutton" iconCls="icon-edit" plain="true">修改</a>
		<a href="javascript:deleteStock()" class="easyui-linkbutton" iconCls="icon-remove" plain="true">删除</a>
	</div>
	<div>
		商品名称:<input type="text" id="s_mailName" name="s_mailName" />
		<a href="javascript:searchStock()" class="easyui-linkbutton" iconCls="icon-search" plain="true">搜索</a>
	</div>
</div>
</body>
</html>