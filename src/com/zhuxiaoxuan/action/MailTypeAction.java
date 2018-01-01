package com.zhuxiaoxuan.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuxiaoxuan.dao.MailTypeDao;
import com.zhuxiaoxuan.model.MailType;
import com.zhuxiaoxuan.model.PageBean;
import com.zhuxiaoxuan.util.DButil;
import com.zhuxiaoxuan.util.ExcelUtil;
import com.zhuxiaoxuan.util.JsonUtil;
import com.zhuxiaoxuan.util.ResponseUtil;
import com.zhuxiaoxuan.util.ResponseWrite;
import com.zhuxiaoxuan.util.StringUtil;

public class MailTypeAction extends ActionSupport{
	private String delIds;
	private String mailtypeId;
	private String s_mailtypeName="";
	private MailType mailtype;
	private String page;
	private String rows;
	private String exportIds;
	
	public String getExportIds() {
		return exportIds;
	}
	public void setExportIds(String exportIds) {
		this.exportIds = exportIds;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	public String getS_mailtypeName() {
		return s_mailtypeName;
	}
	public String getMailtypeId() {
		return mailtypeId;
	}
	public void setMailtypeId(String mailtypeId) {
		this.mailtypeId = mailtypeId;
	}
	public void setS_mailtypeName(String s_mailtypeName) {
		this.s_mailtypeName = s_mailtypeName;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getRows() {
		return rows;
	}
	public void setRows(String rows) {
		this.rows = rows;
	}
	public MailType getMailtype() {
		return mailtype;
	}
	MailTypeDao mailtypedao=new MailTypeDao();
	JSONObject result=new JSONObject();
	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		if(mailtype==null){
			mailtype=new MailType();
		}
		mailtype.setMailtypeName(s_mailtypeName);
		ResultSet rs=mailtypedao.mailtypeList(pagebean, mailtype);
		JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
		int total=mailtypedao.mailtypeCount(mailtype);
		result.put("rows", jsonarray);
		result.put("total", total);
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}


	public void setMailtype(MailType mailtype) {
		this.mailtype = mailtype;
	}

	public String mailtypeComboList(){
		MailTypeDao mailtypedao=new MailTypeDao();
		ResultSet rs=mailtypedao.mailtypeList(null,null);
		try {
			JSONArray jsonarray=jsonarray=JsonUtil.fromrstoJsonArray(rs);
			ResponseWrite.write(jsonarray, ServletActionContext.getResponse());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public String save()throws Exception{
		if(StringUtil.isNotEmpty(mailtypeId)){
			mailtype.setMailtypeId(Integer.parseInt(mailtypeId));
		}
		int saveNums=0;
		JSONObject result=new JSONObject();
		if(StringUtil.isNotEmpty(mailtypeId)){
			saveNums=mailtypedao.mailtypeModify(mailtype);
		}else{
			saveNums=mailtypedao.mailtypeAdd(mailtype);
		}
		if(saveNums>0){
			result.put("success", "true");
		}else{
			result.put("success", "true");
			result.put("error", "保存失败");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String delete()throws Exception{
		String str[]=delIds.split(",");
		for(int i=0;i<str.length;i++){
			boolean f=mailtypedao.getMailByMailtypeId(str[i]);
			if(f){
				result.put("errorIndex", i);
				result.put("error", "下面有商品，不能删除");
				ResponseWrite.write(result, ServletActionContext.getResponse());
				return null;
			}
		}
		int delNums=mailtypedao.mailtypeDelete(delIds);
		if(delNums>0){
			result.put("success", "true");
			result.put("delNums", delNums);
		}else{
			result.put("error", "删除失败");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String export() throws Exception{
		//String str[]=exportIds.split(",");
		Connection con=null;
		try {
			con=DButil.getCon();
			Workbook wb=new HSSFWorkbook();
			String headers[]={"编号","商品类别名称","商品类别描述"};
			ResultSet rs=mailtypedao.getExportmailtypeList(exportIds);
			ExcelUtil.fillExcelData(rs, wb, headers);
			ResponseUtil.export(ServletActionContext.getResponse(), wb, "导出excel.xls");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			try {
				DButil.close(con);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}
}
