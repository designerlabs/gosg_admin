import { Injectable } from '@angular/core';

@Injectable()
export class NavService {

  flagLang: any;

  constructor() { }

  getEventLang(){
    this.flagLang = true;
  }

}
