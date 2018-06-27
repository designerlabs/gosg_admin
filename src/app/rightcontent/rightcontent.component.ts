import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rightcontent',
  templateUrl: './rightcontent.component.html',
  styleUrls: ['./rightcontent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RightcontentComponent implements OnInit, OnDestroy {
  menulst: any;
  menulist_non_admin: any;
  public loading = false;

  // private subscriptionLang: ISubscription;

  // private subscriptionUserList: ISubscription;
  private subscriptionUsersDetails: ISubscription;
  private subscriptionModMenu: ISubscription;
  private subscriptionLocalMenu: ISubscription;

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }

  constructor(
    public commonservice: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserData();
    // 
    // this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if(!environment.staging){
    // this.subscriptionUserList.unsubscribe();
    this.subscriptionUsersDetails.unsubscribe();
    this.subscriptionModMenu.unsubscribe();
    } else {

      this.subscriptionLocalMenu.unsubscribe();
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  }

  getUserData(){
    if(!environment.staging){
      this.loading = true;
      this.subscriptionUsersDetails = this.commonservice.getUsersDetails().subscribe(
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

  getMenuData() {
    this.loading = true;
    this.subscriptionModMenu = this.commonservice.getModMenu().subscribe((data:any) => {
      this.menulst = data;
      
        
      // let myLangData =  getLang.filter(function(val) {
      // }.bind(this));
      this.loading = false;
    },
    error => {
        this.loading = false;
      })
  }

  getMenuDataLocal() {
    this.loading = true;
    this.subscriptionLocalMenu = this.commonservice.getModMenuLocal().subscribe((data:any) => {
      this.menulst = data;
      
      // 
      // let myLangData =  getLang.filter(function(val) {
      // }.bind(this));
      this.loading = false;
    },
    error => {
        this.loading = false;
      })
  }

}
