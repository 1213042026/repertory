package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

import com.ms.model.PageBean;
import com.ms.model.FinishedMaterial;
import com.ms.util.DButil;

public class FinishedMaterialDao implements BaseDao<FinishedMaterial> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_finished_material", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_finished_material", keyword, "number");
	}

	@Override
	public int insert(FinishedMaterial finishedMaterial) {
		String sql="insert into t_finished_material(number, name, price, danwei, catagory) values (?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, finishedMaterial.getNumber());
			pst.setString(2, finishedMaterial.getName());
			pst.setString(3, finishedMaterial.getPrice());
			pst.setString(4, finishedMaterial.getDanWei());
			pst.setString(5, finishedMaterial.getCatagory());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(FinishedMaterial finishedMaterial) {
		String sql="update t_finished_material set number=?,name=?,price=?, danwei=?,catagory=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, finishedMaterial.getNumber());
			pst.setString(2, finishedMaterial.getName());
			pst.setString(3, finishedMaterial.getPrice());
			pst.setString(4, finishedMaterial.getDanWei());
			pst.setString(5, finishedMaterial.getCatagory());
			pst.setInt(6, finishedMaterial.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_finished_material where id in ("+delIds+")";
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
