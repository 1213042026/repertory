package com.ms.model;

public class Mail {
	private int mailId;
	private String mailNumber;
	private String mailName;
	private int mailtypeId=-1;
	private String mailDesc;
	private int customerId=-1;
	public Mail(String mailNumber, String mailName, int mailtypeId,
			String mailDesc, int customerId) {
		super();
		this.mailNumber = mailNumber;
		this.mailName = mailName;
		this.mailtypeId = mailtypeId;
		this.mailDesc = mailDesc;
		this.customerId = customerId;
	}
	public Mail() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getMailId() {
		return mailId;
	}
	public void setMailId(int mailId) {
		this.mailId = mailId;
	}
	public String getMailNumber() {
		return mailNumber;
	}
	
	public void setMailNumber(String mailNumber) {
		this.mailNumber = mailNumber;
	}
	public String getMailName() {
		return mailName;
	}
	public void setMailName(String mailName) {
		this.mailName = mailName;
	}
	public int getMailtypeId() {
		return mailtypeId;
	}
	public void setMailtypeId(int mailtypeId) {
		this.mailtypeId = mailtypeId;
	}
	public String getMailDesc() {
		return mailDesc;
	}
	public void setMailDesc(String mailDesc) {
		this.mailDesc = mailDesc;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	
}
