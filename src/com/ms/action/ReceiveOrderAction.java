package com.ms.action;

import java.sql.ResultSet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.ms.dao.BaseDao;
import com.ms.dao.ReceiveOrderDao;
import com.ms.model.ReceiveOrder;
import com.ms.model.PageBean;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class ReceiveOrderAction extends ActionSupport{
	private String receiveOrderNumber;
	private String delIds;
	private String receiveOrderId;
	private ReceiveOrder receiveOrder;
	private String page;
	private String rows;
	public String getReceiveOrderNumber() {
		return receiveOrderNumber;
	}
	public void setReceiveOrderNumber(String receiveOrderNumber) {
		this.receiveOrderNumber = receiveOrderNumber;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
	public String getReceiveOrderId() {
		return receiveOrderId;
	}
	public void setReceiveOrderId(String receiveOrderId) {
		this.receiveOrderId = receiveOrderId;
	}
	public ReceiveOrder getReceiveOrder() {
		return receiveOrder;
	}
	public void setReceiveOrder(ReceiveOrder receiveOrder) {
		this.receiveOrder = receiveOrder;
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

	BaseDao<ReceiveOrder> baseDao=new ReceiveOrderDao();
	JSONObject result=new JSONObject();

	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=baseDao.getList(pagebean, receiveOrderNumber);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=baseDao.getCount(receiveOrderNumber);
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
			if(StringUtil.isNotEmpty(receiveOrderId)){
				receiveOrder.setId(Integer.parseInt(receiveOrderId));
				saveNums=baseDao.update(receiveOrder);
			}else{
				saveNums=baseDao.insert(receiveOrder);
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
