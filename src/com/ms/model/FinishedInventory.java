package com.ms.model;

import java.util.Date;

public class FinishedInventory {
	private Integer id;
	private String finishedMaterialNumber;
	private String restCount;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFinishedMaterialNumber() {
		return finishedMaterialNumber;
	}
	public void setFinishedMaterialNumber(String finishedMaterialNumber) {
		this.finishedMaterialNumber = finishedMaterialNumber;
	}
	public String getRestCount() {
		return restCount;
	}
	public void setRestCount(String restCount) {
		this.restCount = restCount;
	}
}
