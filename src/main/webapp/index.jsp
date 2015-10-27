<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="org.grycap.vmrc.client.api.VMRCServerAPI, 
			org.grycap.vmrc.client.utils.VMRCClientUtils,
			javax.servlet.http.HttpSession,
			java.util.List,
			java.util.Arrays, 
			java.util.Collections, 
			java.util.Comparator, 
			org.grycap.vmrc.client.ws.Vmi"%>
<%@page import="java.security.acl.Owner"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- The above 3 meta tags *must* come first in the head; any other head 
             content must come *after* these tags -->

<meta name="title"
	content="VMRC-WEB: The Virtual Machine image Repository & Catalog WEB-GUI">
<meta http-equiv="title"
	content="VMRC-WEB: The Virtual Machine image Repository & Catalog WEB-GUI">

<meta name="keywords"
	content="virtual machine, repository, catalog, ovf, web-gui">
<meta http-equiv="keywords"
	content="virtual machine, repository, catalog, ovf, web-gui">

<meta name="description"
	content="VMRC is a virtual machine image repository and catalog 
              for Cloud Computing infrastructures.">
<meta http-equiv="description"
	content="VMRC is a virtual machine image repository and catalog 
              for Cloud Computing infrastructures.">
<meta http-equiv="DC.Description"
	content="VMRC is a virtual machine image repository and 
              catalog for Cloud Computing infrastructures.">

<meta name="author"
	content="Institute for Molecular Imaging Technologies (I3M) - GRyCAP">
<meta name="organization"
	content="Institute for Molecular Imaging Technologies (I3M) - GRyCAP, 
              Polytechnic University of Valencia">
<meta name="locality" content="Valencia, Spain">

<meta http-equiv="CACHE-CONTROL" content="NO-CACHE">
<meta http-equiv="PRAGMA" content="NO-CACHE">
<meta http-equiv="content-language" content="en">

<link rel="shortcut icon" href="img/i3m/icon-vmrc.ico">

<title>VMRC Viewer WEB-GUI: The Virtual Machine image Repository
	and Catalog WEB-GUI</title>

<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/agency.css" rel="stylesheet">

<!--wizard plugin -->
<link href="css/bootstrap-wizard.css" rel="stylesheet">
<link href="chosen/chosen.css" rel="stylesheet">

<!-- Custom Fonts -->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet"
	type="text/css">
<link rel="stylesheet" href="font-mfizz/font-mfizz.css">
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
	rel="stylesheet" type="text/css">
<link href='https://fonts.googleapis.com/css?family=Kaushan+Script'
	rel='stylesheet' type='text/css'>
<link
	href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic'
	rel='stylesheet' type='text/css'>
<link
	href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700'
	rel='stylesheet' type='text/css'>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-30372148-1' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' === document.location.protocol ? 'https://ssl'
				: 'http://www')
				+ '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>

<!-- old -->
<link rel="stylesheet" type="text/css" href="css/main.css" />
<script type="text/javascript" src="js/utilidades.js"></script>

<%
    String current_user_name = "";
    String current_user_pass = "";
    String hostUrl = request.getLocalAddr(); //"http://172.17.0.1:8080/vmrc/vmrc";
    hostUrl = hostUrl + ":8080/vmrc/vmrc"; 
    String order = request.getParameter("order");
	List<Vmi> l = null;
	int totalVM = 0;
	String error = "";

	// Authentication
	HttpSession objSesion = request.getSession(true);
	String usernameSesion = (String) objSesion.getAttribute("user");
	String userpassSesion = (String) objSesion.getAttribute("password");
	String usernameAttrib = request.getParameter("userText");
	String userpassAttrib = request.getParameter("passText");
	String addVmi = request.getParameter("vmiText");
	
	if ((usernameAttrib == null) || 
			(usernameAttrib.equals("null")) || 
			(usernameAttrib.equals(""))) {		
		if ((usernameSesion == null) || 
				(usernameSesion.equals("null")) || 
				(usernameSesion.equals(""))) {
			current_user_name = "anonymous";
			current_user_pass = "";
		    objSesion.setAttribute("user", "anonymous");
		    objSesion.setAttribute("password", "");
		} else {			 
			current_user_name = usernameSesion;
			current_user_pass = userpassSesion;
			objSesion.setAttribute("user", usernameSesion);
			objSesion.setAttribute("password", userpassSesion);
	    }
	} else {
		current_user_name = usernameAttrib;
		current_user_pass = userpassAttrib;
	    objSesion.setAttribute("user", usernameAttrib);
	    objSesion.setAttribute("password", userpassAttrib);
	}
	
	//Connect to the service
	VMRCServerAPI vmrcApi; 
	try {
		vmrcApi = new VMRCServerAPI(current_user_name, current_user_pass, hostUrl);
		// Call corresponding methods in the VMRC service
		// Adding Vmi in case of...
		if ((addVmi != null) && (!(addVmi.equals("")))) {
			vmrcApi.addVMI(addVmi); 
		}		
		// Getting Vmi availables
		l = vmrcApi.listVMIs();
		totalVM = l.size();
		System.out.println("RESULT: " + l.size() + " indexed VMIs.");
	} catch (Exception e) {
		System.err.println("ERROR: " + e.getMessage());
		current_user_name = "ERROR!";
		if (e.getMessage().contains("already exists in VMRC")) {
			error = "ERROR: The given VMI already exists in VMRC."; 
		} else if (e.getMessage().contains("Unauthorized attempt to perform operation")) {
			error = "ERROR: The given credential do not have privilege to perform this operation.";
		} else {
			error = e.getMessage(); 
		}
	}
%>

</head>
<body class="index bg-darkest-gray">

	<div class="container formulario">
		<form name="login" method="post">
			<!--Main Table-->
			<table style="border: 0; cellspacing: 0; margin-left: auto; margin-right: auto;">
				<tr>
					<td>
						<!--Header Login-->
						<table style="border: 0; cellspacing: 0; background-image: url('img/i3m/f_fecha_selec.gif'); 
							background-repeat: repeat-x;">
							<tr>
								<td class="etiquetaCab" align="Left">
									&nbsp; 
									<label style="color: white; font-size: 16px;">
										VMRC Viewer: The Virtual Machine image Repository and Catalog (VMRC) WEB-GUI
									</label>
								</td>
								<td class="margenCab"></td>
								<td class="etiquetaCab" align="right">Using user: 
									<label style="color: yellow"><%=current_user_name%></label> &nbsp; 
									<a id="LineaSuperior1" href="https://github.com/grycap/vmrc" target="_blank"> 
										<label id="lhelp" style="color: white;"  
											onmouseover="paintHelp('#222222');"
											onmouseout="paintHelp('#ffffff');">Help</label>
									</a> &nbsp;&nbsp;
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr>
					<td>
						<!--Body Login-->
						<table style="border: 0; cellspacing: 0; background-image: url('img/i3m/f_cuadro_sup.gif'); 
							background-repeat: repeat-x;">
							<tr>
							    <td class="etiquetaCab" align="Left">
									&nbsp;
									<input class="btn btn-default" type="button" value="Register a VMI" onclick="setFocus('freg');" />
								</td>
								<td class="margenCab" align="right"></td>
								<td class="etiquetaCab" align="right">
									User:&nbsp;&nbsp; 
									<input name="userText" id="userText" type="text" size="15" maxlength="15">&nbsp;&nbsp;&nbsp;&nbsp;
									Password:&nbsp;&nbsp; 
									<input name="passText" id="passText" type="password" size="20" maxlength="25">&nbsp;&nbsp;&nbsp;&nbsp;
									<input type="submit" class="btn btn-default" style="color: #003C5E;" value="Login">&nbsp;&nbsp;										
									<input type="reset" class="btn btn-default" style="color: #003C5E;" value="Reset">&nbsp;&nbsp;							
								</td>
						</table>
					</td>
				</tr>

				<tr>
					<!-- Form -->
					<td>
						<table style="border: 0; cellspacing: 0;">
							<tr>
								<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
								<td style="width: 96%; background-color: #ECECEC; background-repeat: repeat-x; padding-top: 5px; 
									padding-bottom: 5px;">
								</td>
								<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
							</tr>

							<tr>
								<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
								<!-- Form Content -->
								<td style="width: 100%; background-color: #ECECEC;">
									
									<table>
										<tr>
											<td style="width: 96%; background-color: #ECECEC; text-align: center;">
												<%
													if (!(error.equals(""))) {
														//showmessage
														out.println("<label style=\"color: red;\">" + error + "</label>");
													}
												%>									
											</td>										
										</tr>
									</table>
									
									<div class="listado">
										<!-- Div Listado -->
										<p class="busqueda">
											&nbsp;Available virtual machines: &nbsp;&nbsp;<%=totalVM%>
										</p>
										<div class="tablascroll" style="background: #eeeeee; overflow: auto; padding-right: 15px; 
											padding-top: 15px; padding-left: 15px; padding-bottom: 15px; border-right: #6699CC 1px solid; 
											border-top: #999999 1px solid; border-left: #6699CC 1px solid; border-bottom: #6699CC 1px solid; 
											scrollbar-arrow-color: #999999; scrollbar-face-color: #666666; scrollbar-track-color: #3333333; 
											height: 400px;">
											<table style="cellspacing: 0; width: 100%;">
												<tbody>
													<tr class="titulo">
														<td>
															<a href="javascript:Siguiente('index.jsp?order=vmid')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a>
														    VM Id.
														</td>
														<td>
															<a href="javascript:Siguiente('index.jsp?order=hypervisor')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a> 
															Hyper.
														</td>
														<td>
															<a href="javascript:Siguiente('index.jsp?order=osname')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a>
															OS Name
														</td>
														<td>
															<a href="javascript:Siguiente('index.jsp?order=osversion')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a>
															OS Vers.
														</td>
														<td>
															<a href="javascript:Siguiente('index.jsp?order=osflavour')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a> 
															OS Flavour
														</td>
														<td>
															<a href="javascript:Siguiente('index.jsp?order=systemcpu')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a> 
															CPU
														</td>
														<!-- <td>
															<a href="javascript:Siguiente('index.jsp?order=systemmem')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a> 
															Mem.
														</td>
														<td>
															<a href="javascript:Siguiente('index.jsp?order=systemdisk')">
																<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0></a> 
															Disk
														</td> -->
														<td>
															<a style="border: 0;"></a>
															Applications
														</td>
														<td>
															<a style="border: 0;"></a>
															Info
														</td>
														<!--  <td><a href="javascript:Siguiente('busqCasos.jsp?select=&orden=convivencia')">
														<img src="img/i3m/flecha_up2.png" alt="Ordenación" border=0>
														</a>%=idiomaCabecera.getString("convivencia")%></td> -->
													</tr>

												    <%
														class CustomComparator implements Comparator<Vmi> {
														    public String filter;
															
														    public CustomComparator(String afilter) {
														    	filter = afilter; 	
														    }
															
														    @Override
															public int compare(Vmi o1, Vmi o2) {
																if (filter.equals("hypervisor")) {
																	return o1.getHypervisor().compareTo(o2.getHypervisor());
																} else if (filter.equals("osname")) {
																	return o1.getOs().getName().compareTo(o2.getOs().getName());
																} else if (filter.equals("osversion")) {
																	return o1.getOs().getVersion().compareTo(o2.getOs().getVersion());
																} else if (filter.equals("osflavour")) {
																	return o1.getOs().getFlavour().compareTo(o2.getOs().getFlavour());
																} else if (filter.equals("systemcpu")) {
																	return o1.getArch().compareTo(o2.getArch());
																} else if (filter.equals("systemdisk")) {
																	return o1.getDiskSize().compareTo(o2.getDiskSize());
																} else {
																	return o1.getName().compareTo(o2.getName());
																}																
													        }
													    }														
													
														if (totalVM > 0) {
															//Ordering the list
															if (!(order == null) && !(order.equals(""))) {
																Collections.sort(l, new CustomComparator(order));
															}

															int i = 0;
															for (Vmi vmi : l) {
																if (i % 2 == 0) 
																	out.println("<tr class=\"fila\" bgcolor=\"#dddddd\">");
																else
																	out.println("<tr class=\"fila\" bgcolor=\"#ffffff\">");
																out.println("<td>" + vmi.getName() + "</td>");
																out.println("<td>" + vmi.getHypervisor() + "</td>");
																out.println("<td>" + vmi.getOs().getName() + "</td>");
																out.println("<td>" + vmi.getOs().getVersion() + "</td>");
																out.println("<td>" + vmi.getOs().getFlavour() + "</td>");
																out.println("<td>" + vmi.getArch() + "</td>");
																//out.println("<td>" + "---" + "</td>");
																//out.println("<td>" + vmi.getDiskSize() + "</td>");
																String apps = "";  
																for (int j = 0; j < vmi.getApplications().size(); ++j) {
																	if (j == 0) {
																		apps = "["; 
																	} else {
																		apps = apps + ", [";
																	}
																	apps = apps + vmi.getApplications().get(j).getName() + ","; 
																	apps = apps + vmi.getApplications().get(j).getVersion() + ","; 
																	apps = apps + vmi.getApplications().get(j).getPath() + "]"; 
																}																
																out.println("<td>" + apps + "</td>");
																String pageinfo = "'info.jsp?vmid=" + vmi.getName();
																pageinfo += "&timestamp=" + "---";
																pageinfo += "&hypervisor=" + vmi.getHypervisor();
																pageinfo += "&owner=" + vmi.getOwner();
																pageinfo += "&vmlogin=" + vmi.getUserLogin();
																pageinfo += "&vmpassword=" + vmi.getUserPassword();
																pageinfo += "&osname=" + vmi.getOs().getName();
																pageinfo += "&osversion=" + vmi.getOs().getVersion();
																pageinfo += "&osflavour=" + vmi.getOs().getFlavour();
																pageinfo += "&systemcpu=" + vmi.getArch();
																//pageinfo += "&systemmem=" + "---";
																//pageinfo += "&systemdisk=" + vmi.getDiskSize();
																pageinfo += "&path=" + vmi.getLocation();
																pageinfo += "&applications=" + apps + "'";
																out.println("<td><a href=\"javascript:Abrir_ventana(" + pageinfo + ")\">[ + ]</a></td>");
																i++;
															}
														}
													%>
												
												</tbody>
											</table>
										</div>
									</div> <!-- Div Listado -->
								</td>
								<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
							</tr>

							<tr>
								<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
								<td style="width: 96%; background-color: #ECECEC; background-repeat: repeat-x;"
									align="center">
									<br>
								</td>
								<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
							</tr>
						</table>
					</td>
			</table>
			<!-- Tabla Principal -->
		</form>
		
		<div class="row">
			<div class="col-md-12">
				<hr>
			</div>
		</div>
		
		<form id="freg" method="post">
			<!--Main Table-->
			<table style="border: 0; cellspacing: 0; margin-left: auto; margin-right: auto;">
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <br />
					    <label style="color: #222222; font-size: 16px;"> 
					    	Enter the VMI description:
					    </label>
					</td>
				</tr>
			</table>
				
			<table style="border: 0; cellspacing: 0; margin-left: auto; margin-right: auto;">	
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="width: 10%; background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">Identifier/Name*:</label>
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <input type="text" name="vmiId" id="vmiId" size="50%">
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">Hypervisor*:</label> 
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <input type="text" name="vmiHy" id="vmiHy" size="50%">
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">OS Name*:</label> 
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <input type="text" name="vmiOn" id="vmiOn" size="50%">
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">OS Version*:</label>
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <input type="text" name="vmiOv" id="vmiOv" size="50%">
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">OS Flavour*:</label>
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <input type="text" name="vmiOf" id="vmiOf" size="50%">
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">CPU Architecture*:</label>
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <input type="text" name="vmiCp" id="vmiCp" size="50%">
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
						<label style="color: #1A65B4; font-size: 14px;">Applications:</label>
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
						<input type="text" name="vmiAp" id="vmiAp" size="50%"> 
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;">
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
						<label style="color: #1A65B4; font-size: 12px;">Use the format </label>
						<label style="color: red; font-size: 12px;">(Name, Version, Path) </label>
						<label style="color: #1A65B4; font-size: 12px;">to describe an application.</label> <br />
						<label style="color: #1A65B4; font-size: 12px;">To describe more than one application, use </label> 
						<label style="color: red; font-size: 12px;">";" </label> 
						<label style="color: #1A65B4; font-size: 12px;">as separator.</label>
					</td>
				</tr>
				
				<tr>
					<td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td style="background-color: #ECECEC; background-repeat: repeat-x;"></td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
					    <textarea name="vmiText" id="vmiText" style="display: none"></textarea>
					</td>
				</tr>
				
				<tr>	
				    <td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
				    
				    <td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left"></td>
				    
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
						<input class="btn btn-default" type="button" value="Record it!" onclick="uploadImage();" />
						<input type="reset" class="btn btn-default" value="Reset" />
					</td>
				</tr>
				
				<tr>	
				    <td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;"></td>
				    
				    <td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left"></td>
				    
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
						<label style="color: #1A65B4; font-size: 12px;">* indicates required field</label>
					</td>
				</tr>
				
				<tr>	
				    <td style="width: 2%; background-color: #ECECEC; background-repeat: repeat-x;">
				    	<br />
				    </td>
				    
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left">
						<br />
					</td>
					
					<td class="etiquetaCab" style="background-color: #ECECEC; background-repeat: repeat-x;" align="left"></td>
				</tr>
			</table>
		</form>

		<!-- Contact Section -->
		<div class="row">
			<div class="col-md-12">
				<hr>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<h5 class="text-center text-gray">
					Copyright © 2015, I3M-GRyCAP-UPV, Universitat Politècnica de València - 46022, Valencia, Spain
				</h5>
			</div>
		</div>
	</div>
	<!--Div class="formulario"-->

	<!-- jQuery -->
	<script src="js/jquery.js"></script>

	<!-- Bootstrap Core JavaScript -->
	<script src="js/bootstrap.min.js"></script>

	<script type="text/javascript">
		function uploadImage() {
			var vminm = document.getElementById("vmiId"); 
			var vmihy = document.getElementById("vmiHy"); 
			var vmion = document.getElementById("vmiOn"); 
			var vmiov = document.getElementById("vmiOv"); 
			var vmiof = document.getElementById("vmiOf"); 
			var vmicp = document.getElementById("vmiCp"); 
			var vmiap = document.getElementById("vmiAp"); 
			var vmitx = document.getElementById("vmiText");
			if (vminm.value != "") {				
				vmitx.value = "system.name = " + vminm.value + "\n" 
				if (vmihy.value != "") {				
					vmitx.value = vmitx.value + 
						"system.hypervisor = " + vmihy.value + "\n" 
					if (vmion.value != "") {				
						vmitx.value = vmitx.value + 
							"disk.os.name = " + vmion.value + "\n" 
						if (vmiov.value != "") {				
							vmitx.value = vmitx.value + 
								"disk.os.version = " + vmiov.value + "\n" 
							if (vmiof.value != "") {				
								vmitx.value = vmitx.value + 
									"disk.os.flavour = " + vmiof.value + "\n" 
								if (vmicp.value != "") {				
									vmitx.value = vmitx.value + 
										"cpu.arch = " + vmicp.value + "\n" 		
									//optionals
									if (vmiap.value != "") {
										var apps0 = vmiap.value.trim();
										var apps1 = apps0.split(";");
										for (var i = 0; i < apps1.length; i++) {
											var apps2 = apps1[i].trim(); 
											var apps3 = apps2.split(",");
											vmitx.value = vmitx.value + 
											"disk.applications contains (name = " + apps3[0].substring(1, apps3[0].length) + 
													", version = " + apps3[1] + 
													", path = " + apps3[2] + "\n" 
										}									
									}		
									document.getElementById("freg").submit();										
								} else {		
									alert("Fill CPU Architecture field.");
								}
							} else {		
								alert("Fill OS Flavour field.");
							}	
						} else {		
							alert("Fill OS Version field.");
						}
					} else {		
						alert("Fill OS Name field.");
					}					
				} else {		
					alert("Fill Hypervisor field.");
				}	
			} else {		
				alert("Fill Id./Name field.");
			}
 		}
		
		function setFocus(id) {
			window.location.href="#" + id;
 		}
		
		function paintHelp(colorId) {
			document.getElementById("lhelp").style.color = colorId;
 		}
	</script>

</body>
</html>
