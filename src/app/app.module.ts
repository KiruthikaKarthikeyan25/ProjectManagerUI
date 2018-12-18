import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes, RouteConfigLoadEnd} from '@angular/router'
import { AppComponent } from './app.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { AddprojectComponent } from './UI/addproject/addproject.component';
import { AdduserComponent } from './UI/adduser/adduser.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewtaskComponent } from './UI/viewtask/viewtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {HttpModule} from '@angular/http'
import { SharedService } from './services/shared.service';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe }from '@angular/common'

const appRoutes:Routes=[
  {path:'addtask', component:AddtaskComponent},
  {path:'addproject', component:AddprojectComponent},
  {path:'adduser', component:AdduserComponent},
  {path:'viewtask', component:ViewtaskComponent},
  {path:'updateuser/:UserId',component:AdduserComponent},
  {path:'updatetask/:TaskId', component:AddtaskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    AddprojectComponent,
    AdduserComponent,
    FilterPipe,
    ViewtaskComponent     
  ],
  imports: [
   BrowserModule,RouterModule.forRoot(appRoutes),FormsModule,SelectDropDownModule,HttpModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [SharedService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
