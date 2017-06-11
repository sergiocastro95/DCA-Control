<?php
require_once "./Dao/EnfermedadDAO.php";
//require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class EnfermedadService {
	public static function getEnfByPaciente ($idpaciente) {
		$dataArray = EnfermedadDAO::getEnfByPaciente($idpaciente);
		echo json_encode($dataArray);
	}
	public static function getEnf($id){
		$dataArray = EnfermedadDAO::getById($id);
		echo json_encode($dataArray);
	}
	public static function insertEnf($enf){
		$dataArray = EnfermedadDAO::insert($enf);
		echo json_encode($dataArray);
	}
	public static function updateEnf($obj,$id) {
		$dataArray = EnfermedadDAO::update($obj, $id);
		echo json_encode($dataArray);

	}
	public static function deleteEnf($id) {
		$dataArray = EnfermedadDAO::delete($id);
		echo json_encode($dataArray);
	}


}
?>