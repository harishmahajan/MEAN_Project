import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { apiUrl } from '../global';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public datas:any;
  constructor(private http: HttpClient, private router:Router){}

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.http.get(apiUrl + 'userList').subscribe((response)=>{
      this.datas = response['data'];
    });
  }
  editData(id){
    this.router.navigate(['register',id]);
  }
  deleteData(id)
  {
    this.http.post(apiUrl + 'deleteUser',{uid:id}).subscribe((response)=>{
      this.getList();
    })
  }
}
