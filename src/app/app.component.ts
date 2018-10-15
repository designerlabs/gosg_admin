import { Component, Input, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CommonService} from './service/common.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { AutologoutService} from './service/autologout.service';
=======
import { APP_CONFIG, AppConfig } from './config/app.config.module';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
>>>>>>> 3ca9cc6ee3ac6dc046e4b83628ab61084f755cb2
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countDown;
  count = 5;
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

<<<<<<< HEAD
  constructor(private commonService:CommonService, router:Router, private autoLogout: AutologoutService) {
    this.autoLogout.starts();
  }
=======
  constructor(private commonService:CommonService, router:Router,
    @Inject(APP_CONFIG) private appConfig: AppConfig,) {

      this.countDown = timer(0,1000).pipe(
        take(this.count),
        map(()=> --this.count)
      );

}
>>>>>>> 3ca9cc6ee3ac6dc046e4b83628ab61084f755cb2

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

    
          }else{
            this.invalidAdmin = data;
            setTimeout(() => {
              this.logout();
            }, 5000);
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



