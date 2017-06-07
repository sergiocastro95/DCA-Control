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
export class HistorialService {
  data:any;
  url:any;
  constructor(public http: Http) {
    this.url = new config().url;
  }
    getHistorial(sip){
    return new Promise(resolve => {
		  this.http.get(this.url+"/historial/paciente/"+sip).map(res => res.json()).subscribe(data => {
        this.data=data;
       
				resolve(data);
			});
		});
    }

    getEpisodio(id){
    return new Promise(resolve => {
		  this.http.get(this.url+"/historial/"+id).map(res => res.json()).subscribe(data => {
        this.data=data;
       
				resolve(data);
			});
		});
    }

    setEpisodio(id, descripcion){
    let enviar = JSON.stringify({descripcion});
    return new Promise(resolve => {
		  this.http.post(this.url+"/historial/"+id,enviar).map(res => res.json()).subscribe(data => {
        this.data=data;
        
				resolve(data);
			});
		});

    }
   

}