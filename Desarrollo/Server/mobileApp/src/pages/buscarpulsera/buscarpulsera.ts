import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { NavController } from 'ionic-angular';
import {MonitorService} from '../../providers/monitorservice';

@Component({
  selector: 'page-buscarpulsera',
  templateUrl: 'buscarpulsera.html'
})
export class BuscarpulseraPage {
  public data = [];
  public idselect ="";
  public conectado = false;
  public varinfinita = 0;
  public intervalo;
  public buscando = true;
  
  constructor(public navCtrl: NavController, public ble: BLE, public monit: MonitorService) {
  console.log("Página monitorizar");
    this.escanear();
      }
    escanear(){
      this.ble.startScan([]).subscribe(devices => {
          this.data.push(devices);
          //this.data = JSON.stringify(devices); 
            console.log(this.data);
          },
          error => { console.log("error al buscar dispositivos")}
          );

          setTimeout(() => {
          this.ble.stopScan().then(() => {
          console.log('Scanning has stopped');
          this.buscando == false;
          });
          }, 3000);
    }
    seleccionar(id, name){
        this.idselect=id;
        this.monit.setID(id, name);
        this.conectar();
        
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
            this.conectado = true;
            console.log("Vinculando...");
            //var buffer  = this.stringToBytes("Test");
            console.log("Realizando la primera escritura..");
            this.ble.writeWithoutResponse(this.idselect,'fee1','00000009-0000-3512-2118-0009af100700',datosEnv.buffer);
            this.ble.startNotification(this.idselect, 'fee1', '00000009-0000-3512-2118-0009af100700').subscribe(buffer => {
                        console.log("Ha habido cambios! se ha redibido lo siguiente:");
                        let data = new Uint8Array(buffer);
                        console.log(data);
                        if(data[1]==0x01){  //he recibido la primera respuesta, procedo a la segunda escritura
                          this.segundowrite();
                        }else if(data[1]==0x02){  //he recibido la segunda respuesta, procedo al cifrado y a la tercera escritura
                          this.cifrar(data);

                        } else{ //he recibido la tercera respuesta
                          console.log("Ultimo cambio en el servicio fee1:");
                          let data = new Uint8Array(buffer);
                          console.log(data);
                          this.navCtrl.pop();
                          //onsole.log("Cancelando escucha en servicio fee1...")
                          //this.ble.stopNotification(this.idselect,  'fee1', '00000009-0000-3512-2118-0009af100700');
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
}
