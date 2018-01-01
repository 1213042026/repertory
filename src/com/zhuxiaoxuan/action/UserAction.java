package com.zhuxiaoxuan.action;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuxiaoxuan.dao.UserDao;
import com.zhuxiaoxuan.model.User;
import com.zhuxiaoxuan.util.DButil;

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
			error="用户名或密码错误";
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
			return "success";
		}else{
			return "error";
		}
	}
	@Override
	public void setServletRequest(HttpServletRequest req) {
		this.req=req;
	}
}
