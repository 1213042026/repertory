package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.Supplier;
import com.ms.util.DButil;

public class SupplierDao implements BaseDao<Supplier> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_supplier", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_supplier", keyword, "number");
	}

	@Override
	public int insert(Supplier supplier) {
		String sql="insert into t_supplier(number, name, tel, address, fax, remark) values (?,?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, supplier.getNumber());
			pst.setString(2, supplier.getName());
			pst.setString(3, supplier.getTel());
			pst.setString(4, supplier.getAddress());
			pst.setString(5, supplier.getFax());
			pst.setString(6, supplier.getRemark());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(Supplier supplier) {
		String sql="update t_supplier set number=?,name=?,tel=?,address=?,fax=?,remark=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, supplier.getNumber());
			pst.setString(2, supplier.getName());
			pst.setString(3, supplier.getTel());
			pst.setString(4, supplier.getAddress());
			pst.setString(5, supplier.getFax());
			pst.setString(6, supplier.getRemark());
			pst.setInt(7, supplier.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_supplier where id in ("+delIds+")";
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
