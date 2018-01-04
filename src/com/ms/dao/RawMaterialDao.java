package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.RawMaterial;
import com.ms.util.DButil;

public class RawMaterialDao implements BaseDao<RawMaterial> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_raw_material", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_raw_material", keyword, "number");
	}

	@Override
	public int insert(RawMaterial rawMaterial) {
		String sql="insert into t_raw_material(number, name, price, buyer, buydate, catagory) values (?,?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, rawMaterial.getNumber());
			pst.setString(2, rawMaterial.getName());
			pst.setString(3, rawMaterial.getPrice());
			pst.setString(4, rawMaterial.getBuyer());
			pst.setString(5, rawMaterial.getBuyDate());
			pst.setString(6, rawMaterial.getCatagory());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(RawMaterial rawMaterial) {
		String sql="update t_raw_material set number=?,name=?,price=?, buyer=?,buydate=?,catagory=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, rawMaterial.getNumber());
			pst.setString(2, rawMaterial.getName());
			pst.setString(3, rawMaterial.getPrice());
			pst.setString(4, rawMaterial.getBuyer());
			pst.setString(5, rawMaterial.getBuyDate());
			pst.setString(6, rawMaterial.getCatagory());
			pst.setInt(7, rawMaterial.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_raw_material where id in ("+delIds+")";
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
