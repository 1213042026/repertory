package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

import com.ms.model.PageBean;
import com.ms.model.SaleOrder;
import com.ms.util.DButil;

public class SaleOrderDao implements BaseDao<SaleOrder> {

	@Override
	public ResultSet getList(PageBean pagebean, String keyword) {
		return DButil.queryList("select * from t_sale_order", pagebean, keyword, "number");
	}

	@Override
	public int getCount(String keyword) {
		return DButil.queryCount("select count(*) as total from t_sale_order", keyword, "number");
	}

	@Override
	public int insert(SaleOrder saleOrder) {
		String sql="insert into t_sale_order(number, finishedmaterialnumber, finishedmaterialname, singleprice, count, date, customernumber, totalprice, storenumber, placenumber) values (?,?,?,?,?,?,?,?,?,?)";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, saleOrder.getNumber());
			pst.setString(2, saleOrder.getFinishedMaterialNumber());
			pst.setString(3, saleOrder.getFinishedMaterialName());
			pst.setString(4, saleOrder.getSinglePrice());
			pst.setInt(5, Integer.parseInt(saleOrder.getCount()));
			pst.setTimestamp(6, new Timestamp(saleOrder.getDate().getTime()));
			pst.setString(7, saleOrder.getCustomerNumber());
			pst.setString(8, saleOrder.getTotalPrice());
			pst.setString(9, saleOrder.getStoreNumber());
			pst.setString(10, saleOrder.getPlaceNumber());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int update(SaleOrder saleOrder) {
		String sql="update t_sale_order set number=?,finishedmaterialnumber=?,finishedmaterialname=?, singleprice=?, count=?, date=?, customernumber=?, totalprice=?, storenumber=?, placenumber=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, saleOrder.getNumber());
			pst.setString(2, saleOrder.getFinishedMaterialNumber());
			pst.setString(3, saleOrder.getFinishedMaterialName());
			pst.setString(4, saleOrder.getSinglePrice());
			pst.setInt(5, Integer.parseInt(saleOrder.getCount()));
			pst.setTimestamp(6, new Timestamp(saleOrder.getDate().getTime()));
			pst.setString(7, saleOrder.getCustomerNumber());
			pst.setString(8, saleOrder.getTotalPrice());
			pst.setString(9, saleOrder.getStoreNumber());
			pst.setString(10, saleOrder.getPlaceNumber());
			pst.setInt(11, saleOrder.getId());
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public int review(String finishedMaterialNumber, String saleOrderId) {
		int storageCount = DButil.queryCount("select count as total from t_into_storage where finishedmaterialnumber = '" + finishedMaterialNumber + "'");
		int saleCount = DButil.queryCount("select count as total from t_sale_order where finishedmaterialnumber = '" + finishedMaterialNumber + "'");
		
		if (saleCount > storageCount) {
			return 0;
		}
		String sql="update t_sale_order set reviewstatus=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, "已审核");
			pst.setInt(2, Integer.parseInt(saleOrderId));
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public ResultSet getReviewList(PageBean pagebean) {
		return DButil.queryList("select * from t_sale_order", pagebean, "已审核", "reviewstatus");
	}

	public int getReviewCount() {
		return DButil.queryCount("select count(*) as total from t_sale_order", "已审核", "reviewstatus");
	}

	public int out(String saleOrderId) {
		String sql="update t_sale_order set isout=? where id=?";
		try {
			Connection con= DButil.getCon();
			PreparedStatement pst=con.prepareStatement(sql);
			pst.setString(1, "已出库");
			pst.setInt(2, Integer.parseInt(saleOrderId));
			return pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteByIds(String delIds) {
		String sql="delete from t_sale_order where id in ("+delIds+")";
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
