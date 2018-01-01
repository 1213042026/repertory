package com.zhuxiaoxuan.util;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

public class ResponseWrite {
	public static void write(Object o,HttpServletResponse resp) throws IOException{
		resp.setContentType("text/html;charset=utf-8");
		PrintWriter out=resp.getWriter();
		out.print(o);
		out.flush();
		out.close();
	}
}
