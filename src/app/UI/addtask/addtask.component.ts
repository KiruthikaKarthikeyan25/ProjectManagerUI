import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import * as $ from 'jquery';

import { TitleService } from 'src/app/services/title.service';
import { SharedService } from 'src/app/services/shared.service';
import { Parent } from 'src/app/models/parent';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
declare var $:any;
//import{} from 'ui-select'
import {filter} from 'rxjs/Operators';
import { pipeDef } from '@angular/core/src/view';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  public projectName = new BehaviorSubject([]);
  display='none';
  logedInForm:FormGroup;
  searchTaskResult:Task[];
item:Task;item1:Parent;
itemuser:User;itemParent:Parent;itemproject:Project;
tasks:Task[];
msg:any;
Taskidget:number;taskid:string;
objarray1:any=[];objarray2:any=[];objarray3:any=[];
myitem:string;
taskfilter:Task;
Recordadded:string;
projId:string;
projects:Project[];users:User[];Parenttasks:Parent[];
proid:number;proname:string;
intid:number;searchTaskProjId:number;
today = new Date();

projectconfig = {
  displayKey:"ProjectName",//if objects array passed which key to be displayed defaults to description,
  search:true //enables the search plugin to search in the list  
} 
parentconfig = {
  displayKey:"parentName",//if objects array passed which key to be displayed defaults to description,
  search:true //enables the search plugin to search in the list  
} 
userconfig = {
  displayKey:"FirstName",//if objects array passed which key to be displayed defaults to description,
  search:true //enables the search plugin to search in the list  
} 
  constructor(private _router:Router, private _title:TitleService,private _service:SharedService) { 
    
    this.item=new Task(); 
    this.item1=new Parent();
   this._service.GetAllProjects().subscribe(i=>this.projects=i);  
    this._service.GetAllTasks().subscribe(i=>this.tasks=i);
    this._service.GetAllusers().subscribe(i=>this.users=i);
    this._service.GetAllParentTasks().subscribe(i=>this.Parenttasks=i);
    //this._service.Searchtask(this.intid).subscribe(i=> this.searchTaskProjId = i.ProjectId);
    //console.log("Constructor ProjId:" + this.searchTaskProjId)   ;
  $(function () {  
      $("#btnprojectnamesearch").click(function(){ 
        $('#projectsearch').show();
        $('#parentsearch').hide();
        $('#usersearch').hide();         
                
      });  
       $("#btnparenttasksearch").click(function(){
        $('#projectsearch').hide();
        $('#parentsearch').show();
        $('#usersearch').hide();        
      }); 
      $("#btnusersearch").click(function(){      
        $('#projectsearch').hide();
        $('#parentsearch').hide();
        $('#usersearch').show();        
      }); 
      $('#txtchkbox').change(function(){
        var st=this.checked;      
        if(st){
          $('#txtparent').prop("disabled",true);
          $('#Priority').prop("disabled",true);
           $('#txtstartdate').prop("disabled",true);
           $('#txtenddate').prop("disabled",true);          
           $('#btnparenttasksearch').prop("disabled",true);
           $('#btnusersearch').prop("disabled",true); 
        }
         else{
          $('#txtparent').prop("disabled",false);
          $('#Priority').prop("disabled",false);
          $('#txtstartdate').prop("disabled",false);
          $('#txtenddate').prop("disabled",false);
          $('#btnparenttasksearch').prop("disabled",false);
          $('#btnusersearch').prop("disabled",false);
         }
      });            
    });
  }
  ngOnInit() {
    this.logedInForm = new FormGroup({
      countryCode: new FormControl("countryCode",Validators.compose([Validators.required])     
      )});     
     this._title.setTitle('ADD TASK');
     this.myitem=localStorage.getItem("eflag"); 
     this._service.GetAllProjects().subscribe(j=>this.projects=j);
    if(this.myitem=="True")
    {           
      this._title.setTitle('UPDATE TASK');
      this._title.taskid.subscribe(taskid=>{this.taskid=taskid});
      this.intid = + this.taskid;     
      this._service.Searchtask(this.intid).subscribe((i)=>{
      this.item=i; 
      //-----------------------------------------------

      this.today=new Date();         
      var year=new Date(this.item.TStartDate).getFullYear(); // new Date().getFullYear();;
      var month=new Date(this.item.TStartDate).getMonth()+1;
      var month11;
      if (month<10){
        month11= "0" + month;
        };                
      var day1=new Date(this.item.TStartDate).getDate();
      var result = day1.toString();  
      if(day1<10)
      { result = "0"+ result;}
         
      //End Date

      var year1=new Date(this.item.TEndDate).getFullYear(); // new Date().getFullYear();;
      var month1=new Date(this.item.TEndDate).getMonth()+1;
      var month22;
      if (month1<10){
        month22 = "0" + month1;
        };                
      var day3=new Date(this.item.TEndDate).getDate();
      var result1 = day3.toString();
      if(day3<10)
      { result1 = "0"+ result1;}    
      if (month<10){
        $('#txtstartdate').val(year + "-" + month11 + "-" + result);
        $('#txtenddate').val(year1 + "-" + month22 + "-" + result1);
      }
      else if(month > 10 && month1 < 10){
        $('#txtstartdate').val(year + "-" + month + "-" + result);
        $('#txtenddate').val(year1 + "-" + month22 + "-" + result1);
      }
      else if(month < 10 && month1 > 10){
        $('#txtstartdate').val(year + "-" + month11 + "-" + result);
        $('#txtenddate').val(year1 + "-" + month1 + "-" + result1);
      }
      else{
        $('#txtstartdate').val(year + "-" + month + "-" + result);
        $('#txtenddate').val(year1 + "-" + month1 + "-" + result1);    
      }
      
      this.item.TStartDate = $('#txtstartdate').val();
      this.item.TEndDate = $('#txtenddate').val();

      //----------------------------------------------
      this._service.Searchproject(this.item.ProjectId).subscribe((i)=>{
      this.itemproject=i;      
      $('#txtProject').val(this.itemproject.ProjectName);
     });    
     console.log(this.item.UserId)
     this._service.Searchuser(this.item.UserId)
     .subscribe(i=>{this.itemuser=i
       if(this.item.UserId==0)
       {        
         $('#txtManager').val('');
       }
       else{
       $('#txtuser').val(this.itemuser.FirstName);       
       }     
    });    
  });
  
   // this._service.Searchtask(this.intid).subscribe(i=> console.log("ProjectId:"+i.ProjectId));
   //this._service.Searchtask(this.intid).subscribe(i=> this.searchTaskProjId = i.ProjectId);
   //console.log("OnInit ProjId:" + this.searchTaskProjId);  
    
    //console.log(this.tasks.length);  
    //this._service.GetAllTasks().subscribe(i=>this.tasks=i);
    //Commented by Kiru    
  //   this._service.Searchtask(this.intid)
  // .subscribe(i=>
  //   {
  //     this._service.GetAllProjects().subscribe(j=>this.projects=j);
     //console.log("projects"+this.projects);
     // this.projects=this.projects.filter(x=>x.ProjectId===this.item.ProjectId);
      //$('#txtProject').val(this.projects[0].ProjectName);
   // }
  //  );
// End of comment
// this._service.Searchtask(this.intid)
// .subscribe(i=>
//   {
//     tsk => this.tasks = tsk; 
//     //this.projectName.next(this.tasks)
//     //$('#txtProject').val(this.projects[0].ProjectName);
//   }
//   );
//   console.log("TAsk" + this.tasks);
//   this._service.Searchproject(this.tasks[0].ProjectId).subscribe( i=>
//     {
//        pID => this.projId = pID;
//        $('#txtProject').val(this.projId);
//     });

  //  $('#txtProject').val(this.itemproject.ProjectName);
    //this.tasks=this.tasks.filter(x=>x.TaskId===this.intid);
    // console.log(this.taskfilter);   
    //Commented by kiru  

    //Commented today
    // $('#txtstartdate').hide();
    // $('#txtstartdate1').show();
    // $('#txtenddate').hide();
    // $('#txtenddate1').show();    
     $("#txtchkbox").prop("disabled", true);    
     $('#btnadd').hide();
     $('#btnupdate').show();    
     $('#btnreset').prop("disabled",true);
     localStorage.setItem("eflag","False");
    }   
  }
  filtered(){
   
  }
  Add(){  
     
    if($('#txtProject').val()=='')
    {
      this.Recordadded="Select Project";
    }
    else if($('#txttask').val()=='')
    {
      this.Recordadded="Select task name";
    }    
    else if($('#txtchkbox').is(':checked')) 
    {
      this.item1.parentName=this.item.TaskName;
      // this.Addingnewtask();           
      this._service.AddParentTask(this.item1).subscribe(
        suc=>{
         // this.msg=suc,
          this._service.GetAllParentTasks().subscribe(j=>this.Parenttasks=j);
        });      
      this.Reset();
      this.Recordadded='Record added successfully';
      this._service.GetAllParentTasks().subscribe(j=>this.Parenttasks=j);
    }
    else if($('#Priority').val()==null)
    {
      this.Recordadded="Select Priority";
    }
    else if ($('#txtparent').val()=='')
    {
      this.Recordadded="Select  Parent Task";
     }  
     else if($('#txtstartdate').val()=='')
     {
       this.Recordadded="Enter start date";
     }
     else if($('#txtenddate').val()=='')
     {
       this.Recordadded="Enter end date";
     }
     else if ($('#txtstartdate').val() > $('#txtenddate').val() )
     {
       this.Recordadded = "Start date should not be greater than end date";
     }
     else if($('#txtuser').val()=='')
     {
       this.Recordadded="Select User";
     } 
    else
    {          
      this.item.ProjectId=this.objarray1[0].ProjectId;
      this.item.ParentId=this.objarray2[0].ParentId;
     // this.item.Manager=this.objarray3[0].FirstName;
     this.item.TPriority=$('#Priority').val();
     this.item.ParentTaskName=this.objarray2[0].parentName;          
      this._service.AddTask(this.item).subscribe(i=>{
        this.msg=i;
        this._service.GetAllParentTasks().subscribe(i=>this.Parenttasks=i);
      });
     // console.log(this.msg);
      this.Reset();
      this.Recordadded='Record added successfully';   
      this.item.ParentTaskName='';   
      
      //location.reload();
    }  
  }    
 Reset(){
  $('#txtProject').val('');
  $('#Priority').val('');
  //$('#txtchkbox').value==false;
  $("#txtchkbox").prop("checked", false);
  $('#txtstartdate').val('');
  $('#txtenddate').val('');
  $('#txtstartdate1').val('');
  $('#txtenddate1').val('');
  $('#txtuser').val('');
  $('#txttask').val('');
  $('#txtparent').val('');
  $('#txtparent').prop("disabled",false);
  $('#Priority').prop("disabled",false);
  $('#txtstartdate').prop("disabled",false);
  $('#txtenddate').prop("disabled",false);
  $('#btnparenttasksearch').prop("disabled",false);
  $('#btnusersearch').prop("disabled",false);
  this.Recordadded='';
  this.objarray1=[];this.objarray2=[];this.objarray3=[];
 
 }  

 openModal(){
  //this._service.GetAllParentTasks().subscribe(i=>this.Parenttasks=i);
  this.display='block';
}
onCloseHandled(){   
  //location.reload();
  this.display='none';     
}
mdfLogin(data){  
  this.display = 'none';
   }
   projectselection(){     
    $('#txtProject').val(this.objarray1[0].ProjectName);      
    this.item.ProjectId=this.objarray1[0].ProjectId;    
    // this.item.ProjectName=this.objarray1[0].ProjectName;
    }   
    parentselection(){
      $('#txtparent').val(this.objarray2[0].parentName);
      this.item.ParentId=this.objarray2[0].ParentId;
      this.item.ParentTaskName=this.objarray2[0].parentName;     
    }
    userselection(){
      $('#txtuser').val(this.objarray3[0].FirstName);
      this.item.UserId=this.objarray3[0].UserId;
    }
    Submitmodal(){    
    
    }
    Update(){     
      if($('#txtProject').val()=='')
    {
      this.Recordadded="Select Project";
    }
    else if($('#txttask').val()=='')
    {
      this.Recordadded="Select task name";
    }        
    else if($('#txtuser').val()=='')
    {
      this.Recordadded="Select User";
    }
    else if($('#Priority').val()==null)
    {
      this.Recordadded="Select Priority";
    }
    else if ($('#txtparent').val()=='')
    {
      this.Recordadded="Select  Parent Task";
    } 
     
     else if( $('#txtstartdate').val() > $('#txtenddate').val())
     {
        this.Recordadded = "Start date should not be greater than end date";
     }
     else if($('#txtuser').val()=='')
     {
       this.Recordadded="Select User";
     } 
     else{
        
        this._service.EditTask(this.item).subscribe(i=>this.msg=i);  
        this.Reset();
        this.Recordadded='Record Updated successfully';
     }
    }
}
