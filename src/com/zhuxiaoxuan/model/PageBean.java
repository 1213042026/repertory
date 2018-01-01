package com.zhuxiaoxuan.model;

public class PageBean {
	private int start;
	private int rows;
	private int page;
	public PageBean(int rows, int page) {
		super();
		this.rows = rows;
		this.page = page;
	}
	public int getStart() {
		return (page-1)*rows;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
}
