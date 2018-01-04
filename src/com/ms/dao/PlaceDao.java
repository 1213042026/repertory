package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.Place;
import com.ms.util.DButil;

public class PlaceDao implements BaseDao<Place> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_place", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_place", keyword, "number");
	}

	@Override
	public int insert(Place place) {
		String sql="insert into t_place(number, name, storenumber, remark) values (?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, place.getNumber());
			pst.setString(2, place.getName());
			pst.setString(3, place.getStoreNumber());
			pst.setString(4, place.getRemark());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(Place place) {
		String sql="update t_place set number=?,name=?,remark=?, storenumber=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, place.getNumber());
			pst.setString(2, place.getName());
			pst.setString(3, place.getRemark());
			pst.setString(4, place.getStoreNumber());
			pst.setInt(5, place.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_place where id in ("+delIds+")";
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
