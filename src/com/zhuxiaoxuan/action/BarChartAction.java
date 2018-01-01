package com.zhuxiaoxuan.action;
import java.awt.Color;
import java.sql.Connection;

import org.apache.poi.ss.usermodel.Chart;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.labels.ItemLabelAnchor;
import org.jfree.chart.labels.ItemLabelPosition;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer3D;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DatasetUtilities;
import org.jfree.ui.TextAnchor;

import com.opensymphony.xwork2.ActionSupport;
import com.zhuxiaoxuan.dao.MailDao;
import com.zhuxiaoxuan.dao.OutdbDao;
import com.zhuxiaoxuan.util.DButil;


public class BarChartAction extends ActionSupport{

	private JFreeChart chart;
	private String mailId;
	public String getMailId() {
		return mailId;
	}
	public void setMailId(String mailId) {
		this.mailId = mailId;
	}
	public JFreeChart getChart() {
		return chart;
	}
	DButil dbutil=new DButil();
	MailDao maildao=new MailDao();
	OutdbDao outdbdao=new OutdbDao();
	@Override
	public String execute() throws Exception {
		Connection con=null;
		con=dbutil.getCon();
		String mailname = maildao.getMailNameById(con, mailId);
		double [][]data=outdbdao.getOutDb(con,mailId);
		String []rowKeys = {"��һ����","�ڶ�����","��������","���ļ���"}; 
		String []columnKeys={mailname};
    	CategoryDataset dataset = DatasetUtilities.createCategoryDataset(rowKeys, columnKeys,data);
    	chart = ChartFactory.createBarChart3D("��Ʒ����ͳ��ͼ", "��Ʒ", "����", 
    			dataset, PlotOrientation.VERTICAL, true, true, true);
    	CategoryPlot plot = chart.getCategoryPlot();
    	// �������񱳾���ɫ
		plot.setBackgroundPaint(Color.white);
		// ��������������ɫ
		plot.setDomainGridlinePaint(Color.pink);
		// �������������ɫ
		plot.setRangeGridlinePaint(Color.pink);
		
		// ��ʾÿ��������ֵ�����޸ĸ���ֵ����������
		BarRenderer3D renderer=new BarRenderer3D();
		renderer.setBaseItemLabelGenerator(new StandardCategoryItemLabelGenerator());
		renderer.setBaseItemLabelsVisible(true);
		
		renderer.setBasePositiveItemLabelPosition(new ItemLabelPosition(ItemLabelAnchor.OUTSIDE12, TextAnchor.BASELINE_LEFT));
		renderer.setItemLabelAnchorOffset(10D);  
		
		// ����ƽ������֮�����
		renderer.setItemMargin(0.4);
		
		plot.setRenderer(renderer);
		return SUCCESS;
	}
}
