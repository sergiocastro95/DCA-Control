<?php
require_once "./Services/PacienteService.php";
require_once "SupportResource.php";

class PacienteResource{

	public static function methodPaciente($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				PacienteResource::getPaciente($type);
				break;
			case 'PUT'://insertar
				PacienteResource::putPaciente($type);
				break;
			case 'POST'://insertar
					PacienteResource::postPaciente($type);
				break;
			case 'DELETE'://insertar
					PacienteResource::deletePaciente($type);
					break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getPaciente($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '2':   //paciente/id_paciente
				if(1==1) //valid token y si el paciente es de ese usuario( con el token se saca el id_usuario)
					PacienteService::getPacienteById($_GET['resource2']);
				else
						header('HTTP/1.1 405 Method Not Allowed');
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function postPaciente($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
	
		switch ($type) {
			case '2':   //paciente/id
				$dataArray = PacienteService::updatePaciente($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
	
				break;
		}
	
	}
	public static function putPaciente($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // usuario
				if(PacienteResource::ValidPut($objArr))
					$dataArray = PacienteService::insertPaciente($objArr);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function deletePaciente($type){
		switch ($type) {
			case '2':   //paciente/id
				if(1==1) //valid token y si el id es el que se quiere borrar( con el token se saca el id
					$dataArray = PacienteService::deletePaciente($_GET['resource2']);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
	
				break;
		}
	}
	public static function ValidPost($objArr){
		if(count($objArr)>3){    //4 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array( "nombre", "password", "apellidos");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(UsuarioResource::ContentObjArray($objArr))
			return true;
		else
			return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=4){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		//AQUI VALIDA LA KEY
		$arrayNotNull=array("sip", "nombre", "password", "apellidos");
		$arraycol = array("sip", "nombre", "password", "apellidos");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $arraycol)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		for ($i = 0; $i < count($arrayNotNull); $i++) {
			if(!in_array($arrayNotNull[$i],$arrayKeys)){
				SupportResource::echoError("Falta algun parametro requerido");
				return false;
			}

		}
		if(PacienteResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ContentObjArray($objArr){
		
		return true;
	}
}
?>