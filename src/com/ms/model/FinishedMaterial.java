package com.ms.model;

import java.util.Date;

public class FinishedMaterial {
	private Integer id;
	private String number;
	private String name;
	private String price;
	private String danWei;
	private String catagory;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getDanWei() {
		return danWei;
	}
	public void setDanWei(String danWei) {
		this.danWei = danWei;
	}
	public String getCatagory() {
		return catagory;
	}
	public void setCatagory(String catagory) {
		this.catagory = catagory;
	}
}
