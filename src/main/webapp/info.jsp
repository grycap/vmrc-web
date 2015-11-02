<%@ page contentType="text/html"%>
<%@ page import="java.util.Vector" %>
<html>
<head>	
	<title>Virtual Machine Information</title>
	<!-- old -->
	<link rel="stylesheet" type="text/css" href="css/main.css" />
    <script type="text/javascript" src="js/utilidades.js"></script>
</head>
<body BGCOLOR="#9DAFD6">

<%
	String vmid = request.getParameter("vmid");
	String hyper = request.getParameter("hypervisor");
	String osname = request.getParameter("osname");
	String osflavour = request.getParameter("osflavour");
	String osversion = request.getParameter("osversion");
	String systemcpu = request.getParameter("systemcpu");
	String systemmem = request.getParameter("systemmem");
	String systemdisk = request.getParameter("systemdisk");
	String applications = request.getParameter("applications");
	Vector<String> vAppName = new Vector<String>();
	Vector<String> vAppVersion = new Vector<String>();
	Vector<String> vAppPath = new Vector<String>();
	if (!(applications == null) && !(applications.equals(""))) {
		String[] app = applications.split(" "); 
		for (int i=0; i < app.length; i++) {
			String[] ap = app[i].split(",");
			vAppName.add(ap[0]);
			vAppVersion.add(ap[1]);
			vAppPath.add(ap[2]);
		}
	} else {
		vAppName.add("");
		vAppVersion.add("");		
		vAppPath.add("");
	}
	String vmlogin = request.getParameter("vmlogin");
	String vmpassword = request.getParameter("vmpassword");
	String timestamp = request.getParameter("timestamp");
	String owner = request.getParameter("owner");
	String path = request.getParameter("path");
%>
		

<div class="listado">  <!-- Div Listado -->
<table style="border: 1; cellspacing: 1; width: 100%; height: 100%;">
	<tr>
		<td class="campo">VMI Name: </td>
		<td class="valor"><%=vmid%></td>
		<td rowspan="12" valign="top">
			<p class="busqueda">&nbsp;Applications &nbsp;&nbsp;</p>
			<div class="tablascroll" style=" background: #eeeeee; overflow:auto; 
			                         padding-right: 15px; padding-top: 15px; padding-left: 15px; 
			                         padding-bottom: 15px; border-right: #6699CC 1px solid; 
			                         border-top: #999999 1px solid; border-left: #6699CC 1px solid; 
			                         border-bottom: #6699CC 1px solid; scrollbar-arrow-color : #999999; 
			                         scrollbar-face-color : #666666; scrollbar-track-color :#3333333 ; 
			                         height:200px;">
			<table style="border: 1; cellspacing: 1; width: 100%;">
				<tr class="titulo">
					<td width="40%">Name</td>
					<td width="30%">Version</td>
					<td width="30%">Path</td>
					<% 	for (int i=0; i < vAppName.size(); i++) {
                       	if ( i%2==0 )
                           	out.println("<tr class=\"fila\" bgcolor=\"#dddddd\">");
                       	else
                           	out.println("<tr class=\"fila\" bgcolor=\"#ffffff\">");                         
                     	// App Name.
                     	out.println("<td>" + vAppName.elementAt(i) + "</td>");
						// App Version.
						out.println("<td>" + vAppVersion.elementAt(i) + "</td>");
						// App Path.
						out.println("<td>" + vAppPath.elementAt(i) + "</td>");
					}
					%>
					
				</tr>
			</table>
			</div>
		</td>
	</tr>
	<tr>
		<td class="campo">Date: </td>
		<td class="valor"><%=timestamp%></td>		
	</tr>
	<% if (! vmlogin.equals("null")) {
		out.println("<tr>");
		out.println("<td class=\"campo\">Owner: </td>");
		out.println("<td class=\"valor\">" + owner + "</td> ");
		out.println("</tr>");
	}
	%>
	<tr>
		<td class="campo">Hypervisor: </td>
		<td class="valor"><%=hyper%></td>		
	</tr>
	<tr>
		<td class="campo">OS Name: </td>
		<td class="valor"><%=osname%></td>		
	</tr>
	<tr>
		<td class="campo">OS Version: </td>
		<td class="valor"><%=osversion%></td>		
	</tr>
	<tr>
		<td class="campo">OS Flavour: </td>
		<td class="valor"><%=osflavour%></td>		
	</tr>
	<tr>
		<td class="campo">CPU Arch.: </td>
		<td class="valor"><%=systemcpu%></td>		
	</tr>
    <!--<tr>
		<td class="campo">Memory Size: </td> 
		<td class="valor"><%=systemmem%></td> 
	</tr>
	<tr>
		<td class="campo">Disk Size: </td>
		<td class="valor"><%=systemdisk%></td>		
	</tr -->
	
	<% if (! vmlogin.equals("null")) {	
		out.println("<tr>");
		out.println("<td class=\"campo\">VM login user: </td>");
		out.println("<td class=\"valor\">" + vmlogin + "</td>");
		out.println("</tr>");

		out.println("<tr>");
		out.println("<td class=\"campo\">VM login password: </td>");
		out.println("<td class=\"valor\">" + vmpassword + "</td>");
		out.println("</tr>");
	}
 
// 	if (!(path.equals(""))) {	
// 		out.println("<tr colspan=\"3\">");
// 		out.println("<td ><a style=\"color:white\" href=\"" + path + "\">download</a></td>");
// 		out.println("</tr>");
// 	}

	%>
</table>
</div>
</body>
</html>