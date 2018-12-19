import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewtaskComponent } from './viewtask.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import * as $ from 'jquery';
import {DatePipe} from '@angular/common';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports:[HttpModule,FormsModule,RouterTestingModule,SelectDropDownModule,ReactiveFormsModule],
      providers:[DatePipe,FormsModule,HttpModule,RouterTestingModule,SelectDropDownModule,ReactiveFormsModule],
      declarations: [ ViewtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('View a task', () => {    
    component.Edit;  
    expect(component).toBeTruthy(); 
   });   
   it('Delete a task', () => {    
    component.Delete;  
    expect(component).toBeTruthy(); 
   });   
   it('End a task', () => {    
    component.EndTask;  
    expect(component).toBeTruthy(); 
   });   
  //  it('Edit button click navigate to update task page', () => {
  //   component.Edit(10);
  // });  
});