package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

import com.ms.model.PageBean;
import com.ms.model.ReceiveOrder;
import com.ms.util.DButil;

public class ReceiveOrderDao implements BaseDao<ReceiveOrder> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_receive_order", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_receive_order", keyword, "number");
	}

	@Override
	public int insert(ReceiveOrder receiveOrder) {
		String sql="insert into t_receive_order(number, rawmaterialnumber, rawmaterialname, singleprice, count, buydate, suppliernumber, totalprice, storenumber, placenumber, reviewstatus) values (?,?,?,?,?,?,?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, receiveOrder.getNumber());
			pst.setString(2, receiveOrder.getRawMaterialNumber());
			pst.setString(3, receiveOrder.getRawMaterialName());
			pst.setString(4, receiveOrder.getSinglePrice());
			pst.setString(5, receiveOrder.getCount());
			pst.setTimestamp(6, new Timestamp(receiveOrder.getBuyDate().getTime()));
			pst.setString(7, receiveOrder.getSupplierNumber());
			pst.setString(8, receiveOrder.getTotalPrice());
			pst.setString(9, receiveOrder.getStoreNumber());
			pst.setString(10, receiveOrder.getPlaceNumber());
			pst.setString(11, receiveOrder.getReviewStatus());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(ReceiveOrder receiveOrder) {
		String sql="update t_receive_order set number=?,rawmaterialnumber=?,rawmaterialname=?, singleprice=?, count=?, buydate=?, suppliernumber=?, totalprice=?, storenumber=?, placenumber=?, reviewstatus=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, receiveOrder.getNumber());
			pst.setString(2, receiveOrder.getRawMaterialNumber());
			pst.setString(3, receiveOrder.getRawMaterialName());
			pst.setString(4, receiveOrder.getSinglePrice());
			pst.setString(5, receiveOrder.getCount());
			pst.setTimestamp(6, new Timestamp(receiveOrder.getBuyDate().getTime()));
			pst.setString(7, receiveOrder.getSupplierNumber());
			pst.setString(8, receiveOrder.getTotalPrice());
			pst.setString(9, receiveOrder.getStoreNumber());
			pst.setString(10, receiveOrder.getPlaceNumber());
			pst.setString(11, receiveOrder.getReviewStatus());
			pst.setInt(12, receiveOrder.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_receive_order where id in ("+delIds+")";
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
