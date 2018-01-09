package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

import com.ms.model.PageBean;
import com.ms.model.IntoStorage;
import com.ms.util.DButil;

public class IntoStorageDao implements BaseDao<IntoStorage> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_into_storage", pagebean, keyword, "finishedmaterialnumber");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_into_storage", keyword, "finishedmaterialnumber");
	}

	@Override
	public int insert(IntoStorage intoStorage) {
		String sql="insert into t_into_storage(finishedmaterialnumber, finishedmaterialname, count, producecenter, storenumber, placenumber, remark) values (?,?,?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, intoStorage.getFinishedMaterialNumber());
			pst.setString(2, intoStorage.getFinishedMaterialName());
			pst.setInt(3, Integer.parseInt(intoStorage.getCount()));
			pst.setString(4, intoStorage.getProduceCenter());
			pst.setString(5, intoStorage.getStoreNumber());
			pst.setString(6, intoStorage.getPlaceNumber());
			pst.setString(7, intoStorage.getRemark());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(IntoStorage intoStorage) {
		String sql="update t_into_storage set finishedmaterialnumber=?,finishedmaterialname=?,count=?, producecenter=?, storenumber=?, placenumber=?, remark=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, intoStorage.getFinishedMaterialNumber());
			pst.setString(2, intoStorage.getFinishedMaterialName());
			pst.setInt(3, Integer.parseInt(intoStorage.getCount()));
			pst.setString(4, intoStorage.getProduceCenter());
			pst.setString(5, intoStorage.getStoreNumber());
			pst.setString(6, intoStorage.getPlaceNumber());
			pst.setString(7, intoStorage.getRemark());
			pst.setInt(8, intoStorage.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public int into(String intoStorageId) {
		String sql="update t_into_storage set isinto=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, "已入库");
			pst.setInt(2, Integer.parseInt(intoStorageId));
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_into_storage where id in ("+delIds+")";
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
