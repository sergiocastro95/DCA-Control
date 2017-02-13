<?php
require_once "Resources/UsuarioResource.php"; 

class API {    

    public function rest(){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE");
        header('Content-Type: application/JSON; charset=utf-8');
        /*
        tipo 1: /recurso
        tipo 2: /recurso/id
        tipo 3: /recurso/id/id
        tipo 4: /recurso/recurso
        tipo 5: /recurso/recurso/id
        tipo 6: /recurso/recurso/id/id
        tipo 7: /recurso/recurso/recurso
        tipo 8: /recurso/recurso/recurso/id
        */
        $type = $this->typeURI();
        $method = $_SERVER['REQUEST_METHOD'];
        $resource = $_GET['resource'];
        switch ($resource){
            case 'login':
            	echo "funciona";
            	//LoginResource::methodLogin($method,$type);
                break;
                
            case 'usuario':
               UsuarioResource::methodUsuario($method,$type);
                break;
                
            case 'hr':
              //  ProductoResource::methodProducto($method,$type);
                break;

            case 'paciente': 
              //  EstanciaResource::methodEstancia($method,$type);
                break;
                
            case 'enfermedad':
            //	PulseraResource::methodPulsera($method,$type);
                break;

            case 'historial':
              //  PermisoResource::methodPermiso($method,$type);
            	break;
            	
            case 'temperatura':
            	//	PromocionResource::methodPromocion($method,$type);
       		break;
                
            case 'tratamiento':
              // 	RolResource::methodRol($method,$type);
                break;
            
            default:
            	header('HTTP/1.1 404 Not Found');
                break;
        }

    }
    public function typeURI(){
        /*esta funcion contempla mas casos de los que actualmente tenemos*/
        if(!isset($_GET['resource2'])){
            return 1;
        }else{
            if($this->isResource($_GET['resource2'])){  // hasta aqui es /recurso/recurso
                if(!isset($_GET['resource3'])){
                    return 4;
                }else{
                    if($this->isResource($_GET['resource3'])){  // si pasa esto como minimo es /recurso/recurso/recurso
                        if(!isset($_GET['resource4'])){
                            return 7;
                        }else{ //si existe tiene que ser id, pero se puede afinar mas
                            return 8;
                        }
                    }else{
                        if(!isset($_GET['resource4'])){
                            return 5;
                        }else{  //si existe tiene que ser id por la definicion de las URIs, pero es ampliable
                            return 6;
                        }
                    }
                }
            }else{	//hasta aqui es recurso/id
                if(!isset($_GET['resource3'])){
                    return 2;
                }else{
                	if($this->isResource($_GET['resource3'])){//recurso/id/recurso
                		header('HTTP/1.1 404 Not Found');
                		exit();
                	}else{
                    	return 3;
                	}
                }
            }
        }
       
    }
    public function isResource($resource){//añadir al array por cada nuevo recurso que se cree
    	$array = array("usuario","medicacion","historial","paciente", "hr", "temperatura", "enfermedad", "login");
        $longitud = count($array);
        for($i=0; $i<$longitud; $i++){
            if($resource==$array[$i])
                return true;
        }
        return false;
    }
}//end class
?>