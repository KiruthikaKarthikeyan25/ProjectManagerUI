import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
//import $ from 'jquery';
import * as $ from 'jquery';
declare var $:any;
//import * as $AB from 'jquery';
//declare var jQuery: jquery;
import { TitleService } from 'src/app/services/title.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/models/user';
import { isNgTemplate } from '@angular/compiler';
import { ValueTransformer } from '@angular/compiler/src/util';
import{Location,DatePipe} from '@angular/common';
import { iif } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})

export class AddprojectComponent implements OnInit {
  display='none';
  logedInForm:FormGroup;
item:Project;item1:Project;itemuser:User;
//checked:boolean;
Recordadded:string;
today = new Date();
 _this:this;
drpdwnvalue:string;
objarray:any=[];
projects:Project[];projects1:Project[];users:User[];
msg:string;mngrId:number;
usersfilter:User[];empidfiler:string;empfiler:Project[];
daystring1:string;daystring2:string;
st:boolean;st1:boolean;
ProjectName:string;
config = {
  displayKey:"FirstName",//if objects array passed which key to be displayed defaults to description,
  search:true //enables the search plugin to search in the list
  }
  constructor(private datePipe:DatePipe, _router:Router,private _title:TitleService, private _service:SharedService,private location:Location) { 
    this.item=new Project(); 
    this.item1=new Project();   
    this._service.GetAllProjects().subscribe(i=>this.projects=i);
    this._service.GetAllusers().subscribe(i=>this.users=i);
    this._service.GetAllProjects().subscribe(i=>this.projects1=i);    
     $(function () {
      $('#txtchkbox').change(function(){
         this.st=this.checked;       
        if(this.st){   

          //commented today
          
           $('#ptxtstartdate').prop("disabled",false);
           $('#ptxtenddate').prop("disabled",false);
          // $('#ptxtstartdate').show();
          // $('#ptxtstartdate1').hide();
          // $('#ptxtenddate').show();
          // $('#ptxtenddate1').hide();          
          
          this.today=new Date();
          var year=new Date().getFullYear();
          var month=new Date().getMonth()+1;
          if (month<10){
            month=0 + month;
            };                
          var day1=new Date().getDate();
          var day2=new Date().getDate()+1;                      
          this.daystring1=day1.toString();
          this.daystring2=day2.toString();
          if(day1<10)
          {this.daystring1="0"+this.daystring1;}
          if(day2<10)
          {this.daystring2="0"+this.daystring2;}        
          
            $('#ptxtstartdate').val(year + "-" + month + "-" + this.daystring1);
            $('#ptxtenddate').val(year + "-" + month + "-" + this.daystring2);
            
        } 
        else{                
          $('#ptxtstartdate').prop("disabled",true);
          $('#ptxtenddate').prop("disabled",true);          
      }  
  });
  $('#btntaskmanagersearch').click(function() { 
    
    $('#searchmodal').show();
  });
  });
}
  ngOnInit() {
    
    this.logedInForm = new FormGroup({
      countryCode: new FormControl("countryCode",
        Validators.compose([
          Validators.required
          //Validators.pattern("[^ @]*@[^ @]*")
      ]))});
    this._title.setTitle('ADD PROJECT');    
     $('#ptxtstartdate').prop("disabled",true);
     $('#ptxtenddate').prop("disabled",true);
     $('#drpsearch').addClass("disabled");
   //  $('#txtManager').val(''); 
  
  }
Add(){
  console.log($('#txtProject').val());
  console.log($('#Priority').val());
  console.log($('#txtManager').val());
   if(($('#txtProject').val()=='') || ($('#Priority').val()=='')|| ($('#txtManager').val()==''))
   {
         if($('#txtProject').val()=='')
        {
            this.Recordadded="Enter Project Name";
        }  
         else if($('#Priority').val()=='')
        {
        this.Recordadded="Select Priority";      
        } 
          else if($('#txtManager').val()=='')
        {
        this.Recordadded="Select Manager";           
        }
   }
   else if($('#txtchkbox').is(':checked')) 
     {      
        if($('#ptxtstartdate').val()=='')
        {        
           this.Recordadded='Enter start date';    
        }
        else  if($('#ptxtenddate').val()=='')
        {
          this.Recordadded='Enter end date';
        }
        else if ($('#ptxtstartdate').val()>=$('#ptxtenddate').val())
        {      
           this.Recordadded='End date should be greater than start date';
        }
        
        else{
          this.Additionofnewproject();
        }
      }  
     else{      
      this.Additionofnewproject();
     }
}
Additionofnewproject(){
   this.item.PStartDate = $('#ptxtstartdate').val();
   this.item.PEndDate = $('#ptxtenddate').val();
  this.item.ManagerId=this.objarray[0].UserId;    
  this.item.PPriority=$('#Priority').val();
  this._service.Addproject(this.item).subscribe(suc => 
      {
        this._service.GetAllProjects().subscribe(i=>this.projects=i);
      });                
  this.Reset();
  // console.log(this.item.PStartDate);  
  this.Recordadded="Record added successfully";  
}
Reset(){
  $('#txtProject').val('');
  $('#Priority').val('');
  this.item.PStartDate=null;
  this.item.PEndDate=null;
  $('#ptxtstartdate').val('');
  $('#ptxtenddate').val('');
  $('#txtManager').val(''); 
  $("#txtchkbox").prop("checked", false);
  this.Recordadded='';
  this.location.replaceState('adduser');   
  $('#btnadd').show();
  $('#btnupdate1').hide();
  this.objarray=[];
  this._title.setTitle('ADD USER'); 
  $('#ptxtstartdate').prop("disabled",true);
  $('#ptxtenddate').prop("disabled",true);
}
// Search(){
//   $("#searchmodal").modal('show');
// }
StartDate(){
  this.projects.sort(function(a,b){    
    if(new Date(a.PStartDate)<new Date(b.PEndDate))
    return -1;      
  });
}
EndDate(){
  this.projects.sort(function(a,b){    
   if(new Date(a.PEndDate)<new Date(b.PEndDate))
    return -1; 
  });
}
Priority(){
  this.projects.sort(function(a,b){
    var PriorityA=a.PPriority;
    var PriorityB=b.PPriority;
    if(PriorityA<PriorityB)
    return -1; 
  });
}
Completed(){
  this.projects.sort(function(a,b){
    var CompletedA=a.completed;
    var CompletedB=b.completed;
    if(CompletedA<CompletedB)
    return -1; 
  });
}
Edit(id:number){
    $('#btnadd').hide();
    $('#btnupdate1').show();  
    //Commented today     
    // $('#ptxtstartdate').hide();
    // $('#ptxtstartdate1').show();
    // $('#ptxtenddate').hide();
    // $('#ptxtenddate1').show(); 
    this.Recordadded='';   
    this._title.setTitle('UPDATE POJECT');    
    this.location.replaceState('/updateproject/'+id);
    this._service.Searchproject(id).subscribe(i=>{
    this.item=i,         
    $('#txtProject').val(this.item.ProjectName);
    $('#Priority').val(this.item.PPriority);
     
    //Added today
    if(this.item.PStartDate != null && this.item.PEndDate != null)
    {
    $('#ptxtstartdate').prop("disabled",false);
    $('#ptxtenddate').prop("disabled",false);
    $("#txtchkbox").prop("checked", true);    
    
    //Added by kiru
    
    this.today=new Date();         
      var year=new Date(this.item.PStartDate).getFullYear(); // new Date().getFullYear();;
      var month=new Date(this.item.PStartDate).getMonth()+1;
      var month11;
      if (month<10){
        month11= "0" + month;
        };                
      var day1=new Date(this.item.PStartDate).getDate();
      var result = day1.toString();  
      if(day1<10)
      { result = "0"+ result;}
         
      //End Date

      var year1=new Date(this.item.PEndDate).getFullYear(); // new Date().getFullYear();;
      var month1=new Date(this.item.PEndDate).getMonth()+1;
      var month22;
      if (month1<10){
        month22 = "0" + month1;
        };                
      var day3=new Date(this.item.PEndDate).getDate();
      var result1 = day3.toString();
      if(day3<10)
      { result1 = "0"+ result1;}    
      if (month<10){
        $('#ptxtstartdate').val(year + "-" + month11 + "-" + result);
        $('#ptxtenddate').val(year1 + "-" + month22 + "-" + result1);
      }
      else{
        $('#ptxtstartdate').val(year + "-" + month + "-" + result);
        $('#ptxtenddate').val(year1 + "-" + month1 + "-" + result1);    
      }   
     
    this.item.PStartDate = $('#ptxtstartdate').val();
    this.item.PEndDate = $('#ptxtenddate').val();
          }
    this._service.Searchuser(this.item.ManagerId)
    .subscribe(i=>{this.itemuser=i
      if(this.item.ManagerId==0)
      {
        $('#txtManager').val('');
      }
      else{
      $('#txtManager').val(this.itemuser.FirstName); 
       
      }    
    }); 
    });  
}
openModal(){
  this.display='block';  
  $('#projectdiv :input').attr('disabled', true);
}
onCloseHandled(){   
  this.display='none';    
  $('#projectdiv :input').removeAttr('disabled', false);
}
mdfLogin(data){  
  this.display = 'none';
   }
   selectionchanged(){    
      $('#txtManager').val(this.objarray[0].FirstName);    
   this.item.ManagerId=this.objarray[0].UserId;    
    
    }
  Update(){    
    if(($('#txtProject').val()=='') || ($('#Priority').val()=='')|| ($('#txtManager').val()==''))
   {
         if($('#txtProject').val()=='')
        {
            this.Recordadded="Enter Project Name";
        }  
         else if($('#Priority').val()=='')
        {
        this.Recordadded="Select Priority";      
        } 
          else if($('#txtManager').val()=='')
        {
        this.Recordadded="Select Manager";           
        }
   }
   else if($('#txtchkbox').is(':checked')) 
     {      
        if($('#ptxtstartdate').val()=='')
        {        
           this.Recordadded='Enter start date';    
        }
        else  if($('#ptxtenddate').val()=='')
        {
          this.Recordadded='Enter end date';
        }
        else if ($('#ptxtstartdate').val()>=$('#ptxtenddate').val())
        {      
           this.Recordadded='End date should be greater than start date';
        }
    else{    
     // console.log(this.emploID);
      // this.item.ManagerId=this.mngrId;
      this.updaterecord();
  }
  }
  else{
    this.updaterecord();
  }
}
updaterecord(){
  $('#btnadd').show();
  $('#btnupdate1').hide();    
  $('#btnreset').prop("disabled",false);
  //Commented today
  // $('#ptxtstartdate').show();
  // $('#ptxtstartdate1').hide();
  // $('#ptxtenddate').show();
  // $('#ptxtenddate1').hide();
  
  this.location.replaceState('addproject');
  this._title.setTitle("ADD PROJECT");
  
  if($('#txtchkbox').is(':checked'))
  {
   
    this.item.PStartDate = $('#ptxtstartdate').val();
    this.item.PEndDate = $('#ptxtenddate').val();   
    
  }
  else
  {
  this.item.PStartDate = $('#ptxtstartdate1').val();
  this.item.PEndDate = $('#ptxtenddate1').val();  
  }
 
//      this._service.EditProject(this.item)
// .subscribe(i=>
//  {
//    this._service.GetAllProjects().subscribe(j=>this.projects=j);
//  });
this._service.EditProject(this.item)
.subscribe(i=>
 {
   this._service.GetAllProjects().subscribe(j=>{
     this.projects=j;
    });
 });
     this.Reset();
     this.Recordadded='Record updated successfully';
  }
  Suspendcontinue(id:number){
    this._service.Suspendproject(id)
    .subscribe(i=>
      {
        this._service.GetAllProjects().subscribe(j=>this.projects=j);
      }); 
    };  
    Searchbyproject(projectname:string)
  {   
    this._service.GetAllProjects().subscribe(i=>this.projects1=i);
    this.projects=this.projects1.filter(i=>i.ProjectName.toString().toUpperCase().startsWith(projectname.toString().toUpperCase()));
    //this.users1=this.users.filter(i=>i.FirstName.startsWith(firstname));
  } 
  convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
  }       
}
 