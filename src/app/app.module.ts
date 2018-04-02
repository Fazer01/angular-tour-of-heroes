import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/primeng';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

import { MessageService } from 'primeng/components/common/messageservice';
import { HeroService } from './hero.service';
import { InMemoryDataService }  from './in-memory-data.service';
import {ConfirmationService} from 'primeng/api';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    GrowlModule,
    ButtonModule,   
    HttpClientModule, 
    AppRoutingModule,
    ConfirmDialogModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)    
  ],
  providers: [HeroService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
