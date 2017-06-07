import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmChartsService } from "amcharts3-angular2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private timer: number;
  private chart: any;

  constructor() {}

 

  ngOnInit() {  
  }

  ngOnDestroy() {
   
  }
}
