import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  bTop = '15px';
  side = true;

  menuId(data) {
    debugger;
    console.log(data);
  }
}
