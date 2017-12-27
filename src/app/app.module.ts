import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
// import { AppConfig } from './config/app.config.modules';
import { AppConfigModule } from './config/app.config.module';
import { NavComponent } from './nav/nav.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';
import { ArticletblComponent } from './articletbl/articletbl.component';
import { CommonService } from './service/common.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LeftmenuComponent,
    RightcontentComponent,
    ErrorComponent,
    AddtemplateComponent,
    ArticletblComponent,
    FeedbackComponent,
    UserComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppConfigModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
    ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
