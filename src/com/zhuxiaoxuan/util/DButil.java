package com.zhuxiaoxuan.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DButil {
	/**
	 * 获取连接
	 */
	public static Connection getCon()throws Exception{
		String url="jdbc:mysql://localhost:3306/db_kucun";
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
	public static void main(String[] args)throws Exception {
		Connection con=DButil.getCon();
		System.out.println(con);
	}
}
