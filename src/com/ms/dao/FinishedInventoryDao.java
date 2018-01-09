package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.FinishedInventory;
import com.ms.util.DButil;

public class FinishedInventoryDao implements BaseDao<FinishedInventory> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_finished_inventory", pagebean, keyword, "finishedmaterialnumber");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_finished_inventory", keyword, "finishedmaterialnumber");
	}

	@Override
	public int insert(FinishedInventory finishedInventory) {
		String sql="insert into t_finished_inventory(finishedmaterialnumber, restcount) values (?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, finishedInventory.getFinishedMaterialNumber());
			pst.setString(2, finishedInventory.getRestCount());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(FinishedInventory finishedInventory) {
		String sql="update t_finished_inventory set finishedmaterialnumber=?,restcount=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, finishedInventory.getFinishedMaterialNumber());
			pst.setString(2, finishedInventory.getRestCount());
			pst.setInt(3, finishedInventory.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_finished_inventory where id in ("+delIds+")";
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
