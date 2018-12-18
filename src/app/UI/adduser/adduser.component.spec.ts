import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserComponent } from './adduser.component';
import { User } from 'src/app/models/user';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import * as $ from 'jquery';
import {DatePipe} from '@angular/common';

describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule,FormsModule,RouterTestingModule,SelectDropDownModule,ReactiveFormsModule],
      providers:[DatePipe,FormsModule,HttpModule,RouterTestingModule,SelectDropDownModule,ReactiveFormsModule],
      declarations: [ AdduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Add a user', () => {
    const item:User = {UserId:123,FirstName:'Firstname',LastName:'Lastname',EmployeeId:'Emp01'}
    component.Add();  
    expect(component).toBeTruthy(); 
   });
   it('Update a user', () => {    
    component.Update();  
    expect(component).toBeTruthy(); 
   });   
   it('Delete a user', () => {    
    component.Delete;  
    expect(component).toBeTruthy(); 
   });   
});
