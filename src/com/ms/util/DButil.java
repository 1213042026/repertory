package com.ms.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.ms.model.PageBean;

public class DButil {
	public static Connection getCon()throws Exception{
		String url="jdbc:mysql://localhost:3306/db_repertory?characterEncoding=utf8";
		String name="root";
		String pwd="root";
		String driver="com.mysql.jdbc.Driver";
		Class.forName(driver);
		Connection con=DriverManager.getConnection(url, name, pwd);
		return con;
	}
	public static void close(Connection con)throws Exception{
		if(con!=null){
			con.close();
		}
	}
	
	public static ResultSet queryList(String sql, PageBean pagebean){
		StringBuffer sb=new StringBuffer(sql);
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
	
	public static int queryCount(String sql) {
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			ResultSet rs=pst.executeQuery();
			if(rs.next()){
				return rs.getInt("total");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public static ResultSet queryList(String sql, PageBean pagebean, String keyword, String field){
		StringBuffer sb=new StringBuffer(sql);
		if(StringUtil.isNotEmpty(keyword)){
			sb.append(" and " + field + " like '%"+keyword+"%'");
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

	public static int queryCount(String sql, String keyword, String field) {
		StringBuffer sb=new StringBuffer(sql);
		if(StringUtil.isNotEmpty(keyword)){
			sb.append(" and " + field + " like '%"+keyword+"%'");
		}
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sb.toString());
			ResultSet rs=pst.executeQuery();
			if(rs.next()){
				return rs.getInt("total");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public static int deleteByIds(String sql) {
		try {
			Connection con=DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public static Object queryOneRecordField(String sql) {
		try {
			Connection con=DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			ResultSet rs=pst.executeQuery();
			if(rs.next()){
				return rs.getObject(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
