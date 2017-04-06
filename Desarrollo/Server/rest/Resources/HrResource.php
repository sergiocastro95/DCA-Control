<?php
require_once "./Services/HrService.php";
require_once "SupportResource.php";

class HrResource{

	public static function methodHr($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				HrResource::getHr($type);
				break;
			case 'PUT'://insertar
				HrResource::putHr($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getHr($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '5':   //hr/paciente/id_paciente
				if($_GET['resource2'] == "paciente"  && 1==1) //valid token y si el id es el que pide( con el token se saca el id
					HrService::getHrByPaciente($_GET['resource3']);
					else
						header('HTTP/1.1 405 Method Not Allowed');
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function putHr($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // historial
				if(HrResource::ValidPut($objArr))
					$dataArray = HrService::insertHr($objArr);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}

	public static function ValidPut($objArr){
		$arrayKeys= array_keys($objArr);
		if(count($arrayKeys)!=3){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		//AQUI VALIDA LA KEY
		$arrayNotNull=array("paciente", "tiempo", "hr");
		$arraycol = array("paciente", "tiempo", "hr");
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
		if(HrResource::ContentObjArray($objArr))
			return true;
			else
				return false;
	}
	public static function ContentObjArray($objArr){
		if(count($objArr['tiempo'])!=count($objArr['hr'])){
			SupportResource::echoError("diferente cantidad de tiempo y de hr");
			return false;
		}
		return true;
	}
}
?>