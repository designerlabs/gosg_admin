import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService} from './service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  bTop = '15px';
  side = true;

  constructor(private commonService:CommonService, router:Router) {

}

ngOnInit() {
  this.getUserData();
}

  getUserData(){
    this.commonService.getUsersDetails().subscribe(
      data => {
        if(data['user']){
          debugger;
          // this.getUserName = data.user.fullName;
          // this.getEmail = data.user.email;
          // this.getFullname = data.user.fullName;
          // localStorage.setItem('fullname',data.user.fullName);
          // localStorage.setItem('email',data.user.email);
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



