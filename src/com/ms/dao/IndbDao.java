package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.ms.model.InDb;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.DateUtil;
import com.ms.util.StringUtil;

public class IndbDao {
	public ResultSet indbList(PageBean pagebean,InDb indb,String binDate,String einDate){
		StringBuffer sb=new StringBuffer("select * from t_indb i,t_mail m where i.mailId=m.mailId");
		if(StringUtil.isNotEmpty(binDate)){
			sb.append(" and TO_DAYS(i.indbDate)>=TO_DAYS('"+binDate+"')");
		}
		if(StringUtil.isNotEmpty(einDate)){
			sb.append(" and TO_DAYS(i.indbDate)<=TO_DAYS('"+einDate+"')");
		}
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
	public int indbCount(InDb indb,String binDate,String einDate) throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_indb i,t_mail m where i.mailId=m.mailId");
		/*if(StringUtil.isNotEmpty(indb.getMailName())){
			sb.append(" and i.mailName like '%"+indb.getMailName()+"%'");
		}
		//�ڲ�ͬ�����ݿ������õ���䲻ͬ
		if(StringUtil.isNotEmpty(binDate)){
			sb.append(" and TO_DAYS(i.indbDate)>=TO_DAYS('"+binDate+"')");
		}
		if(StringUtil.isNotEmpty(einDate)){
			sb.append(" and TO_DAYS(i.indbDate)<=TO_DAYS('"+einDate+"')");
		}
		if(indb.getMailId()!=-1){
			sb.append(" and i.mailId='"+indb.getMailId()+"'");
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
	public int indbModify(InDb indb) throws Exception{
		Connection con=DButil.getCon();
		String sql="update t_indb set mailId=?,inPrice=?,indbDate=?,inNumbers=?,indbDesc=? where indbId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, indb.getMailId());
		pst.setFloat(2, indb.getInPrice());
		pst.setString(3, DateUtil.formatDate(indb.getIndbDate(), "yyyy-MM-dd"));
		pst.setInt(4, indb.getInNumbers());
		pst.setString(5, indb.getIndbDesc());
		pst.setInt(6, indb.getIndbId());
		return pst.executeUpdate();
	}
	public int indbAdd(InDb indb) throws Exception{
		Connection con=DButil.getCon();
		String sql="insert into t_indb values(null,?,?,?,?,?)";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, indb.getMailId());
		pst.setFloat(2, indb.getInPrice());
		pst.setString(3, DateUtil.formatDate(indb.getIndbDate(), "yyyy-MM-dd"));
		pst.setInt(4, indb.getInNumbers());
		pst.setString(5, indb.getIndbDesc());
		return pst.executeUpdate();
	}
	public int indbDelete(String delIds) throws Exception{
		String sql="delete from t_indb where indbId in("+delIds+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		return pst.executeUpdate();
	}
}
