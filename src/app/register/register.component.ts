import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { apiUrl } from '../global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private register={};
  private flag=false;
  private userid:any;
  private errUsernameBlank=false;
  private errMailBlank=false;
  private errContactBlank=false;
  private errGenderBlank=false;
  private errDobBlank=false;
  private errAccountExist=false;
  
  constructor(private http: HttpClient,  private activatedRoute: ActivatedRoute, private router:Router) {}

  ngOnInit() {    
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userid = params.uid;
      if(this.userid!='' && this.userid!=null)
      {
        this.http.post(apiUrl+ "getSingleUser",{'uid':params.uid}).subscribe((datas)=>{
          if(datas!=null)
          {
            this.register['mail']=datas['data'].mail;
            this.register['username']=datas['data'].username;
            this.register['contact']=datas['data'].contact;
            this.register['dob']=datas['data'].dob;
            this.register['gender']=datas['data'].gender;
            this.flag=true;  
          }
        })
      }
    });
  }
  checkValidation(){
    if(this.register['username']=="" || this.register['username']==undefined || this.register['username']=='undefined'){
      this.errUsernameBlank = true;
    }
    else{
      this.errUsernameBlank = false;
    }
    if(this.register['mail']=="" || this.register['mail']==undefined || this.register['mail']=='undefined'){
      this.errMailBlank = true;
    }
    else{
      this.errMailBlank = false;
    }

    if(this.register['contact']=="" || this.register['contact']==undefined || this.register['contact']=='undefined'){
      this.errContactBlank = true;
    }
    else{
      this.errContactBlank = false;
      
    }
    if(this.register['dob']=="" || this.register['dob']==undefined || this.register['dob']=='undefined'){
      this.errDobBlank = true;
    }
    else{
      this.errDobBlank = false;
      
    }
    if(this.register['gender']=="" || this.register['gender']==undefined || this.register['gender']=='undefined'){
      this.errGenderBlank = true;
    }
    else{
      this.errGenderBlank = false;      
    }
  }
  onRegister(){
    console.log("this.register",this.register['username']);
    this.checkValidation();
    if(this.errUsernameBlank == false && this.errMailBlank == false && this.errGenderBlank == false && this.errDobBlank == false && this.errContactBlank == false)
    {
      this.http.post(apiUrl+ "userRegister",this.register).subscribe((data)=>{
        console.log("data",data);
        if(data['code']==403)
        {
          this.errAccountExist = true;
        }
        else{
          this.router.navigate(["list"]);          
        }
      });
    }
  }
  onReset(){
    this.register = {};
  }
  onUpdateRegister(){
    console.log("this",this.register)
    var data = { "datas":this.register, "uid":this.userid };
    this.http.post(apiUrl+ "updateUser",data).subscribe((data)=>{
      this.router.navigate(["list"]);
    });
  }
}
