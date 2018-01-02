package com.ms.model;

import java.sql.Date;

public class OutDb {
	private int outdbId;
	private int mailId=-1;
	private float salesPrice;
	private Date outdbDate;
	private int outNumbers;
	private String outdbDesc;
	private String quater;
	
	public String getQuater() {
		return quater;
	}
	public void setQuater(String quater) {
		this.quater = quater;
	}
	public int getOutdbId() {
		return outdbId;
	}
	public void setOutdbId(int outdbId) {
		this.outdbId = outdbId;
	}
	public int getMailId() {
		return mailId;
	}
	public void setMailId(int mailId) {
		this.mailId = mailId;
	}
	
	public float getSalesPrice() {
		return salesPrice;
	}
	public void setSalesPrice(float salesPrice) {
		this.salesPrice = salesPrice;
	}
	
	public Date getOutdbDate() {
		return outdbDate;
	}
	public void setOutdbDate(Date outdbDate) {
		this.outdbDate = outdbDate;
	}
	
	public int getOutNumbers() {
		return outNumbers;
	}
	public void setOutNumbers(int outNumbers) {
		this.outNumbers = outNumbers;
	}
	public String getOutdbDesc() {
		return outdbDesc;
	}
	public void setOutdbDesc(String outdbDesc) {
		this.outdbDesc = outdbDesc;
	}
	
}
