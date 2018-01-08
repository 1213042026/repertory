package com.ms.action;

import java.sql.ResultSet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.ms.dao.BaseDao;
import com.ms.dao.SupplierDao;
import com.ms.model.Supplier;
import com.ms.model.PageBean;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class SupplierAction extends ActionSupport{
	private String supplierNumber;
	private String delIds;
	private String supplierId;
	private Supplier supplier;
	private String page;
	private String rows;
	public String getSupplierNumber() {
		return supplierNumber;
	}
	public void setSupplierNumber(String supplierNumber) {
		this.supplierNumber = supplierNumber;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
	public String getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}
	public Supplier getSupplier() {
		return supplier;
	}
	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
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

	BaseDao<Supplier> baseDao=new SupplierDao();
	JSONObject result=new JSONObject();

	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=baseDao.getList(pagebean, supplierNumber);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=baseDao.getCount(supplierNumber);
			result.put("rows", jsonarray);
			result.put("total", total);
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String save()throws Exception{
		try {
			int saveNums=0;
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(supplierId)){
				supplier.setId(Integer.parseInt(supplierId));
				saveNums=baseDao.update(supplier);
			}else{
				saveNums=baseDao.insert(supplier);
			}
			if(saveNums>0){
				result.put("result", "success");
			}else{
				result.put("result", "fail");
			}
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String delete()throws Exception{		
		int delNums=baseDao.deleteByIds(delIds);

		if(delNums>0){
			result.put("result", "success");
			result.put("delNums", delNums);
		}else{
			result.put("result", "fail");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
}
