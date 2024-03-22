import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PerumoneyComponent } from './components/perumoney/perumoney.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyPipe } from '@angular/common';
import { Form1Component } from './components/perumoney/form1/form1.component';

import { LayoutComponent } from './components/layout/layout.component';
import { Form2Component } from './components/qullqui/form2/form2.component';
import { QullquiComponent } from './components/qullqui/qullqui.component';

// import { MomentDateModule} from '@angular/material-moment-adapter';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { MY_DATE_FORMATS } from './components/perumoney/my-date-formats';


@NgModule({
  declarations: [AppComponent, PerumoneyComponent, Form1Component, LayoutComponent, Form2Component, QullquiComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // MomentDateModule
  ],
  providers: [
    CurrencyPipe
    // {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
