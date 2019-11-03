<?php 
	//conexión bbdd 
	require 'conexion_tienda_examen_PDO.php';
	$respuesta=null;
	$control=null;
	$mensaje=null;
	$codigo=null;
	//variables de paginación // inicialización variables de paginación
	$filaInicial=0;
	$numFilasMostrar=5;
	//recuperar el número de página a consultar
	$pagina=$_POST['pagina'];
	//recalcular la fila inicial que corresponde a la página a mostrar
	$filaInicial=($pagina-1)*$numFilasMostrar;

	try {
		//la sentencia es preparada con los parametros //parametro LIMIT filainicial y filas a mostrar
		$stmt=$dbh->PREPARE("SELECT pelota.idpelota, pelota.nombre, pelota.descripcion,  pelota.stock, pelota.marca, marca.foto FROM pelota INNER JOIN marca ON pelota.marca=marca.idmarca LIMIT $filaInicial, $numFilasMostrar");
		// Especificar como se quieren devolver los datos
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		//Ejecutar la sentencia
		$stmt->execute();
		//numero de filas modificadas
		$row=$stmt->rowCount();
		//bucle para obtener cada una de las filas obtenidas
		$productos = array();		
		while ($fila = $stmt->fetch()) {
			array_push($productos, $fila);
		}	

		$stmt=$dbh->PREPARE("SELECT COUNT(*) AS numeroFilas FROM pelota");
		// Especificar como se quieren devolver los datos
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
						//$stmt->setFetchMode(PDO::FETCH_NUM);
						//$stmt->setFetchMode(PDO::FETCH_BOTH);
		//Ejecutar la sentencia
		$stmt->execute();
		$filas=$stmt->fetch();
		//recuperar filas totales
		$numFilas=$filas['numeroFilas'];
		//calcular el número de páginas 
		$paginas=ceil($numFilas/$numFilasMostrar);

		$codigo='00';
		$mensaje="OK";
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control,$productos,$paginas,$row);
		echo json_encode($respuesta);

	} catch (PDOException $e) {
				//echo $e->getCode().' '.$e->getMessage();
		if ($stmt->errorInfo()[1] == 1146) {
			$codigo=$stmt->errorInfo()[1];
			$mensaje='<< tabla no existe >>'.$e->getMessage();
		} elseif ($stmt->errorInfo()[1] == 1052) {
			$codigo=$stmt->errorInfo()[1];
			$mensaje='<< atributos ambiguos >>'.$e->getMessage();
		} else {
			$codigo=$e->getCode();
			$mensaje=$e->getMessage();
		}
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control);
		echo json_encode($respuesta);

	} catch (Exception $e) { 
		$codigo=$e->getCode();
		$mensaje=$e->getMessage();
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control); 
		echo json_encode($respuesta);
	}

?>