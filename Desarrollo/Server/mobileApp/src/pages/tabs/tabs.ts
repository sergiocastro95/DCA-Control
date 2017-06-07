import { Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TratamientoPage } from '../tratamiento/tratamiento';
import { HistorialPage } from '../historial/historial';
import { MonitorPage } from '../monitor/monitor';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = TratamientoPage;
  tab3Root: any = HistorialPage;
  tab4Root: any = MonitorPage;
   seltabix: number;


  constructor(np: NavParams) {
    this.seltabix = np.get('opentab');
  }
}
