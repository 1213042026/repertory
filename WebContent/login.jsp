<%@ page language="java" contentType="text/html; charset=utf-8"%>
<HTML>
<HEAD>
<TITLE>管理员登录V1.0</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<LINK href="/kucunManage/css/admin.css" type="text/css" rel="stylesheet">
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
          <TD><IMG height=23 src="/kucunManage/images/login_1.jpg" 
          width=468></TD></TR>
        <TR>
          <TD><IMG height=147 src="/kucunManage/images/login_2.jpg" 
            width=468></TD></TR></TABLE>
      <TABLE cellSpacing=0 cellPadding=0 width=468 bgColor=#ffffff border=0>
        <TR>
          <TD width=16><IMG height=122 src="/kucunManage/images/login_3.jpg" 
            width=16></TD>
          <TD align=middle>
            <TABLE cellSpacing=0 cellPadding=0 width=230 border=0>
              <FORM name="loginform" action="kucunManage/login" method="post">
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
                <TD>口令:</TD>
                <TD><INPUT 
                  style="BORDER-RIGHT: #000000 1px solid; BORDER-TOP: #000000 1px solid; BORDER-LEFT: #000000 1px solid; BORDER-BOTTOM: #000000 1px solid" 
                  type=password maxLength=30 size=24 name="user.userPwd" id="password" value=${user.userPwd }></TD></TR>
              <TR height=5>
                <TD colSpan=3></TD></TR>
              <TR>
                <TD>&nbsp;</TD>
                <TD>&nbsp;</TD>
                <TD><INPUT type=image height=18 width=70 
                  src="/kucunManage/images/bt_login.gif" onclick="checkform()"><font color="red">${error }</font></TD>
                  </TR></FORM></TABLE></TD>
          <TD width=16><IMG height=122 src="/kucunManage/images/login_4.jpg" 
            width=16></TD></TR></TABLE>
      <TABLE cellSpacing=0 cellPadding=0 width=468 border=0>
        <TR>
          <TD><IMG height=16 src="/kucunManage/images/login_5.jpg" 
          width=468></TD></TR></TABLE>
      <TABLE cellSpacing=0 cellPadding=0 width=468 border=0>
        <TR>
          <TD align=right><A href="" target=_blank><IMG 
            height=26 src="/kucunManage/images/login_6.gif" width=165 
            border=0></A></TD></TR></TABLE></TD></TR></TABLE></BODY></HTML>
