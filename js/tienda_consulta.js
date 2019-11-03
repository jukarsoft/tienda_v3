//borrado de la relación 
window.onload=function(){
	
}	
	
//invoca a la función para la carga de los productos
buscarProductos();

//función para la lectura y carga de los productos en el formulario // según limitación
function buscarProductos() {
	//alert ('buscarProductos');
	//averiguar la página que se ha de mostrar (ver función mostrarPaginas)
	if (!localStorage.pagina) {
		localStorage.setItem('pagina','1');
	} else {
		pagina=localStorage.getItem('pagina');
	}
	//PDO: consulta productos de la tabla pelota, devuelve la lista de productos con el limite indicado y desde la página indicada
	var datos = new FormData();
	datos.append('pagina',pagina);
	//ajax - obtener relación de productos
	fetch ('consultaProductos.php', {
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
		//array 1-control errores 2-contenido de la consulta 3-núm.paginas total 
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
		paginas=respuesta[2];
		mostrarPaginas(paginas);
		
	})
	.catch(function (error) {
		alert (error);
	})

}
//Muestra la relación de pacientes que contiene la tabla pelotas
function mostrarListaProductos(prod) {
	//alert (prod);
	//los datos obtenidos en el servidor son cargados en la tabla
	var tabla="<tr><th style='width: 400px;'>id</th><th>nombre</th><th>descripcion</th><th>stock</th></tr>";
	for (i in prod) {
		idpelota=prod[i]['idpelota'];
		nombre=prod[i]['nombre'];
		descripcion=prod[i]['descripcion'];
		stock=prod[i]['stock'];
		foto='img/'+ prod[i]['foto'];
		tabla+="<tr class='tr'>";
			tabla+=`<td class='id' data-id=${idpelota}><img src=${foto}></a></td>`;
			tabla+=`<td>${nombre}</td>`;
			tabla+=`<td>${descripcion}</td>`;
			tabla+=`<td>${stock}</td>`;
		tabla+="</tr>";
		
	}
	document.getElementById('relacion').innerHTML=tabla;
	//se activa listener por cada linea de registro ('tr') class='tr'
	var fila=document.querySelectorAll('.id');
	for (i=0;i<fila.length;i++) {
		fila[i].addEventListener('click', mantoProducto);
		fila[i].style.cursor="pointer";
	}
}

//función para la modificación de un registro de la tabla pelotas (update)
function mantoProducto() {
	//alert ('mantoProducto');
	idpelota=this.getAttribute('data-id');
	//alert(idpelota);
	window.location.href='tienda_modificacion.html?id=' + idpelota;

}

//función para mostrar el número de páginas y montar los listener 
function mostrarPaginas(paginas) {
	var enlaces = '';
	for (i=1; i <= paginas; i++) {
		if (i==pagina) {
			enlaces+= "<span style='font-weight:bold; font-size:large;'>" + i + "</span>&nbsp&nbsp&nbsp ";
		} else {
			enlaces+= "<span> " + i + "</span>&nbsp&nbsp&nbsp ";
		}
		
	}
	document.getElementById('paginas').innerHTML = enlaces;
	//activar los listener para la paginación (id + span)
	var span=document.querySelectorAll('#paginas span');

	for (i=0; i<span.length; i++) {
		span[i].addEventListener('click', function() {
				//recuperar el número de página 
				pagina=this.innerText;
				//buscar nuevo contenido
				localStorage.setItem('pagina',pagina);
				buscarProductos();
		})
	}
}	