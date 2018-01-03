package com.ms.dao;

import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.util.DButil;

public class PermissionDao implements BaseDao {

	@Override
	public ResultSet getList(PageBean pagebean) {
		return DButil.queryList("select * from t_permission", pagebean);
	}

	@Override
	public int getCount() {
		return DButil.queryCount("select count(*) as total from t_permission");
	}
}
