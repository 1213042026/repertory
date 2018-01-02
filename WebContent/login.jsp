<%@ page language="java" contentType="text/html; charset=utf-8"%>
<HTML>
<HEAD>
<TITLE>仓储管理系统</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<LINK href="/repertory/css/admin.css" type="text/css" rel="stylesheet">
<script type="text/javascript">
	function checkform(){
		var username=document.getElementById("username").value;
		var password=document.getElementById("password").value;
		if(username==null || username==""){
			alert("用户名不能为空");
			return ;
		}else if(password==null ||password==""){
			alert("密码不能为空");
			return ;
		}else{
			document.getElementById("loginform").submit();
		}
	}
</script>
</HEAD>
<BODY>
<TABLE height="100%" cellSpacing=0 cellPadding=0 width="100%" bgColor=#002779 
border="1">
  <TR>
    <TD align=middle>
      <TABLE cellSpacing=0 cellPadding=0 width=468 border=0>
        <TR>
          <TD><IMG height=23 src="/repertory/images/login_1.jpg" 
          width=468></TD></TR>
        <TR>
          <TD><IMG height=147 src="/repertory/images/login_2.jpg" 
            width=468></TD></TR></TABLE>
      <TABLE cellSpacing=0 cellPadding=0 width=468 bgColor=#ffffff border=0>
        <TR>
          <TD width=16><IMG height=122 src="/repertory/images/login_3.jpg" 
            width=16></TD>
          <TD align=middle>
            <TABLE cellSpacing=0 cellPadding=0 width=230 border=0>
              <FORM name="loginform" action="repertory/login" method="post">
              <TR height=5>
                <TD width=5></TD>
                <TD width=56></TD>
                <TD></TD></TR>
              <TR height=36>
                <TD></TD>
                <TD>用户名:</TD>
                <TD><INPUT 
                  style="BORDER-RIGHT: #000000 1px solid; BORDER-TOP: #000000 1px solid; BORDER-LEFT: #000000 1px solid; BORDER-BOTTOM: #000000 1px solid" 
                  maxLength=30 size=24 name="user.userName" id="username" value=${user.userName }></TD></TR>
              <TR height=36>
                <TD>&nbsp; </TD>
                <TD>密码:</TD>
                <TD><INPUT 
                  style="BORDER-RIGHT: #000000 1px solid; BORDER-TOP: #000000 1px solid; BORDER-LEFT: #000000 1px solid; BORDER-BOTTOM: #000000 1px solid" 
                  type=password maxLength=30 size=24 name="user.userPwd" id="password" value=${user.userPwd }></TD></TR>
              <TR height=36>
                <TD>&nbsp; </TD>
                <TD>角色:</TD>
                <TD>
                  <s:select label="角色" name="user.role" list="roleList" listKey="number" listValue="name" />
                </TD></TR>
              <TR height=5>
                <TD colSpan=3></TD></TR>
              <TR>
                <TD>&nbsp;</TD>
                <TD>&nbsp;</TD>
                <TD><INPUT type=image height=18 width=70 
                  src="/repertory/images/bt_login.gif" onclick="checkform()"><font color="red">${error }</font></TD>
                  </TR></FORM></TABLE></TD>
          <TD width=16><IMG height=122 src="/repertory/images/login_4.jpg" 
            width=16></TD></TR></TABLE>
      <TABLE cellSpacing=0 cellPadding=0 width=468 border=0>
        <TR>
          <TD><IMG height=16 src="/repertory/images/login_5.jpg" 
          width=468></TD></TR></TABLE>
      </TD></TR></TABLE>
</BODY>
</HTML>
