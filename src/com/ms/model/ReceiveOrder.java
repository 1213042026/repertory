package com.ms.model;

import java.util.Date;

public class ReceiveOrder {
	private Integer id;
	private String number;
	private String rawMaterialNumber;
	private String rawMaterialName;
	private String singlePrice;
	private String count;
	private Date buyDate;
	private String supplierNumber;
	private String totalPrice;
	private String storeNumber;
	private String placeNumber;
	private String reviewStatus;
	private String isReceive;
	private String isPick;
	
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
	public String getRawMaterialNumber() {
		return rawMaterialNumber;
	}
	public void setRawMaterialNumber(String rawMaterialNumber) {
		this.rawMaterialNumber = rawMaterialNumber;
	}
	public String getRawMaterialName() {
		return rawMaterialName;
	}
	public void setRawMaterialName(String rawMaterialName) {
		this.rawMaterialName = rawMaterialName;
	}
	public String getSinglePrice() {
		return singlePrice;
	}
	public void setSinglePrice(String singlePrice) {
		this.singlePrice = singlePrice;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public Date getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
	}
	public String getSupplierNumber() {
		return supplierNumber;
	}
	public void setSupplierNumber(String supplierNumber) {
		this.supplierNumber = supplierNumber;
	}
	public String getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getStoreNumber() {
		return storeNumber;
	}
	public void setStoreNumber(String storeNumber) {
		this.storeNumber = storeNumber;
	}
	public String getPlaceNumber() {
		return placeNumber;
	}
	public void setPlaceNumber(String placeNumber) {
		this.placeNumber = placeNumber;
	}
	public String getReviewStatus() {
		return reviewStatus;
	}
	public void setReviewStatus(String reviewStatus) {
		this.reviewStatus = reviewStatus;
	}
	public String getIsReceive() {
		return isReceive;
	}
	public void setIsReceive(String isReceive) {
		this.isReceive = isReceive;
	}
	public String getIsPick() {
		return isPick;
	}
	public void setIsPick(String isPick) {
		this.isPick = isPick;
	}
	
}
