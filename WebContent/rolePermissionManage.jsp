<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>角色权限管理</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.3.3/themes/icon.css">
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
</script>
</head>
<body>
<table id="dg" title="角色权限信息" class="easyui-datagrid" fitColumns="true"
	 pagination="true" rownumbers="true" url="repertory/rolepermission" fit="true">
	<thead>
		<tr>
			<th data-options="field:'rolenumber',width:100,align:'center'">角色编码</th>
			<th data-options="field:'permissionnumber',width:100,align:'center'">权限编码</th>
		</tr>
	</thead>	
</table>
</body>
</html>