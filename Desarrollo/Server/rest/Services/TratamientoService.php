<?php
require_once "./Dao/TratamientoDAO.php";
//require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class TtService {
	public static function getTtByPaciente ($idpaciente) {
		$dataArray = TtDAO::getTtByPaciente($idpaciente);
		echo json_encode($dataArray);
	}
	public static function getTt($id){
		$dataArray = TtDAO::getById($id);
		echo json_encode($dataArray);
	}
	public static function insertTt($enf){
		$dataArray = TtDAO::insert($enf);
		echo json_encode($dataArray);
	}
	public static function updateTt($obj,$id) {
		$dataArray = TtDAO::update($obj, $id);
		echo json_encode($dataArray);

	}
	public static function deleteTt($id) {
		$dataArray = TtDAO::delete($id);
		echo json_encode($dataArray);
	}


}
?>