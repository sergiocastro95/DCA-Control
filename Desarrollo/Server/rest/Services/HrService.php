<?php
require_once "./Dao/HrDAO.php";
require_once "./Dao/MasterDAO.php";
//require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class HrService {
	public static function getHrByPaciente ($id) {
		$dataArray = HrDAO::getHrByPaciente($id);
		echo json_encode($dataArray);
	}
	
	public static function insertHr($hr){
		$dataArray = HrDAO::insert($hr);
		echo json_encode($dataArray);
	}


}
?>