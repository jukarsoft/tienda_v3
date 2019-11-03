<?php 
	//conexión bbdd 
	require 'conexion_tienda_examen_PDO.php';

	try {
		//carga atributos recibidos
		$nombre=$_POST['nombre'];
		$descripcion=$_POST['descripcion'];
		$marca=$_POST['marca'];
		$stock=$_POST['stock'];
		
		//validación de atributos obligatorios
		if (trim($nombre)=="") {
				throw new Exception("<< nombre obligatorio >>", 10);			
		}
		if (trim($descripcion)=="") {
				throw new Exception("<< descripcion obligatorio >>", 10);			
		}
		if (trim($marca)=="") {
				throw new Exception("<< marca obligatoria >>", 10);			
		}
		if (trim($stock)=="" || $stock==null || !is_numeric($stock)) { 
				throw new Exception("<< Stock no informado >>", 10);			
		}
		//Alta registro en tabla
		//la sentencia es preparada con los parametros
		$stmt=$dbh->PREPARE("INSERT INTO pelota VALUES(NULL, :nombre, :descripcion, :stock, :marca)");

		//bind de los parametros // asigna los valores a la sentencia preparada
		
		$stmt->bindParam(':nombre', $nombre);
		$stmt->bindParam(':descripcion', $descripcion);
		$stmt->bindParam(':stock', $stock);
		$stmt->bindParam(':marca', $marca);
		

		//Ejecutar la sentencia
		$stmt->execute();

		//maquetación de la respuesta 
		$codigo='00';
		$mensaje='<< Alta producto realizada >>';
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control);
		echo json_encode($respuesta);
	} catch (PDOException $e) {
		//excepciones que se produzcan en el acceso a la bd
						//ojo errorInfo es un array
		if ($stmt->errorInfo()[1] == 1146) {
			$mensaje='<< tabla no existe >> '.$e->getMessage();
			$control=array('codigo'=>$stmt->errorInfo()[1], 'mensaje'=> $mensaje);
		} else {
			$control=array('codigo'=>$e->getCode(), 'mensaje'=> $e->getMessage());
		}
		$respuesta=array($control);
		echo json_encode($respuesta);	
	} catch (Exception $e){
		$codigo=$e->getCode();
		$mensaje=$e->getMessage();
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control);
		echo json_encode($respuesta);

	}

?>