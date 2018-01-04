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

	@Override
	public int insert(Object t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int update(Object t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getCount(String keyword) {
		// TODO Auto-generated method stub
		return 0;
	}
}
