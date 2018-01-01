package com.zhuxiaoxuan.model;

public class Stock {
	private int stockId;
	private int mailId=-1;
	private int stockNumbers;
	private float salesPrice;
	private float inPrice;
	private String stockDesc;
	public int getStockId() {
		return stockId;
	}
	public void setStockId(int stockId) {
		this.stockId = stockId;
	}
	public int getMailId() {
		return mailId;
	}
	public void setMailId(int mailId) {
		this.mailId = mailId;
	}
	public int getStockNumbers() {
		return stockNumbers;
	}
	public void setStockNumbers(int stockNumbers) {
		this.stockNumbers = stockNumbers;
	}
	public float getSalesPrice() {
		return salesPrice;
	}
	public void setSalesPrice(float salesPrice) {
		this.salesPrice = salesPrice;
	}
	public float getInPrice() {
		return inPrice;
	}
	public void setInPrice(float inPrice) {
		this.inPrice = inPrice;
	}
	public String getStockDesc() {
		return stockDesc;
	}
	public void setStockDesc(String stockDesc) {
		this.stockDesc = stockDesc;
	}
	
}
