import { Injectable } from '@angular/core';
import {config} from '../../config'
// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";

@Injectable()
export class DetailpacienteService {

  constructor(private http: Http) { }
  getpacienteById(id){
    return this.http.get(new config().url+"/paciente/"+id)
    .map(response => response.json())
  }
  getusubypac(id){
    return this.http.get(new config().url+"/paciente/usuario/"+id)
    .map(response => response.json())
  }
  getHistbypac(id){
    return this.http.get(new config().url+"/historial/paciente/"+id)
    .map(response => response.json())
  }
  getTratbypac(id){
    return this.http.get(new config().url+"/tratamiento/paciente/"+id)
    .map(response => response.json())
  }
  getPatbypac(id){
    return this.http.get(new config().url+"/patologia/paciente/"+id)
    .map(response => response.json())
  }
  getLastHr(id){
    return this.http.get(new config().url+"/hr/paciente/"+id+"?fecha=last")
    .map(response => response.json())
  }
  editperfil(email, nombre, password, telefono){
    let enviar;
    if(password!=""){
      enviar = JSON.stringify({email,password,nombre,telefono});
    }else{
       enviar = JSON.stringify({email,nombre,telefono});
    }
    
      return this.http.post(new config().url+"/usuario/"+sessionStorage.getItem("userid"), enviar)
                      .map(response => response.json()) 
  }
  newPatologia(paciente, nombre, descripcion){
    let enviar = JSON.stringify({paciente,nombre,descripcion});
    console.log(enviar);
      return this.http.put(new config().url+"/patologia", enviar)
                      .map(response => response.json()) 
  }
  newTratamiento(paciente, nombre, descripcion){
    let enviar = JSON.stringify({paciente,nombre,descripcion});
    console.log(enviar);
      return this.http.put(new config().url+"/tratamiento", enviar)
                      .map(response => response.json()) 
  }

   updatenews(id, tipo){
     let enviar= JSON.stringify({tipo});
    return this.http.post(new config().url+"/paciente/novedades/"+id, enviar)
    .map(response => response.json())
  }
}
