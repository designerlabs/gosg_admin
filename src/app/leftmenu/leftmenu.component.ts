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
  @Output() menuClick = new EventEmitter();
  myControl = new FormControl();
  menulst: object;
  dataTbl: object;
  mylst = 'Menu 1';
  options = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor')
  ];
  panelOpenState: false;
  filteredOptions: Observable<User[]>;
  value = 'Clear me';
//   public objMenu: object;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonservice: CommonService, private router: Router ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith({} as User),
      map(user => user && typeof user === 'object' ? user.name : user),
      map(name => name ? this.filter(name) : this.options.slice())
    );

    // + 'langId=1'
    this.http.get(this.appConfig.urlMenu).subscribe(data => {
      console.log(data);
      this.menulst = data;
    });
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
