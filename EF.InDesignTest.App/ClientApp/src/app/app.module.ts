import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ShowClientsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ShowClientsComponent, pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
