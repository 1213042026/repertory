package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.Store;
import com.ms.util.DButil;

public class StoreDao implements BaseDao<Store> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_store", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_store", keyword, "number");
	}

	@Override
	public int insert(Store store) {
		String sql="insert into t_store(number, name, remark) values (?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, store.getNumber());
			pst.setString(2, store.getName());
			pst.setString(3, store.getRemark());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(Store store) {
		String sql="update t_store set number=?,name=?,remark=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, store.getNumber());
			pst.setString(2, store.getName());
			pst.setString(3, store.getRemark());
			pst.setInt(4, store.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_store where id in ("+delIds+")";
		String ids[] = delIds.split(",");
		for (String id : ids) {
			Object number = DButil.queryOneRecordField("select number from t_store where id = " + id);
			DButil.deleteByIds("delete from t_place where storenumber = '" + (String)number + "'");
		}
		return DButil.deleteByIds(sql);
	}

	@Override
	public ResultSet getList(PageBean pagebean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return 0;
	}
}
