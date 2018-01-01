<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<!-- SEO-->
	<meta name="description" content="OPPO智能手机产品大全，OPPO手机型号查询，OPPO产品大全，OPPO热销机型，OPPO旗舰机型，OPPO N1,OPPO Find 5,OPPO Ulike 2,OPPO U2S,OPPO X909,OPPO R809T、OPPO R819T、OPPO U707T,OPPO U705T,OPPO R815T,OPPO R821T。">
	<meta name="keywords" content="OPPO智能手机大全，OPPO智能手机产品列表，OPPO智能手机产品大全，OPPO手机大全">
	<meta name="author" content="OPPO">
	<meta name="copyright" content="OPPO">
	<meta name="author" content="uimix.net">
<!-- CSS-->
<link href="/kucunManage/view/show/css_files/base.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/home.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/mumberBase.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/reset.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/common.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/main_nav.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/lunbo.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/shop.css" media="screen" rel="stylesheet" type="text/css">
<link href="/kucunManage/view/show/css_files/miaosha.css" media="screen" rel="stylesheet" type="text/css"><!-- JS-->
<script id="__clicki_js_tracker_loader__" type="text/javascript" charset="UTF-8" src="./OPPO智能手机产品大全_files/clicki.js"></script>
<script type="text/javascript" async="" src="/kucunManage/view/show/css_files/45193"></script>
<script type="text/javascript" async="" src="/kucunManage/view/show/css_files/dc.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery-1.7.2.min.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery.easing.1.3.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/common.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/form.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/lunbo.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery.truncate.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery-query.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery.input-tip-text.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/ajaxfileupload-min.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery.autocomplete.min.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/jquery.quicksand.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/highlight.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/shop.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/oppo.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/home.js"></script>
<script language="javascript" src="/kucunManage/view/show/css_files/help.js"></script>	
<link href="/kucunManage/view/show/css_files/oppo.banner.css" media="screen" rel="stylesheet" type="text/css">	
<script language="javascript" src="/kucunManage/view/show/css_files/oppo.banner.js"></script>
</head>
</head>
<body>
<div id="content" class="phonehome">
	<script>
	$(function(){
		$("#phone").banner();
	});
	</script>
    <div class="phonelist">
        <ul>
        <c:choose>
        	<c:when test="${searchMailList==null || searchMailList.size()==0 }">
        		<div style="padding-top: 100px" align="center"><font color="red" size="20">欢迎使用</font></div>
        	</c:when>
        	<c:otherwise>
        		<c:forEach var="searchMail" items="${searchMailList }" varStatus="status">
        		<li>
       			  <a href="http://localhost:8080/kucunManage/kucunManage2/barChart?mailId=${searchMail.mailId }" target="_blank">
                          <img src="/kucunManage/view/show/css_files/137993967168624.png">
                          <div class="info">${searchMail.mailDesc }</div>
                          <div class="name">${searchMail.mailName }</div>
              	 		 </a>
           			</li>
        		</c:forEach>
        	</c:otherwise>
        </c:choose>
        		 	
			        </ul>
    </div>
    </div>
</body>
</html>