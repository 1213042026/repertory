package com.zhuxiaoxuan.action;

import java.sql.ResultSet;
import java.sql.SQLException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.zhuxiaoxuan.dao.MailDao;
import com.zhuxiaoxuan.dao.StockDao;
import com.zhuxiaoxuan.model.PageBean;
import com.zhuxiaoxuan.model.Stock;
import com.zhuxiaoxuan.util.JsonUtil;
import com.zhuxiaoxuan.util.ResponseWrite;
import com.zhuxiaoxuan.util.StringUtil;

public class StockAction extends ActionSupport{
	private String s_mailName;
	private String delIds;
	private String stockId;
	private Stock stock;
	private String page;
	private String rows;
	public String getS_mailName() {
		return s_mailName;
	}
	public void setS_mailName(String s_mailName) {
		this.s_mailName = s_mailName;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
	public String getStockId() {
		return stockId;
	}
	public void setStockId(String stockId) {
		this.stockId = stockId;
	}
	public Stock getStock() {
		return stock;
	}
	public void setStock(Stock stock) {
		this.stock = stock;
	}
	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}
	StockDao stockdao=new StockDao();
	MailDao maildao=new MailDao();
	JSONObject result=new JSONObject();
	@Override
	public String execute() throws Exception {
		PageBean pagebean=new PageBean(Integer.parseInt(rows), Integer.parseInt(page));
		stock=new Stock();
		ResultSet rs=stockdao.stockList(pagebean, stock);
		JSONObject result=new JSONObject();
		JSONArray jsonarray=JsonUtil.fromrstoJsonArray(rs);
		int total=stockdao.stockCount(stock);
		result.put("rows", jsonarray);
		result.put("total", total);
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
	public String save()throws Exception{
		if(StringUtil.isNotEmpty(stockId)){
			stock.setStockId(Integer.parseInt(stockId));
		}
		try {
			int saveNums=0;
			JSONObject result=new JSONObject();
			if(StringUtil.isNotEmpty(stockId)){
				saveNums=stockdao.stockModify(stock);
			}else{
				//如果为空则为添加
				saveNums=stockdao.stockAdd(stock);
			}
			if(saveNums>0){
				result.put("success", "true");
				result.put("delNums", saveNums);
			}else{
				result.put("success", "true");
				result.put("error", "保存失败");
			}
			ResponseWrite.write(result, ServletActionContext.getResponse());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public String delete()throws Exception{
		String str[]=delIds.split(",");
		for(int i=0;i<str.length;i++){
			boolean f=maildao.getOutdbByMailId(str[i]);
			if(f){
				result.put("errorIndex", i);
				result.put("error", "下有商品，不能删除");
				ResponseWrite.write(result, ServletActionContext.getResponse());
				return null;
			}
		}
		int delNums=stockdao.stockDelete(delIds);
		if(delNums>0){
			result.put("success", "true");
			result.put("delNums", delNums);
		}else{
			result.put("error", "删除失败");
		}
		ResponseWrite.write(result, ServletActionContext.getResponse());
		return null;
	}
}
