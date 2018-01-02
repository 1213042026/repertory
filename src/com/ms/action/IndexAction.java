package com.zhuxiaoxuan.action;

import java.sql.Connection;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuxiaoxuan.dao.MailTypeDao;
import com.zhuxiaoxuan.model.MailType;
import com.zhuxiaoxuan.util.DButil;

public class IndexAction extends ActionSupport implements ServletRequestAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static MailTypeDao mailtypedao=new MailTypeDao();
	private static ArrayList<MailType> mailtypeList;
	private static DButil dbutil=new DButil();
	private HttpServletRequest req;
	public String execute() throws Exception {
		HttpSession session=req.getSession();
		session.setAttribute("mailtypeList", mailtypeList);
		return "index";
	}
	static {
		Connection con=null;
		try {
			con=dbutil.getCon();
			mailtypeList=mailtypedao.getMailTypeList();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				dbutil.close(con);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	@Override
	public void setServletRequest(HttpServletRequest req) {
		this.req=req;
	}
	
}
