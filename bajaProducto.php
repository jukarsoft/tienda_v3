<?php 
	//conexión bbdd 
	require 'conexion_tienda_examen_PDO.php';
	$respuesta=null;
	$control=null;
	$mensaje=null;
	$codigo=null;
	try {
		$idpelota=$_POST['idpelota'];
		
		//stmt = sentencia es una variable // dbh es la conexion
		$stmt=$dbh->PREPARE("DELETE FROM pelota WHERE idpelota=:idpelota");
		//bind de los parametros // asigna los valores a la sentencia preparada
		$stmt->bindParam(':idpelota', $idpelota);
				
		// Especificar como se quieren devolver los datos
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		//Ejecutar la sentencia
		$stmt->execute();
		//numero de filas modificadas
		$row=$stmt->rowCount();
		//bucle para obtener cada una de las filas obtenidas
		$mensaje="<< baja producto efectuada  - ".$idpelota." >>" ."<< ".$stmt->rowCount()." >>";
		$control=array('codigo'=>'00', 'mensaje'=> $mensaje);
		$respuesta=array($control);
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