import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  langId = this.langId;
  imgSrc: string = 'logo_en';
  lang = 'en';
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ms']);

    if(localStorage.getItem('langID') == "2"){
      translate.setDefaultLang('ms');
      translate.use('ms');
    }else{
      translate.setDefaultLang('en');
      translate.use('en');
    }
    
    if (translate.getDefaultLang() == 'ms') {
      this.currlang = 'English';
      this.currlangMOB = 'EN';
      this.langId = 2;
    } else {
      this.currlang = 'Bahasa Malaysia';
      this.currlangMOB = 'BM';
      this.langId = 1;
    }


    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {

          translate.get('HOME').subscribe((res: any) => {
              this.lang = 'en';
              this.imgSrc = 'logo_en';
          });

      }
      if (myLang == 'ms') {

          translate.get('HOME').subscribe((res: any) => {
              this.lang = 'ms';
              this.imgSrc = 'logo_ms';
          });
      }
  });
  }


  currlang: string = this.currlang;
  currlangMOB: string = this.currlangMOB;
  isActive;
  
  ngOnInit() {
    if(this.currlang == 'English'){
      this.isActive = true;
    }else{
      this.isActive = false;
    }
  }


  getLangID(){
    if(!localStorage.getItem('langID')){
      localStorage.setItem('langID', this.langId);
    }
  }


  toggle() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.currlang = 'English';
      this.currlangMOB = 'EN';
      this.translate.use('ms');
      this.langId = 2;
    }
    else {
      this.currlang = 'Bahasa Malaysia';
      this.currlangMOB = 'BM';
      this.langId = 1;
      this.translate.use('en');
    }
    localStorage.setItem('langID', this.langId);
 
  }
}
