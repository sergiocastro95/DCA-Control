<?php
require_once "./Services/UsuarioService.php";
require_once "SupportResource.php";

class UsuarioResource{

	public static function methodUsuario($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				UsuarioResource::getUsuario($type);
				break;
			case 'POST'://modificar
				UsuarioResource::postUsuario($type);
				break;
			case 'PUT'://insertar
				UsuarioResource::putUsuario($type);
				break;
			case 'DELETE'://elimina
				UsuarioResource::deleteUsuario($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented');
				break;
		}
	}
	/*comprueba el tipo de URI y filtra si hay varias del mismo tipo*/
	public static function getUsuario($type){
		//comprobar siempre que haya un recurso de letras que se corresponde a una petición valida, haya uno o muchos casos de ese tipo
		switch ($type) {
			case '4':   //TODO usuario ESTO ES PARA LAS PRUEBAS
			if($_GET['resource2']=="medico")
				UsuarioService::getMedicos();
				break;
			case '2':   //usuario/id
				if(1==1) //valid token y si el id es el que pide( con el token se saca el id
				UsuarioService::getUsuarioById($_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id_usuaio
				if($_GET['resource2']=="paciente") {
					if(1==1) //valid token y si el id es el del token( con el token se saca el id
						UsuarioService::getPacientes($_GET['resource3']);
				}else if($_GET['resource2']=="novedades"){
					UsuarioService::getNovedades($_GET['resource3']);
				}else{
					header('HTTP/1.1 405 Method Not Allowed');
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	public static function postUsuario($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '2':   //usuario/id
				if(UsuarioResource::ValidPost($objArr))
					$dataArray = UsuarioService::updateUsuario($objArr,$_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}

	}
	public static function putUsuario($type){
		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;
		switch ($type) {
			case '1':   // usuario
				if(UsuarioResource::ValidPut($objArr))
					$dataArray = UsuarioService::insertUsuario($objArr);
					break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function deleteUsuario($type){
		switch ($type) {
			case '2':   //usuario/id
				if(1==1) //valid token y si el id es el que se quiere borrar( con el token se saca el id
					$dataArray = UsuarioService::deleteUsuario($_GET['resource2']);
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}
	}
	
	public static function ValidPost($objArr){
		if(count($objArr)>4){    //4 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("email", "nombre", "password", "telefono");
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
		if(count($arrayKeys)!=5){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		//AQUI VALIDA LA KEY
		$arrayNotNull=array("email", "nombre", "password", "telefono", "rol");
		$arraycol = array("email", "nombre", "password", "telefono", "rol");
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
		foreach($objArr as $key => $key_value){
			switch ($key){    //tantos case como columnas. Mirad el script actualizado o $array de ValidGet
				//VALIDAR EN CASO DE QUE ESTEN, QUE FORMATO TIENE QUE TENER
				case 'email':
					if(!$key_value){
						SupportResource::echoError("email Requerido");
						return false;
					}
				
					if(!SupportResource::comprobar_email($key_value)){
						SupportResource::echoError("email Incorrecto");
						return false;
					}
					break;

				case 'password':
					if(!$key_value){
						SupportResource::echoError("Password requerida");
						return false;
					}
					break;
				case 'nombre':
					if(!$key_value){
						SupportResource::echoError("Nombre Requerido");
						return false;
					}
					break;
				case 'telefono':
					if(strlen($key_value)!=9){
						SupportResource::echoError("Telefono incorrecto");
						return false;
					}
					break;
				case 'rol':
					if($key_value!='2' && $key_value!='1'){
						
						SupportResource::echoError("Rol incorrecto");
						return false;
					}
					break;
			}
		}

		return true;
	}
}
?>