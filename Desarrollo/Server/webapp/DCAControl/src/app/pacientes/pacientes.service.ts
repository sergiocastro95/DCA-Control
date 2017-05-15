import { Injectable } from '@angular/core';
import {config} from '../../config'
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";
@Injectable()
export class PacientesService {

  constructor(private http: Http) { }
  getpacientes(){
    return this.http.get(new config().url+"/usuario/paciente/"+sessionStorage.getItem("userid"))
    .map(response => response.json())
  }

}