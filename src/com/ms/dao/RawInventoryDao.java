package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.RawInventory;
import com.ms.util.DButil;

public class RawInventoryDao implements BaseDao<RawInventory> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_raw_inventory", pagebean, keyword, "rawmaterialnumber");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_raw_inventory", keyword, "rawmaterialnumber");
	}

	@Override
	public int insert(RawInventory rawInventory) {
		String sql="insert into t_raw_inventory(rawmaterialnumber, restcount) values (?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, rawInventory.getRawMaterialNumber());
			pst.setString(2, rawInventory.getRestCount());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(RawInventory rawInventory) {
		String sql="update t_raw_inventory set rawmaterialnumber=?,restcount=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, rawInventory.getRawMaterialNumber());
			pst.setString(2, rawInventory.getRestCount());
			pst.setInt(3, rawInventory.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_raw_inventory where id in ("+delIds+")";
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
