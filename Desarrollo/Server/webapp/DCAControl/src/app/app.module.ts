import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MainPipe} from './tools/pipe.module';

import { AppComponent } from './app.component';
import {AppRoutingModule } from './routing'
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MenuComponent } from './menu/menu.component';
import { NewpacienteComponent } from './newpaciente/newpaciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { GuiaComponent } from './guia/guia.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    InicioComponent,
    PerfilComponent,
    MenuComponent,
    NewpacienteComponent,
    PacientesComponent,
    GuiaComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MainPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
