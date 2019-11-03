//variables
error=null;
mensaje=null;

window.onload=function(){
	//activar listener para el acta de producto
	document.getElementById('alta').addEventListener('click', altaProducto);
	obtenerMarcasProducto();

}	

//función para el alta de producto en tabla pelotas
function altaProducto() {
	//alert ('altaProducto');
	try {
		nombre=document.getElementById('nombre').value;
		descripcion=document.getElementById('descripcion').value;
		stock=document.getElementById('stock').value;
		marcaFoto=document.getElementById('marca').value;
		obj=document.getElementById('marca');
		marcaTexto=obj.options[obj.selectedIndex].innerText;
		indice=obj.selectedIndex+1;
		//alert(marcaTexto);
	
		if (nombre.trim()=='') {
			document.getElementById('nombre').classList.add('error');
		}
		if (descripcion.trim()=='') {
			document.getElementById('descripcion').classList.add('error');
		}
		if (stock.trim()=='' || isNaN(stock)) {
			document.getElementById('stock').classList.add('error');
		}
		if (nombre.trim()=='' || descripcion.trim()=='' || stock.trim()=='' || isNaN(stock)) {
			alert ('datos obligatorios');
			throw "10 << todos los campos son obligatorios >>";			
			return;
		}
	} catch (e) {
		error=e.substr(0,2);
		mensaje=e.substr(3);
		alert (`error: ${error} - ${mensaje}`);
		return
	}

	//PDO - formateo datos o encapsulado de datos al servidor 
	//para enviar al servidor clave:pareja:valor
	//opcion 1 - creamos un objeto atributo a atributo
	var datos = new FormData();
	datos.append('nombre',nombre);
	datos.append('descripcion',descripcion);
	datos.append('marca',indice);
	datos.append('stock',stock);
	
	
	//llamada AJAX al servidor  // fetch
	fetch('altaProducto.php',{
		method: 'POST',
		body: datos
	})
	.then(function(respuesta) {
		//primera respuesta del servidor como que ha recibido la petición
		if (respuesta.ok) {
			return respuesta.json();
		} else {
			throw "<< error en la llamada AJAX >>",88;
		}
	})
	. then (function(respuesta) {
		//servidor a procesado los datos y nos lo devuelve
		//alert (respuesta);
		control=respuesta[0];
		if (control.codigo!='00') {
			throw `${control.codigo} ${control.mensaje}`;	
		}
		document.getElementById('formulario').reset();
		alert (`${control.codigo} ${control.mensaje}`);
			
		//recarga de la relación de productos de la tabla pelota
		//consultaProductos();
		
	})
	.catch(function(e) {
		//error=e.substr(0,2);
		//mensaje=e.substr(3);
		alert (`error: ${e}`);
		
	})
	
}

function obtenerMarcasProducto(){
	//alert ('obtenerMarcas');
	//PDO: otenemos la relación de marcas de la tabla marcas
		//ajax - obtener relación de productos
	fetch ('obtenerMarcas.php', {
		method: 'POST'
	})
	.then(function(respuesta) {
		if (respuesta.ok) {
			//cambiar el json a text, si queremos ver el error
			return respuesta.json();
		} else {
			throw "<< error en la petición AJAX >>",88;
		}
	})
	.then(function(respuesta) {
		//alert (respuesta);
		//console.log(respuesta);
		//array 1-control errores 2-contenido de la consulta 3-núm.paginas total 
		control=respuesta[0];
		codigo=control.codigo;
		mensaje=control.mensaje;
		if (codigo!='00') {
			throw mensaje, codigo;
		}
		marcas=respuesta[1];
		//paginas=datos[2];
		//funcion para mostrar la relación de pacientes en  el formulario
		console.log(marcas);
		option="";
		for (i in marcas) {
			id=marcas[i].idmarca;
			nombre=marcas[i].nombre;
			option+=`<option value='${id}'>${nombre}</option><br>`;
		}
		document.getElementById('marca').innerHTML=option;	
			
	})
	.catch(function (error) {
		alert (error);
	})
}
