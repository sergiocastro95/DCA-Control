import { Injectable } from '@angular/core';
import {config} from '../../config'
// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
@Injectable()
export class NewpacienteService {

  constructor(private http: Http) { }
  crearPaciente(sip, password, nombre, apellidos, medico, responsable){
     let enviar = JSON.stringify({sip,password,nombre,apellidos,medico, responsable});
    console.log(enviar);
      return this.http.put(new config().url+"/paciente", enviar)
                      .map(response => response.json()) 
  }
  getmedicos(){
      return this.http.get(new config().url+"/usuario/medico")
                      .map(response => response.json())
  }

}
