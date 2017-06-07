<?php
require_once "./Dao/PacienteDAO.php";
//require_once "SupportService.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class PacienteService {
	
	public static function getPacienteById($id){
		$dataArray = PacienteDAO::getById($id);
		echo json_encode($dataArray);
	}
	public static function getUsuarioByPaciente($id){
		$dataArray = PacienteDAO::getUsuById($id);
		echo json_encode($dataArray);
	}
	public static function getNovedades($id){
		$dataArray = PacienteDAO::getNovedades($id);
		echo json_encode($dataArray);
	}
	public static function insertPaciente($paciente){
		$dataArray = PacienteDAO::insert($paciente);
		echo json_encode($dataArray);
	}
	public static function updatePaciente($obj,$id) {
		$dataArray = PacienteDAO::update($obj, $id);
		echo json_encode($dataArray);

	}
	public static function updateNovedades($obj,$id) {
		$dataArray = PacienteDAO::updateNov($obj, $id);
		echo json_encode($dataArray);
	
	}
	public static function deletePaciente($id) {
		$dataArray = PacienteDAO::delete($id);
		echo json_encode($dataArray);
	}


}
?>