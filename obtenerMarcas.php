<?php 

	require 'conexion_tienda_examen_PDO.php';
	$respuesta=null;
	$control=null;
	$mensaje=null;
	$codigo=null;
	//variables de paginación // inicialización variables de paginación
	
	try {
		//la sentencia es preparada con los parametros //parametro LIMIT filainicial y filas a mostrar
		$stmt=$dbh->PREPARE("SELECT * FROM marca");
		// Especificar como se quieren devolver los datos
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		//Ejecutar la sentencia
		$stmt->execute();
		//numero de filas modificadas
		$row=$stmt->rowCount();
		//bucle para obtener cada una de las filas obtenidas
		$marcas = array();		
		while ($fila = $stmt->fetch()) {
			array_push($marcas, $fila);
		}	

		$codigo='00';
		$mensaje="OK";
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control,$marcas,$row);
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