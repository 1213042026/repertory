package com.ms.model;

public class Permission {
	private String number;
	private String name;
	
	public Permission() {
	}
	public Permission(String number, String name) {
		this.number = number;
		this.name = name;
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
	@Override
	public String toString() {
		return "Role [number=" + number + ", name=" + name + "]";
	}
}
