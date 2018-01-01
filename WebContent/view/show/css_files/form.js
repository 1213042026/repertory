$(function(){
	//匹配包含给定属性的元素，keyup在按键释放时发生
	$("textarea[maxlength]").keyup(function () {
		var area = $(this);
			            //parseInt 方法返回与保存在 numString 中的数字值相等的整数。如果 numString 的前缀不能解释为整数，则返回 NaN（而不是数字）。
		var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值 转化为10进制，将输入到textarea的文本长度
			            //这个判断可知max得到的是不是数字，设定的大小是多少
		if (max > 0) {
			if (area.val().length > max) { //textarea的文本长度大于maxlength 
				area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值 
			}
		}
	});
	$("textarea[maxlength]").blur(function () {
		var area = $(this);
		var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值 
		if (max > 0) {
			if (area.val().length > max) { //textarea的文本长度大于maxlength 
				area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值 
			}
		}
	});
	
});

function is_email(email_address)
{
	if( email_address.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/) == null)
	{
		return false;
	}
	else {
		return true;
	}
}

function is_empty_string(str){
	return ( ('' == $.trim(str)) || ('null' == str ) || ( "undefined" == typeof(str) ) ); 
}

function is_mobile(str_mobile)
{
	if( ( str_mobile.length==8 || str_mobile.length ==11 ) && str_mobile.match(/^(\d+)$/) != null )
	{
		return true;
	}
	else {
		return false;
	}
}

function is_num(str_num)
{
	return ( str_num.match(/^(\d+)$/) != null );
}
// real number
function is_numeric(str_num)
{
	return ( str_num != null && str_num.match(/^(-|\+)?\d+(\.\d+)?$/) != null );
}
function is_unsigned_numeric(str_num)
{
	return ( str_num != null && str_num.match(/^\d+(\.\d+)?$/) != null );
}
   
function   is_integer(str_num) 
{        
	return ( str_num != null && str_num.match(/^(-|\+)?\d+$/ ) != null );
}    
    
function   is_unsigned_integer(str_num) 
{  
	return ( str_num != null && str_num.match(/^\d+$/) != null );
}



function is_postcode(str)
{
	return ( (str.match(/^(\d+)$/) != null) && (str.length == 6) );
}

function get_string(str){
	return ( ( 'null' == str ) ? '' : str );
}

//check start time not later than end time
function check_st_ed_time(st_y,st_m,st_d,ed_y,ed_m,ed_d){
	if( st_m.length == 1 )st_m = '0' + st_m ;
	if( st_d.length == 1 )st_d = '0' + st_d ;
	if( ed_m.length == 1 )ed_m = '0' + ed_m ;
	if( ed_d.length == 1 )ed_d = '0' + ed_d ;
	var st_time = st_y + st_m + st_d;
	var ed_time = ed_y + ed_m + ed_d;
	if (st_time > ed_time  )return false;
	else return true; 
}

//check url
function is_url(url_str)
{
	url_str = jQuery.trim(url_str);
	if( url_str == '' || url_str == "http:\/\/" ) return false;
	return true;
}

/**date**/
function is_valid_date(DateStr)   
{   
	
    //var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); 
    var tmp = DateStr.match(/^(\d{4,4})\-(\d{1,2})\-(\d{1,2})$/)  ;
    if( tmp == null )return false ;
    var tmpDate = new Date( tmp[1],tmp[2] - 1,tmp[3] );
    
    return ( tmpDate.getFullYear() == tmp[1] && 
    	(tmpDate.getMonth() == (tmp[2] -1 ) ) &&
    	tmpDate.getDate() == tmp[3] );
    
    
}  
function is_future_date(DateStr){
	var curDate = new Date() ;
	var curYear = curDate.getFullYear() ; 
	var curMonth = curDate.getMonth()+1;
	var curDay = curDate.getDate();
	
	var curTime = curYear + "-" + ( curMonth < 10 ? "0" + curMonth : curMonth )
		+ "-" + ( curDay < 10 ? "0" + curDay : curDay );
	return (curTime < DateStr) ;
} 
function is_leap_year( year ) 
{   
    return is_num(year) && ( (0==year%4&& year%100!=0 ) || ( (year%100==0)&&(year % 400==0)));   
}   
function get_month_day( year , month ){
	//if( is_num(month) )return 1;
	
	switch( month ) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12: return 31;
		case 4:
		case 6:
		case 9:
		case 11: return 30;
		case 2:  return  ( is_leap_year( year )? 29 : 28 );
		default : return 1;
	}
}
