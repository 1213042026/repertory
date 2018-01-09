package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import com.ms.model.PageBean;
import com.ms.model.Customer;
import com.ms.util.DButil;

public class CustomerDao implements BaseDao<Customer> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_customer", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_customer", keyword, "number");
	}

	@Override
	public int insert(Customer customer) {
		String sql="insert into t_customer(number, name, tel, address, fax, remark) values (?,?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, customer.getNumber());
			pst.setString(2, customer.getName());
			pst.setString(3, customer.getTel());
			pst.setString(4, customer.getAddress());
			pst.setString(5, customer.getFax());
			pst.setString(6, customer.getRemark());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(Customer customer) {
		String sql="update t_customer set number=?,name=?,tel=?,address=?,fax=?,remark=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, customer.getNumber());
			pst.setString(2, customer.getName());
			pst.setString(3, customer.getTel());
			pst.setString(4, customer.getAddress());
			pst.setString(5, customer.getFax());
			pst.setString(6, customer.getRemark());
			pst.setInt(7, customer.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_customer where id in ("+delIds+")";
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
