$(document).ready(function(){
   
});
String.prototype.trim=function() {
	return this.replace(/\s+/g,'');
}
String.prototype.ltrim=function() {
	return this.replace(/^(\s+)/g,'');
}
String.prototype.rtrim=function() {
	return this.replace(/(\s+)$/g,'');
}
String.prototype.alltrim=function() {
	return this.replace(/(^\s+)|(\s+$)/g,'');
}
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
} 
function formatSeconds(value) {  
    var theTime = Number(value);  
	var theTime1 = 0;  
	var theTime2 = 0;  
	if(theTime > 60) {  
		theTime1 = Number(theTime/60);  
		theTime = Number(theTime%60);   
		if(theTime1 > 60) {  
			theTime2 = Number(theTime1/60);  
			theTime1 = Number(theTime1%60);  
		}  
	}
	var result = "";
	if (theTime < 10) {
		result+="0"+theTime;  
	} else {
		result+=theTime;  
	} 
	if(theTime1 > 0) {
		if (theTime1 < 10) {
			result="0"+parseInt(theTime1)+"："+result;
		} else {
			result=parseInt(theTime1)+"："+result;
		}
	} else {
		result = "00："+result;
	}
	if(theTime2 > 0) {		
		if (theTime2 < 10) {
			result="0"+parseInt(theTime2)+"："+result;
		} else {
			result=parseInt(theTime2)+"："+result;
		} 
	} else {
		result="00："+result;
	}
	return result;  
}  
