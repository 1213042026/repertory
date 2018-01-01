<%@ page language="java" contentType="text/html; charset=utf-8"%>

<html>
<head>
  <title>侧栏</title>
</head>
<body>
    <center>
        <table border="0" width="225" height="100%" cellspacing="0" cellpadding="0">
            <tr height="30"><td style="text-indent:5" valign="bottom"><font color="#004790"><b>■日历</b></font></td></tr>            
            <tr height="1"><td></td></tr>
            <tr height="215">
                <td valign="top" background="images/leftD.jpg"><jsp:include page="/pages/calendar.jsp"/></td>
            </tr>
            <tr height="1"><td></td></tr>
            <tr height="30"><td style="text-indent:5" valign="bottom"><font color="#004790"><b>■信息快速搜索</b></font></td></tr>
            <tr height="1"><td></td></tr>
            <tr height="103">
                <td align="center" valign="top" background="images/leftS.jpg">
                    <table border="0" width="99%" height="100%" cellspacing="0">
                        <tr height="10"><td colspan="3"></td></tr>
                        <tr>
                            <td align="right" width="70">关键字：</td>
                            <td colspan="2" width="200"><input type="text"/></td>
                        </tr>
                        <tr>
                            <td align="right">条&nbsp;&nbsp;件：</td>
                            <td>
                                <select>
                                	<option value=""></option>
								    <option value="">E-mail地址</option>
								    <option value="">ID值</option>
								    <option value="">信息内容</option>
								    <option value="">信息标题</option>
								    <option value="">联系人</option>
								    <option value="">联系电话</option>
                                </select>
                            </td>
                            <td align="center" width="30"><input type="button" value="搜索"/></td>
                        </tr>
                        <tr>
                            <td align="right">搜索类型：</td>
                            <td colspan="2">
                                <input type="radio"  name="searchType" />全字匹配    
                                <input type="radio" checked="checked" name="searchType" />模糊搜索                           
                            </td>
                        </tr>
                        <tr height="10"><td colspan="3"></td></tr>
                    </table>
                </td>
            </tr>
            <tr><td></td></tr>
        </table>                
    </center>
</body>
</html>