import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NavService } from './nav.service';

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
  constructor(private translate: TranslateService, private navservice:NavService, @Inject(APP_CONFIG) private appConfig: AppConfig) {
    this.lang = translate.currentLang;
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

  @Input() state:string;
  @Input() getMail:string;
  @Input() superStatus:string;

  ngOnInit() {
    if(this.currlang == 'English'){
      this.isActive = true;
    }else{
      this.isActive = false;
    }
    this.getLangID();
  }


  getLangID(){
    if(!localStorage.getItem('langID')){
      localStorage.setItem('langID', this.langId);
    }
  }

  logout(){
    location.href = this.appConfig.urlLog +'uapsso/Logout?return='+this.appConfig.urlLog+'portal-admin-protected/';
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
    this.navservice.getEventLang();

  }
}
