import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DetailpacienteService} from './detailpaciente.service'
@Component({
  selector: 'app-detailpaciente',
  templateUrl: './detailpaciente.component.html',
  styleUrls: ['./detailpaciente.component.css'],
  providers:[DetailpacienteService]
})
export class DetailpacienteComponent implements OnInit {
  public sip;
  public nombre ="";
  public apellidos;
  public id;
  public responsable;
  public telefono;
  public email;
  public hayhr=false;

  public hist:historial;
  public trat:Tratamiento;
  public pat:Patologia;
  public espadre = false;


   public lineChartData:Array<any> = [{data: [0,0,0,0,0,0,0,0,0,0]}];
  public lineChartLabels:Array<any> = ['', '', '', '', '', '', '','','','    '];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 

  constructor( private route: ActivatedRoute, private router: Router, private pacienteservice: DetailpacienteService) { 
    this.route.params.subscribe(params => {
            if(params['id']!=null){
                this.sip = +params['id'];
                this.pacienteservice.getpacienteById(this.sip).subscribe(response=>{
                  this.sip = response[0].sip;
                  this.nombre = response[0].nombre;
                  this.apellidos = response[0].apellidos;
                  
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                this.pacienteservice.getusubypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.id = response[0].id;
                  this.responsable = response[0].nombre;
                  this.email = response[0].email;
                  this.telefono = response[0].telefono;
                  if(this.id==sessionStorage.getItem("userid")){
                    this.espadre=true;
                  }
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );

                this.pacienteservice.getHistbypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.hist=response;
                  this.parsearFecha();
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                this.pacienteservice.getTratbypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.trat=response;
                  
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                 this.pacienteservice.getPatbypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.pat=response;
                  
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                 this.pacienteservice.getLastHr(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                
                  console.log(response);
                  if(response.vacio=="vacio"){
                    this.hayhr=false;
                  }else{
                    this.hayhr = true;
                    let _lineChartData:Array<any> = new Array(this.lineChartData.length);

                 

                      _lineChartData[0] = {data: new Array(10)};
                      for (let j = 9; j >= 0; j--) {
                        _lineChartData[0].data[j] = response[j].hr;
                        this.lineChartLabels[j] = this.parsearhora(response[j].tiempo);
                      }
                      _lineChartData[0].data= _lineChartData[0].data.reverse();
                    
                    this.lineChartData = _lineChartData;
                   this.lineChartLabels = this.lineChartLabels.reverse();
                  }
                  
                   
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                 this.pacienteservice.updatenews(this.sip, sessionStorage.getItem("rol")).subscribe(response=>{
                  console.log("Updated");
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );

            }else{
               this.router.navigate(['/pacientes']);
            }
         });
  }
  parsearFecha(){
    let fechas;
    let splitear;
    let f;
    for(var x = 0; x <Object.keys(this.hist).length;x++){
      f = this.hist[x].fecha;
      splitear = f.split(" ",1);
      fechas = splitear[0].split("-");
      this.hist[x].fecha = fechas[2]+"/"+fechas[1]+"/"+fechas[0];
      
    }
  }
  parsearhora(fecha){
    return fecha.split(" ")[1];
  }
editarperfil(email2, password,passwordd, nombre2, telefono2){
  if(password==passwordd){
    console.log(email2+" "+ password + " "+ nombre2+" "+telefono2);
    this.pacienteservice.editperfil(email2,nombre2,password,telefono2).subscribe(response=>{   
      this.responsable = nombre2;
      this.email = email2;
      this.telefono = telefono2;
    },
      error => {
              alert("Error en la petición");
        }
    );
  }else{
    alert("Las contraseñas no coinciden");
  }
  
}
addpatologia(nombrepat,descripcionpat){
   this.pacienteservice.newPatologia(this.sip,nombrepat,descripcionpat).subscribe(response=>{
           this.pacienteservice.getPatbypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.pat=response;
                  
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );      
    },
      error => {
              alert("Error en la petición");
        }
    );

}

addTratamiento(nombretrat,descripciontrat){
   this.pacienteservice.newTratamiento(this.sip,nombretrat,descripciontrat).subscribe(response=>{
           this.pacienteservice.getTratbypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.trat=response;
                  
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );       
    },
      error => {
              alert("Error en la petición");
        }
    );

}
  ngOnInit() {
    
  }

}
class historial {
  public id;
  public paciente;
  public descripcion;
  public fecha;
}
class Tratamiento {
  public id;
  public nombre;
  public descripcion;
}
class Patologia {
  public id;
  public nombre;
  public descripcion;
}