window.onload=function(){
	//activar listener para la modificación/baja de registros de la tabla pelotas
	document.getElementById('modi').addEventListener('click', modiProducto);
	document.getElementById('baja').addEventListener('click', bajaProducto);
}
	
	//comprobar si llega el id del producto
	//recuperar la url
	var url=window.location.href;
	//buscar si existe el parametro id
	var posicionId=url.indexOf('id=');
	//si no existe retornamos a la pantalla de titulares
	if (posicionId==-1) {
		window.location.href = 'tienda_consulta.html';
	} else {
		//si existe recuperamos el código de la pelicula
		var idpelota=url.substring(posicionId+3);
		
	}		

//invoca a la función para la carga del formulario
obtenerProducto (idpelota); 

//función para cargar en el formulario el producto seleccionado
function obtenerProducto (idpelota) {
	//alert ('obtenerProducto');
	//ajax - obtener relación de productos
	var datos = new FormData();
	datos.append('idpelota',idpelota);
	fetch ('consultaProducto.php', {
		method: 'POST',
		body: datos
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
		console.log(respuesta);
		control=respuesta[0];
		codigo=control.codigo;
		mensaje=control.mensaje;
		if (codigo!='00') {
			throw mensaje, codigo;
		}
		productos=respuesta[1];
		//paginas=datos[2];
		//funcion para mostrar la relación de pacientes en  el formulario
		console.log(productos);
		mostrarListaProductos(productos);
		//montar los enlaces de paginación
		//mostrarPaginas(datos[2]);
		
	})
	.catch(function (error) {
		alert (error);
	})

}

//para cargar en el formulario
function mostrarListaProductos(productos) {
	//alert ('mostrarListaProductos');
	document.getElementById('id').value=productos[0]['idpelota'];
	document.getElementById('nombre').value=productos[0]['nombre'];
	document.getElementById('descripcion').value=productos[0]['descripcion'];
	document.getElementById('stock').value=productos[0]['stock'];
}


//función para la modificación de un producto de la tabla pelotas (update)
function modiProducto() {
	//alert ('modiProducto');
	idpelota=document.getElementById('id').value;
	nombre=document.getElementById('nombre').value;
	descripcion=document.getElementById('descripcion').value;
	stock=document.getElementById('stock').value;

	try {
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
	var datos = new FormData();
	datos.append('idpelota',idpelota);
	datos.append('nombre',nombre);
	datos.append('descripcion',descripcion);
	datos.append('stock',stock);
	fetch ('modiProducto.php', {
		method: 'POST',
		body: datos
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
		control=respuesta[0];
		codigo=control.codigo;
		mensaje=control.mensaje;
		if (codigo!='00') {
			throw mensaje, codigo;
		}
		alert (`${codigo} - ${mensaje}`);
		//paginas=datos[2];
		//funcion para mostrar la relación de pacientes en  el formulario
		window.location.href='tienda_consulta.html';	
	})
	.catch(function (error) {
		alert (error);
	})


}

//función para la baja de un producto de la tabla pelotas (delete)
function bajaProducto() {
	//alert ('bajaProducto');
	idpelota=document.getElementById('id').value;
	if (!confirm('estas seguro?')) {
		return
	}
	var datos = new FormData();
	datos.append('idpelota',idpelota);
	
	fetch ('bajaProducto.php', {
		method: 'POST',
		body: datos
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
		control=respuesta[0];
		codigo=control.codigo;
		mensaje=control.mensaje;
		if (codigo!='00') {
			throw mensaje, codigo;
		}
		alert (`${codigo} - ${mensaje}`);
		//paginas=datos[2];
		//funcion para mostrar la relación de pacientes en  el formulario
		window.location.href='tienda_consulta.html';	
	})
	.catch(function (error) {
		alert (error);
	})

}