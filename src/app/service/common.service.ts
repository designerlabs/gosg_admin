import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
 ObjMenuid: object;
  constructor() { }
  getMenuID() {
    console.log('This is from Common Service');
  }
}
