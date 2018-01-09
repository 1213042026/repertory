package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.Dump;
import com.ms.util.DButil;

public class DumpDao implements BaseDao<Dump> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_dump", pagebean, keyword, "finishedmaterialnumber");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_dump", keyword, "finishedmaterialnumber");
	}

	@Override
	public int insert(Dump dump) {
		String sql="insert into t_dump(finishedmaterialnumber, finishedmaterialname, storenumber, placenumber) values (?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, dump.getFinishedMaterialNumber());
			pst.setString(2, dump.getFinishedMaterialName());
			pst.setString(3, dump.getStoreNumber());
			pst.setString(4, dump.getPlaceNumber());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(Dump dump) {
		String sql="update t_dump set finishedmaterialnumber=?,finishedmaterialname=?,storenumber=?, placenumber=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, dump.getFinishedMaterialNumber());
			pst.setString(2, dump.getFinishedMaterialName());
			pst.setString(3, dump.getStoreNumber());
			pst.setString(4, dump.getPlaceNumber());
			pst.setInt(5, dump.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_dump where id in ("+delIds+")";
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
