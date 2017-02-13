<?php
require_once "./Services/UsuarioService.php";
require_once "SupportResource.php";

class UsuarioResource{

	public static function methodUsuario($method,$type){   //filtra por metodo
		switch ($method) {
			case 'GET'://consulta
				UsuarioResource::getUsuario($type);
				break;
			case 'POST'://inserta
				UsuarioResource::postUsuario($type);
				break;
			case 'PUT'://actualiza
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
			case '1':   // usuario ESTO ES PARA LAS PRUEBAS
				//Cojo los par�metros que me han pasado por URL
				$params = SupportResource::getParams(1);

				//Extraigo los par�metros de order,filtros y de paginaci�n que me interesan
				$order = SupportResource::extractOrder($params);
				$pagination = SupportResource::extractPagination($params);
				$where = SupportResource::extractWhere($params);
				if(UsuarioResource::ValidGet($where))
					UsuarioService::getUsuarios($where,$order,$pagination);
					break;
			case '2':   //usuario/id
				if(1==1) //valid token y si es su paciente( con el token se saca el email
				UsuarioService::getUsuarioById($_GET['resource2']);
				break;
			case '5':   //usuario/recurso/id_usuaio
				if($_GET['resource2']=="paciente") {
					if(1==1) //valid token y si es su paciente( con el token se saca el email
						UsuarioService::getPacientes($_GET['resource2']);
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
				if(SupportResource::ValidPost($where))
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
				//echo $objArr['dni'];
				if(UsuarioResource::ValidPut($objArr))
					$dataArray = UsuarioService::insertUsuario($objArr);
					break;
			case '5':
				if($_GET['resource2'] == "rol") {
					$dataArray = UsuarioService::insertRolUsuario($objArr);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');
				break;
		}
	}
	
	public static function deleteUsuario($type){
		switch ($type) {
			case '2':   //usuario/id
				$dataArray = UsuarioService::deleteUsuario($_GET['resource2']);
				break;

			case '6':
				if($_GET['resource2']=="rol") {
					$dataArray = UsuarioService::deleteRolUsuario($_GET['resource3'], $_GET['resource4']);
				}
				break;

			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}
	}
	
	public static function ValidPost($objArr){
		if(count($objArr)>14){    //14 son todos los campos, reducir el numero si hay columnas que no sirven para buscar
			SupportResource::echoError("campos de mas");
			return false;
		}
		// TODO modificar la variable array cuando se modifiquen las columnas en la bbdd, si hay algun par�metro por el que no se busca eliminarlo, aunque esto ultimo es secundario
		$array = array("email", "nombre", "telefono", "token");
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
		if(count($arrayKeys)>14 || count($arrayKeys)<11){
			SupportResource::echoError("campos de mas o falta algun not null");
			return false;
		}
		//AQUI VALIDA LA KEY
		$arrayNotNull=array("dni","password", "nombre", "apellidos", "sexo", "pais","empleado","email","fecha_nacimiento","fecha_entrada", "fecha_salida");
		$arraycol = array("dni","password", "nombre", "apellidos", "sexo", "pais","localidad","provincia","empleado","email","fecha_nacimiento","fecha_entrada", "fecha_salida", "token");
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
		$return=true;
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
				case 'dni':
					if(!$key_value){
						SupportResource::echoError("DNI Requerido");
						return false;
					}
					//compruebo que el formato sea 123456789X
					if(!SupportResource::comprobar_dni($key_value)){
						SupportResource::echoError("DNI Incorrecto");
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
				case 'apellidos':
					if(!$key_value){
						SupportResource::echoError("Apellidos Requeridos");
						return false;
					}
					break;
				case 'sexo':
					if($key_value){
						if($key_value!="H" && $key_value!="M"){
							SupportResource::echoError("Sexo Incorrecto");
							return false;
						}
					}else{
						SupportResource::echoError("Sexo Requerido");
						return false;
					}
					break;
				case 'pais':
					if(!$key_value){
						SupportResource::echoError("Pais Requeridos");
						return false;
					}
					break;
				case 'empleado':
					if($key_value){
						if(!SupportResource::isBool($key_value)){
							SupportResource::echoError("Empleado Incorrecto");
							return false;
						}
					}else{
						SupportResource::echoError("Empleado Requerido");
						return false;
					}
					break;
				
				case 'fecha_nacimiento':
					if(!$key_value){
						SupportResource::echoError("Fecha de nacimiento Requerida");
						return false;
					}

					if(!SupportResource::isDate($key_value)){
						SupportResource::echoError("Fecha Nacimiento Incorrecto");
						return false;
					}
					break;
				case 'fecha_entrada':
					if(!$key_value){
						SupportResource::echoError("Fecha de entrada Requerida");
						return false;
					}

					if(!SupportResource::isDate($key_value)){
						SupportResource::echoError("Fecha entrada Incorrecto");
						return false;
					}
					break;
				case 'fecha_salida':
					if(!$key_value){
						SupportResource::echoError("Fecha de salida Requerida");
						return false;
					}

					if(!SupportResource::isDate($key_value)){
						SupportResource::echoError("Fecha salida Incorrecto");
						return false;
					}
					break;
			}
		}
		//$arrayNotNull=array("dni","password", "nombre", "apellidos", "sexo", "pais","empleado","email","fecha_nacimiento","fecha_entrada", "fecha_salida");

		return $return;
	}
}
?>