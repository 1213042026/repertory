package com.ms.model;

import java.util.Date;

public class User {
	private Integer id;
	private String number;
	private String roleNumber;
	private String userName;
	private String userPwd;
	private Date date;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPwd() {
		return userPwd;
	}
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
	public String getNumber() {
		return number;
	}
	
	public String getRoleNumber() {
		return roleNumber;
	}
	public void setRoleNumber(String roleNumber) {
		this.roleNumber = roleNumber;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "User [number=" + number + ", roleNumber=" + roleNumber + ", userName=" + userName + ", userPwd=" + userPwd
				+ ", date=" + date + "]";
	}
	
}
