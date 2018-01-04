package com.ms.dao;

import java.sql.ResultSet;
import com.ms.model.PageBean;

public interface BaseDao<T> {
	public ResultSet getList(PageBean pagebean);
	public ResultSet getList(PageBean pagebean, String keyword);
	public int getCount();
	public int getCount(String keyword);
	public int insert(T t);
	public int update(T t);
	public int deleteByIds(String delIds);
}
