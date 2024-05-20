import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule } from '@angular/common/http';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    HttpClientModule,
    TextBoxModule,
    InputsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
