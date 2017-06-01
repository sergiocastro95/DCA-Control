import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MainPipe} from './tools/pipe.module';
import {AppRoutingModule } from './routing';

import { AppComponent } from './app.component';
import { AmChartsModule } from "amcharts3-angular2";
import { DetailpacienteComponent } from './detailpaciente/detailpaciente.component';
import { GuiaComponent } from './guia/guia.component';
import { HrComponent } from './hr/hr.component';
import { InicioComponent } from './inicio/inicio.component';
import { PanelComponent } from './panel/panel.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NewpacienteComponent } from './newpaciente/newpaciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailpacienteComponent,
    GuiaComponent,
    HrComponent,
    InicioComponent,
    PanelComponent,
    LoginComponent,
    MenuComponent,
    NewpacienteComponent,
    PacientesComponent,
    PerfilComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MainPipe,
    AmChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
