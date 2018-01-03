package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

import com.ms.model.User;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.StringUtil;

public class EmployeeDao {
	
	public ResultSet employeeList(PageBean pagebean,String employeeNumber){
		StringBuffer sb=new StringBuffer("select * from t_employee");
		if(StringUtil.isNotEmpty(employeeNumber)){
			sb.append(" and number like '%"+employeeNumber+"%'");
		}
		if(pagebean!=null){
			sb.append(" limit "+pagebean.getStart()+","+pagebean.getRows());
		}
		
		Connection con=null;
		ResultSet rs=null;
		try {
			con=DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sb.toString().replaceFirst("and", "where"));
			System.out.println(sb);
			rs=pst.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

	public int employeeCount(String employeeNumber)throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_employee");
		if(StringUtil.isNotEmpty(employeeNumber)){
			sb.append(" where number like '%"+employeeNumber+"%'");
		}
		Connection con= DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sb.toString());
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return rs.getInt("total");
		}else{
			return 0;
		}
	}
	public int addEmployee(User user)throws Exception{
		String sql="insert into t_employee(number, rolenumber, username, userpwd, joindate) values (?,?,?,?,?)";
		Connection con= DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, user.getNumber());
		pst.setString(2, user.getRoleNumber());
		pst.setString(3, user.getUserName());
		pst.setString(4, user.getUserPwd());
		pst.setTimestamp(5, new Timestamp(user.getDate().getTime()));
		return pst.executeUpdate();
	}

	public int updateEmployee(User user)throws Exception{
		Connection con= DButil.getCon();
		String sql="update t_employee set number=?,rolenumber=?,username=?,userpwd=?,joindate=? where id=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, user.getNumber());
		pst.setString(2, user.getRoleNumber());
		pst.setString(3, user.getUserName());
		pst.setString(4, user.getUserPwd());
		pst.setTimestamp(5, new Timestamp(user.getDate().getTime()));
		pst.setInt(6, user.getId());
		return pst.executeUpdate();
	}

	public int deleteByIds(String delIds) throws Exception{
		String sql="delete from t_employee where id in ("+delIds+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		return pst.executeUpdate();
	}
}
