<?php
include_once "./conection.php";
class PacienteDAO{
	public static function getById($id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "SELECT p.sip, p.nombre, p.apellidos from paciente as p where sip= '".$id."'";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function getNovedades($id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "SELECT episodios_nuevos, tratamientos_nuevos from paciente where sip= '".$id."'";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function getUsuById($id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "select u.id,u.nombre, u.email,u.telefono from usuario as u, paciente_usuario as p where u.id=p.usuario and p.paciente='".$id."' and u.rol=1;";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function insert($usuario){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "INSERT into paciente (sip,password, nombre, apellidos) values ('".$usuario['sip']."','".$usuario['password']."','".$usuario['nombre']."','".$usuario['apellidos']."')";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$sql2 = "INSERT into paciente_usuario(paciente, usuario) values('".$usuario['sip']."','".$usuario['responsable']."')";
				$result2 = @pg_query($conection, $sql2);
				if (!$result2) {//Resultado erroneo
					header('HTTP/1.1 200 Error con la base de datos');
					return error_get_last();
				}else{
					$sql3 = "INSERT into paciente_usuario(paciente, usuario) values('".$usuario['sip']."','".$usuario['medico']."')";
					$result3 = @pg_query($conection, $sql3);
					if (!$result3) {//Resultado erroneo
						header('HTTP/1.1 200 Error con la base de datos');
						return error_get_last();
					}else{
						$dataArray['response'] = "Ok";
					}
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function update($usuario,$id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "UPDATE paciente SET ";
				
			$i = 0;
			$keys = "";
			$values = "";
				
			foreach($usuario as $key => $key_value) {
				if($i==0) {
					if(!$key_value)
						$sql = $sql.$key."= NULL";
						else
							$sql = $sql.$key."='".$key_value."'";
				} else {
					if(!$key_value)
						$sql = $sql.",".$key."= NULL";
						else
							$sql = $sql.",".$key."='".$key_value."'";
				}
				$i++;
			}
			$sql = $sql." where sip= '".$id."'";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function updateNov($usuario,$id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "UPDATE paciente SET ";
			if($usuario['tipo']=="1"){//usuario
				$sql = $sql."tratamientos_nuevos=0";
			}else if($usuario['tipo']=="2"){//medico
				$sql = $sql."episodios_nuevos=0";
			}else if($usuario['tipo']=="3"){
				$sql = $sql."episodios_nuevos= episodios_nuevos +1";
			}
			$sql = $sql." where sip= '".$id."'";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
	public static function delete($id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "DELETE from paciente where sip= '".$id."'";
			//echo $sql;
			$result = @pg_query($conection, $sql);
			if (!$result) {//Resultado erroneo
				header('HTTP/1.1 200 Error con la base de datos');
				return error_get_last();
			}else{//Resultado correcto
				$count = pg_numrows($result);
				for($i=0; $i<$count; $i++) {
					$row = pg_fetch_assoc ($result);
					$dataArray[] = $row;
				}
			}
			@pg_close($conection);
		}catch(Exception $e){
			throw new Exception ($e->getMessage());
		}
		return $dataArray;
	}
}
?>