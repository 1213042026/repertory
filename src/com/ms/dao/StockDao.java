package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.ms.model.PageBean;
import com.ms.model.Stock;
import com.ms.util.DButil;

public class StockDao {
	public ResultSet stockList(PageBean pagebean,Stock stock){
		StringBuffer sb=new StringBuffer("select * from t_stock s,t_mail m where s.mailId=m.mailId");
		if(pagebean!=null){
			sb.append(" limit "+pagebean.getStart()+","+pagebean.getRows());
		}
		PreparedStatement pst=null;
		Connection con;
		ResultSet rs=null;
		try {
			con = DButil.getCon();
			pst=con.prepareStatement(sb.toString());
			rs=pst.executeQuery();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;
	}
	public int stockCount(Stock stock) throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_outdb i,t_mail m where i.mailId=m.mailId");
		/*if(StringUtil.isNotEmpty(outdb.getMailName())){
			sb.append(" and i.mailName like '%"+outdb.getMailName()+"%'");
		}
		//�ڲ�ͬ�����ݿ������õ���䲻ͬ
		if(StringUtil.isNotEmpty(binDate)){
			sb.append(" and TO_DAYS(i.outdbDate)>=TO_DAYS('"+binDate+"')");
		}
		if(StringUtil.isNotEmpty(einDate)){
			sb.append(" and TO_DAYS(i.outdbDate)<=TO_DAYS('"+einDate+"')");
		}
		if(outdb.getMailId()!=-1){
			sb.append(" and i.mailId='"+outdb.getMailId()+"'");
		}*/
		Connection con=null;
		con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sb.toString());
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
		return rs.getInt("total");
		}else{
			return 0;
		}
	}
	public int stockModify(Stock stock) throws Exception{
		Connection con=DButil.getCon();
		String sql="update t_stock set mailId=?,salesPrice=?,inPrice=?,stockNumbers=?,stockDesc=? where stockId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, stock.getMailId());
		pst.setFloat(2, stock.getSalesPrice());
		pst.setFloat(3,stock.getInPrice());
		pst.setInt(4, stock.getStockNumbers());
		pst.setString(5, stock.getStockDesc());
		pst.setInt(6, stock.getStockId());
		return pst.executeUpdate();
	}
	public int stockAdd(Stock stock) throws Exception{
		Connection con=DButil.getCon();
		String sql="insert into t_stock values(null,?,?,?,?,?)";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, stock.getMailId());
		pst.setInt(2, stock.getStockNumbers());
		pst.setFloat(3, stock.getSalesPrice());
		pst.setFloat(4, stock.getInPrice());
		pst.setString(5, stock.getStockDesc());
		return pst.executeUpdate();
	}
	public int stockDelete(String delIds) throws Exception{
		String sql="delete from t_stock where stockId in("+delIds+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		return pst.executeUpdate();
	}
}
