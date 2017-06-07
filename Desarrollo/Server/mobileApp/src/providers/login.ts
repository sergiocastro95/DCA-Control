import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {config} from '../config';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Login {
  data:any;
  url:any;
  constructor(public http: Http, private storage: Storage) {
    this.url = new config().url;
  }
  login(sip, password){
    let enviar = JSON.stringify({sip,password});
    return new Promise(resolve => {
		  this.http.post(this.url+"/login/paciente",enviar).map(res => res.json()).subscribe(data => {
        this.data=data;
        if(this.data.response=="Ok"){
          this.storage.set('userid', this.data.sip);
          this.storage.set('pwd', this.data.password);
        }
				resolve(data);
			});
		});

    }
   

}
