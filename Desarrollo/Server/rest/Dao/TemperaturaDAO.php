<?php
class TpDAO{

	public static function getTpByPaciente($idpac){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$sql = "SELECT * from temperatura where paciente = '".$idpac."'";
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
	public static function insert($obj){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			$string = "INSERT INTO temperatura (paciente, tiempo, temperatura) VALUES ";
			for($i = 0; $i<count($obj['temperatura']); $i++){
				if($i!=intval(count($obj['temperatura']))-1)
					$string = $string."('".$obj['paciente']."','".$obj['tiempo'][$i]."',".$obj['temperatura'][$i]."),";
					else
						$string = $string."('".$obj['paciente']."', '".$obj['tiempo'][$i]."',".$obj['temperatura'][$i].")";
			}
			$result = @pg_query($conection, $string);
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