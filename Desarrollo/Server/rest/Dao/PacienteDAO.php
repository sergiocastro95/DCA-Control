<?php
class PacienteDAO{
	public static function getById($id){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "SELECT * from paciente where sip= '".$id."'";
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