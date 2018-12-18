import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskComponent } from './addtask.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import * as $ from 'jquery';
import {DatePipe} from '@angular/common';
import { Task } from 'src/app/models/task';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule,FormsModule,RouterTestingModule,SelectDropDownModule,ReactiveFormsModule],
      providers:[DatePipe,FormsModule,HttpModule,RouterTestingModule,SelectDropDownModule,ReactiveFormsModule],
      declarations: [ AddtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Add a Task', () => {
    const item:Task={TaskId:123,ParentId:1,ProjectId:1,ProjectName:'Projectname',TaskName:'Testservice',ParentTaskName:'Parenttask',TPriority:10,TStartDate:new Date(2014,2,2),TEndDate:new Date(2014,3,4),TStatus:true,UserId:1,Manager:"manager"}
    component.Add();  
    expect(component).toBeTruthy(); 
   });
   it('Update a task', () => {    
    component.Update();  
    expect(component).toBeTruthy(); 
   });   
});
