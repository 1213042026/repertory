package com.ms.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts2.ServletActionContext;

import com.ms.dao.RoleDao;
import com.ms.model.User;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.ExcelUtil;
import com.ms.util.JsonUtil;
import com.ms.util.ResponseUtil;
import com.ms.util.ResponseWrite;
import com.ms.util.StringUtil;
import com.opensymphony.xwork2.ActionSupport;

public class RoleAction extends ActionSupport{
	private String page;
	private String rows;
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

	RoleDao roleDao=new RoleDao();
	JSONObject result=new JSONObject();

	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		try {
			ResultSet rs=roleDao.roleList(pagebean);
			
			JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
			int total=roleDao.roleCount();
			result.put("rows", jsonarray);
			result.put("total", total);
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
