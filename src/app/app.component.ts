import { Component, Input, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService} from './service/common.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { APP_CONFIG, AppConfig } from './config/app.config.module';
declare var $ :any;

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
  invalidAdmin: any;
  public loading = false;
  public languageId: any;

  constructor(private commonService:CommonService, router:Router,
    @Inject(APP_CONFIG) private appConfig: AppConfig,) {

}

ngOnInit() {

  if (!this.languageId) {
    this.languageId = localStorage.getItem('langID');
  } else {
    this.languageId = 1;
  }

  this.getUserData();
  $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
}

logout(){
  localStorage.removeItem('usrID');
  location.href= this.appConfig.urlLog +'uapsso/Logout?return='+this.appConfig.urlLog+'portal-admin-protected/';
}

  getUserData(){
    if(!environment.staging){
      this.loading = true;
      this.commonService.readProtected('adminuser/detail', '', '', '', this.languageId).subscribe(
        data => {
          if(data['adminUser']){
            this.getUserName = data['adminUser'].fullName;
            this.getEmail = data['adminUser'].email;
            this.userID = data['adminUser'].userId;
            this.superAdmin = data['adminUser'].superAdmin;
            localStorage.setItem('fullname',data['adminUser'].fullName);
            localStorage.setItem('email',data['adminUser'].email);

            console.log("data login");
            console.log(data);
          }else{
            console.log("before login");
            console.log(data);
            // setTimeout(() => {
            //   this.logout();
            // }, 5000);
          }
          this.loading = false;
        },
      error => {
        this.loading = false;

        console.log(error);
          //location.href = this.config.urlUAP +'uapsso/Logout';
          //location.href = this.config.urlUAP+'portal/index';
        }
      )
    }
  }

}



