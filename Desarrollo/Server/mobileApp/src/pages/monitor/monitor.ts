import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { NavController } from 'ionic-angular';
import {MonitorService} from '../../providers/monitorservice';
declare var cordova;
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})
export class MonitorPage {
  public services;
  public data;
  public idselect ="DF:85:09:6E:05:F8";
  public conectado = false;
  public varinfinita = 0;
  public intervalo;
  
  constructor(public navCtrl: NavController, public ble: BLE, public monit:MonitorService) {
  console.log("Página monitorizar");
    

     /*     this.services = this.ble.startScan([]).subscribe(devices => {
          this.data = JSON.stringify(devices); 
            console.log(this.data);
          },
          error => { console.log("error al buscar dispositivos")}
          );

          setTimeout(() => {
          this.ble.stopScan().then(() => {
          console.log('Scanning has stopped');
          
          });
          }, 3000);*/
      }
    escanear(){
      this.ble.startScan([]).subscribe(devices => {
          this.data = JSON.stringify(devices); 
            console.log(this.data);
          },
          error => { console.log("error al buscar dispositivos")}
          );

          setTimeout(() => {
          this.ble.stopScan().then(() => {
          console.log('Scanning has stopped');
          
          });
          }, 3000);
    }
    conectar(){
      console.log("Conectar");
      // send a 3 byte value with RGB color
      let datosEnv = new Uint8Array(18);
      datosEnv[0] = 0x01;
      datosEnv[1] = 0x08;
      datosEnv[2] = 0x30;
      datosEnv[3] = 0x31;
      datosEnv[4] = 0x32;
      datosEnv[5] = 0x33;
      datosEnv[6] = 0x34;
      datosEnv[7] = 0x35;
      datosEnv[8] = 0x36;
      datosEnv[9] = 0x37;
      datosEnv[10] = 0x38;
      datosEnv[11] = 0x39;
      datosEnv[12] = 0x40;
      datosEnv[13] = 0x41;
      datosEnv[14] = 0x42;
      datosEnv[15] = 0x43;
      datosEnv[16] = 0x44;
      datosEnv[17] = 0x45;

      console.log("Conectando...");
      
      this.ble.connect(this.idselect).subscribe(data => {
            console.log("Conectado!");
            this.monit.setID(this.idselect);
            this.conectado = true;
            console.log("Vinculando...");
            //var buffer  = this.stringToBytes("Test");
            console.log("Realizando la primera escritura..");
            this.ble.writeWithoutResponse(this.idselect,'fee1','00000009-0000-3512-2118-0009af100700',datosEnv.buffer);
            this.ble.startNotification(this.idselect, 'fee1', '00000009-0000-3512-2118-0009af100700').subscribe(buffer => {
                        console.log("Ha habido cambios! se ha redibido lo siguiente:");
                        let data = new Uint8Array(buffer);
                        console.log(data);
                        if(data[1]==0x01){
                          this.segundowrite();
                        }else if(data[1]==0x02){
                          this.cifrar(data);

                        } else{
                          console.log("Ultimo cambio en el servicio fee1:");
                          let data = new Uint8Array(buffer);
                          console.log(data);
                          console.log("Cancelando escucha en servicio fee1...")
                          this.ble.stopNotification(this.idselect,  'fee1', '00000009-0000-3512-2118-0009af100700');
                        }                    
                    });
            
        });
    }
    segundowrite(){
       let enviar2 =  new Uint8Array(2);
                        enviar2[0] = 0x02;
                        enviar2[1]= 0x08;
                        console.log("Realizando la segunda escritura..");
                        this.ble.writeWithoutResponse(this.idselect,'fee1','00000009-0000-3512-2118-0009af100700',enviar2.buffer);

    }
    tercerwrite(buf:Uint8Array){
         var datosEnv = new Uint8Array(18);
         var cabecera = new Uint8Array(2);
         cabecera[0]=0x03;
         cabecera[1]=0x8;
         datosEnv.set(cabecera);
         datosEnv.set(buf,cabecera.length);
        // console.log("Lo que envio en la tercera escritura");
         //console.log(datosEnv);
        console.log("Realizando la tercera escritura..");
        this.ble.writeWithoutResponse(this.idselect,'fee1','00000009-0000-3512-2118-0009af100700',datosEnv.buffer);
    }
    cifrar(buf:Uint8Array){
      console.log("Cifrando datos...");
      console.log(buf);
      let esto = this;
      (<any>window).MyCordovaPlugin.getDate(buf,"2",function (ArrayBufferd) {
        console.log("Valor devuelto en Uint8Array");
        var x = new Uint8Array(ArrayBufferd, 0);
        console.log(x);
        esto.tercerwrite(x);
      });

    }
     pedirHR(){
      console.log("Pedir HR");
      var datosEnv = new Uint8Array(3);
            datosEnv[0] = 0x15;
            datosEnv[1] = 0x02;
            datosEnv[2] = 0x01;
            this.ble.write(this.idselect,'180d','2a39',datosEnv.buffer).then(buffer => {
                  console.log("Pidiendo HR...");
                    
                    
              },error=>{
                  console.log("Error al escribir");
              });

              this.ble.startNotification(this.idselect, '180d', '2a37').subscribe(buffer => {
                        console.log("He recibido el HR:");
                        console.log(buffer);
                        let data = new Uint8Array(buffer);
                        console.log(data);
                                     
                    });
    }
    getdate(buf:Uint8Array){
      
   
  }
  getDatos(){
    let a = this.monit.getDatos();
    console.log("Datos almacenados hasta el momento:");
    console.log(a);
  }
  bubcleinfinito(){
    this.intervalo = setInterval(() => this.llamada(this.monit), 30000);
  }
  llamada(monit:MonitorService){
    monit.recursivo();
  }
  cancelarMonitorizacion(){
    console.log("Monitorizacion cancelada");
    window.clearInterval(this.intervalo);
    this.monit.cancelarEscucha();
  }
}
