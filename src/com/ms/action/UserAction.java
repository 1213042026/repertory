package com.ms.action;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.ms.dao.UserDao;
import com.ms.model.User;
import com.ms.util.DButil;
import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends ActionSupport implements ServletRequestAware{
	private String error;
	private User user;
	private UserDao userdao=new UserDao();
	private DButil dbutil=new DButil();
	private HttpServletRequest req;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	@Override
	public String execute() throws Exception {
		HttpSession session=req.getSession();
		Connection con=dbutil.getCon();
		User resultUser=userdao.findUser(con, user);
		if(resultUser!=null){
			session.setAttribute("currentuser", resultUser);
			return SUCCESS;
		}else{
			error="�û������������";
			return ERROR;
		}
	}
	public String loginOut(){
		HttpSession session=req.getSession();
		session.removeAttribute("currentuser");
		return "error";
	}
	public String isLogin() throws Exception{
		HttpSession session=req.getSession();
		Object o=session.getAttribute("currentuser");
		if(o==null||!(o instanceof User)){
			return "error";
		}else{
			return "success";
		}
	}
	@Override
	public void setServletRequest(HttpServletRequest req) {
		this.req=req;
	}
}
