import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import {Login} from '../providers/login';
import {HomeService} from '../providers/homeservice';
import {TratamientoService} from '../providers/tratamientoservice';
import {HistorialService} from '../providers/historialservice';
import {MonitorService} from '../providers/monitorservice';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html',
  providers:[
    Login,
    HomeService,
    TratamientoService,
    MonitorService,
    HistorialService
  ]
})
export class MyApp {
  rootPage;
  loginservice;

  constructor(platform: Platform, private login:Login, private storage:Storage) {
    platform.ready().then(() => {
     /* this.bm.enable();
      console.log("backgroundmode es: ", this.bm.isActive());
      console.log("backgroundmode esssss: ", this.bm.isEnabled());*/
      this.loginservice=login;
      this.storage.get('userid').then((val) => {
        if(val!=null){
          this.rootPage = TabsPage;
        }else{
          this.rootPage = LoginPage;
        }
      });
     
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  
}
