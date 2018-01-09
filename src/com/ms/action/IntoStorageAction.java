package com.ms.action;

import java.sql.ResultSet;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.ms.dao.BaseDao;
import com.ms.dao.IntoStorageDao;
import com.ms.model.IntoStorage;
import com.ms.model.PageBean;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class IntoStorageAction extends ActionSupport{
	private String finishedMaterialNumber;
	private String delIds;
	private String intoStorageId;
	private IntoStorage intoStorage;
	private String page;
	private String rows;
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
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

	public String getFinishedMaterialNumber() {
		return finishedMaterialNumber;
	}
	public void setFinishedMaterialNumber(String finishedMaterialNumber) {
		this.finishedMaterialNumber = finishedMaterialNumber;
	}
	public String getIntoStorageId() {
		return intoStorageId;
	}
	public void setIntoStorageId(String intoStorageId) {
		this.intoStorageId = intoStorageId;
	}
	public IntoStorage getIntoStorage() {
		return intoStorage;
	}
	public void setIntoStorage(IntoStorage intoStorage) {
		this.intoStorage = intoStorage;
	}

	BaseDao<IntoStorage> baseDao=new IntoStorageDao();
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
			if(StringUtil.isNotEmpty(intoStorageId)){
				intoStorage.setId(Integer.parseInt(intoStorageId));
				saveNums=baseDao.update(intoStorage);
			}else{
				saveNums=baseDao.insert(intoStorage);
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

	public String into()throws Exception{
		try {
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(intoStorageId)){
				int resultCode = ((IntoStorageDao) baseDao).into(intoStorageId);
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
