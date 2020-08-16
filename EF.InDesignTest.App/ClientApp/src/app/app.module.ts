import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { ClientDetailComponentDialog } from "./show-clients/ClientDetailComponentDialog";
import { EditClientDetailComponentDialog } from "./show-clients/EditClientDetailComponentDialog";
import { ServiceDetailComponentDialog } from "./show-clients/ServiceDetailComponentDialog";
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DateFormatPipe } from './show-clients/DateFormatPipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ShowClientsComponent,
    ClientDetailComponentDialog,
    EditClientDetailComponentDialog,
    ServiceDetailComponentDialog
  ],
  entryComponents: [ShowClientsComponent, ClientDetailComponentDialog, EditClientDetailComponentDialog, ServiceDetailComponentDialog],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: ShowClientsComponent, pathMatch: 'full'},
    ])
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, DateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
