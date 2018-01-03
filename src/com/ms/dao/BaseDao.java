package com.ms.dao;

import java.sql.ResultSet;
import com.ms.model.PageBean;

public interface BaseDao {
	public ResultSet getList(PageBean pagebean);
	public int getCount();
}
