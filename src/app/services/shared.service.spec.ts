import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import {HttpModule,Http,Response,ResponseOptions,XHRBackend} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Task } from '../models/task';

describe('SharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule  
    ],
    providers:[HttpModule, SharedService,     
      { provide: XHRBackend, useClass: MockBackend }
      ],
  }));

  it('should be created', () => {
    const service: SharedService = TestBed.get(SharedService);
    expect(service).toBeTruthy();
  });
  it('Adding record',()=>{
    const item:Task={TaskId:123,ParentId:1,ProjectId:1,ProjectName:'Projectname',TaskName:'Testservice',ParentTaskName:'Parenttask',TPriority:10,TStartDate:new Date(2014,2,2),TEndDate:new Date(2014,3,4),TStatus:true,UserId:1,Manager:"manager"}
    const service: SharedService = TestBed.get(SharedService);    
    service.AddTask(item).subscribe(
      r => {
        expect(r.TaskName).toEqual('Testservice');
      }
    );   
  });
  it('Deleting record',()=>{   
    const TaskId  = 8;
    const service: SharedService = TestBed.get(SharedService);    
    service.Deletetask(TaskId);
    expect(service).toBeTruthy();
  });
  it('Get all Task',()=>{    
    const service: SharedService = TestBed.get(SharedService);    
    service.GetAllTasks().subscribe(
      r => {
        expect(r.length).toEqual(3);
      }
    );    
  });
  it('Edit Task',()=>{
    const item:Task={TaskId:123,ParentId:1,ProjectId:1,ProjectName:'Projectname',TaskName:'Testservice',ParentTaskName:'Parenttask',TPriority:10,TStartDate:new Date(2014,2,2),TEndDate:new Date(2014,3,4),TStatus:true,UserId:1,Manager:"manager"}
    const service: SharedService = TestBed.get(SharedService);    
    service.EditTask(item).subscribe(
      r => {
        expect(r.length).toEqual(3);
      }
    );    
  });
});
