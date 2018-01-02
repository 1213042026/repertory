package com.ms.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts2.ServletActionContext;

import com.ms.dao.MailDao;
import com.ms.dao.OutdbDao;
import com.ms.model.InDb;
import com.ms.model.OutDb;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.ExcelUtil;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class OutdbAction extends ActionSupport{
	private String quater;
	private String exportIds;
	private String delIds;
	private String outdbId;
	private String s_boutDate;
	private String s_eoutDate;
	private OutDb outdb;
	private String page;
	private String rows;
	public String getQuater() {
		return quater;
	}
	public void setQuater(String quater) {
		this.quater = quater;
	}
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
	public String getOutdbId() {
		return outdbId;
	}
	public void setOutdbId(String outdbId) {
		this.outdbId = outdbId;
	}
	public String getS_boutDate() {
		return s_boutDate;
	}
	public void setS_boutDate(String s_boutDate) {
		this.s_boutDate = s_boutDate;
	}
	public String getS_eoutDate() {
		return s_eoutDate;
	}
	public void setS_eoutDate(String s_eoutDate) {
		this.s_eoutDate = s_eoutDate;
	}
	public OutDb getOutdb() {
		return outdb;
	}
	public void setOutdb(OutDb outdb) {
		this.outdb = outdb;
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
	OutdbDao outdbdao=new OutdbDao();
	MailDao maildao=new MailDao();
	JSONObject result=new JSONObject();
	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		outdb=new OutDb();
		ResultSet rs=outdbdao.outdbList(pagebean, outdb, s_boutDate, s_eoutDate);
		JSONObject result=new JSONObject();
		JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
		int total=outdbdao.outdbCount(outdb, s_boutDate, s_eoutDate);
		result.put("rows", jsonarray);
		result.put("total", total);
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String save()throws Exception{
		if(StringUtil.isNotEmpty(outdbId)){
			outdb.setOutdbId(Integer.parseInt(outdbId));
		}
		try {
			int saveNums=0;
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(outdbId)){
				saveNums=outdbdao.outdbModify(outdb);
			}else{ 
				//���Ϊ����Ϊ���
				saveNums=outdbdao.outdbAdd(outdb);
			}
			if(saveNums>0){
				result.put("success", "true");
				result.put("delNums", saveNums);
			}else{
				result.put("success", "true");
				result.put("error", "����ʧ��");
			}
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public String delete()throws Exception{
		String str[]=delIds.split(",");
		for(int i=0;i<str.length;i++){
			boolean f=maildao.getOutdbByMailId(str[i]);
			if(f){
				result.put("errorIndex", i);
				result.put("error", "������Ʒ������ɾ��");
				ResponseWrite.write(result, ServletActionContext.getResponse());
				return null;
			}
		}
		int delNums=outdbdao.outdbDelete(delIds);
		if(delNums>0){
			result.put("success", "true");
			result.put("delNums", delNums);
		}else{
			result.put("error", "ɾ��ʧ��");
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
			String headers[]={"���","��Ʒ����","���ۼ�","��������","����","���ⱸע"};
			ResultSet rs=outdbdao.getExportoutdbList(exportIds);
			ExcelUtil.fillExcelData(rs, wb, headers);
			ResponseUtil.export(ServletActionContext.getResponse(), wb, "����excel.xls");
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
