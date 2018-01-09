package com.ms.model;

import java.util.Date;

public class Dump {
	private Integer id;
	private String finishedMaterialNumber;
	private String finishedMaterialName;
	private String storeNumber;
	private String placeNumber;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getStoreNumber() {
		return storeNumber;
	}
	public void setStoreNumber(String storeNumber) {
		this.storeNumber = storeNumber;
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
	public String getPlaceNumber() {
		return placeNumber;
	}
	public void setPlaceNumber(String placeNumber) {
		this.placeNumber = placeNumber;
	}
}
