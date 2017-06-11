<?php
require_once "./Dao/UsuarioDAO.php";
/***********************************************USUARIO Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class UsuarioService {
	public static function getMedicos () {
		$dataArray =  UsuarioDAO::getMedicos();
		echo json_encode($dataArray);
	}
	public static function getUsuarioById($id){
		$dataArray = UsuarioDAO::getById($id);
		echo json_encode($dataArray);
	}
	public static function getPacientes($id){
		$dataArray = UsuarioDAO::getPacientes($id);
		echo json_encode($dataArray);
	}
	public static function getNovedades($id){
		$dataArray = UsuarioDAO::getNovedades($id);
		echo json_encode($dataArray);
	}
	public static function insertUsuario($usuario){		
		$dataArray = UsuarioDAO::insert($usuario);
		echo json_encode($dataArray);
	}
	public static function updateUsuario($obj,$id) {
			$dataArray = UsuarioDAO::update($obj, $id);
			echo json_encode($dataArray);
				
	}
	public static function deleteUsuario($id) {
		$dataArray = UsuarioDAO::delete($id);
		echo json_encode($dataArray);
	}


}
?>