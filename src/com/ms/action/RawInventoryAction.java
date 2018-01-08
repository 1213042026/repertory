package com.ms.action;

import java.sql.ResultSet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.ms.dao.BaseDao;
import com.ms.dao.RawInventoryDao;
import com.ms.model.RawInventory;
import com.ms.model.PageBean;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class RawInventoryAction extends ActionSupport{
	private String materialNumber;
	private String delIds;
	private String rawInventoryId;
	private RawInventory rawInventory;
	private String page;
	private String rows;
	public String getMaterialNumber() {
		return materialNumber;
	}
	public void setMaterialNumber(String materialNumber) {
		this.materialNumber = materialNumber;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
	public String getRawInventoryId() {
		return rawInventoryId;
	}
	public void setRawInventoryId(String rawInventoryId) {
		this.rawInventoryId = rawInventoryId;
	}
	public RawInventory getRawInventory() {
		return rawInventory;
	}
	public void setRawInventory(RawInventory rawInventory) {
		this.rawInventory = rawInventory;
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

	BaseDao<RawInventory> baseDao=new RawInventoryDao();
	JSONObject result=new JSONObject();

	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=baseDao.getList(pagebean, materialNumber);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=baseDao.getCount(materialNumber);
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
			if(StringUtil.isNotEmpty(rawInventoryId)){
				rawInventory.setId(Integer.parseInt(rawInventoryId));
				saveNums=baseDao.update(rawInventory);
			}else{
				saveNums=baseDao.insert(rawInventory);
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
