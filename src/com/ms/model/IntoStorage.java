package com.ms.model;

import java.util.Date;

public class IntoStorage {
	private Integer id;
	private String finishedMaterialNumber;
	private String finishedMaterialName;
	private String count;
	private String produceCenter;
	private String storeNumber;
	private String placeNumber;
	private String remark;
	private String isInto;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
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
	public String getProduceCenter() {
		return produceCenter;
	}
	public void setProduceCenter(String produceCenter) {
		this.produceCenter = produceCenter;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getIsInto() {
		return isInto;
	}
	public void setIsInto(String isInto) {
		this.isInto = isInto;
	}
}
