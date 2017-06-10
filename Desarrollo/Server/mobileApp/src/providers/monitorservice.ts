import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {config} from '../config';
import { BLE } from '@ionic-native/ble';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MonitorService {
  data:any;
  url:any;
  datos =[];
  idband="";
  datosEnv;
  constructor(public http: Http, public ble:BLE) {
    this.url = new config().url;
    this.datosEnv = new Uint8Array(3);
            this.datosEnv[0] = 0x15;
            this.datosEnv[1] = 0x02;
            this.datosEnv[2] = 0x01;
    console.log("Constructor");
    
  }
  setID(id){
    this.idband = id;
    console.log("intentando escuchar desde MonitorService...");
    this.ble.startNotification(this.idband, '180d', '2a37').subscribe(buffer => {
                        console.log("Escucho desde el SERVICE:");
                        console.log(buffer);
                        let data = new Uint8Array(buffer);
                        console.log(data);
                                     
                });
  }
    recursivo(){
        console.log("recursivo");
        this.datos.push({name:"paco",fecha:"11-22-2013"});
         console.log("Pedir HR");
      
            this.ble.write(this.idband,'180d','2a39',this.datosEnv.buffer).then(buffer => {
                  console.log("Pidiendo HR...");
                    
                    
              },error=>{
                  console.log("Error al escribir");
              });

              

    }
   getDatos(){
       return this.datos;
   }

}
