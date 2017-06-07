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
export class HomeService {
  data:any;
  url:any;
  constructor(public http: Http) {
    this.url = new config().url;
  }
    getnews(sip){
    return new Promise(resolve => {
		  this.http.get(this.url+"/paciente/novedades/"+sip).map(res => res.json()).subscribe(data => {
        this.data=data;
       
				resolve(data);
			});
		});
    }
   

}
