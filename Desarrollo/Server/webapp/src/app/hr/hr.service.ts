import { Injectable } from '@angular/core';
import {config} from '../../config'
// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";
@Injectable()
export class HrService {

  constructor(private http: Http) { }
  getHr(sip, fecha, hasta){
     return this.http.get(new config().url+"/hr/paciente/"+sip+"?fecha="+fecha+"&hasta="+hasta)
    .map(response => response.json())
  }

}
