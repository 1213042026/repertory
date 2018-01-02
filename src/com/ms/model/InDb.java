package com.ms.model;

import java.util.Date;

public class InDb {
	private int indbId;
	private String mailName;
	private int mailId=-1;
	private float inPrice;
	private Date indbDate;
	private int inNumbers;
	private String indbDesc;
	
	public int getIndbId() {
		return indbId;
	}
	public void setIndbId(int indbId) {
		this.indbId = indbId;
	}
	public int getMailId() {
		return mailId;
	}
	public void setMailId(int mailId) {
		this.mailId = mailId;
	}
	public float getInPrice() {
		return inPrice;
	}
	public void setInPrice(float inPrice) {
		this.inPrice = inPrice;
	}
	public Date getIndbDate() {
		return indbDate;
	}
	public void setIndbDate(Date indbDate) {
		this.indbDate = indbDate;
	}
	public int getInNumbers() {
		return inNumbers;
	}
	public void setInNumbers(int inNumbers) {
		this.inNumbers = inNumbers;
	}
	public String getIndbDesc() {
		return indbDesc;
	}
	public void setIndbDesc(String indbDesc) {
		this.indbDesc = indbDesc;
	}
	public String getMailName() {
		return mailName;
	}
	public void setMailName(String mailName) {
		this.mailName = mailName;
	}
	
}
