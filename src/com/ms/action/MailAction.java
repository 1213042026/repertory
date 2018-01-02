package com.ms.action;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ms.dao.CustomerDao;
import com.ms.dao.MailDao;
import com.ms.dao.MailTypeDao;
import com.ms.model.Mail;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.ExcelUtil;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class MailAction extends ActionSupport implements ServletRequestAware{
	private String exportIds;
	private String mailtypeId;
	private HttpServletRequest req;
	private String s_mailNumber="";
	private String delIds;
	private String mailId;
	private Mail mail;
	private String page;
	private String rows;
	private File mailUploadFile;
	public File getMailUploadFile() {
		return mailUploadFile;
	}
	public void setMailUploadFile(File mailUploadFile) {
		this.mailUploadFile = mailUploadFile;
	}
	public String getExportIds() {
		return exportIds;
	}
	public void setExportIds(String exportIds) {
		this.exportIds = exportIds;
	}
	public String getMailtypeId() {
		return mailtypeId;
	}
	public void setMailtypeId(String mailtypeId) {
		this.mailtypeId = mailtypeId;
	}
	public String getS_mailNumber() {
		return s_mailNumber;
	}
	public void setS_mailNumber(String s_mailNumber) {
		this.s_mailNumber = s_mailNumber;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	public String getMailId() {
		return mailId;
	}
	public void setMailId(String mailId) {
		this.mailId = mailId;
	}
	public Mail getMail() {
		return mail;
	}
	public void setMail(Mail mail) {
		this.mail = mail;
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
	MailDao maildao=new MailDao();
	JSONObject result=new JSONObject();
	CustomerDao customerdao=new CustomerDao();
	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			if(mail==null){
				mail=new Mail();
			}
			mail.setMailNumber(s_mailNumber);
			ResultSet rs=maildao.mailList(pagebean,mail);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=maildao.mailCount(mail);
			result.put("rows", jsonarray);
			result.put("total", total);
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(rows+","+page);
		return null;
	}
	public String save()throws Exception{
		if(StringUtil.isNotEmpty(mailId)){
			mail.setMailId(Integer.parseInt(mailId));
		}
		try {
			int saveNums=0;
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(mailId)){
				saveNums=maildao.mailModify(mail);
			}else{
				//���Ϊ����Ϊ���
				saveNums=maildao.mailAdd(mail);
			}
			if(saveNums>0){
				result.put("success", "true");
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
			boolean f=maildao.getMailByCustomerId(str[i]);
			if(f){
				result.put("errorIndex", i);
				result.put("error", "��Ӧ��������Ʒ������ɾ��");
				ResponseWrite.write(result, ServletActionContext.getResponse());
				return null;
			}
		}
		int delNums=maildao.mailDelete(delIds);
		if(delNums>0){
			result.put("success", "true");
			result.put("delNums", delNums);
		}else{
			result.put("error", "ɾ��ʧ��");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String mailComboList(){
		MailDao maildao=new MailDao();
		ResultSet rs=maildao.mailList(null,null);
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
	public String getmailbyType() throws Exception{
		req.setAttribute("mailPage", "/view/show/default.jsp");
		String sql="";
		if(mailtypeId=="" ||mailtypeId==null){
			sql="SELECT * FROM t_mail t1,t_mailtype t2 WHERE t1.mailtypeId=t2.mailtypeId ORDER BY t1.mailId desc";
		}else{
			sql="select * from t_mail t1,t_mailtype t2 where t1.mailtypeId=t2.mailtypeId and t1.mailtypeId="+mailtypeId+" order by t1.mailId desc";
		}
		ArrayList<Mail> searchMailList=maildao.getMailList(sql);
		req.setAttribute("searchMailList", searchMailList);
		return "searchMail";
	}
	public String export() throws Exception{
		//String str[]=exportIds.split(",");
		Connection con=null;
		try {
			con=DButil.getCon();
			Workbook wb=new HSSFWorkbook();
			String headers[]={"���","��Ʒ����","��Ʒ����","��Ӧ��","��Ʒ���","��Ʒ����"};
			ResultSet rs=maildao.getExportmailList(exportIds);
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
	public String upload()throws Exception{
		POIFSFileSystem fs=new POIFSFileSystem(new FileInputStream(mailUploadFile));
		HSSFWorkbook wb=new HSSFWorkbook(fs);
		HSSFSheet sheet=wb.getSheetAt(0);//��ȡ��һ��sheetҳ
		if(sheet!=null){
			for(int rowNum=1;rowNum<=sheet.getLastRowNum();rowNum++){
				HSSFRow hssfRow=sheet.getRow(rowNum);
				if(hssfRow==null){
					continue;
				}
				Mail mail=new Mail();
				mail.setMailId(Integer.parseInt(ExcelUtil.formatCell(hssfRow.getCell(0))));
				mail.setMailNumber(ExcelUtil.formatCell(hssfRow.getCell(1)));
				mail.setMailName(ExcelUtil.formatCell(hssfRow.getCell(2)));
				mail.setCustomerId(Integer.parseInt(ExcelUtil.formatCell(hssfRow.getCell(3))));
				mail.setMailtypeId(Integer.parseInt(ExcelUtil.formatCell(hssfRow.getCell(4))));
				mail.setMailDesc(ExcelUtil.formatCell(hssfRow.getCell(5)));
				int a=maildao.mailAdd(mail);
				System.out.println(a);
			}
		}
		JSONObject result=new JSONObject();
		result.put("success", "true");
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	@Override
	public void setServletRequest(HttpServletRequest req) {
		this.req=req;
	}
	
	
}
