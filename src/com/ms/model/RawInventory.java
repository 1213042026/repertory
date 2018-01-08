package com.ms.model;

import java.util.Date;

public class RawInventory {
	private Integer id;
	private String rawMaterialNumber;
	private String restCount;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getRawMaterialNumber() {
		return rawMaterialNumber;
	}
	public void setRawMaterialNumber(String rawMaterialNumber) {
		this.rawMaterialNumber = rawMaterialNumber;
	}
	public String getRestCount() {
		return restCount;
	}
	public void setRestCount(String restCount) {
		this.restCount = restCount;
	}
}
