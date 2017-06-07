import { Injectable } from '@angular/core';
import {config} from '../../config'
import {Http, Response, RequestOptions, Headers} from "@angular/http";
@Injectable()
export class InicioService {

  constructor(private http: Http) { }
  getnovedades(){
    return this.http.get(new config().url+"/usuario/novedades/"+sessionStorage.getItem("userid"))
    .map(response => response.json())
  }
}
