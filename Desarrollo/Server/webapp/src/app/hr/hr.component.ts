import { Component } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent {
  private timer: number;
  private chart: any;

  constructor(private AmCharts: AmChartsService) {}

  makeRandomDataProvider() {
    var dataProvider = [];
    var auxmonth;
    var auxday;
    var auxhour;
    // Generate random data
   
      for (var month = 1; month <= 12; ++month) {
        if(month<=9){
          auxmonth = "0"+ month;
        }else{
          auxmonth=month;
        }
        for(var day = 1; day<=27; ++day){
          if(day<=9){
            auxday = "0"+ day;
          }else{
            auxday=day;
          }
          for(var hour=0; hour<=8; ++hour){
            auxhour= "0"+hour;
            dataProvider.push({
              date: "2015-" + auxmonth+"-"+auxday+"-"+auxhour,
              value: Math.floor(Math.random() * 60) + 60
            });
          }
        }
      
      console.log(dataProvider);
    }

    return dataProvider;
  }

  ngOnInit() {
   /* this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "marginTop":0,
      "marginRight": 80,
      "dataProvider": this.makeRandomDataProvider(),
      "mouseWheelZoomEnabled":true,
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
      }],
      "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#d1655d",
        "type": "line",
        "valueField": "value"
      }],
      "chartScrollbar": {
        "graph":"g1",
        "gridAlpha":0,
        "color":"#888888",
        "scrollbarHeight":55,
        "backgroundAlpha":0,
        "selectedBackgroundAlpha":0.1,
        "selectedBackgroundColor":"#888888",
        "graphFillAlpha":0,
         "oppositeAxis":false,
        "autoGridCount":true,
        "selectedGraphFillAlpha":0,
        "graphLineAlpha":0.2,
        "graphLineColor":"#c2c2c2",
        "selectedGraphLineColor":"#888888",
        "selectedGraphLineAlpha":1
      },
      "chartCursor": {
        "categoryBalloonDateFormat": "MM-DD-HH",
        "cursorAlpha": 0,
        "valueLineEnabled":true,
        "valueLineBalloonEnabled":true,
        "valueLineAlpha":0.5,
        "fullWidth":true
      },
      "dataDateFormat": "MM-DD-HH",
      "categoryField": "date",
      "categoryAxis": {
        "minPeriod": "hh",
        "parseDates": true,
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      }
    });*/
    var chart = this.AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "marginRight": 0,
    "marginLeft": 0,
    "autoMarginOffset": 0,
    "mouseWheelZoomEnabled":true,
    "dataDateFormat": "YYYY-MM-DD-HH",
    "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth":true
    }],
    "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
    },
    "graphs": [{
        "id": "g1",
        "balloon":{
          "drop":true,
          "adjustBorderColor":false,
          "color":"#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
    }],
    "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis":false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA"
    },
    "chartCursor": {
      "categoryBalloonDateFormat": "HH:MM:SS",  //lo que se muestra abajo al pasar el raton por una medida
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
    },
    "valueScrollbar":{
      "oppositeAxis":false,
      "offset":50,
      "scrollbarHeight":10
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minPeriod": "hh",
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true
    },
    "dataProvider":  this.makeRandomDataProvider()
});
    // Updates the chart every 3 seconds
    
  }

  ngOnDestroy() {
    //clearInterval(this.timer);
    //
    //this.AmCharts.destroyChart(this.chart);
  }
}
