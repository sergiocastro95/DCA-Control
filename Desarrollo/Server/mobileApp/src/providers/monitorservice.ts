import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {config} from '../config';
import { Storage } from '@ionic/storage';
import { BLE } from '@ionic-native/ble';
import { SMS } from '@ionic-native/sms';
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
  time = [];
  hr = [];
  idband="";
  nameband="";
  datosEnv; //lo que se envía para pedir el HR
  intervalo;
  sip = "";
  
  numtelefono = "";
  actual = 0; //posicion actual del array para sobreescribir
  vecesmedido = 0;  //para que no alerte si no hay un minimo de datos
  nummedidas = 10;  //con lo que hago la media
  medidas = [];   //lista de las ultimas nummedidas
  constructor(public http: Http, public ble:BLE, public storage:Storage, private sms: SMS) {
    this.url = new config().url;
    this.datosEnv = new Uint8Array(3);
            this.datosEnv[0] = 0x15;
            this.datosEnv[1] = 0x02;
            this.datosEnv[2] = 0x01;
    console.log("Constructor");
    
  }
  setID(id, name){
    this.idband = id;
    this.nameband = name;
  }
  escuchar(){
     this.storage.get('userid').then((val) => {
       this.pedirtelefono(val);
       this.intervalo = setInterval(() => this.guardarDatos(val,this), 60000);
        console.log("Iniciando escucha desde el service...")
         this.ble.startNotification(this.idband, '180d', '2a37').subscribe(buffer => {
                        console.log("He detectado cambios, HR recibido: ");
                        console.log(buffer);
                        let data = new Uint8Array(buffer);
                        console.log(data);
                        this.save(data[1]);
                        this.esAtaque(data[1]);
                                     
                });
      });
     
  }
  cancelarEscucha(){
      console.log("Cancelando escucha del HR...");
      this.ble.stopNotification(this.idband,  '180d', '2a37');
       window.clearInterval(this.intervalo);
  }
    recursivo(){
        console.log("recursivo");
        //this.datos.push({name:"paco",fecha:"11-22-2013"});
         console.log("Pedir HR");  
          
      
            this.ble.write(this.idband,'180d','2a39',this.datosEnv.buffer).then(buffer => {
                  console.log("Pidiendo HR...");
                    
                    
              },error=>{
                  console.log("Error al escribir");
              });

              

    }
    save(ritmo){
      let date = new Date();
     // console.log(date);
      let stringdate = date.toString();
      //Sat Jun 10 2017 22:24:01 GMT+0200 (CEST)
      let mm = date.getMonth()+1; //January is 0!
      let month;
      if(mm<9){
        month = "0"+mm;
      }else{
        month=mm;
      }
      let splitted = stringdate.split(" ", 5); 

      let guardar = splitted[3] + "-"+month+"-"+splitted[2]+" "+splitted[4];
      this.hr.push(ritmo);
      this.time.push(guardar);
      this.datos.push({tiempo:guardar,hr:ritmo});
      //console.log("Valor de datos hasta el momento:");
      //console.log(this.datos);


    }
   getDatos(){

      console.log(this.hr);
      console.log(this.time);
   }
   esAtaque(hr){
   if(hr!=0){
        this.medidas.splice(this.actual, 1, hr);
        console.log("medidas guardadas actualmente:");
        console.log(this.medidas);
        this.actual++;
        this.vecesmedido++;
        if(this.actual==this.nummedidas){
          console.log("He alcanzado el máximo de medidas, reinicio el contador...");
          this.actual = 0;
        }
        if(this.vecesmedido>this.nummedidas-1){
          let media = this.calcularMedia();
          if(media+30<hr){
            console.log("AAAAAAAAAAAAAAALEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRTAAAAAAAAAAAAAAAAA");
            this.sendsms();
            this.updateEpisodios();
          }
        }else{
          console.log("No hay suficientes medidas, llevas ",this.vecesmedido);
        }
   }
   }
   calcularMedia(){
     let sum = 0;
    for(let x = 0;x<this.medidas.length;x++){
      sum = sum+this.medidas[x];
    }
    let media = sum/this.nummedidas;
    console.log("La media actual es: "+media+" con "+this.vecesmedido+" veces medido");
    return media;
   }
   sendsms(){

      this.sms.send(this.numtelefono, '¡Alerta! Su paciente está sufriendo un ataque de epilepsia.');
   }
   borrardatos(){
     this.storage.remove('datos');
   }
   guardarDatos(paciente, this2){
     let tiempo = this2.time;
     let hr = this2.hr;
    // console.log("tiempos", tiempo);
    // console.log("hr", hr);
     let enviar = JSON.stringify({paciente,tiempo, hr});
    // console.log("Esto intento enviar a la API:");
   // console.log(enviar);
      return this.http.put(new config().url+"/hr", enviar)
                      .map(response => response.json()).subscribe(data => {
                        //console.log("Inserción exitosa");
                      this.datos = [];
                      this.hr = [];
                      this.time = [];
			});
  }
  pedirtelefono(paciente){


      return this.http.get(new config().url+"/paciente/usuario/"+paciente)
                      .map(response => response.json()).subscribe(data => {
                        console.log("Lo que devuelvo al pedir el usuario:", data[0].telefono);
                        this.numtelefono = data[0].telefono;
                        
			});
  }
  updateEpisodios(){
    let tipo = 3;
    let enviar = JSON.stringify({tipo});
    this.http.post(this.url+"/paciente/novedades/"+this.sip,enviar).map(res => res.json()).subscribe(data => {
        console.log("Ataque actualizado en DB");
			});
  }

}
