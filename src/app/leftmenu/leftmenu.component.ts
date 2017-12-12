import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { SharedModule } from '../shared/shared.module';

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
  options = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor')
  ];
  panelOpenState: false;
  filteredOptions: Observable<User[]>;
  value = 'Clear me'; 
  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith({} as User),
      map(user => user && typeof user === 'object' ? user.name : user),
      map(name => name ? this.filter(name) : this.options.slice())
    );
  }

  filter(name: string): User[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user: User): string {
    return user ? user.name : user;
  }




}
