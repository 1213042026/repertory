package com.zhuxiaoxuan.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.zhuxiaoxuan.model.OutDb;
import com.zhuxiaoxuan.model.PageBean;
import com.zhuxiaoxuan.util.DButil;
import com.zhuxiaoxuan.util.DateUtil;
import com.zhuxiaoxuan.util.StringUtil;

public class OutdbDao {
	public ResultSet outdbList(PageBean pagebean,OutDb outdb,String binDate,String einDate){
		StringBuffer sb=new StringBuffer("select * from t_outdb i,t_mail m where i.mailId=m.mailId");
		if(StringUtil.isNotEmpty(binDate)){
			sb.append(" and TO_DAYS(i.outdbDate)>=TO_DAYS('"+binDate+"')");
		}
		if(StringUtil.isNotEmpty(einDate)){
			sb.append(" and TO_DAYS(i.outdbDate)<=TO_DAYS('"+einDate+"')");
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
	public int outdbCount(OutDb outdb,String binDate,String einDate) throws Exception{
		StringBuffer sb=new StringBuffer("select count(*) as total from t_outdb i,t_mail m where i.mailId=m.mailId");
		/*if(StringUtil.isNotEmpty(outdb.getMailName())){
			sb.append(" and i.mailName like '%"+outdb.getMailName()+"%'");
		}
		//在不同的数据库中所用的语句不同
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
	public int outdbModify(OutDb outdb) throws Exception{
		Connection con=DButil.getCon();
		String sql="update t_outdb set mailId=?,salesPrice=?,outdbDate=?,outNumbers=?,outdbDesc=?,quarter=? where outdbId=?";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, outdb.getMailId());
		pst.setFloat(2, outdb.getSalesPrice());
		pst.setString(3, DateUtil.formatDate(outdb.getOutdbDate(), "yyyy-MM-dd"));
		pst.setInt(4, outdb.getOutNumbers());
		pst.setString(5, outdb.getOutdbDesc());
		pst.setString(6, outdb.getQuater());
		pst.setInt(7, outdb.getOutdbId());
		return pst.executeUpdate();
	}
	public int outdbAdd(OutDb outdb) throws Exception{
		Connection con=DButil.getCon();
		String sql="insert into t_outdb values(null,?,?,?,?,?,?)";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, outdb.getMailId());
		pst.setFloat(2, outdb.getSalesPrice());
		pst.setString(3, DateUtil.formatDate(outdb.getOutdbDate(), "yyyy-MM-dd"));
		pst.setInt(4, outdb.getOutNumbers());
		pst.setString(5, outdb.getOutdbDesc());
		pst.setString(6, outdb.getQuater());
		return pst.executeUpdate();
	}
	public int outdbDelete(String delIds) throws Exception{
		String sql="delete from t_outdb where outdbId in("+delIds+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		return pst.executeUpdate();
	}
	public int getoutNumbersByDate(int month,String mailId) throws Exception{
		String sql="select * from t_outdb where mailId=?,outdbDate=?";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setInt(1, Integer.parseInt(mailId));
		ResultSet rs=pst.executeQuery();
		String outdate="";
		while(rs.next()){
		outdate=DateUtil.formatDate(rs.getDate("outdbDate"), "00-MM-00");
		}
		return 0;
	}
	public double[][] getOutDb(Connection con,String mailId)throws Exception{
		double[][] outdbList = new double[4][1];
		int i=0;
		String sql="SELECT SUM(outNumbers) AS totalSalemember,QUARTER  FROM t_outdb WHERE mailId=? GROUP BY quarter";
		PreparedStatement pstmt = con.prepareStatement(sql);
		pstmt.setInt(1,Integer.parseInt(mailId));
		ResultSet rs = pstmt.executeQuery();
		while(rs.next()){
			while(i<4){
                if(i==0&&rs.getString("quarter").equals("第一季度")){
                	outdbList[i][0]=Double.parseDouble(rs.getString("totalSalemember"));
                	i++;
                }else{
                	i++;
                }
                if(i==1&&rs.getString("quarter").equals("第二季度")){
                	outdbList[i][0]=Double.parseDouble(rs.getString("totalSalemember"));
                	i++;
                }else{
                	i++;
                }
                if(i==2&&rs.getString("quarter").equals("第三季度")){
                	outdbList[i][0]=Double.parseDouble(rs.getString("totalSalemember"));
                	i++;
                }else{
                	i++;
                }
                if(i==3&&rs.getString("quarter").equals("第四季度")){
                	outdbList[i][0]=Double.parseDouble(rs.getString("totalSalemember"));
                	i++;
                }else{
                	i++;
                }
			}
			i=0;
		}
		return outdbList;
	}
	public ResultSet getExportoutdbList(String outdbId)throws Exception{
		String sql="SELECT  * FROM t_outdb WHERE outdbId IN ("+outdbId+")";
		Connection con=DButil.getCon();
		PreparedStatement pst=con.prepareStatement(sql);
		ResultSet rs=pst.executeQuery();
		return rs;
	}
}
