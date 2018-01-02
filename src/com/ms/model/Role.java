package com.ms.model;

public class Role {
	private String number;
	private String name;
	
	public Role() {
	}
	public Role(String number, String name) {
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
