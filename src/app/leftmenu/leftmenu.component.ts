import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

// import { Router } from '@angular/router/src/router';

export class User {
  constructor(public name) { }
}

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class LeftmenuComponent implements OnInit {
  menulist_non_admin: any;
  @Output() menuClick = new EventEmitter();
  myControl = new FormControl();
  menulst: object;
  dataTbl: object;
  public loading = false;
  mylst = 'Menu 1';
  options = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor')
  ];
  panelOpenState: boolean;
  filteredOptions: Observable<User[]>;
  value = '';
  dataUrl: any;
  languageId: any;
//   public objMenu: object;

step = 0;

setStep(index: number) {
  this.step = index;
}

nextStep() {
  this.step++;
}

prevStep() {
  this.step--;
}

applyFilter(keyword) {   
  
  if(keyword){
    this.getFilterList(keyword);
  }
  else{
    this.getUserData();
    this.step = 0;
  }

}

resetSearch() {
  this.getUserData();
  this.step = 0;
}

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonservice: CommonService, private router: Router,
  private toastr: ToastrService ) { 
    
    this.getUserData();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith({} as User),
      map(user => user && typeof user === 'object' ? user.name : user),
      map(name => name ? this.filter(name) : this.options.slice())
    );

    this.getUserData();
   
  }

  
  @Input() state:string;
  @Input() getMail:string;
  @Input() superStatus:string;

  getUserData(){
    this.languageId = localStorage.getItem('langID');
    if(!environment.staging){
      this.loading = true;
      this.commonservice.getUsersDetails().subscribe(
        data => {
          if(data['adminUser']){
            if(data['adminUser'].superAdmin){
              this.getMenuData();
            }else{
              this.loading = true;
              this.commonservice.getUserList(data['adminUser'].userId).subscribe((data:any) => {
                
                this.menulist_non_admin = data.data[1];
                this.loading = false;
              },
              error => {
                this.loading = false;
                });
            }
          }else{
            
          }
          this.loading = false;
        },
      error => {
        this.loading = false;
        }
      )
    }else{
      this.getMenuDataLocal();
    }
    
  }

  scrollTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getFilterList(keyword) {
    debugger;
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readProtected('authorization/module/search', '','', keyword)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          // this.menulst = data;
          this.getUserData();
          this.step = 1;

        }).bind(this));
        this.loading = false; 
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.loading = false;
      });
    }
  }

  getMenuData() {
    this.loading = true;
    this.commonservice.getModMenu().subscribe((data:any) => {
      this.menulst = data;
      this.loading = false;
    }, err => {
      this.toastr.error(JSON.parse(err._body).statusDesc, '');  
      this.loading = false;
      //...
    })
  }

  getMenuDataLocal() {
    this.loading = true;
    this.commonservice.getModMenuLocal().subscribe((data:any) => {
      this.menulst = data;
      //debugger;
      this.loading = false;
      // let myLangData =  getLang.filter(function(val) {
      // }.bind(this));
    }, err => {
      this.toastr.error(JSON.parse(err._body).statusDesc, '');  
      this.loading = false;
      //...
    })
  }

  filter(name: string): User[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user: User): string {
    return user ? user.name : user;
  }

  getTbl(mainid) {
    this.router.navigate([mainid]);
      //  this.router.navigate(['articletbl', subid]);
    //    this.objMenu = obj;
    // if (mainid === 1 && subid === 3) {
    //     this.http.get(this.appConfig.urlCommon + 'article/category/1').subscribe(data => {
    //         this.dataTbl = data;
    //         console.log(this.dataTbl);
    //     });
    // }

  }



}
