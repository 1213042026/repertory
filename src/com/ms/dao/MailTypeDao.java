package com.ms.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import com.ms.model.MailType;
import com.ms.model.PageBean;
import com.ms.util.DButil;
import com.ms.util.StringUtil;

public class MailTypeDao {
	
	public ResultSet mailtypeList(PageBean pagebean,MailType mailtype){
		StringBuffer sb=new StringBuffer("SELECT * FROM t_mailtype"); 
		if(mailtype!=null&&StringUtil.isNotEmpty(mailtype.getMailtypeName())){
			sb.append(" and mailtypeName like '%"+mailtype.getMailtypeName()+"%'");
		}
		if(pagebean!=null){
			sb.append(" limit "+pagebean.getStart()+","+pagebean.getRows());
		}
		System.out.println(sb);
		PreparedStatement pst=null;
		Connection con;
		ResultSet rs=null;
		try {
			con = DButil.getCon();
			pst=con.prepareStatement(sb.toString().replaceFirst("and", "where"));
			rs=pst.executeQuery();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;
	}
	public ArrayList<MailType> getMailTypeList()throws Exception{
		Connection con=DButil.getCon();
		String sql="select * from t_mailtype order by mailtypeName";
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		ArrayList<MailType> mailtypeList=new ArrayList<MailType>();
		while(rs.next()){
			MailType mailtype=new MailType();
			mailtype.setMailtypeId(rs.getInt("mailtypeId"));
			mailtype.setMailtypeName(rs.getString("mailtypeName"));
			mailtype.setMailtypeDesc(rs.getString("mailtypeDesc"));
			mailtypeList.add(mailtype);
		}
		return mailtypeList;
	}
	public int mailtypeCount(MailType mailtype)throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_mailtype");
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sb.toString());
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return rs.getInt("total");
		}else{
		return 0;
		}
	}
	public int mailtypeModify(MailType mailtype)throws Exception{
		Connection con=DButil.getCon();
		String sql="update t_mailtype set mailtypeName=?,mailtypeDesc=? where mailtypeId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, mailtype.getMailtypeName());
		pst.setString(2, mailtype.getMailtypeDesc());
		pst.setInt(3, mailtype.getMailtypeId());
		return pst.executeUpdate();
	}
	public int mailtypeAdd(MailType mailtype)throws Exception{
		String sql="insert into t_mailtype values(null,?,?);";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, mailtype.getMailtypeName());
		pst.setString(2, mailtype.getMailtypeDesc());
		return pst.executeUpdate();
	}
	public int mailtypeDelete(String delIds) throws Exception{
		String sql="delete from t_mailtype where mailtypeId in("+delIds+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		return pst.executeUpdate();
	}
	public boolean getMailByMailtypeId(String mailtypeId)throws Exception{
		String sql="select * from t_mail where mailtypeId=?";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, mailtypeId);
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return true;
		}else{
			return false;
		}
	}
	public ResultSet getExportmailtypeList(String mailtypeId)throws Exception{
		String sql="select * from t_mailtype where mailtypeId in("+mailtypeId+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		return rs;
	}
	
}
