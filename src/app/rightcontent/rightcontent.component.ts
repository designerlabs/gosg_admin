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

@Component({
  selector: 'app-rightcontent',
  templateUrl: './rightcontent.component.html',
  styleUrls: ['./rightcontent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RightcontentComponent implements OnInit {
  menulst: any;
  menulist_non_admin: any;

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }



  constructor(
    private commonservice: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserData();
    // this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  }


  getUserData(){
    if(!environment.staging){
      this.commonservice.getUsersDetails().subscribe(
        data => {
          if(data['adminUser']){
            if(data['adminUser'].superAdmin){
              this.getMenuData();
            }else{
              this.commonservice.getUserList(data['adminUser'].userId).subscribe((data:any) => {
                this.menulist_non_admin = data.data[1];
              });
            }
          }else{
            
          }
          
        },
      error => {
        
        }
      )
    }else{
      this.getMenuDataLocal();
    }
    
  }

  getMenuData() {
    this.commonservice.getModMenu().subscribe((data:any) => {
      this.menulst = data;
      //debugger;
      console.log(this.menulst)
      // let myLangData =  getLang.filter(function(val) {
      // }.bind(this));
    })
  }

  getMenuDataLocal() {
    this.commonservice.getModMenuLocal().subscribe((data:any) => {
      this.menulst = data;
      //debugger;
      console.log(this.menulst)
      // let myLangData =  getLang.filter(function(val) {
      // }.bind(this));
    })
  }

}
