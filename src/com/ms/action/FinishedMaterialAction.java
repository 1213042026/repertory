package com.ms.action;

import java.sql.ResultSet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.ms.dao.BaseDao;
import com.ms.dao.FinishedMaterialDao;
import com.ms.model.FinishedMaterial;
import com.ms.model.PageBean;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class FinishedMaterialAction extends ActionSupport{
	private String finishedMaterialNumber;
	private String delIds;
	private String finishedMaterialId;
	private FinishedMaterial finishedMaterial;
	private String page;
	private String rows;
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
	
	public String getFinishedMaterialId() {
		return finishedMaterialId;
	}
	public void setFinishedMaterialId(String finishedMaterialId) {
		this.finishedMaterialId = finishedMaterialId;
	}
	public FinishedMaterial getFinishedMaterial() {
		return finishedMaterial;
	}
	public void setFinishedMaterial(FinishedMaterial finishedMaterial) {
		this.finishedMaterial = finishedMaterial;
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

	BaseDao<FinishedMaterial> baseDao=new FinishedMaterialDao();
	JSONObject result=new JSONObject();

	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=baseDao.getList(pagebean, finishedMaterialNumber);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=baseDao.getCount(finishedMaterialNumber);
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
			if(StringUtil.isNotEmpty(finishedMaterialId)){
				finishedMaterial.setId(Integer.parseInt(finishedMaterialId));
				saveNums=baseDao.update(finishedMaterial);
			}else{
				saveNums=baseDao.insert(finishedMaterial);
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
