import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService} from './service/common.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  superAdmin: any;
  userID: any;
  getFullname: any;
  getEmail: any;
  getUserName: any;
  title = 'app';
  bTop = '15px';
  side = true;

  constructor(private commonService:CommonService, router:Router) {

}

ngOnInit() {
  this.getUserData();
}


  getUserData(){
    if(!environment.staging){
      this.commonService.getUsersDetails().subscribe(
        data => {
          if(data['adminUser']){
            this.getUserName = data['adminUser'].fullName;
            this.getEmail = data['adminUser'].email;
            this.userID = data['adminUser'].userId;
            this.superAdmin = data['adminUser'].superAdmin;
            localStorage.setItem('fullname',data['adminUser'].fullName);
            localStorage.setItem('email',data['adminUser'].email);
          }else{
            
          }
          
        },
      error => {
          //location.href = this.config.urlUAP +'uapsso/Logout';
          //location.href = this.config.urlUAP+'portal/index';
        }
      )
    }
  }
  
}



