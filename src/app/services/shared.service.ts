import { Injectable } from '@angular/core';
import{Http,Response} from '@angular/http';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { Project } from '../models/project';
import {map} from 'rxjs/operators';
import { Parent } from '../models/parent';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Getallusers:string='http://localhost:50037/Getallusers/';
  // updateuserbyid:String='http://localhost:50037/getbyuserid';
  // Addnewuser:string='http://localhost:50037/adduser/';
  // Deleteuserrecord:string='http://localhost:50037/Deleteuser';
  // Addnewproject:string='http://localhost:50037/adduser/';

  //  Getallusers:string='http://localhost:50037/Getallusers/';
  //  Getallprojects:string='http://localhost:50037/Getallprojects/';
  //  Getalltasks:string='http://localhost:50037/Getalltasks/';
  //  Getallparenttasks:string='http://localhost:50037/GetallParenttask/';
  //  Getbyuserid:String='http://localhost:50037/getbyuserid';
  //  Getbyprojectid:String='http://localhost:50037/getbyprojectid';
  //  Getbytaskid:String='http://localhost:50037/getbytaskid';
  //  updateuserbyid:String='http://localhost:50037/updatebyuserid';
  //  updatetaskbyid:String='http://localhost:50037/updatebytaskid';
  //  updateprojectbyid:String='http://localhost:50037/updatebyprojectid';
  //  Addnewuser:string='http://localhost:50037/adduser/';
  //  Addnewproject:string='http://localhost:50037/addproject/';
  //  Addnewtask:string='http://localhost:50037/addtask/';
  //  Addnewparenttask:string='http://localhost:50037/Addparenttask/';
  //  Deleteuserrecord:string='http://localhost:50037/Deleteuser'; 
  //  Deleteprojectrecord:string='http://localhost:50037/Deleteproject';
  //  Deletetaskrecord:string='http://localhost:50037/Deletetask';    
  //  Updateendrecord:string='http://localhost:50037/Endtask';
  //  Updatesuspendrecord:string='http://localhost:50037/suspendprojectbyid'; 

 Getallusers:string='http://localhost/ProjectManagerAPI/Getallusers/';
 Getallprojects:string='http://localhost/ProjectManagerAPI/Getallprojects/';
 Getalltasks:string='http://localhost/ProjectManagerAPI/Getalltasks/';
 Getallparenttasks:string='http://localhost/ProjectManagerAPI/GetallParenttask/';
 Getbyuserid:String='http://localhost/ProjectManagerAPI/getbyuserid';
 Getbyprojectid:String='http://localhost/ProjectManagerAPI/getbyprojectid';
 Getbytaskid:String='http://localhost/ProjectManagerAPI/getbytaskid';
 updateuserbyid:String='http://localhost/ProjectManagerAPI/updatebyuserid';
 updatetaskbyid:String='http://localhost/ProjectManagerAPI/updatebytaskid';
 updateprojectbyid:String='http://localhost/ProjectManagerAPI/updatebyprojectid';
 Addnewuser:string='http://localhost/ProjectManagerAPI/adduser/';
 Addnewproject:string='http://localhost/ProjectManagerAPI/addproject/';
 Addnewtask:string='http://localhost/ProjectManagerAPI/addtask/';
 Addnewparenttask:string='http://localhost/ProjectManagerAPI/Addparenttask/';
 Deleteuserrecord:string='http://localhost/ProjectManagerAPI/Deleteuser'; 
 Deleteprojectrecord:string='http://localhost/ProjectManagerAPI/Deleteproject';
 Deletetaskrecord:string='http://localhost/ProjectManagerAPI/Deletetask';    
 Updateendrecord:string='http://localhost/ProjectManagerAPI/Endtask';
 Updatesuspendrecord:string='http://localhost/ProjectManagerAPI/suspendprojectbyid'; 
  
  constructor(private _http:Http) { }
  GetAllusers():Observable<User[]>
  {
    return this._http.get(this.Getallusers).
    pipe(map((response: Response)=><User[]>response.json()));
  }
  GetAllProjects():Observable<Project[]>
  {
    return this._http.get(this.Getallprojects).
    pipe(map((response: Response)=><Project[]>response.json()));
  } 
  GetAllParentTasks():Observable<Parent[]>
  {
    return this._http.get(this.Getallparenttasks)
    .pipe(map((response: Response)=><Parent[]>response.json()));
  }
  GetAllTasks():Observable<Task[]>
  {
     return this._http.get(this.Getalltasks)
     .pipe(map((response: Response)=><Task[]>response.json()));    
  }
   EditUser(item:User):Observable<User[]>
 {
   return this._http.put(this.updateuserbyid+"/"+item.UserId,item)
   .pipe(map((response: Response)=><User[]>response.json()));
  }
  EditProject(item:Project):Observable<Project[]>
 {
   return this._http.put(this.updateprojectbyid+"/"+item.ProjectId,item)
   .pipe(map((response: Response)=><Project[]>response.json()));
  }
  EditTask(item:Task):Observable<Task[]>
 {
   return this._http.put(this.updatetaskbyid+"/"+item.TaskId,item)
   .pipe(map((response: Response)=><Task[]>response.json()));
  }
AddUser(item:User):Observable<any>
{
  return this._http.post(this.Addnewuser,item)
  .pipe(map((response: Response)=><any>response.json()));
}
Addproject(item:Project):Observable<any>
{
  return this._http.post(this.Addnewproject,item)
  .pipe(map((response: Response)=><any>response.json()));
}
AddTask(item:Task):Observable<any>
{
  return this._http.post(this.Addnewtask,item)
  .pipe(map((response: Response)=><any>response.json()));
}
AddParentTask(item:Parent):Observable<any>
{
  return this._http.post(this.Addnewparenttask,item)
  .pipe(map((response: Response)=><any>response.json()));
}
Deleteuser(Id:number){
  return this._http.delete(this.Deleteuserrecord+"/"+Id)
  .pipe(map((response: Response)=><any>response.json()));
}
Deleteproject(Id:number){
  return this._http.delete(this.Deleteprojectrecord+"/"+Id)
  .pipe(map((response: Response)=><any>response.json()));
}
Deletetask(Id:number){
  return this._http.delete(this.Deletetaskrecord+"/"+Id)
  .pipe(map((response: Response)=><any>response.json()));
}
Search(Id:number):Observable<User>{
  return this._http.get(this.Getbyuserid+"/"+Id)
  .pipe(map((response: Response)=><User>response.json()));
}
Searchproject(Id:number):Observable<Project>{
  return this._http.get(this.Getbyprojectid+"/"+Id)
  .pipe(map((response: Response)=><Project>response.json()));
}
Searchuser(Id:number):Observable<User>{
  return this._http.get(this.Getbyuserid+"/"+Id)
  .pipe(map((response: Response)=><User>response.json()));
}
// Searchtask(Id:number):Observable<Task>{  
//   return this._http.get(this.Getbytaskid+"/"+Id)
//     .map((response: Response)=><Task>response.json()); 
//  //return this.tasksubject;  
// }
Searchtask(Id:number):Observable<Task>{  
  return this._http.get(this.Getbytaskid+"/"+Id)
  .pipe(map((response: Response)=><Task>response.json()));
   // .map(this.extractData); 
 //return this.tasksubject;  

}
// private extractData(res: Response) {
//   let body = <Task> res.json();
//   console.log("Body Data = "+body.ProjectName);
//   return body || new Task() ;
// }
EndTask(Id:Number):Observable<Task>
{
  return this._http.put(this.Updateendrecord+"/"+Id,Id)
  .pipe(map((response:Response)=><Task>response.json()));
}
Suspendproject(Id:number)
{
  return this._http.put(this.Updatesuspendrecord+"/"+Id,Id)
  .pipe(map((response:Response)=><Project>response.json())); 
}
}