import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private http: HttpClient){
    this.http.get('http://localhost:8000/userList').subscribe((data)=>{
      //console.log("====>",data);
    });
  }
  onSave(){
    let data = {
      "username":"kkkf",
      "mail":"abcd@gmail.com",
      "password":"123123"
    };
    this.http.post('http://localhost:8000/userRegister',data).subscribe((data)=>{
      console.log("====>",data);
    });
  }
}
