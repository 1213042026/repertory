package com.ms.action;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;

import com.ms.dao.RoleDao;
import com.ms.dao.UserDao;
import com.ms.model.Role;
import com.ms.model.User;
import com.ms.util.DButil;
import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends ActionSupport implements ServletRequestAware{
	private String error;
	private User user;
	private String number;
	private UserDao userdao=new UserDao();
	private RoleDao roleDao=new RoleDao();
	private DButil dbutil=new DButil();
	private HttpServletRequest req;
	private ArrayList<Role> rolelist = null;
	private Role role;
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
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
	
	public ArrayList<Role> getRolelist() {
		return rolelist;
	}
	public void setRolelist(ArrayList<Role> rolelist) {
		this.rolelist = rolelist;
	}
	@Override
	public String execute() throws Exception {
		HttpSession session=req.getSession();
		Connection con=dbutil.getCon();
		user.setRoleNumber(number);
		User resultUser=userdao.findUser(con, user);
		if(resultUser!=null){
			session.setAttribute("currentuser", resultUser);
			return SUCCESS;
		}else{
			rolelist = roleDao.getRoleList("");
			req.setAttribute("rolelist", rolelist);
			error="用户名或密码或角色错误";
			return ERROR;
		}
	}
	public String loginOut()throws Exception {
		HttpSession session=req.getSession();
		session.removeAttribute("currentuser");
		rolelist = roleDao.getRoleList("");
		req.setAttribute("rolelist", rolelist);
		return "error";
	}
	public String isLogin() throws Exception{
		HttpSession session=req.getSession();
		Object o=session.getAttribute("currentuser");
		if(o==null||!(o instanceof User)){
			rolelist = roleDao.getRoleList("");
			req.setAttribute("rolelist", rolelist);
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
