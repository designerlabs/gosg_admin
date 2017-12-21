import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';

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
  @Output() menuId = new EventEmitter();
//   public objMenu: object;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonservice: CommonService ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith({} as User),
      map(user => user && typeof user === 'object' ? user.name : user),
      map(name => name ? this.filter(name) : this.options.slice())
    );

    this.http.get(this.appConfig.urlMenu + 'lang=1').subscribe(data => {
      // tslint:disable-next-line:no-debugger
    //   debugger;
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

  getTbl(mainid, subid) {
       const obj = {
           mainMenu: mainid,
           subMenu: subid
       };
       this.menuId.emit(obj);
       this.commonservice.ObjMenuid = obj;
    //    this.objMenu = obj;
    // if (mainid === 1 && subid === 3) {
    //     this.http.get(this.appConfig.urlCommon + 'article/category/1').subscribe(data => {
    //         this.dataTbl = data;
    //         console.log(this.dataTbl);
    //     });
    // }

  }



}
