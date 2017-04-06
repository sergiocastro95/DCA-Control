<?php
require_once "./Services/TratamientoService.php";
require_once "SupportResource.php";

class TtResource{

	public static function methodTratamiento($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				TtResource::getTt($type);
				break;
			case 'POST'://modificar
				TtResource::postTt($type);
				break;
			case 'PUT'://insertar
				TtResource::putTt($type);
				break;
			case 'DELETE'://elimina
				TtResource::deleteTt($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getTt($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '5':   //enfermedad/paciente/id_paciente
				if($_GET['resource2'] == "paciente"  && 1==1) //valid token y si el id es el que pide( con el token se saca el id
					TtService::getTtByPaciente($_GET['resource3']);
					else
						header('HTTP/1.1 405 Method Not Allowed');
						break;
			case '2':   //enfermedad/id_enfermedad
				TtService::getTt($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postTt($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //enfermedad/id_enfermedad
				if(TtResource::ValidPost($objArr))
					$dataArray = TtService::updateTt($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}

	}
	public static function putTt($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // enfermedad
				if(TtResource::ValidPut($objArr))
					$dataArray = TtService::insertTt($objArr);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function deleteTt($type){
		switch ($type) {
			case '2':   //enfermedad/id_enfermedad
				if(1==1)
					$dataArray = TtService::deleteTt($_GET['resource2']);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function ValidPost($objArr){
		if(count($objArr)>8){    //8 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("nombre","descripcion", "hora_1", "hora_1", "hora_2", "hora_3", "hora_4", "hora_5", "hora_6");
		if($objArr!=null){
			foreach($objArr as $key => $key_value) {
				if(!in_array($key, $array)){
					SupportResource::echoError("Hay campos que no existen");
					return false;
				}
			}
		}
		if(TtResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)<3 || count($arrayKeys)>9){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		//AQUI VALIDA LA KEY
		$arrayNotNull=array("paciente", "nombre", "descripcion");
		$arraycol = array("paciente", "nombre","descripcion", "hora_1", "hora_1", "hora_2", "hora_3", "hora_4", "hora_5", "hora_6");
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