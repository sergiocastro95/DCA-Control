import { Component, OnInit } from '@angular/core';
import {PacientesService} from './pacientes.service';
import { MainPipe } from '../tools/pipe.module';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  providers:[PacientesService]
})
export class PacientesComponent implements OnInit {
public pacientes;
  constructor(private pacienteservice: PacientesService) {
     this.pacienteservice.getpacientes().subscribe(response=>{
                 this.pacientes = response;
                        console.log(this.pacientes);
                },
                error => {
                        alert("Error en la petición");
                }
            );  
   }

  ngOnInit() {
  }

}
