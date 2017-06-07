import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {config} from '../config';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TratamientoService {
  data:any;
  url:any;
  constructor(public http: Http) {
    this.url = new config().url;
  }
    getTratamientos(sip){
    return new Promise(resolve => {
		  this.http.get(this.url+"/tratamiento/paciente/"+sip).map(res => res.json()).subscribe(data => {
        this.data=data;
       
				resolve(data);
			});
		});
    }

    getTratamiento(id){
    return new Promise(resolve => {
		  this.http.get(this.url+"/tratamiento/"+id).map(res => res.json()).subscribe(data => {
        this.data=data;
       
				resolve(data);
			});
		});
    }
   

}