package com.zhuxiaoxuan.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import com.zhuxiaoxuan.model.Customer;
import com.zhuxiaoxuan.model.Mail;
import com.zhuxiaoxuan.model.PageBean;
import com.zhuxiaoxuan.util.DButil;
import com.zhuxiaoxuan.util.StringUtil;

public class MailDao {
	public boolean getCustomerByCustomerId(String customerId)throws Exception{
		String sql="select * from t_mail where customerId=?";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, customerId);
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return true;
		}else{
			return false;
		}
	}
	public boolean getIndbByMailId(String mailId)throws Exception{
		String sql="select * from t_mail where mailId=?";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, Integer.parseInt(mailId));
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return true;
		}else{
			return false;
		}
	}
	public boolean getOutdbByMailId(String mailId)throws Exception{
		String sql="select * from t_mail where mailId=?";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, Integer.parseInt(mailId));
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return true;
		}else{
			return false;
		}
	}
	public ResultSet mailList(PageBean pagebean,Mail mail){
		StringBuffer sb=new StringBuffer("SELECT * FROM t_mail m,t_customer c,t_mailtype mt WHERE m.customerId=c.customerId AND mt.mailtypeId=m.mailtypeId");
		if(mail!=null&&StringUtil.isNotEmpty(mail.getMailNumber())){
			sb.append(" and m.mailNumber like '%"+mail.getMailNumber()+"%'");
		}  
		if(mail!=null&&StringUtil.isNotEmpty(mail.getMailName())){
			sb.append(" and m.mailName like '%"+mail.getMailName()+"%'");
		}
		if(mail!=null&&mail.getCustomerId()!=-1){
			sb.append(" and m.customerId ='"+mail.getCustomerId()+"'");
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
			System.out.println(sb);
			rs=pst.executeQuery();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;
	}
	public ArrayList<Mail> getMailList(String sql) throws Exception{
		Connection con=DButil.getCon();
		if(sql=="" ||sql==null){
			sql="select * from t_mail";
		}
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		ArrayList<Mail> maillist=new ArrayList<Mail>();
		while(rs.next()){
			Mail mail=new Mail();
			mail.setMailName(rs.getString("mailName"));
			mail.setMailId(rs.getInt("mailId"));
			mail.setMailNumber(rs.getString("mailnumber"));
			mail.setMailDesc(rs.getString("mailDesc"));
			mail.setMailtypeId(rs.getInt("mailtypeId"));
			mail.setCustomerId(rs.getInt("customerId"));
			maillist.add(mail);
		}
		return maillist;
	}
	public int mailCount(Mail mail)throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_mail");
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
	public int mailModify(Mail mail)throws Exception{
		Connection con=null;
		con=DButil.getCon();
		String sql="update t_mail set mailNumber=?,mailName=?,mailDesc=?,customerId=?,mailtypeId=? where mailId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, mail.getMailNumber());
		pst.setString(2, mail.getMailName());
		pst.setString(3, mail.getMailDesc());
		pst.setInt(4, mail.getCustomerId());
		pst.setInt(5, mail.getMailtypeId());
		pst.setInt(6, mail.getMailId());
		return pst.executeUpdate();
	}
	public int mailAdd(Mail mail)throws Exception{
		String sql="insert into t_mail values(null,?,?,?,?,?)";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, mail.getMailNumber());
		pst.setString(2, mail.getMailName());
		pst.setInt(3, mail.getCustomerId());
		pst.setInt(4, mail.getMailtypeId());
		pst.setString(5, mail.getMailDesc());
		return pst.executeUpdate();
	}
	public boolean getMailByCustomerId(String s){
		return false;
	}
	public int mailDelete(String delIds)throws Exception{
		String sql="delete from t_mail where mailId=?";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1, delIds);
		return pst.executeUpdate();
	}
	public String getMailNameById(Connection con,String mailId) throws Exception{
		String sql="select * from t_mail where mailId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, Integer.parseInt(mailId));
		ResultSet rs=pst.executeQuery();
		if(rs.next()){
			return rs.getString("mailName");
		}else{
			return "";
		}
	}
	public ResultSet getExportmailList(String mailId)throws Exception{
		String sql="SELECT  * FROM t_mail WHERE mailId IN ("+mailId+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		return rs;
	}
}
