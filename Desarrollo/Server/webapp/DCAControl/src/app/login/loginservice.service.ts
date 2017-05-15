import { Injectable } from '@angular/core';
import {config} from '../../config'
// Importamos los componentes que vamos a usar
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginserviceService {

  constructor(private http: Http) { }
  login(email,password){  
      let enviar = JSON.stringify({email,password});
      return this.http.post(new config().url+"/login/usuario", enviar)
                      .map(response => response.json())          
    }
  registro(){

  }
}
