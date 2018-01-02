package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import com.ms.model.Role;
import com.ms.util.DButil;

public class RoleDao {
	public ArrayList<Role> getRoleList(String sql) throws Exception{
		Connection con=DButil.getCon();
		if(sql=="" ||sql==null){
			sql="select * from t_role";
		}
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		ArrayList<Role> rolelist=new ArrayList<Role>();
		while(rs.next()){
			Role role=new Role();
			role.setName(rs.getString("name"));
			role.setNumber(rs.getString("number"));
			rolelist.add(role);
		}
		return rolelist;
	}
}
