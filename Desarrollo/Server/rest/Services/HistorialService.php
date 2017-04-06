<?php
require_once "./Dao/HistorialDAO.php";
require_once "./Dao/MasterDAO.php";
//require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class HistorialService {
	public static function getHistByPaciente ($id) {
		$dataArray = HistorialDAO::getHistByPaciente($id);
		echo json_encode($dataArray);
	}
	public static function getHist($id){
		$dataArray = HistorialDAO::getById($id);
		echo json_encode($dataArray);
	}
	public static function insertHist($enf){
		$dataArray = HistorialDAO::insert($enf);
		echo json_encode($dataArray);
	}
	public static function updateHist($obj,$id) {
		$dataArray = HistorialDAO::update($obj, $id);
		echo json_encode($dataArray);

	}
	public static function deleteHist($id) {
		$dataArray = HistorialDAO::delete($id);
		echo json_encode($dataArray);
	}


}
?>