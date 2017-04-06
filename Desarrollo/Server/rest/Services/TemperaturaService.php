<?php
require_once "./Dao/TemperaturaDAO.php";
//require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
class TpService {
	public static function getTpByPaciente ($id) {
		$dataArray = TpDAO::getTpByPaciente($id);
		echo json_encode($dataArray);
	}

	public static function insertTp($Tp){
		$dataArray = TpDAO::insert($Tp);
		echo json_encode($dataArray);
	}


}
?>