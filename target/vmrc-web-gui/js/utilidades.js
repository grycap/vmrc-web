/***************************************************/
/** Funcion activa(formulario)			  **/
/** 						  **/
/** Habilita todos los botones de un formulario   **/
/** 						  **/
/***************************************************/

function activa(formulario){

var tamano = eval('document.'+formulario+'.elements.length');
var x = Number(tamano);

for (i=0; i<x ; i++) {
	if ((eval("document.forms['"+formulario+"'].elements[i].type=='button'")) || (eval("document.forms['"+formulario+"'].elements[i].type=='submit'")))
		(eval("document.forms['"+formulario+"'].elements[i].disabled=false"));
	}
}




/***************************************************/
/** Funcion desactiva(formulario)		  **/
/** 						  **/
/** Deshabilita todos los botones de un        	  **/
/** formulario                                    **/
/** 						  **/
/***************************************************/

function desactiva(formulario){

var tamano = eval('document.'+formulario+'.elements.length');
var x = Number(tamano);

for (i=0; i<x ; i++) {
	if ((eval("document.forms['"+formulario+"'].elements[i].type=='button'")) || (eval("document.forms['"+formulario+"'].elements[i].type=='submit'")))
		(eval("document.forms['"+formulario+"'].elements[i].disabled=true"));
	}
}



/***************************************************/
/** Funcion desactiva2(formulario,nombre)	  **/
/** 						  **/
/** Deshabilita determinados botones de un        **/
/** formulario pasandole el formulario y el       **/
/** nombre del boton.				  **/
/** 						  **/
/***************************************************/
function desactiva2(formulario,nombre){

var tamano = eval('document.'+formulario+'.elements.length');
var x = Number(tamano);

for (i=0; i<x ; i++) {
	if ("document.forms['"+formulario+"'].elements[i].type=='button'")
		if (eval("document.forms['"+formulario+"'].elements[i].name==nombre")) {
		(eval("document.forms['"+formulario+"'].elements[i].disabled=true"));}
	}
}



/***************************************************/
/** Funcion activa2(formulario,nombre)	  	  **/
/** 						  **/
/** Habilita determinados botones de un           **/
/** formulario pasandole el formulario y el       **/
/** nombre del boton.				  **/
/** 						  **/
/***************************************************/
function activa2(formulario,nombre){

var tamano = eval('document.'+formulario+'.elements.length');
var x = Number(tamano);

for (i=0; i<x ; i++) {
	if ("document.forms['"+formulario+"'].elements[i].type=='button'")
		if (eval("document.forms['"+formulario+"'].elements[i].name==nombre")) {
			(eval("document.forms['"+formulario+"'].elements[i].disabled=false"));
		}
	}
}


/***************************************************/
/** Funcion Obligatorio(array,formulario)         **/
/** 					          **/
/** Recibe un array con los nombres de los campos **/
/** obligatorios de un formulario y no habilita   **/
/** los botones de dicho form hasta que no se     **/
/** hayan rellenado todos.                        **/
/** 						  **/
/***************************************************/


function Obligatorio(texto,formulario){

var x = Number(texto.length);

for (i=0; i<x ; i++) {

	var tipo = eval('document.'+formulario+'.'+texto[i]+'.type');
	var objeto = eval("document."+formulario+"."+texto[i]+"");

	switch (tipo) {

		case 'select-one' :

			if (valorcombo(texto[i],formulario)=="") {
				desactiva(formulario);
				return false;

			} else {

				if (eval("document.forms['"+formulario+"']."+texto[i]+".name=='nifpas'"))
					if ((valorcombo(texto[i],formulario)=="NIF") && (document.f.numnifpas.value!="")) calcularNIF('numnifpas');

			}

			break;

		case 'text' :

			var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');

			if (cadena=="") {

				desactiva(formulario);
				return false;

			} else {

				if (eval("document.forms['"+formulario+"']."+texto[i]+".name=='email'"))  validaemail(cadena,objeto);
				if (eval("document.forms['"+formulario+"']."+texto[i]+".name=='cif'")) CompruebaDatos(objeto);
				if (eval("document.forms['"+formulario+"']."+texto[i]+".name=='banco'")) validarcta(f);

			}

			break;


		case 'password' :

			var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');
			if (cadena=="") {
				desactiva(formulario);
				return false;
			}
			break;


		case 'checkbox' :

			var cadena= eval('document.'+formulario+'.'+texto[i]+'.checked');
			if (!cadena) {
				desactiva(formulario);
				return false;
			}

			break;


		case 'radio' :

			var cadena = eval('document.'+formulario+'.'+texto[i]+'.length');
			alert(cadena);
			if (cadena=="") {
				desactiva(formulario);
				return false;
			}

			break;


		default :

			break;

	}
}
activa(formulario);
}





/********************************************************/
/** Funcion Obligatorios(campos,botones,formulario)    **/
/** 					               **/
/** Recibe un array con los nombres de los campos      **/
/** obligatorios de un formulario, otro array con      **/
/** nombres de los botones susceptibles de ser	       **/
/** habilitados o no y el nombre del formulario        **/
/** que los contiene.				       **/
/** La funcion no habilitar� los botones hasta que     **/
/** no se rellenen todos los campos obligatorios.      **/
/** 						       **/
/** Ademas valida campos de tipo:		       **/
/** 						       **/
/** Tipo campo	  Nombre			       **/
/** ----------	  ------			       **/
/** - e-mail ---> email				       **/
/** - CIF    ---> cif				       **/
/** - Cuentas --> banco CCC (banco-sucursal-dc-cuenta) **/
/** 						       **/
/********************************************************/

function Obligatorios(texto,botones,formulario){

var x = Number(texto.length);

for (i=0; i<x ; i++) {

	var objeto = eval("document."+formulario+"."+texto[i]+"");
	var tipo = eval('document.'+formulario+'.'+texto[i]+'.type');
	var nombre = eval("document."+formulario+"."+texto[i]+".name");
	var cadena = eval("document."+formulario+"."+texto[i]+".value");


	if (objeto.disabled==false) {


	switch (tipo) {

		case 'select-one' :


			if (valorcombo(texto[i],formulario)=="") {
				desactivaB(formulario,botones);
				//pintarojo(objeto);
				return false;
			}

			//pintaazul(objeto);
			break;

		case 'text' :

			if (cadena=="") {

				desactivaB(formulario,botones);
				//pintarojo(objeto);
				return false;

			} else {

				if (nombre=='banco') validarcta(f);
				if ((nombre=='email') || (nombre.indexOf("email")!=-1)) if (!validarEmail(cadena)) { desactivaB(formulario,botones); return; }
				//pintaazul(objeto);
			}

			break;


		case 'password' :

			if (cadena=="") {
				desactivaB(formulario,botones);
				return false;
			}
			break;


		case 'checkbox' :

			var cadena= eval('document.'+formulario+'.'+texto[i]+'.checked');
			if (!cadena) {
				desactivaB(formulario,botones);
				return false;
			}

			break;


		case 'radio' :

			var cadena = eval('document.'+formulario+'.'+texto[i]+'.length');
			alert(cadena);
			if (cadena=="") {
				desactivaB(formulario,botones);
				return false;
			}

			break;



		case 'textarea':

			//No esta terminado
			if (cadena=="") {
				desactivaB(formulario,botones);
				//pintarojo(objeto);
				return false;
			}
			//pintaazul(objeto);
			break;


		default :

			break;

	}  // Switch

	} // if

} // for

activaB(formulario,botones);

}  //function




/***************************************************/
/** Funcion pintarojo(objeto) 			  **/
/** 						  **/
/***************************************************/

function pintarojo(objeto) {
labels=f.getElementsByTagName("label");
 for (var i=0;i<labels.length;i++){
     obj=labels[i];
	  if (obj.htmlFor==objeto.name) obj.style.color='red';
	}
}



/***************************************************/
/** Funcion pintaazul(objeto) 			  **/
/** 						  **/
/***************************************************/

function pintaazul(objeto) {
labels=f.getElementsByTagName("label");
 for (var i=0;i<labels.length;i++){
     obj=labels[i];
	  if (obj.htmlFor==objeto.name) obj.style.color='#00539F';
	}
}



/***************************************************/
/** Funcion desactivaB(formulario,botones)	  **/
/** 						  **/
/** Deshabilita determinados botones de un        **/
/** formulario pasandole el formulario y un       **/
/** array con los nombres de los botones.	  **/
/** 						  **/
/***************************************************/

function desactivaB(formulario,botones){
var tamano = eval('document.'+formulario+'.elements.length');
var bsize = Number(botones.length);
var x = Number(tamano);
for (i=0; i<x ; i++) {
	if ("document.forms['"+formulario+"'].elements[i].type=='button'")
	for (k=0; k<bsize; k++) {
		var nombre = eval('document.'+formulario+'.'+botones[k]+'.name');
		if (eval("document.forms['"+formulario+"'].elements[i].name=='"+nombre+"'")) (eval("document.forms['"+formulario+"'].elements[i].disabled=true"));
		}
	}
}



/***************************************************/
/** Funcion activaB(formulario,botones)	 	  **/
/** 						  **/
/** Habilita determinados botones de un           **/
/** formulario pasandole el formulario y un       **/
/** array con los nombres de los botones.	  **/
/** 						  **/
/***************************************************/

function activaB(formulario,botones){
var tamano = eval('document.'+formulario+'.elements.length');
var bsize = Number(botones.length);
var x = Number(tamano);
for (i=0; i<x ; i++) {
	if ("document.forms['"+formulario+"'].elements[i].type=='button'")
	for (k=0; k<bsize; k++) {
		var nombre = eval('document.'+formulario+'.'+botones[k]+'.name');
		if (eval("document.forms['"+formulario+"'].elements[i].name=='"+nombre+"'")) (eval("document.forms['"+formulario+"'].elements[i].disabled=false"));
		}
	}
}






/***************************************************/
/** Funcion ObligatorioUno(array,formulario)      **/
/** 					          **/
/** Recibe un array con los nombres de los campos **/
/** obligatorios de un formulario y no habilita   **/
/** los botones del formulario hasta que no se    **/
/** haya rellenado al menos uno.                  **/
/** 						  **/
/***************************************************/


/* Funci�n que valida todos los campos obligatorios de un formulario */

function ObligatorioUno(texto,formulario){

var x = Number(texto.length);

for (i=0; i<x ; i++) {


	var objeto = eval("document."+formulario+"."+texto[i]+"");
	var tipo   = eval("document."+formulario+"."+texto[i]+".type");
	var nombre = eval("document."+formulario+"."+texto[i]+".name");
	var cadena = eval("document."+formulario+"."+texto[i]+".value");


	switch (tipo) {

		case 'select-one' :


			if (!valorcombo(texto[i],formulario)=="") {
				activa(formulario);
				return false;
			}

			break;

		case 'text' :

			if (nombre=='numnifpas') break;

			var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');
			if (!cadena=="") {
				activa(formulario);
				return false;
			}
			break;


		case 'password' :
			var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');
			if (!cadena=="") {
				activa(formulario);
				return false;
			}
			break;

		default :

	}
}
desactiva(formulario);
}





/*******************************************************/
/** Funcion ObligatorioUno(arrayC,arrayB,formulario)  **/
/** 					              **/
/** Recibe un array con los nombres de los campos     **/
/** obligatorios de un formulario, otro array con los **/
/** nombre de los botones susceptibles de estar       **/
/** habilitados o no y el formulario.		      **/
/** 						      **/
/*******************************************************/


/* Funci�n que valida todos los campos obligatorios de un formulario */

function ObligatorioUnos(texto,botones,formulario){

var x = Number(texto.length);

for (i=0; i<x ; i++) {

	var tipo = eval('document.'+formulario+'.'+texto[i]+'.type');
	var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');

	switch (tipo) {

		case 'select-one' :
			if (!valorcombo(texto[i],formulario)=="") {
				activaB(formulario,botones);
				return false;
			}
			break;

		case 'text' :
			var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');
			if (!cadena=="") {
				activaB(formulario,botones);
				return false;
			}
			break;


		case 'password' :
			var cadena = eval('document.'+formulario+'.'+texto[i]+'.value');
			if (!cadena=="") {
				activaB(formulario,botones);
				return false;
			}
			break;

		default :

	}
}
desactivaB(formulario,botones);
}





/***************************************************/
/** Funcion prueba(formulario)		          **/
/** 					          **/
/** Funcion que recorre el formulario f, en       **/
/** busca de elementos tipo checkbox chequeados   **/
/** en caso afirmativo habilita los botones       **/
/** de dicho formulario. 		          **/
/** 						  **/
/***************************************************/

function prueba(formulario){

var tamano = eval('document.'+formulario+'.elements.length');

var x = Number(tamano);
var a = new Boolean()

for (i=0; i<x ; i++) {
	if (eval("document.forms['"+formulario+"'].elements[i].type=='checkbox'"))
		if (eval("document.forms['"+formulario+"'].elements[i].checked")) {
			a = true;
		}
	}
(a==true) ? activa(formulario) : desactiva(formulario) ;
}




/*************************************************/
/** Funcion valorcombo(campo,formulario)        **/
/** 					        **/
/** Recibe el nombre de un objeto de tipo combo **/
/** devuelve el literal elegido en el combo.    **/
/** 					        **/
/*************************************************/

function valorcombo(campo,formulario){

var indice=eval('document.'+formulario+'.'+campo+'.options.selectedIndex');
var texto=eval('document.'+formulario+'.'+campo+'.options[indice].text');
return texto;
}



function Abrir_ventana(pagina) {
var left = (screen.width/2)-(508/2);
var top = (screen.height/2)-(320/2);
var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=508, height=320, top="+top+",left="+left+";"
window.open(pagina,"",opciones);
}


/*************************************************/
/** Funcion PopUp(pagina,alto,ancho)	        **/
/** 					        **/
/** Recibe el nombre de la p�gina, el alto      **/
/** y ancho en px, para abrirla en una p�gina   **/
/** PopUp.					**/
/**						**/
/*************************************************/

function PopUp(pagina,alto,ancho){
var winleft = (screen.width-alto)/2;
var wintop = (screen.height-ancho)/2;
tmp = window.open(pagina, '_blank', 'width='+alto+',height='+ancho+',left='+winleft+', top='+wintop+',screenX='+winleft+',screenY='+wintop+'');
tmp.focus();
}



/*************************************************/
/** Funcion Siguiente(pagina)		     	**/
/** 					     	**/
/** Funcion para los enlaces, se le pasa la  	**/
/** p�gina a cargar. 			     	**/
/** 					     	**/
/*************************************************/

function Siguiente(pagina){
document.location=pagina;
}


function Siguiente2(pagina){
document.url=pagina;
}


/*************************************************/
/** Funcion  on(objeto)  y  off(objeto)         **/
/** 					        **/
/** Funcion utilizada para el cambio de color   **/
/** en los campos de texto y los combos, se le	**/
/** pasa el objeto.			        **/
/** 					     	**/
/*************************************************/

function on(objeto) {
objeto.style.background='#FFC37F';
}

function off(objeto) {
objeto.style.background='#ffffff';
}


function tomaFoco(objeto) {
  //objeto.style.backgroundImage = "url(../../backgrounds/bg_forms_ama.gif)"; 
  //objeto.style.backgroundColor = '#FFC37F';
}

function dejaFoco(objeto) {
  //objeto.style.backgroundImage = "url(../../backgrounds/bg_forms.gif)"; 
  //objeto.style.backgroundColor = '#ffffff';
}


function perderFoco(objeto){
window.focus(); 
}

/*************************************************/
/** Funcion over(objeto)  y  no_over(objeto)    **/
/** 					        **/
/** Funcion utilizada para el cambio de color   **/
/** en la filasde las tablas, se le pasa el     **/
/** objeto.				        **/
/** 					     	**/
/*************************************************/

function over(objeto) {
objeto.className='filaover';
}


function no_over(objeto,celda) {
objeto.className=celda;
}



/*************************************************/
/** Funcion radio_habilitar(formulario)		**/
/** 					        **/
/** Funcion que recorre el formulario, en busca **/
/** de elementos tipo radio chequeados en caso 	**/
/** afirmativo habilita los botones del         **/
/** formulario. 		                **/
/** 					     	**/
/*************************************************/

function radio_habiltar(formulario){

var f = formulario;
var tamano = eval('document.'+formulario+'.elements.length');

var x = Number(tamano);
var a = new Boolean()

for (i=0; i<x ; i++) {
	if (eval("document.forms['"+formulario+"'].elements[i].type=='radio'"))
		if (eval("document.forms['"+formulario+"'].elements[i].checked")) {
			a = true;
		}
	}

(a==true) ? activa(f) : desactiva(f) ;

}




/*************************************************/
/** Funcion validaemail(direccion)		**/
/** 					        **/
/** 					     	**/
/*************************************************/

    function validaemail(direccion,objeto) {
       if (direccion.indexOf("@") != -1)
          return true;
       else {
          alert('Debe escribir una direcci�n de correo v�lida');
	  objeto.focus();
          return false;
       }
    }



/*************************************************/
/** Funcion validaemail(valor)		        **/
/** 					        **/
/** 					     	**/
/*************************************************/

function validarEmail(valor) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)){
    return (true)
  } else {
    alert("La direcci�n de email es incorrecta.");
    return (false);
  }
}





/*************************************************/
/** CompruebaDatos(CIF)				**/
/** 					        **/
/** Funci�n que comprueba la entrada de datos 	**/
/** a la funcion			        **/
/** 					        **/
/*************************************************/

function CompruebaDatos(elCIF) {

  var resul = false;
  var temp = elCIF.value.toUpperCase(); // pasar a may�sculas

  if (!/^[A-Za-z0-9]{9}$/.test(temp))   // Son 9 d�gitos?

     alert ("Longitud incorrecta, un CIF consta de 9 d�gitos");

  else if (!/^[ABCDEFGHKLMNPQS]/.test(temp)) // Es una letra de las admitidas ?

     alert("El primer d�gito es incorrecto, debe ser una letra de las siguientes: A,B,C,D,E,F,G,H,K,L,M,N,P,Q,S ");

  else

     resul = true;

  return resul;
}



/*************************************************/
/** ValidaCIF(F)				**/
/** 					        **/
/** Funci�n de validaci�n del CIF,indica el  	**/
/** d�gito de control.			        **/
/** 					        **/
/** La funci�n recibe el CIF completo: A58818501**/
/** Retorna el d�gito de control	        **/
/** 					        **/
/*************************************************/

function ValidaCIF(F) {

  var v1 = new Array(0,2,4,6,8,1,3,5,7,9);
  var temp = 0;
  var temp1;


  for( i = 2; i <= 6; i += 2 )
    {
      temp = temp + v1[ parseInt(F.cif.value.substr(i-1,1)) ];
      temp = temp + parseInt(F.cif.value.substr(i,1));
    };

  temp = temp + v1[ parseInt(F.cif.value.substr(7,1)) ];

  temp = (10 - ( temp % 10));

  if( temp == 10 )
    alert( "El d�gito de control es: J � 0" );
  else
    alert( "El d�gito de control es: "+temp );

  return true;
}












/*************************************************/
/** CompruebaDatos2(CIF)			**/
/** 					        **/
/** Funci�n que comprueba la entrada de datos 	**/
/** a la funcion			        **/
/** 					        **/
/*************************************************/

function CompruebaDatos2(elCIF) {

  var resul = false;
  var temp = elCIF.toUpperCase(); // pasar a may�sculas

  if (!/^[A-Za-z0-9]{9}$/.test(temp))   // Son 9 d�gitos?

     alert ("Longitud incorrecta, un CIF consta de 9 d�gitos");

  else if (!/^[ABCDEFGHKLMNPQS]/.test(temp)) // Es una letra de las admitidas ?

     alert("El primer d�gito es incorrecto, debe ser una letra de las siguientes: A,B,C,D,E,F,G,H,K,L,M,N,P,Q,S ");

  else

     resul = true;

  return resul;
}




/*************************************************/
/** ValidaCIF2(F)				**/
/** 					        **/
/** Funci�n de validaci�n del CIF,indica el  	**/
/** d�gito de control.			        **/
/** 					        **/
/** La funci�n recibe el CIF completo: A58818501**/
/** Retorna un booleano.		        **/
/** 					        **/
/*************************************************/

function ValidaCIF2(F) {

  var v1 = new Array(0,2,4,6,8,1,3,5,7,9);
  var temp = 0;
  var temp1;

  var dc = F.substring(8,9);

  for( i = 2; i <= 6; i += 2 )
    {
      temp = temp + v1[ parseInt(F.substr(i-1,1)) ];
      temp = temp + parseInt(F.substr(i,1));
    };

  temp = temp + v1[ parseInt(F.substr(7,1)) ];

  temp = (10 - ( temp % 10));


  if (temp!=dc) {

	alert ('El CIF introducido no es correcto');

	return false;

	} else {

	return true;

	}

}


/*************************************************/
/** Funcion numerico(valor)			**/
/** 					        **/
/** Funci�n que comprueba que es un n�mero 	**/
/** 			       			**/
/*************************************************/

function numerico(valor){
  cad = valor.toString();
  for (var i=0; i<cad.length; i++) {
    var caracter = cad.charAt(i);
	if (caracter<"0" || caracter>"9")
	  return false;
  }
  return true;
}

/*********************************************/
/** Funcion numericoPEPs(valor)			    **/
/** 					                    **/
/** Funci�n que comprueba que es un n�mero 	**/
/** 			 JMA            			**/
/*********************************************/

function numericoPEPs(valor){
  cad = valor.toString();
  for (var i=0; i<cad.length; i++) {
    var caracter = cad.charAt(i);
	if (caracter<"0" || caracter>"9" || caracter!="N" || caracter!="n" || caracter!="P" || caracter!="p")
	  return false;
  }
  return true;
}

/*************************************************/
/** Funcion validarcta(formulario)		**/
/** 					        **/
/** Funci�n que comprueba un n�mero de cuenta, 	**/
/** se le pasa el formulario y busca los campos	**/
/** banco,sucursal,dc y cuenta y lo valida.	**/
/** 			       			**/
/*************************************************/

function validarcta(f) {
  if (f.banco.value == ""  || f.sucursal.value == "" ||  f.dc.value == "" || f.cuenta.value == "")
    alert("Por favor, introduzca los datos de su cuenta");
  else {
	if (f.banco.value.length != 4 || f.sucursal.value.length != 4 || f.dc.value.length != 2 || f.cuenta.value.length != 10) alert("Por favor, introduzca correctamente los datos de su cuenta; no est�n completos");
	else {
  	  if (!numerico(f.banco.value) || !numerico(f.sucursal.value) || !numerico(f.dc.value) || !numerico(f.cuenta.value)) alert("Por favor, introduzca correctamente los datos de su cuenta; no son numericos");
	  else {
	    if (!(obtenerDigito("00" + f.banco.value + f.sucursal.value) == parseInt(f.dc.value.charAt(0))) || !(obtenerDigito(f.cuenta.value) == parseInt(f.dc.value.charAt(1))) ) alert("Los d�gitos de control no se corresponden con los dem�s n�meros de la cuenta");
  	  }
    }
  }
}


/*************************************************/
/** obtenerDigito(valor)			**/
/** 					        **/
/** devuelve el d�gito de control 	 	**/
/** correspondiente utilizada por la funcion	**/
/** anterior validarcta(formulario)		**/
/** 			       			**/
/*************************************************/

function obtenerDigito(valor){
  valores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
  control = 0;
  for (i=0; i<=9; i++)
    control += parseInt(valor.charAt(i)) * valores[i];
  control = 11 - (control % 11);
  if (control == 11) control = 0;
  else if (control == 10) control = 1;
  return control;
}

/*************************************************/
/** function calcularNIF(nif)			**/
/** 					        **/
/** Funcion que v�lida el nif.			**/
/** 						**/
/** 			       			**/
/*************************************************/

function calcularNIF(nif) {

if (nif.length!=9) { alert('El NIF introducido no es correcto'); return false; }
var dni = nif.substring(0,8);
var letra = nif.substring(8,9).toUpperCase();

if (!/^\d{8}$/.test(dni)) {
  alert ("El NIF introducido no es correcto");
  return false;
}

var letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
var numero = dni%23;

if (letra == letras.substring(numero,numero+1)) {
	return true;
	} else {
	alert('El NIF introducido no es correcto');
	return false;
	}
}

/*************************************************/
/** function numerico()  			**/
/** 					        **/
/** Funcion que v�lida que solo entren valores	**/
/** num�ricos en un campo, se utiliza con el    **/
/** evento OnKeyPress.	       			**/
/** 			       			**/
/*************************************************/

function numerico() {
if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
}

function numerico_mas_menos(){  // <> nN pP
 
   if (event.keyCode == 112 || event.keyCode == 80 || event.keyCode == 110 || event.keyCode == 78|| event.keyCode == 60 || event.keyCode == 62){
      event.returnValue = true;
   }else if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
  //if (event.keyCode == 37 || event.keyCode == 39 || event.keyCode < 45 || event.keyCode > 57  ) event.returnValue = false;
}



function keySort(dropdownlist,caseSensitive) {

  // check the keypressBuffer attribute is defined on the dropdownlist
  
  if (dropdownlist.keypressBuffer == undefined) {
    dropdownlist.keypressBuffer = '';
  }
  // get the key that was pressed
  var key = String.fromCharCode(window.event.keyCode);
  dropdownlist.keypressBuffer += key;
  if (!caseSensitive) {
    // convert buffer to lowercase
    dropdownlist.keypressBuffer = dropdownlist.keypressBuffer.toLowerCase();
  }
  // find if it is the start of any of the options
  var optionsLength = dropdownlist.options.length;
  for (var n=0; n < optionsLength; n++) {
    var optionText = dropdownlist.options[n].text;
    if (!caseSensitive) {
      optionText = optionText.toLowerCase();
    }
    if (optionText.indexOf(dropdownlist.keypressBuffer,0) == 0) {
      dropdownlist.selectedIndex = n;
      return false; // cancel the default behavior since
                    // we have selected our own value
    }
  }
  // reset initial key to be inline with default behavior
  dropdownlist.keypressBuffer = key;
  return true; // give default behavior
}




/*************************************************/
/** function fecha()	  			**/
/** 					        **/
/** fecha en formato (dd/mm/aaaa)		**/
/** 			       			**/
/*************************************************/

function fecha(){
	var mydate=new Date();
	var year=mydate.getYear();
	var Digital=new Date();


	if (year < 1000)
		year+=1900;
	var day=mydate.getDay();
	var month=mydate.getMonth()+1;
	if (month<10)
		month="0"+month;
	var daym=mydate.getDate();
	if (daym<10)
		daym="0"+daym;

	document.write(daym+"/"+month+"/"+year)
}



/*************************************************/
/** function formatCurrency(num)		**/
/** 					        **/
/*************************************************/


function formatCurrency(num) {
num = num.toString().replace(/\$|\,/g,'');
if(isNaN(num))
num = "0";
sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.50000000001);
cents = num%100;
num = Math.floor(num/100).toString();
if(cents<10)
cents = "0" + cents;
for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3))+','+
num.substring(num.length-(4*i+3));
return (((sign)?'':'-') + num + '.' + cents);
}

/*************************************************/
/** function Ayuda()     JMA      		**/
/** 					        **/
/*************************************************/
function Ayuda(){
//   window.open("../Ayuda/AyudaCIBERSAM.html","AyudaCIBERSAM",'width=800, height=700,left=100,top=100, menubar=no,scrollbars=no, toolbar=no' );
//   window.open("../Herramientas/Manual.pdf","Ayuda CIBERSAM",'width=800, height=700,left=100,top=100, menubar=no,scrollbars=no, toolbar=no');
//   wd=screen.width
//   ht=screen.heigth
window.open("../docs/Manual.pdf","Ayuda_CIBERSAM")
}


/*************************************************/
/** function CIE10()     JMA      		**/
/** 					        **/
/*************************************************/
/*function CIE10(){
   window.open("../General/CIE10.jsp","CIE10",'width=620, height=300,left=200,top=200, menubar=no,scrollbars=yes, toolbar=no' );
}*/


/*************************************************/
/** function PerfilUsuario()     JMA  		**/
/** 					        **/
/*************************************************/
function PerfilUsuario(){
   window.open("../General/PerfilUsuario.jsp","PerfilUsuario",'width=800, height=700,left=100,top=100, menubar=yes, scrollbars=yes, toolbar=yes' );
}


/*************************************************/
/** function Desconexion()     JMA     		**/
/** 					        **/
/*************************************************/
function Desconexion(){

window.opener = "madre";
window.close();

}

/*
ua.js 2001-12-05

Contributor(s): Bob Clary, Netscape Communications, Copyright 2001

Netscape grants you a royalty free license to use or modify this
software provided that this copyright notice appears on all copies.
This software is provided "AS IS," without a warranty of any kind.
*/

function xbDetectBrowser()
{
  var oldOnError = window.onerror;
  var element = null;

  window.onerror = null;

  // work around bug in xpcdom Mozilla 0.9.1
  window.saveNavigator = window.navigator;

  navigator.OS    = '';
  navigator.version  = parseFloat(navigator.appVersion);
  navigator.org    = '';
  navigator.family  = '';

  var platform;
  if (typeof(window.navigator.platform) != 'undefined')
  {
    platform = window.navigator.platform.toLowerCase();
    if (platform.indexOf('win') != -1)
      navigator.OS = 'win';
    else if (platform.indexOf('mac') != -1)
      navigator.OS = 'mac';
    else if (platform.indexOf('unix') != -1 || platform.indexOf('linux') != -1 || platform.indexOf('sun') != -1)
      navigator.OS = 'nix';
  }

  var i = 0;
  var ua = window.navigator.userAgent.toLowerCase();

  if (ua.indexOf('opera') != -1)
  {
    i = ua.indexOf('opera');
    navigator.family  = 'opera';
    navigator.org    = 'opera';
    navigator.version  = parseFloat('0' + ua.substr(i+6), 10);
  }
  else if ((i = ua.indexOf('msie')) != -1)
  {
    navigator.org    = 'microsoft';
    navigator.version  = parseFloat('0' + ua.substr(i+5), 10);

    if (navigator.version < 4)
      navigator.family = 'ie3';
    else
      navigator.family = 'ie4'
  }
  else if (ua.indexOf('gecko') != -1)
  {
    navigator.family = 'gecko';
    var rvStart = navigator.userAgent.indexOf('rv:') + 3;
    var rvEnd = navigator.userAgent.indexOf(')', rvStart);
    var rv = navigator.userAgent.substring(rvStart, rvEnd);
    var decIndex = rv.indexOf('.');
    if (decIndex != -1)
    {
      rv = rv.replace(/\./g, '')
      rv = rv.substring(0, decIndex-1) + '.' + rv.substr(decIndex)
    }
    navigator.version = parseFloat(rv);

    if (ua.indexOf('netscape') != -1)
      navigator.org = 'netscape';
    else if (ua.indexOf('compuserve') != -1)
      navigator.org = 'compuserve';
    else
      navigator.org = 'mozilla';
  }
  else if ((ua.indexOf('mozilla') !=-1) && (ua.indexOf('spoofer')==-1) && (ua.indexOf('compatible') == -1) && (ua.indexOf('opera')==-1)&& (ua.indexOf('webtv')==-1) && (ua.indexOf('hotjava')==-1))
  {
    var is_major = parseFloat(navigator.appVersion);

    if (is_major < 4)
      navigator.version = is_major;
    else
    {
      i = ua.lastIndexOf('/')
      navigator.version = parseFloat('0' + ua.substr(i+1), 10);
    }
    navigator.org = 'netscape';
    navigator.family = 'nn' + parseInt(navigator.appVersion);
  }
  else if ((i = ua.indexOf('aol')) != -1 )
  {
    // aol
    navigator.family  = 'aol';
    navigator.org    = 'aol';
    navigator.version  = parseFloat('0' + ua.substr(i+4), 10);
  }
  else if ((i = ua.indexOf('hotjava')) != -1 )
  {
    // hotjava
    navigator.family  = 'hotjava';
    navigator.org    = 'sun';
    navigator.version  = parseFloat(navigator.appVersion);
  }

  window.onerror = oldOnError;
}

/////////////////////////////////////
////////  Gestion de Cookies
////////////////////////////////////

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}else var expires = "";
	
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


/////////////////////////////////////
////////  Cambio de Proyecto
////////////////////////////////////
function cambiaProyecto(){
   Siguiente('../../Herramientas/cambiaProyecto.jsp?idProyecto='+ document.f.proyecto_act.value);
}

function cambiaProyecto2(){
   Siguiente('Herramientas/cambiaProyecto.jsp?idProyecto='+ document.f.proyecto_act.value);
}
function cambiaProyecto3(){
   Siguiente('../Herramientas/cambiaProyecto.jsp?idProyecto='+ document.f.proyecto_act.value);
}

/////////////////////////////////////
////////  Cambio de Idioma
////////////////////////////////////
function cambiaIdioma(){
   Siguiente('Herramientas/cambiaIdioma.jsp?');
}

/*
////Calcula a�os
function calcula_anyos(fecha){

   fechaAct = new Date();

   var fecha_naci = fecha.split("/");
   
   var anyoTmp = fechaAct.getYear() - fecha_naci[2];
   var mesTmp  = (fechaAct.getMonth()+1) - fecha_naci[1];
   if (mesTmp <0){
     anyoTmp = anyoTmp -1;
   }

   if (anyoTmp>80){  // Caso de no rellenar la fecha de nacimiento
     anyoTmp = 0;
   }
   
   return anyoTmp;
}
*/


function calcula_anyos(fechaNaci1, fechaAct1){

   var fecha_naci = fechaNaci1.split("/");
   var fechaAct   = fechaAct1.split("/");
   
   var anyoTmp = fechaAct[2] - fecha_naci[2];
   var mesTmp  = fechaAct[1] - fecha_naci[1];
 
   if (mesTmp <0){
     anyoTmp = anyoTmp -1;
   }

   if (anyoTmp>99){  // Caso de no rellenar la fecha de nacimiento
     anyoTmp = 0;
   }

   return anyoTmp;
}


function popUp(URL){
 day = new Date();
 id = day.getTime();
 x = (screen.width - 400) / 2;
 y = (screen.height - 600) / 2;
 eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=400,height=600,left ='+ x +',top = '+ y );");
}

function popUp2(URL){
 day = new Date();
 id = day.getTime();
 x = (screen.width - 600) / 2;
 y = (screen.height - 600) / 2;
 eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=600,height=600,left ='+ x +',top = '+ y );");
}