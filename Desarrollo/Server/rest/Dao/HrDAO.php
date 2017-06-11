<?php
include_once "./conection.php";
class HrDAO{
	
	public static function getHrByPaciente($idpac){
		$dataArray = array();
		try {
			$conection = openConection();
			/*DELETE FROM films WHERE kind = 'Musical'*/
			if( isset($_GET['fecha'])){
				if($_GET['fecha']=="last"){
					$sql = "SELECT * from hr where paciente = '".$idpac."' order by tiempo desc limit 10";
				}else{
					$sql = "SELECT tiempo as date, hr from hr where paciente = '".$idpac."' and tiempo>='".$_GET['fecha']."' and tiempo<='".$_GET['hasta']."'";
				}
				
			}else{
				$sql = "SELECT * from hr where paciente = '".$idpac."'";
			}
			
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
				if($count==0){
					$dataArray['vacio'] ="vacio";
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
			$string = "INSERT INTO hr (paciente, tiempo, hr) VALUES ";
			for($i = 0; $i<count($obj['hr']); $i++){
				if($i!=intval(count($obj['hr']))-1)
					$string = $string."('".$obj['paciente']."','".$obj['tiempo'][$i]."',".$obj['hr'][$i]."),";
					else
						$string = $string."('".$obj['paciente']."', '".$obj['tiempo'][$i]."',".$obj['hr'][$i].")";
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