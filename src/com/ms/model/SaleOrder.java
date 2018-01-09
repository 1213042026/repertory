package com.ms.model;

import java.util.Date;

public class SaleOrder {
	private Integer id;
	private String number;
	private String finishedMaterialNumber;
	private String finishedMaterialName;
	private String singlePrice;
	private String count;
	private Date date;
	private String customerNumber;
	private String totalPrice;
	private String storeNumber;
	private String placeNumber;
	private String reviewStatus;
	private String isOut;
	
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
	public String getFinishedMaterialNumber() {
		return finishedMaterialNumber;
	}
	public void setFinishedMaterialNumber(String finishedMaterialNumber) {
		this.finishedMaterialNumber = finishedMaterialNumber;
	}
	public String getFinishedMaterialName() {
		return finishedMaterialName;
	}
	public void setFinishedMaterialName(String finishedMaterialName) {
		this.finishedMaterialName = finishedMaterialName;
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
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
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
	public String getIsOut() {
		return isOut;
	}
	public void setIsOut(String isOut) {
		this.isOut = isOut;
	}
	
}
