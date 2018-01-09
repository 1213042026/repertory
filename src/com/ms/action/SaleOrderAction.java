package com.ms.action;

import java.sql.ResultSet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.ms.dao.BaseDao;
import com.ms.dao.SaleOrderDao;
import com.ms.model.SaleOrder;
import com.ms.model.PageBean;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class SaleOrderAction extends ActionSupport{
	private String saleOrderNumber;
	private String finishedMaterialNumber;
	private String delIds;
	private String saleOrderId;
	private SaleOrder saleOrder;
	private String page;
	private String rows;
	public String getSaleOrderNumber() {
		return saleOrderNumber;
	}
	public void setSaleOrderNumber(String saleOrderNumber) {
		this.saleOrderNumber = saleOrderNumber;
	}
	public String getFinishedMaterialNumber() {
		return finishedMaterialNumber;
	}
	public void setFinishedMaterialNumber(String finishedMaterialNumber) {
		this.finishedMaterialNumber = finishedMaterialNumber;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
	public String getSaleOrderId() {
		return saleOrderId;
	}
	public void setSaleOrderId(String saleOrderId) {
		this.saleOrderId = saleOrderId;
	}
	public SaleOrder getSaleOrder() {
		return saleOrder;
	}
	public void setSaleOrder(SaleOrder saleOrder) {
		this.saleOrder = saleOrder;
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

	BaseDao<SaleOrder> baseDao=new SaleOrderDao();
	JSONObject result=new JSONObject();

	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=baseDao.getList(pagebean, saleOrderNumber);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=baseDao.getCount(saleOrderNumber);
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
			if(StringUtil.isNotEmpty(saleOrderId)){
				saleOrder.setId(Integer.parseInt(saleOrderId));
				saveNums=baseDao.update(saleOrder);
			}else{
				saveNums=baseDao.insert(saleOrder);
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

	public String review()throws Exception{
		try {
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(finishedMaterialNumber) && StringUtil.isNotEmpty(saleOrderId)){
				int resultCode = ((SaleOrderDao) baseDao).review(finishedMaterialNumber, saleOrderId);
				if (resultCode == 0) {
					result.put("result", "fail");
				} else {
					result.put("result", "success");
				}
			} else {
				result.put("result", "fail");
			}
			
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String reviewList() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=((SaleOrderDao) baseDao).getReviewList(pagebean);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=((SaleOrderDao) baseDao).getReviewCount();
			result.put("rows", jsonarray);
			result.put("total", total);
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String out()throws Exception{
		try {
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(saleOrderId)){
				int resultCode = ((SaleOrderDao) baseDao).out(saleOrderId);
				if (resultCode == 0) {
					result.put("result", "fail");
				} else {
					result.put("result", "success");
				}
			} else {
				result.put("result", "fail");
			}
			
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
