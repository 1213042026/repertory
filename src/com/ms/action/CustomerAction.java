package com.ms.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts2.ServletActionContext;

import com.ms.dao.CustomerDao;
import com.ms.dao.MailDao;
import com.ms.model.Customer;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.ExcelUtil;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class CustomerAction extends ActionSupport{
	private String s_customerNumber="";
	private String delIds;
	private String customerId;
	private Customer customer;
	private String page;
	private String rows;
	private String exportIds;
	public String getExportIds() {
		return exportIds;
	}
	public void setExportIds(String exportIds) {
		this.exportIds = exportIds;
	}
	public String getS_customerNumber() {
		return s_customerNumber;
	}
	public void setS_customerNumber(String s_customerNumber) {
		this.s_customerNumber = s_customerNumber;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
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
	CustomerDao customerdao=new CustomerDao();
	MailDao maildao=new MailDao();
	JSONObject result=new JSONObject();
	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			if(customer==null){
				customer=new Customer();
			}
			customer.setCustomerNumber(s_customerNumber);
			ResultSet rs=customerdao.customerList(pagebean,customer);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=customerdao.customerCount(customer);
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
		if(StringUtil.isNotEmpty(customerId)){
			customer.setCustomerId(Integer.parseInt(customerId));
		}
		try {
			int saveNums=0;
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(customerId)){
				saveNums=customerdao.customerModify(customer);
			}else{
				//���Ϊ����Ϊ���
				saveNums=customerdao.customerAdd(customer);
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
			boolean f=maildao.getCustomerByCustomerId(str[i]);
			if(f){
				result.put("errorIndex", i);
				result.put("error", "��Ӧ��������Ʒ������ɾ��");
				ResponseWrite.write(result, ServletActionContext.getResponse());
				return null;
			}
		}
		int delNums=customerdao.customerDelete(delIds);
		if(delNums>0){
			result.put("success", "true");
			result.put("delNums", delNums);
		}else{
			result.put("error", "ɾ��ʧ��");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String customerComboList()throws Exception{
		CustomerDao gradedao=new CustomerDao();
		ResultSet rs=gradedao.customerList(null, null);
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
	public String export() throws Exception{
		//String str[]=exportIds.split(",");
		Connection con=null;
		try {
			con=DButil.getCon();
			Workbook wb=new HSSFWorkbook();
			String headers[]={"���","��Ӧ�̱���","��Ӧ������","��ϵ��","��ϵ�绰","��ע"};
			ResultSet rs=customerdao.getExportcustomerList(exportIds);
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
