<?php
class SupportResource {
	


	
	
	
	public function echoError($mensaje){
		$dataArray = array();
		header('HTTP/1.1 200 Los parametros no son correctos');
		$dataArray['message'] = "Error: ".$mensaje;
		echo json_encode($dataArray);
	}
	public function isBool($string){
		if($string!="true" && $string!="false" && $string!="t" && $string!="f"){
			return false;
		}
		return true;
	}
	public function isDate($fecha){
		$date=array();
		$date= split('-', $fecha);
		if(isset($date[0]) && isset($date[1]) && isset($date[2])){
			if(is_numeric($date[0]) && is_numeric($date[1]) && is_numeric($date[2])){
				if(checkdate ( $date[1] , $date[2] ,$date[0] ) || checkdate ( $date[1] , $date[0] ,$date[2] ))
					return true;
			}
		}
		return false;
	}
	public function ValidResource($resource){
		if($resource=='undefined' || $resource==null || $resource==''){
			SupportResource::echoError('Faltan parametros en la URL');
			return false;
		}
		return true;
	}
	
	public function comprobar_email($email){
		$mail_correcto = 0;
		//compruebo unas cosas primeras
		if ((strlen($email) >= 6) && (substr_count($email,"@") == 1) && (substr($email,0,1) != "@") && (substr($email,strlen($email)-1,1) != "@")){
			if ((!strstr($email,"'")) && (!strstr($email,"\"")) && (!strstr($email,"\\")) && (!strstr($email,"\$")) && (!strstr($email," "))) {
				//miro si tiene caracter .
				if (substr_count($email,".")>= 1){
					//obtengo la terminacion del dominio
					$term_dom = substr(strrchr ($email, '.'),1);
					//compruebo que la terminaci�n del dominio sea correcta
					if (strlen($term_dom)>1 && strlen($term_dom)<5 && (!strstr($term_dom,"@")) ){
						//compruebo que lo de antes del dominio sea correcto
						$antes_dom = substr($email,0,strlen($email) - strlen($term_dom) - 1);
						$caracter_ult = substr($antes_dom,strlen($antes_dom)-1,1);
						if ($caracter_ult != "@" && $caracter_ult != "."){
							$mail_correcto = 1;
						}
					}
				}
			}
		}
		if ($mail_correcto)
			return true;
			else
				return false;
	}
	public function Autorizathed($id_permiso,$user){
		if(PermisoService::Autorizathed($id_permiso,$user))
			return true;
		else
			SupportResource::echoError("no tienes permiso para hacer esto");
	}
}//end class
?>