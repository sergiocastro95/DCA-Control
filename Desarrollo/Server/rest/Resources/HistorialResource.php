<?php
require_once "./Services/HistorialService.php";
require_once "SupportResource.php";

class HistorialResource{

	public static function methodHistorial($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				HistorialResource::getHistorial($type);
				break;
			case 'POST'://modificar
				HistorialResource::postHistorial($type);
				break;
			case 'PUT'://insertar
				HistorialResource::putHistorial($type);
				break;
			case 'DELETE'://elimina
				HistorialResource::deleteHistorial($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getHistorial($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '5':   //historial/paciente/id_paciente
				if($_GET['resource2'] == "paciente"  && 1==1) //valid token y si el id es el que pide( con el token se saca el id
					HistorialService::getHistByPaciente($_GET['resource3']);
					else
						header('HTTP/1.1 405 Method Not Allowed');
						break;
			case '2':   //historial/id
				HistorialService::getHist($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postHistorial($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //historial/id
				if(HistorialResource::ValidPost($objArr))
					$dataArray = HistorialService::updateHist($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}

	}
	public static function putHistorial($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // historial
				if(HistorialResource::ValidPut($objArr))
					$dataArray = HistorialService::insertHist($objArr);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function deleteHistorial($type){
		switch ($type) {
			case '2':   //historial/id
				if(1==1)
					$dataArray = HistorialService::deleteHist($_GET['resource2']);
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
		$array = array("descripcion", "fecha");
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
		$arrayNotNull=array("paciente", "fecha", "descripcion");
		$arraycol = array("paciente", "fecha", "descripcion");
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