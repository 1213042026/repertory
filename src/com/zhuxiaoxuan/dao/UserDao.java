package com.zhuxiaoxuan.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.zhuxiaoxuan.model.User;

public class UserDao {
	public User findUser(Connection con,User user)throws Exception{
		User resultUser=null;
		String sql="select * from t_admin where username=? and userpwd=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, user.getUserName());
		pst.setString(2, user.getUserPwd());
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			resultUser=new User();
			resultUser.setUserName(rs.getString("username"));
			resultUser.setUserPwd("userpwd");
		}
		return resultUser;
	}
}
