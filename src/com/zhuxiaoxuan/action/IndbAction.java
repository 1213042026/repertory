package com.zhuxiaoxuan.action;

import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuxiaoxuan.dao.IndbDao;
import com.zhuxiaoxuan.dao.MailDao;
import com.zhuxiaoxuan.model.InDb;
import com.zhuxiaoxuan.model.PageBean;
import com.zhuxiaoxuan.util.JsonUtil;
import com.zhuxiaoxuan.util.ResponseWrite;
import com.zhuxiaoxuan.util.StringUtil;

public class IndbAction extends ActionSupport{
	private String delIds;
	private String indbId;
	private String s_binDate;
	private String s_einDate;
	private InDb indb;
	private String page;
	private String rows;
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	public String getIndbId() {
		return indbId;
	}

	public void setIndbId(String indbId) {
		this.indbId = indbId;
	}



	public String getS_binDate() {
		return s_binDate;
	}

	public void setS_binDate(String s_binDate) {
		this.s_binDate = s_binDate;
	}

	public String getS_einDate() {
		return s_einDate;
	}

	public void setS_einDate(String s_einDate) {
		this.s_einDate = s_einDate;
	}

	public InDb getIndb() {
		return indb;
	}

	public void setIndb(InDb indb) {
		this.indb = indb;
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
	IndbDao indbdao=new IndbDao();
	MailDao maildao=new MailDao();
	JSONObject result=new JSONObject();
	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		indb=new InDb();
		ResultSet rs=indbdao.indbList(pagebean, indb, s_binDate, s_einDate);
		JSONObject result=new JSONObject();
		JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
		int total=indbdao.indbCount(indb, s_binDate, s_einDate);
		result.put("rows", jsonarray);
		result.put("total", total);
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String save()throws Exception{
		if(StringUtil.isNotEmpty(indbId)){
			indb.setIndbId(Integer.parseInt(indbId));
		}
		try {
			int saveNums=0;
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(indbId)){
				saveNums=indbdao.indbModify(indb);
			}else{
				//如果为空则为添加
				saveNums=indbdao.indbAdd(indb);
			}
			if(saveNums>0){
				result.put("success", "true");
				result.put("delNums", saveNums);
			}else{
				result.put("success", "true");
				result.put("error", "保存失败");
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
			boolean f=maildao.getIndbByMailId(str[i]);
			if(f){
				result.put("errorIndex", i);
				result.put("error", "下有商品，不能删除");
				ResponseWrite.write(result, ServletActionContext.getResponse());
				return null;
			}
		}
		int delNums=indbdao.indbDelete(delIds);
		if(delNums>0){
			result.put("success", "true");
			result.put("delNums", delNums);
		}else{
			result.put("error", "删除失败");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
}
