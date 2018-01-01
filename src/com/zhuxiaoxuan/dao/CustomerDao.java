package com.zhuxiaoxuan.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.zhuxiaoxuan.model.Customer;
import com.zhuxiaoxuan.model.PageBean;
import com.zhuxiaoxuan.util.DButil;
import com.zhuxiaoxuan.util.StringUtil;

public class CustomerDao {
	public ResultSet customerList(PageBean pagebean,Customer customer){
		StringBuffer sb=new StringBuffer("select * from t_customer");
		if(customer!=null&&StringUtil.isNotEmpty(customer.getCustomerNumber())){
			sb.append(" and customerNumber like '%"+customer.getCustomerNumber()+"%'");
		}
		if(pagebean!=null){
			sb.append(" limit "+pagebean.getStart()+","+pagebean.getRows());
		}
		
		Connection con=null;
		ResultSet rs=null;
		try {
			con=DButil.getCon();
			//有and则替换，没有则不替换
			PreparedStatement pst=con.prepareStatement(sb.toString().replaceFirst("and", "where"));
			System.out.println(sb);
			rs=pst.executeQuery();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;
	}
	public ResultSet getExportcustomerList(String customerId)throws Exception{
		String sql="SELECT  * FROM t_customer WHERE customerId IN ("+customerId+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		return rs;
	}
	public int customerCount(Customer customer)throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_customer");
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
	public int customerAdd(Customer customer)throws Exception{
		String sql="insert into t_customer values (null,?,?,?,?,?)";
		Connection con=null;
		con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, customer.getCustomerNumber());
		pst.setString(2, customer.getCustomerName());
		pst.setString(3, customer.getLinkman());
		pst.setString(4, customer.getPhone());
		pst.setString(5, customer.getDesc());
		return pst.executeUpdate();
	}
	/*
	 * 修改操作
	 */
	public int customerModify(Customer customer)throws Exception{
		Connection con=null;
		con=DButil.getCon();
		String sql="update t_customer set customerNumber=?,customerName=?,linkman=?,phone=?,customerDesc=? where customerId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, customer.getCustomerNumber());
		pst.setString(2, customer.getCustomerName());
		pst.setString(3, customer.getLinkman());
		pst.setString(4, customer.getPhone());
		pst.setString(5, customer.getDesc());
		pst.setInt(6, customer.getCustomerId());
		return pst.executeUpdate();
	}
	public int customerDelete(String delIds) throws Exception{
		String sql="delete from t_customer where customerId in ("+delIds+")";
		Connection con=null;
		con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		return pst.executeUpdate();
	}
}
