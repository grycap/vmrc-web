vmrc-web: A Web GUI for VMRC
========

<!-- language: lang-none -->
    ____   ____  ____    ____  _______      ______  
    |_  _| |_  _||_   \  /   _||_   __ \   .' ___  |
     \ \   / /    |   \/   |    | |__) | / .'   \_|
      \ \ / /     | |\  /| |    |  __ /  | |
       \ ' /     _| |_\/_| |_  _| |  \ \_\ `.___.'\
        \_/     |_____||_____||____| |___|`.____ .'


A Virtual Machine Image Repository & Catalog
Developed by the [Grid and High Performance Computing Group (GRyCAP)](http://www.grycap.upv.es) at the
[Universitat Politècnica de València (UPV)](http://www.upv.es).

Web page: http://www.grycap.upv.es/vmrc

0. Introduction
=================
VMRC is client-server system (based on Web Services) to index Virtual Machine Images (VMI)
along with its metadata (OS, applications, etc.). It supports matchmaking to obtain the appropriate VMIs
that satisfy a given set of hard (must) requirements and soft (should) requirements.

Current version: 2.1.2

This repository only includes the VMRC web client. Additional packages available are:
  - [vmrc](http://github.com/grycap/vmrc) (The server-side part of the Repository & Catalog of VMIs)
  - [vmrc-client](http://github.com/grycap/vmrc-client) (A client-side part of the Repository & Catalog of VMIs)

You will require a running instance of the VMRC service and the vmrc-client API to compile this code and to connect from this web client.

1. Features
============
+ Web-based GUI to interact with [VMRC](https://www.github.com/grycap/vmrc)

2. Requirements
===============
+ Java JDK 1.7+
+ Maven (to compile from sources)
+ The vmrc-client API as a maven dependency
+ Apache Tomcat (to deploy the WAR)

3. Compilation & Installation
================================================
 1. Clone the vmrc-client repository from GitHub
 ```
 git clone https://github.com/grycap/vmrc-client.git
 ```
 
 2. Make sure that the VMRC Server is up & running and listening at http://your_ip:8080
   * This is the default configuration if you followed the instructions when installing VMRC.
   * During compilation of the client, the service WSDL is dynamically accessed to create some classes by taking into account that your_ip is `localhost` otherwise it must be setted in `pom.xml` file.
 
 3. Compile from sources with the command:
 ```
 mvn package
 ```
 The file $VMRC_CLIENT_LOCATION/target/vmrc-client.jar will be generated.

 4. Install from sources as a maven dependency: 
 ```
 mvn install -Dfile=vmrc-client.jar -DgroupId=org.grycap -DartifactId=vmrc-client -Dversion=2.1.2 -Dpackaging=jar
 ```
 
 5. Clone the repository from GitHub
 ```
 git clone https://github.com/grycap/vmrc-web.git
 ```
 
 6. Compile from sources with the command:
 ```
 mvn package
 ```
 The file $VMRC_WEB_LOCATION/target/vmrc-web-gui.war will be generated.
 
 7. Deploy vmrc-web-gui.war into Apache Tomcat (simply drop the war file into Tomcat's webapps folder).
 
 8. Start Apache Tomcat
   + $TOMCAT_HOME/bin/startup.sh
 
 9. VMRC web client should be available at http://your_ip:8080/vmrc/vmrc

4. Usage
===========
1. You should use the VMRC web client as tool for user and admin to list the VMIs available in the catalog and adding new ones VMIs, considering the user credentials and the Access Control Lists (ACLs) imposed by the VMI owner.
