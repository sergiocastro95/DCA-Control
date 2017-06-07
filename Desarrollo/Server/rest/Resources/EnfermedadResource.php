<?php
require_once "./Services/EnfermedadService.php";
require_once "SupportResource.php";

class EnfermedadResource{

	public static function methodEnfermedad($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				EnfermedadResource::getEnfermedad($type);
				break;
			case 'POST'://modificar
				EnfermedadResource::postEnfermedad($type);
				break;
			case 'PUT'://insertar
				EnfermedadResource::putEnfermedad($type);
				break;
			case 'DELETE'://elimina
				EnfermedadResource::deleteEnfermedad($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getEnfermedad($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '5':   //enfermedad/paciente/id_paciente
				if($_GET['resource2'] == "paciente"  && 1==1) //valid token y si el id es el que pide( con el token se saca el id
					EnfermedadService::getEnfByPaciente($_GET['resource3']);
				else
					header('HTTP/1.1 405 Method Not Allowed');
				break;
			case '2':   //enfermedad/id_enfermedad
				EnfermedadService::getEnf($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postEnfermedad($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //enfermedad/id_enfermedad
				$dataArray = EnfermedadService::updateEnf($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}

	}
	public static function putEnfermedad($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // patologia
				if(EnfermedadResource::ValidPut($objArr))
					$dataArray = EnfermedadService::insertEnf($objArr);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function deleteEnfermedad($type){
		switch ($type) {
			case '2':   //enfermedad/id_enfermedad
				if(1==1) 
					$dataArray = EnfermedadService::deleteEnf($_GET['resource2']);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function ValidPost($objArr){
		if(count($objArr)>2){    //4 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array( "nombre", "descripcion");
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
		if(count($arrayKeys)!=3){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		//AQUI VALIDA LA KEY
		$arrayNotNull=array("paciente", "nombre", "descripcion");
		$arraycol = array("paciente", "nombre", "descripcion");
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
		if(UsuarioResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ContentObjArray($objArr){
		return true;
	}
}
?>