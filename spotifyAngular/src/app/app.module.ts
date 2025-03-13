import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CancionComponent } from './cancion/cancion.component';
import { BodyComponent } from './body/body.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CancionComponent,
    BodyComponent,
    EstadisticasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
