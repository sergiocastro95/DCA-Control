import { Component } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";
import { Router } from '@angular/router';
import {HrService} from "./hr.service";

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css'],
	providers: [HrService]
})
export class HrComponent {
  private timer: number;
  private chart: any;
public solicitado = false;
		public media = " ";
		public picomax= 0;
		public picomin = 0;
		public sip;
		public hpmax = "";
		public hpmin = "";
  constructor(private AmCharts: AmChartsService, private router:Router, private hrService: HrService) {
		
		let url = router.url;
		let split = url.split("/",5);
		
		this.sip = split[3];
	
	}

  makeRandomDataProvider() {
    var dataProvider = [];
    var auxsecond;
    var auxminute;
    var auxhour;
		
    // Generate random data
   
      
        dataProvider.push({	"column-1": 50,
							"date": "2014-03-01 00:00:00"});
        
              for(let h= 0; h<=8; h++){
                auxhour = "0"+h;
                for(let m= 0; m<=59; m++){
                  if(m<10){
                    auxminute="0"+m;
                  }else{
                    auxminute = m;
                  }
                   dataProvider.push({	"column-1": 60, "date": "2014-03-01 "+ auxhour+":"+auxminute+":01"});
                   dataProvider.push({	"column-1": 70, "date": "2014-03-01 "+ auxhour+":"+auxminute+":20"});
                   dataProvider.push({	"column-1": 80, "date": "2014-03-01 "+ auxhour+":"+auxminute+":40"});
                }
              }
      
      console.log(dataProvider);
    

    return dataProvider;
  }

  ngOnInit() {
    this.chart = this.AmCharts.makeChart("chartdiv",
				{
					"type": "serial",
					"categoryField": "date",
					"dataDateFormat": "YYYY-MM-DD HH:NN:SS",
					"mouseWheelZoomEnabled": true,
					"theme": "light",
					"categoryAxis": {
						"minPeriod": "ss",
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true,
						"categoryBalloonDateFormat": "JJ:NN:SS"
					},
					"chartScrollbar": {
						"enabled": true,
						"oppositeAxis": false
					},
					"trendLines": [],
					"graphs": [
						{
							"bullet": "round",
							"id": "AmGraph-1",
							"title": "graph 1",
							"valueField": "column-1"
						},
						{
							"bullet": "square",
							"id": "AmGraph-2",
							"title": "graph 2",
							"valueField": "column-2"
						}
					],
          "export": {
		"enabled": true
	},
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": "Ritmo cardíaco"
						}
					],
					"allLabels": [],
					"balloon": {},
					
					"dataProvider":[{	"column-1": 0, "date": "2014-03-01 00:00:00"}]
				}
			);
    // Updates the chart every 3 seconds
    
  }

  ngOnDestroy() {
    //clearInterval(this.timer);
    //
    //this.AmCharts.destroyChart(this.chart);
  }
  setfecha(fechaf, hora1, hora2){
			this.solicitado=true;
    clearInterval(this.timer);
    this.AmCharts.destroyChart(this.chart);
		let fecha = fechaf+" "+hora1;
		

		let hasta = fechaf+" "+hora2;
		
		
		this.hrService.getHr(this.sip,fecha, hasta).subscribe(response=>{
		
			console.log(response);
					 this.chart = this.AmCharts.makeChart("chartdiv",
				{
					"type": "serial",
					"categoryField": "date",
					"dataDateFormat": "YYYY-MM-DD HH:NN:SS",
					"mouseWheelZoomEnabled": true,
					"theme": "light",
					"categoryAxis": {
						"minPeriod": "ss",
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true,
						"categoryBalloonDateFormat": "JJ:NN:SS"
					},
					"chartScrollbar": {
						"enabled": true,
						"oppositeAxis": false
					},
					"trendLines": [],
					"graphs": [
						{
							"bullet": "round",
							"id": "AmGraph-1",
							"title": "graph 1",
							"valueField": "hr"
						},
						{
							"bullet": "square",
							"id": "AmGraph-2",
							"title": "graph 2",
							"valueField": "column-2"
						}
					],
          "export": {
		"enabled": true
	},
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": "Ritmo cardíaco"
						}
					],
					"allLabels": [],
					"balloon": {},
					
					"dataProvider":  response
				}
			);
      this.setmetricas(response);          
    },
    error => {
    	alert("Error en la petición");
    }
    );
  }
	setmetricas(respuesta){
		let max= 0;
		let min =500;
		let hmax;
		let hmin;
		let suma = 0;
		let count = 0;
		for(let x = 0;x<respuesta.length;x++){
			count++;
			let aux = +respuesta[x].hr;
			if(aux>max){
				max=aux;
					let split = respuesta[x].date.split(" ",2);
					hmax = split[1];
			}	
			if(aux<min){
				min=aux;
				let split = respuesta[x].date.split(" ",2);
		
				hmin = split[1];
			}
				
			suma = suma+aux;
		}
		console.log(suma);
		console.log(count);
		this.media = (suma/count).toFixed(2);
		console.log(this.media);
		this.picomax = max;
		this.picomin = min;
		this.hpmax = hmax;
		this.hpmin = hmin;
	}
}
