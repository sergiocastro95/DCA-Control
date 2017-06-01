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
}
