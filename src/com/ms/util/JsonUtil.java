package com.ms.util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.mysql.jdbc.ResultSetMetaData;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JsonUtil {
	public static JSONArray fromrstoJsonArray(ResultSet rs) throws SQLException{
		JSONArray array=new JSONArray();
		//��ȡ��
		ResultSetMetaData metadata=(ResultSetMetaData) rs.getMetaData();
		int columns=metadata.getColumnCount();
		//����ResultSet
		while(rs.next()){
			JSONObject jsonobj=new JSONObject();
			for(int i=1;i<=columns;i++){
				String columnName=metadata.getColumnName(i);
				String columnValue=rs.getString(columnName);
				Object o=rs.getObject(i);
				if(o instanceof Date){
					jsonobj.put(columnName, DateUtil.formatDate((Date)o, "yyyy-MM-dd"));
				}else{
					jsonobj.put(columnName, columnValue);
				}				
			}
			array.add(jsonobj);
		}
		return array;
	}
}
