package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.ms.model.User;

public class UserDao {
	public User findUser(Connection con,User user)throws Exception{
		User resultUser=null;
		String sql="select * from t_employee where username=? and userpwd=? and rolenumber=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, user.getUserName());
		pst.setString(2, user.getUserPwd());
		pst.setString(3, user.getRoleNumber());
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			resultUser=new User();
			resultUser.setUserName(rs.getString("username"));
			resultUser.setUserPwd("userpwd");
		}
		return resultUser;
	}
}
