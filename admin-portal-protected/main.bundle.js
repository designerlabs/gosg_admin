webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/addtemplate/addtemplate.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/addtemplate/addtemplate.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"rtCompall\">\r\n  <p>\r\n    addtemplate works!\r\n  </p>\r\n  <ul>\r\n      <li *ngFor=\"let food of foods\">{{food.name}}</li>\r\n    </ul>\r\n<!--   \r\n    <div [froalaEditor]>Hello, Froala!</div> -->\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/addtemplate/addtemplate.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddtemplateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AddtemplateComponent = (function () {
    function AddtemplateComponent() {
    }
    AddtemplateComponent.prototype.ngOnInit = function () {
    };
    AddtemplateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-addtemplate',
            template: __webpack_require__("../../../../../src/app/addtemplate/addtemplate.component.html"),
            styles: [__webpack_require__("../../../../../src/app/addtemplate/addtemplate.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], AddtemplateComponent);
    return AddtemplateComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("../../../../css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\r\n\tfont-family: 'Roboto';\r\n\tsrc: url(" + escape(__webpack_require__("../../../../../src/assets/fonts/Roboto/Roboto-Light.ttf")) + ");\r\n   }\r\n   \r\n   \r\n   body{\r\n\t font-family: 'Roboto', sans-serif !important;\r\n   }\r\n\r\n   h1, h2, h3{\r\n\tfont-weight: 200;\r\n  }\r\n  \r\n.top-nav-style{\r\n    width: 100% !important;\r\n    height:270px;   \r\n    position: fixed  !important;\r\n    z-index: 10000;\r\n    -webkit-transition-property: height; /* Safari */\r\n    -webkit-transition-duration: 1s; /* Safari */\r\n    transition-property: height;\r\n    transition-duration: 1s;\r\n    top: 0px;\r\n    left: 0px;\r\n}\r\n.nav-bar-style{\r\n    z-index: 10000;\r\n    position: fixed;\r\n    width: 100%;\r\n    top: 30px;\r\n    -webkit-transition-property: top; /* Safari */\r\n    -webkit-transition-duration: 1s; /* Safari */\r\n    transition-property: top;\r\n    transition-duration: 1s;\r\n}\r\n\r\n\r\n@media only screen and (max-width: 500px) {\r\n    .nav-bar-style{\r\n        top: 41px !important;\r\n    }\r\n}\r\n\r\n.leftsdE{\r\n    margin-left: 5%;\r\n\twidth: 22%;\r\n\tfloat: left;\r\n    padding: 10px 0px 0px 10px;\r\n    left: 0;\r\n    transition: 0.1s;\r\n}\r\n\r\n.leftsdC{\r\n    position: absolute;\r\n\twidth: 22%;\r\n\tfloat: left;\r\n    padding: 10px 0px 0px 10px;\r\n    margin-left: -25%;\r\n    /* left: -400px; */\r\n    transition: 0.1s;\r\n}\r\n\r\n.expandBtn {\r\n    margin-left: -1%;\r\n\tpadding-top: 10px;\r\n    border: 0px solid #000;\r\n    float: left;\r\n    /* left: -400px; */\r\n}\r\n\r\n.cascadeBtn {\r\n    margin-left: 3.5%;\r\n\tpadding-top: 18px;\r\n\tpadding-right: 0px;\r\n    border: 0px solid #000;\r\n    float: left;\r\n    left: -400px;\r\n}\r\n\r\n.rightsdC{\r\n    margin-top: -0.5%;\r\n    border: 0px solid #000;\r\n\twidth: 71%;\r\n    float: right;\r\n    left: 0;\r\n    transition: 0.1s;\r\n}\r\n\r\n.rightsdE {\r\n    border: 0px solid #000;\r\n    width: 93%;\r\n\tfloat: right;\r\n    left: -400px;\r\n    transition: 0.1s;\r\n}\r\n\r\n.alnmt{\r\n    /* border: 1px solid #000; */\r\n    margin-left: 2%;\r\n    margin-bottom: -10px;\r\n\tpadding-right: 5%;\r\n}\r\n\r\n.rtCompall{\r\n\tfloat: right;\r\n    width: 75%;\r\n    padding-right: 0%;\r\n    height: 900px;\r\n}\r\n.right-content {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<!-- <div [ngStyle]=\"{'min-height': clientHeight + 'px', 'margin-bottom': '0px'}\"> \r\n<div [ngClass]=\"{'cascadeBtn':!side,'expandBtn':side}\">\r\n    <button mat-button mat-icon-button (click)=\"side=!side\">\r\n        <mat-icon>list</mat-icon>\r\n    </button>\r\n</div>  [ngClass]=\"{'rightsdE':!side,'rightsdC':side}\"-->\r\n\r\n<app-nav ></app-nav>\r\n<app-leftmenu class=\"leftsdE\"></app-leftmenu>\r\n<div class=\"alnmt\">\r\n    <div class=\"rightsdC\">\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
        this.bTop = '15px';
        this.side = true;
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__routes__ = __webpack_require__("../../../../../src/app/routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nav_nav_component__ = __webpack_require__("../../../../../src/app/nav/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__leftmenu_leftmenu_component__ = __webpack_require__("../../../../../src/app/leftmenu/leftmenu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__rightcontent_rightcontent_component__ = __webpack_require__("../../../../../src/app/rightcontent/rightcontent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__error_error_component__ = __webpack_require__("../../../../../src/app/error/error.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__addtemplate_addtemplate_component__ = __webpack_require__("../../../../../src/app/addtemplate/addtemplate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__articletbl_articletbl_component__ = __webpack_require__("../../../../../src/app/articletbl/articletbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__service_nav_router_activator_service__ = __webpack_require__("../../../../../src/app/service/nav-router-activator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__user_user_component__ = __webpack_require__("../../../../../src/app/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__authentication_usertbl_usertbl_component__ = __webpack_require__("../../../../../src/app/authentication/usertbl/usertbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__roles_roles_component__ = __webpack_require__("../../../../../src/app/roles/roles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__feedback_view_feedback_feedback_component__ = __webpack_require__("../../../../../src/app/feedback/view/feedback/feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__feedback_view_feedbacktbl_feedbacktbl_component__ = __webpack_require__("../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__feedback_type_feedbacktype_feedbacktype_component__ = __webpack_require__("../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__feedback_type_feedbacktypetbl_feedbacktypetbl_component__ = __webpack_require__("../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__authentication_groups_groupsview_component__ = __webpack_require__("../../../../../src/app/authentication/groups/groupsview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__poll_question_pollquestion_pollquestion_component__ = __webpack_require__("../../../../../src/app/poll/question/pollquestion/pollquestion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__poll_question_pollquestiondetails_pollquestiondetails_component__ = __webpack_require__("../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__poll_result_pollresult_pollresult_component__ = __webpack_require__("../../../../../src/app/poll/result/pollresult/pollresult.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__slider_slider_component__ = __webpack_require__("../../../../../src/app/slider/slider.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__authentication_groups_groupsedit_component__ = __webpack_require__("../../../../../src/app/authentication/groups/groupsedit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__referencecode_country_country_component__ = __webpack_require__("../../../../../src/app/referencecode/country/country.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__referencecode_city_city_component__ = __webpack_require__("../../../../../src/app/referencecode/city/city.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__referencecode_state_state_component__ = __webpack_require__("../../../../../src/app/referencecode/state/state.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__referencecode_ethnicity_ethnicity_component__ = __webpack_require__("../../../../../src/app/referencecode/ethnicity/ethnicity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__referencecode_religion_religion_component__ = __webpack_require__("../../../../../src/app/referencecode/religion/religion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__referencecode_postcode_postcode_component__ = __webpack_require__("../../../../../src/app/referencecode/postcode/postcode.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__feedback_subject_feedbacksubject_feedbacksubject_component__ = __webpack_require__("../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__feedback_subject_feedbacksubjecttbl_feedbacksubjecttbl_component__ = __webpack_require__("../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




 // replaces previous Http service




// import { AppConfig } from './config/app.config.modules';






// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__nav_nav_component__["a" /* NavComponent */],
                __WEBPACK_IMPORTED_MODULE_11__leftmenu_leftmenu_component__["a" /* LeftmenuComponent */],
                __WEBPACK_IMPORTED_MODULE_12__rightcontent_rightcontent_component__["a" /* RightcontentComponent */],
                __WEBPACK_IMPORTED_MODULE_14__error_error_component__["a" /* ErrorComponent */],
                __WEBPACK_IMPORTED_MODULE_15__addtemplate_addtemplate_component__["a" /* AddtemplateComponent */],
                __WEBPACK_IMPORTED_MODULE_16__articletbl_articletbl_component__["a" /* ArticletblComponent */],
                __WEBPACK_IMPORTED_MODULE_22__feedback_view_feedback_feedback_component__["a" /* FeedbackComponent */],
                __WEBPACK_IMPORTED_MODULE_19__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_20__authentication_usertbl_usertbl_component__["a" /* UsertblComponent */],
                __WEBPACK_IMPORTED_MODULE_21__roles_roles_component__["a" /* RolesComponent */],
                __WEBPACK_IMPORTED_MODULE_27__poll_question_pollquestion_pollquestion_component__["a" /* PollquestionComponent */],
                __WEBPACK_IMPORTED_MODULE_26__authentication_groups_groupsview_component__["a" /* GroupsviewComponent */],
                __WEBPACK_IMPORTED_MODULE_28__poll_question_pollquestiondetails_pollquestiondetails_component__["a" /* PollquestiondetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_29__poll_result_pollresult_pollresult_component__["a" /* PollresultComponent */],
                __WEBPACK_IMPORTED_MODULE_30__slider_slider_component__["a" /* SliderComponent */],
                __WEBPACK_IMPORTED_MODULE_31__authentication_groups_groupsedit_component__["a" /* GroupseditComponent */],
                __WEBPACK_IMPORTED_MODULE_23__feedback_view_feedbacktbl_feedbacktbl_component__["a" /* FeedbacktblComponent */],
                __WEBPACK_IMPORTED_MODULE_24__feedback_type_feedbacktype_feedbacktype_component__["a" /* FeedbacktypeComponent */],
                __WEBPACK_IMPORTED_MODULE_25__feedback_type_feedbacktypetbl_feedbacktypetbl_component__["a" /* FeedbacktypetblComponent */],
                __WEBPACK_IMPORTED_MODULE_32__referencecode_country_country_component__["a" /* CountryComponent */],
                __WEBPACK_IMPORTED_MODULE_33__referencecode_city_city_component__["a" /* CityComponent */],
                __WEBPACK_IMPORTED_MODULE_34__referencecode_state_state_component__["a" /* StateComponent */],
                __WEBPACK_IMPORTED_MODULE_35__referencecode_ethnicity_ethnicity_component__["a" /* EthnicityComponent */],
                __WEBPACK_IMPORTED_MODULE_36__referencecode_religion_religion_component__["a" /* ReligionComponent */],
                __WEBPACK_IMPORTED_MODULE_37__referencecode_postcode_postcode_component__["a" /* PostcodeComponent */],
                __WEBPACK_IMPORTED_MODULE_38__feedback_subject_feedbacksubject_feedbacksubject_component__["a" /* FeedbacksubjectComponent */],
                __WEBPACK_IMPORTED_MODULE_39__feedback_subject_feedbacksubjecttbl_feedbacksubjecttbl_component__["a" /* FeedbacksubjecttblComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9__config_app_config_module__["c" /* AppConfigModule */],
                __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_forms__["j" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__routes__["a" /* appRoutes */])
                // FroalaEditorModule.forRoot(),
                // FroalaViewModule.forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_17__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_18__service_nav_router_activator_service__["a" /* NavRouterActivatorService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/articletbl/articletbl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/articletbl/articletbl.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  articletbl works!\r\n\r\n</p>\r\n<h1>Here is the page menu id {{commonservice.subid}}</h1>\r\n<!-- Data table -->\r\n<!-- <mat-table #table [dataSource]=\"this.dataSource\"> -->\r\n  <!-- Position Column -->\r\n  <!-- <ng-container matColumnDef=\"articleCategoryName\">\r\n    <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\r\n    <mat-cell *matCellDef=\"let articleCategory\"> {{articleCategory.articleCategoryName}} </mat-cell>\r\n  </ng-container> -->\r\n  <!-- Name Column -->\r\n  <!-- <ng-container matColumnDef=\"articleCategoryDescription\">\r\n    <mat-header-cell *matHeaderCellDef> Description </mat-header-cell>\r\n    <mat-cell *matCellDef=\"let articleCategory\"> {{articleCategory.articleCategoryDescription}} </mat-cell>\r\n  </ng-container> -->\r\n  <!-- Weight Column -->\r\n  <!-- <ng-container matColumnDef=\"articleCategoryActiveFlag\">\r\n    <mat-header-cell *matHeaderCellDef> Article Category Active Flag </mat-header-cell>\r\n    <mat-cell *matCellDef=\"let articleCategory\"> {{articleCategory.articleCategoryActiveFlag}} </mat-cell>\r\n  </ng-container> -->\r\n  <!-- Symbol Column -->\r\n  <!-- <ng-container matColumnDef=\"articleCategoryMygovFlag\">\r\n    <mat-header-cell *matHeaderCellDef> Article Category Mygov Flag </mat-header-cell>\r\n    <mat-cell *matCellDef=\"let articleCategory\"> {{articleCategory.articleCategoryMygovFlag}} </mat-cell>\r\n  </ng-container> -->\r\n  <!-- <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n  <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n</mat-table> -->"

/***/ }),

/***/ "../../../../../src/app/articletbl/articletbl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticletblComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var ArticletblComponent = (function () {
    function ArticletblComponent(route, router, commonservice, location, http, appConfig) {
        this.route = route;
        this.router = router;
        this.commonservice = commonservice;
        this.location = location;
        this.http = http;
        this.appConfig = appConfig;
        this.route.params.subscribe(function (params) { return console.log(params.id); });
        // this.dataSource = this.commonservice.GetList(params.id);
    }
    ArticletblComponent.prototype.ngOnInit = function () {
        this.menus = this.commonservice.ObjMenuid;
        // tslint:disable-next-line:radix
        this.topicID = parseInt(this.router.url.split('/')[2]);
        this.dataSource = this.commonservice.GetList(this.topicID);
        // console.log(this.dataSource);
    };
    ArticletblComponent.prototype.goBack = function () {
        this.location.back();
    };
    ArticletblComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-articletbl',
            template: __webpack_require__("../../../../../src/app/articletbl/articletbl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/articletbl/articletbl.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common__["f" /* Location */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]])
    ], ArticletblComponent);
    return ArticletblComponent;
}());



/***/ }),

/***/ "../../../../../src/app/authentication/groups/groupsedit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dragdrop_container{\r\n    background:#eee;\r\n    height:200px; \r\n    width:20%;\r\n    float:left;\r\n    padding: 0px;\r\n    overflow: auto;\r\n}\r\n\r\n\r\n\r\n.dragdrop_container > li{\r\n    color: #333;\r\n    padding: 2px 5px;\r\n    border-bottom: 1px solid #d0d0d0;\r\n    background: #f5f5f5;\r\n    margin: 2px 5px;\r\n}\r\n\r\n\r\n.dragdrop_container > li:hover{\r\n    cursor: pointer;\r\n}\r\n\r\n.middle_icon{\r\n    float: left;\r\n    height: 200px;\r\n    top: 80px;\r\n    padding: 10px;\r\n    position: relative;\r\n}\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/authentication/groups/groupsedit.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"container-fluid\">\r\n    <h3>Grouping Management</h3>\r\n\r\n    <form [formGroup]=\"groupModule\" autocomplete=\"off\" (ngSubmit)=\"updateGroup(groupModule.value)\" role=\"form\" novalidate>\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-md-12\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                    <input matInput formControlName=\"groupmodulename\" type=\"text\" maxlength=\"30\" placeholder=\"Grouping Name\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </div>\r\n\r\n\r\n  \r\n        <ul  class=\"dragdrop_container\">\r\n            <li *ngFor='let group of moduleList?.items' (click)=\"moveItem(group)\">\r\n                 {{group.subModuleGroupName}}\r\n            </li>\r\n        </ul>\r\n        \r\n        <div class=\"middle_icon\"><img src=\"./assets/images/switch.png\" alt=\"\"></div>\r\n        <ul class=\"dragdrop_container\">\r\n            <li *ngFor='let group of selectedItems?.items' (click)=\"moveItemR(group)\">\r\n                {{group.subModuleGroupName }}\r\n            </li>\r\n        </ul>\r\n\r\n        <div class=\"row\"></div>\r\n        \r\n        <div class=\"form-group\" style=\"float: right;\">\r\n            <button mat-raised-button type=\"button\" color=\"primary\" #updateBtn id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s\"\r\n            (click)=\"submit();false\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\">\r\n            <i class=\"fa fa-check\"></i> Submit</button>\r\n        </div>\r\n       \r\n    </form>\r\n\r\n    \r\n   \r\n</div>\r\n  \r\n"

/***/ }),

/***/ "../../../../../src/app/authentication/groups/groupsedit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupseditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




// multiSelect()
// import * as multiSelect from 'multiSelect';
// compMultiSelect.multiSelect()
var GroupseditComponent = (function () {
    function GroupseditComponent(elementRef, commonservice, http) {
        this.commonservice = commonservice;
        this.http = http;
        this.elementRef = elementRef;
    }
    GroupseditComponent.prototype.ngOnInit = function () {
        this.groupmodulename = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]();
        this.groupModule = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormGroup */]({
            groupmodulename: this.groupmodulename
        });
        this.getModuleData();
    };
    GroupseditComponent.prototype.ngAfterContentChecked = function () {
    };
    GroupseditComponent.prototype.getModuleData = function () {
        var _this = this;
        this.commonservice.getModuleList().subscribe(function (data) {
            _this.moduleList = data.data[0];
            _this.selectedItems = data.data[1];
        });
    };
    GroupseditComponent.prototype.remove = function (array, element) {
        var index = array.indexOf(element);
        array.splice(index, 1);
    };
    GroupseditComponent.prototype.moveItem = function (e) {
        this.selectedItems.items.push(e);
        this.remove(this.moduleList.items, e);
    };
    GroupseditComponent.prototype.moveItemR = function (e) {
        this.moduleList.items.push(e);
        this.remove(this.selectedItems.items, e);
    };
    GroupseditComponent.prototype.submit = function () {
        debugger;
    };
    GroupseditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-groupsedit',
            template: __webpack_require__("../../../../../src/app/authentication/groups/groupsedit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/authentication/groups/groupsedit.component.css")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_2__service_common_service__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], GroupseditComponent);
    return GroupseditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/authentication/groups/groupsview.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n  }\r\n  \r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 800px;\r\n  }\r\n  \r\n  .mat-header-cell.mat-sort-header-sorted {\r\n    color: black;\r\n  }\r\n\r\n  .padding5 {\r\n    padding:5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/authentication/groups/groupsview.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container right-content\">\r\n  <h1 class=\"paddingTop-15 staticLabel\">Groups List</h1>\r\n  <!-- <mat-icon>check</mat-icon><mat-icon>close</mat-icon> -->\r\n  <div class=\"col-md-12\">\r\n      <span class=\"pull-right\" style=\"z-index: 1;\">\r\n          <button type=\"button\" mat-fab color=\"warn\" (click)=\"add()\" >\r\n          <i class=\"fa fa-plus font-size-l\"></i></button>\r\n      </span>\r\n  </div> \r\n\r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <mat-table #table [dataSource]=\"dataSource\" matSort>\r\n      <!-- Number Column -->\r\n      <!-- <ng-container matColumnDef=\"No\">\r\n          <mat-header-cell *matHeaderCellDef > No. </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\" > {{element.groupName}} </mat-cell>\r\n        </ng-container>   -->\r\n      <!-- groupName Column -->\r\n      <ng-container matColumnDef=\"moduleGroupName\">\r\n        <mat-header-cell *matHeaderCellDef mat-sort-header> Group Name </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" > {{element.moduleGroupName}} </mat-cell>\r\n      </ng-container>  \r\n      <!-- User Type Column -->\r\n      <ng-container matColumnDef=\"moduleName\" >\r\n        <mat-header-cell *matHeaderCellDef mat-sort-header [style.flex]=\"'0 0 50%'\"> Modules </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" class=\"padding5\" [style.flex]=\"'0 0 50%'\">          \r\n              <mat-chip-list >\r\n                  <mat-chip color=\"primary\" selected=\"true\" *ngFor=\"let ele of (element.subModuleGroups ? element.subModuleGroups.slice(0,3): [])\">{{ele.moduleName}}</mat-chip>  \r\n              </mat-chip-list>  \r\n            <p style=\"text-align: right;\" *ngIf=\"element.subModuleGroups.length > 3\">{{element.subModuleGroups.length - 3}}</p>   \r\n        </mat-cell>\r\n      </ng-container> \r\n      <!-- isActive Column -->\r\n      <ng-container matColumnDef=\"isActive\" >\r\n          <mat-header-cell mat-sort-header *matHeaderCellDef [style.flex]=\"'0 0 10%'\"> Status </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\" [style.flex]=\"'0 0 10%'\"> {{element.isActive}}\r\n                \r\n          </mat-cell>\r\n        </ng-container>\r\n      <!-- action Column -->\r\n      <ng-container matColumnDef=\"action\" >\r\n        <mat-header-cell mat-sort-header class=\"text-align-Center\" *matHeaderCellDef [style.flex]=\"'0 0 20%'\"> Action </mat-header-cell>\r\n        <mat-cell class=\"text-align-Center padding5\" *matCellDef=\"let element\" [style.flex]=\"'0 0 20%'\">\r\n            <button mat-mini-fab style=\"background: orange\" (click)=\"editGroup(element.moduleGroupId)\" title=\"Update {{ element.moduleGroupId }}\">\r\n            <i class=\"fa fa-edit\" ></i></button>&nbsp;\r\n            <button mat-mini-fab style=\"background: red\" (click)=\"deleteRow(element.moduleGroupId)\">\r\n            <i class=\"fa fa-trash\"  title=\"Delete {{ element.moduleGroupId }}\"></i></button>\r\n        </mat-cell>\r\n    </ng-container> \r\n      <!-- Account Status Column -->\r\n      <!-- <ng-container matColumnDef=\"accountStatusId\">\r\n        <mat-header-cell *matHeaderCellDef> Acc Status </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" > {{element.accountStatusId}} </mat-cell>\r\n      </ng-container>   -->\r\n      <!-- Staff Status Column -->\r\n      <!-- <ng-container matColumnDef=\"isStaff\">\r\n        <mat-header-cell *matHeaderCellDef> Staff </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" > {{element.isStaff}} </mat-cell>\r\n      </ng-container>   -->\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n  \r\n  </div>\r\n\r\n  <div class=\"float-right paddingTop-15\">\r\n      <mat-form-field style=\"width:50px;\">\r\n        <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, groupList?.totalPages)\">\r\n          <mat-option value=\"5\">5</mat-option>\r\n          <mat-option value=\"10\">10</mat-option>\r\n          <mat-option value=\"25\">25</mat-option>\r\n          <mat-option value=\"50\">50</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <span class=\"float-right\">\r\n        <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n          <strong>{{groupList?.pageNumber}}</strong> of\r\n          <strong>{{groupList?.totalPages}}</strong> in\r\n          <strong>{{groupList?.totalElements}}</strong> users</span>\r\n        <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(groupList?.pageNumber)\">\r\n          <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n        </button>\r\n        <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(groupList?.pageNumber, groupList?.totalPages)\">\r\n          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n        </button>\r\n      </span>\r\n    </div>\r\n    \r\n\r\n  </div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/authentication/groups/groupsview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var GroupsviewComponent = (function () {
    // tslint:disable-next-line:max-line-length
    function GroupsviewComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.groupPageCount = 1;
        this.groupPageSize = 10;
        this.groupList = null;
        this.noPrevData = true;
        this.noNextData = false;
        this.displayedColumns = ['moduleGroupName', 'isActive', 'moduleName', 'action'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.groupList);
        this.getGroupList(this.groupPageCount, this.groupPageSize);
    }
    GroupsviewComponent.prototype.ngOnInit = function () {
        this.getGroupList(this.groupPageCount, this.groupPageSize);
    };
    GroupsviewComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
    };
    GroupsviewComponent.prototype.getGroupList = function (count, size) {
        var _this = this;
        // debugger;
        this.http.get(this.appConfig.urlGroupList).subscribe(function (data) {
            _this.groupList = data;
            _this.dataSource.data = _this.groupList;
            // this.commonservice.userTable = this.groupList;
            // this.groupList = this.groupList.pageNumber === this.groupList.totalPages;
            _this.noNextData = _this.groupList.pageNumber === _this.groupList.totalPages;
        });
    };
    GroupsviewComponent.prototype.editGroup = function (gId) {
        console.log(gId);
        this.router.navigate(['groups', gId]);
    };
    GroupsviewComponent.prototype.paginatorL = function (page) {
        this.getGroupList(page - 1, this.groupPageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    GroupsviewComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getGroupList(page + 1, this.groupPageSize);
    };
    GroupsviewComponent.prototype.pageChange = function (event, totalPages) {
        this.getGroupList(this.groupPageCount, event.value);
        this.groupPageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], GroupsviewComponent.prototype, "sort", void 0);
    GroupsviewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-groupsview',
            template: __webpack_require__("../../../../../src/app/authentication/groups/groupsview.component.html"),
            styles: [__webpack_require__("../../../../../src/app/authentication/groups/groupsview.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], GroupsviewComponent);
    return GroupsviewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/authentication/usertbl/usertbl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n\r\n.staticLabel{\r\n    /* font: inherit; */\r\n    text-transform: uppercase;\r\n}\r\n\r\n.closer-top {\r\n    margin-bottom: -1%; margin-top: -8%;\r\n}\r\n\r\n.close-top {\r\n    margin-bottom: -1%; margin-top: -3%;\r\n}\r\n\r\n.font-size-xx-s {\r\n    font-size: xx-small\r\n}\r\n\r\n.font-size-x-s {\r\n    font-size: x-small\r\n}\r\n\r\n.font-size-xs {\r\n    font-size: smaller\r\n}\r\n\r\n.font-size-s {\r\n    font-size: small\r\n}\r\n\r\n.font-size-m {\r\n    font-size: medium\r\n}\r\n\r\n.font-size-l {\r\n    font-size: large\r\n}\r\n\r\n.font-size-xl {\r\n    font-size: x-large\r\n}\r\n\r\n.font-size-xxl {\r\n    font-size: xx-large\r\n}\r\n\r\n.paddingTop-10 {\r\n    padding-top: 10px;\r\n}\r\n\r\n.paddingTop-15 {\r\n    padding-top: 15px;\r\n}\r\n\r\n.backTitle {\r\nmargin-left: -1%;\r\n    cursor: pointer;\r\n}\r\n\r\n.backTitle:hover {\r\nmargin-left: -1%;\r\n    color: #ff4081;\r\n    cursor: pointer;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/authentication/usertbl/usertbl.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container right-content\">\r\n<div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n  <h4 class=\"paddingTop-15 staticLabel\">User List </h4>\r\n</div>\r\n\r\n<!-- <table class=\"mat-table\">\r\n  <tr class=\"mat-header-row\" style=\"height:45px\">\r\n    <td width=\"3%\" class=\"mat-header-cell text-center\"></td>\r\n    <td width=\"5%\" class=\"mat-header-cell\">User Name</td>\r\n    <td width=\"5%\" class=\"mat-header-cell\">Email Address</td>\r\n    <td width=\"5%\" class=\"mat-header-cell\">First Name</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Last Name</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Active</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Staff status</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Superuser status</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Date Joined</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Last login</td>\r\n    <td width=\"5%\" class=\"mat-header-cell text-center\">Send Message</td>\r\n  </tr>\r\n  <tr class=\"mat-row table_row table_row_height\" *ngFor='let user of userList?.userList' [style.font-weight]='bold'>\r\n    <td class=\"mat-cell text-center\"><mat-checkbox></mat-checkbox></td>\r\n    <td class=\"mat-cell\">{{user.fullName}}</td>\r\n    <td class=\"mat-cell\">{{user.email}}</td>\r\n    <td class=\"mat-cell\">{{user.firstName}}</td>\r\n    <td class=\"mat-cell\">{{user.lastName}}</td>\r\n    <td class=\"mat-cell\">{{user.accountStatusId}}</td>\r\n    <td class=\"mat-cell\">{{user.isStaff}}</td>\r\n    <td class=\"mat-cell\">{{user.isMyIdentityVerified}}</td>\r\n    <td class=\"mat-cell\">{{user.dateOfBirth}}</td>\r\n    <td class=\"mat-cell\">--</td>\r\n    <td class=\"mat-cell\"><button mat-raised-button color=\"primary\">Send Message</button></td>   \r\n  </tr>\r\n</table> -->\r\n\r\n<div class=\"example-container mat-elevation-z8\">\r\n  <!-- <div class=\"example-header\">\r\n    <mat-form-field>\r\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n    </mat-form-field>\r\n  </div> -->\r\n\r\n  <mat-table #table [dataSource]=\"dataSource\">\r\n\r\n    <!-- fullName Column -->\r\n    <ng-container matColumnDef=\"userId\">\r\n      <mat-header-cell *matHeaderCellDef> User Id </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.userId}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- fullName Column -->\r\n    <ng-container matColumnDef=\"fullName\">\r\n      <mat-header-cell *matHeaderCellDef> Full Name </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" (click)=\"getRow(element)\"> {{element.fullName}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- User Type Column -->\r\n    <ng-container matColumnDef=\"userTypeId\">\r\n      <mat-header-cell *matHeaderCellDef> User Type </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.userTypeId}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- Account Status Column -->\r\n    <ng-container matColumnDef=\"accountStatusId\">\r\n      <mat-header-cell *matHeaderCellDef> Acc Status </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" > {{element.accountStatusId}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- Staff Status Column -->\r\n    <ng-container matColumnDef=\"isStaff\">\r\n      <mat-header-cell *matHeaderCellDef> Staff </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" > {{element.isStaff}} </mat-cell>\r\n    </ng-container>\r\n\r\n\r\n\r\n    <!-- fullName Column -->\r\n    <!-- <ng-container matColumnDef=\"fullName\">\r\n      <mat-header-cell *matHeaderCellDef> Full Name </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" (click)=\"getRow(element)\"> {{element.fullName}} </mat-cell>\r\n    </ng-container> -->\r\n\r\n    <!-- lastName Column -->\r\n    <!-- <ng-container matColumnDef=\"lastName\">\r\n      <mat-header-cell *matHeaderCellDef> Last Name </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.lastName}} </mat-cell>\r\n    </ng-container> -->\r\n\r\n    <!-- dateOfBirth Column -->\r\n    <!-- <ng-container matColumnDef=\"dateOfBirth\">\r\n      <mat-header-cell *matHeaderCellDef> DOB </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.dateOfBirth}} </mat-cell>\r\n    </ng-container> -->\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n\r\n</div>\r\n\r\n<div class=\"float-right paddingTop-15\">\r\n  <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n    <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.userTable?.totalPages)\">\r\n      <mat-option value=\"5\">5</mat-option>\r\n      <mat-option value=\"10\">10</mat-option>\r\n      <mat-option value=\"25\">25</mat-option>\r\n      <mat-option value=\"50\">50</mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n  <span class=\"float-right\">\r\n    <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n      <strong>{{commonservice.userTable?.pageNumber}}</strong> of\r\n      <strong>{{commonservice.userTable?.totalPages}}</strong> in\r\n      <strong>{{commonservice.userTable?.totalElements}}</strong> users</span>\r\n    <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.userTable?.pageNumber)\">\r\n      <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n    </button>\r\n    <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.userTable?.pageNumber, commonservice.userTable?.totalPages)\">\r\n      <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n    </button>\r\n  </span>\r\n</div>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/authentication/usertbl/usertbl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsertblComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var UsertblComponent = (function () {
    // tslint:disable-next-line:max-line-length
    function UsertblComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.userList = null;
        this.displayedColumns = ['fullName', 'userTypeId', 'accountStatusId', 'isStaff'];
        this.userPageSize = 10;
        this.userPageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.userList);
        this.getUserList(this.userPageCount, this.userPageSize);
    }
    UsertblComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    UsertblComponent.prototype.ngOnInit = function () {
        this.getUserList(this.userPageCount, this.userPageSize);
    };
    UsertblComponent.prototype.getUserList = function (count, size) {
        var _this = this;
        // console.log(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)
        this.http.get(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size).subscribe(function (data) {
            _this.userList = data;
            _this.dataSource.data = _this.userList.userList;
            _this.commonservice.userTable = _this.userList;
            _this.noNextData = _this.userList.pageNumber === _this.userList.totalPages;
        });
    };
    UsertblComponent.prototype.paginatorL = function (page) {
        this.getUserList(page - 1, this.userPageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    UsertblComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getUserList(page + 1, this.userPageSize);
    };
    UsertblComponent.prototype.getRow = function (row) {
        console.log(row);
        this.commonservice.GetUser(row.userId);
    };
    // tslint:disable-next-line:use-life-cycle-interface
    UsertblComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    UsertblComponent.prototype.pageChange = function (event, totalPages) {
        this.getUserList(this.userPageCount, event.value);
        this.userPageSize = event.value;
        this.noPrevData = true;
    };
    UsertblComponent.prototype.onPaginateChange = function (event) {
        // alert(JSON.stringify(event));
        //  const startIndex = event.pageIndex * event.pageSize;
        // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
        // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], UsertblComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], UsertblComponent.prototype, "sort", void 0);
    UsertblComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-usertbl',
            template: __webpack_require__("../../../../../src/app/authentication/usertbl/usertbl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/authentication/usertbl/usertbl.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], UsertblComponent);
    return UsertblComponent;
}());



/***/ }),

/***/ "../../../../../src/app/config/app.config.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppConfig; });
/* unused harmony export APP_DI_CONFIG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AppConfigModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('app.config');
var baseURL = 'http://localhost/locale-api/';
var mockApiURL = 'http://10.1.22.34:3000/';
// const baseURL = 'http://10.1.17.12:3000/';
// // common service
// let portalBaseURL = 'http://localhost:8020/portal/';
// let protectedBaseURL = 'http://localhost:8021/portal-protected/';
var commonURL = 'http://10.1.70.148:8080/service-admin-protected/';
var serviceURL = 'http://10.1.70.148:8080/service/';
// let publicURL = 'http://10.1.70.148:8080/gosg-service-public/';
// let baseLocalURL = './app/apidata/';
// let searchServiceURL = 'https://www.malaysia.gov.my/public/';
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());

var APP_DI_CONFIG = {
    apiEndpoint: '',
    urlMenu: commonURL + 'menu/list?',
    urlCommon: commonURL,
    baseURL: 'http://localhost/locale-api/',
    urlUsers: baseURL + 'users/',
    urlGroup: baseURL + 'groups/',
    urlUserList: commonURL + 'usermanagement',
    urlFbTypeList: commonURL + 'feedback/',
    // urlSlides: baseURL + 'slide',
    urlSlides: commonURL + 'slide',
    urlModuleList: mockApiURL + 'moduleList',
    urlGroupModuleList: mockApiURL + 'groupList',
    // urlGroupList: './app/apidata/groupslist.json',
    urlGroupList: mockApiURL + 'groupListView',
    urlCountryList: serviceURL + 'country',
    urlStateList: serviceURL + 'state',
    urlCityList: serviceURL + 'city',
    urlReligionList: serviceURL + 'religion',
    //urlCityList: serviceURL + 'city/state/',
    urlPoll: commonURL + 'polls',
    urlFeedback: serviceURL,
    urlPostcode: serviceURL + 'postcode/city/'
};
var AppConfigModule = (function () {
    function AppConfigModule() {
    }
    AppConfigModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            providers: [{
                    provide: APP_CONFIG,
                    useValue: APP_DI_CONFIG
                }]
        })
    ], AppConfigModule);
    return AppConfigModule;
}());



/***/ }),

/***/ "../../../../../src/app/error/error.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/error/error.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  This is error page!!!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/error/error.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorComponent = (function () {
    function ErrorComponent() {
    }
    ErrorComponent.prototype.ngOnInit = function () {
    };
    ErrorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-error',
            template: __webpack_require__("../../../../../src/app/error/error.component.html"),
            styles: [__webpack_require__("../../../../../src/app/error/error.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n}\r\n\r\n.bg-form-header {\r\n    padding: 10px;\r\n    background: transparent;\r\n    border-bottom: 1px solid #ccc;\r\n}\r\n\r\n.example-full-width {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"updateForm\" autocomplete=\"off\" role=\"form\" novalidate>\r\n    <div class=\"container right-content\">\r\n        <!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0formpx solid #000\">\r\n            <h4 class=\"paddingTop-15 staticLabel\">\r\n                <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n        </div> -->\r\n  \r\n        <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n            <h2 class=\"staticLabel pull-left\">{{commonservice.pageMode}} Feedback Subject </h2>\r\n            <br><br>\r\n            <span class=\"pull-right\">            \r\n              <a routerLink='/feedback/type'>\r\n                <i class=\"fa fa-chevron-left font-size-m\"></i> BACK\r\n              </a>\r\n            </span>\r\n        </div> \r\n                   \r\n        <div class=\"example-container mat-elevation-z8\">\r\n            <div class=\"bg-form-header col-md-12\">\r\n                <div class=\"row\">\r\n                    <label class=\"col-md-6 staticLabel font-size-s boldText\">English</label>\r\n                    <label class=\"col-md-6 staticLabel font-size-s boldText\">Malay</label>\r\n                </div>\r\n            </div><br>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Subject </div>\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Subject </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Subject\" formControlName=\"subjectEn\" (change)=\"checkReqValues()\"\r\n                        value=\"\" required>\r\n                        <mat-error *ngIf=\"updateForm.controls.subjectEn.hasError('required')\">\r\n                            Subject is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Subject\" formControlName=\"subjectBm\" (change)=\"checkReqValues()\"\r\n                        value=\"\" required>\r\n                        <mat-error *ngIf=\"updateForm.controls.subjectBm.hasError('required')\">\r\n                            Subject is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div> \r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-12\">\r\n                    <mat-checkbox class=\"example-full-width font-size-s\" formControlName=\"active\">Active</mat-checkbox>\r\n                </div>\r\n            </div>\r\n        \r\n        </div>\r\n    \r\n        <div class=\"form-group\" style=\"margin-top: 2%\">\r\n            <button mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s pull-right\"\r\n            (click)=\"update(updateForm.value)\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\" [disabled]=\"!complete\">\r\n            <i *ngIf=\"complete\" class=\"fa fa-check\"></i>\r\n            <i *ngIf=\"!complete\" class=\"fa fa-times\"></i> {{commonservice.pageMode}} </button>\r\n            <button tabindex=\"6\" mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s pull-right\"\r\n            style=\"width: 100px; font-family: Roboto\" (click)=\"myFunction()\">\r\n            <i class=\"fa fa-refresh\"></i>Reset</button>\r\n        </div>      \r\n\r\n    </div>\r\n</form>\r\n  \r\n  \r\n  \r\n  \r\n  \r\n  \r\n  <!-- <app-confirm-dialog  #resetModal \r\n  [title]=\"'common.icon.warn'\" \r\n  [content]=\"'common.msg.reset'\"\r\n  [state]=\"'common.state.warn'\" \r\n  [isReset]=\"'true'\"\r\n  (resetMethod)=\"resetMethod($event)\">\r\n  </app-confirm-dialog>\r\n  \r\n  <app-confirm-dialog  #infoModal \r\n  [title]=\"'common.icon.success'\" \r\n  [content]=\"'register.popupmsg.success_content1'\"\r\n  [email] = \"getEmail\"\r\n  [content2] = \"'register.popupmsg.success_content2'\" \r\n  [state]=\"'common.state.success'\" \r\n  [isRegister]=\"'index'\">\r\n  </app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbacksubjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var FeedbacksubjectComponent = (function () {
    function FeedbacksubjectComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
    }
    FeedbacksubjectComponent.prototype.ngOnInit = function () {
        this.subjectEn = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.subjectBm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.active = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.updateForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            subjectEn: this.subjectEn,
            subjectBm: this.subjectBm,
            active: this.active
        });
    };
    FeedbacksubjectComponent.prototype.update = function (formValues) {
        var body = [
            {
                "subjectId": null,
                "subject": null,
                "subjectReference": null,
                "language": {
                    "languageId": null
                }
            }, {
                "subjectId": null,
                "subject": null,
                "subjectReference": null,
                "language": {
                    "languageId": null
                }
            }
        ];
        console.log(formValues);
        body[0].subjectId = 98;
        body[0].subject = formValues.typeBm;
        body[0].subjectReference = 22;
        body[0].language.languageId = 2;
        body[1].subjectId = 99;
        body[1].subject = formValues.typeEn;
        body[1].subjectReference = 22;
        body[1].language.languageId = 1;
        console.log("TEST");
        console.log(body);
        // this.commonservice.addRecord(body).subscribe(
        //   data => {
        //     console.log(JSON.stringify(body))
        //     console.log(body)
        //     alert('Record added successfully!')
        //     this.router.navigate(['feedback/type/add']);
        //     // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        //   },
        //   error => {
        //     console.log("No Data")
        //     // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
        // });
    };
    FeedbacksubjectComponent.prototype.checkReqValues = function () {
        var reqVal = ["subjectEn", "subjectBm"];
        var nullPointers = [];
        for (var _i = 0, reqVal_1 = reqVal; _i < reqVal_1.length; _i++) {
            var reqData = reqVal_1[_i];
            var elem = this.updateForm.get(reqData);
            if (elem.value == "" || elem.value == null) {
                elem.setValue(null);
                nullPointers.push(null);
            }
        }
        if (nullPointers.length > 0) {
            this.complete = false;
        }
        else {
            this.complete = true;
        }
    };
    FeedbacksubjectComponent.prototype.myFunction = function () {
        var txt;
        var r = confirm("Are you sure to reset the form?");
        if (r == true) {
            txt = "You pressed OK!";
            this.updateForm.reset();
        }
        else {
            txt = "You pressed Cancel!";
        }
    };
    FeedbacksubjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-feedbacksubject',
            template: __webpack_require__("../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_4__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
    ], FeedbacksubjectComponent);
    return FeedbacksubjectComponent;
}());



/***/ }),

/***/ "../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n.example-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  min-width: 300px;\r\n}\r\n  \r\n.mat-table {\r\n  overflow: auto;\r\n  max-height: 800px;\r\n}\r\n\r\n.mat-header-cell.mat-sort-header-sorted {\r\n  color: black;\r\n}\r\n\r\n.padding5 {\r\n    padding:5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0px solid #000\">\r\n    <h4 class=\"paddingTop-15 staticLabel\">\r\n        <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n</div> -->\r\n\r\n<div class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n        <h2 class=\"staticLabel pull-left\">View Feedback Subject</h2>\r\n        <span class=\"pull-right editBtn\" style=\"z-index: 1;\">\r\n            <button type=\"button\" mat-fab color=\"warn\" (click)=\"add()\" \r\n            [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive}\">&nbsp;\r\n            <i class=\"fa fa-plus font-size-l\"></i></button>\r\n        </span>\r\n    </div> \r\n\r\n    <div class=\"example-container mat-elevation-z8\">\r\n        <!-- <div class=\"form-header col-md-12\" style=\"background-color:lightgrey;\">\r\n            <label class=\"staticLabel font-size-m boldText\">View Polls Questions</label>\r\n        </div> -->\r\n        <div class=\"col-md-12 paddingTop-25 example-header\">\r\n            <mat-form-field class=\"font-size-s\">\r\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n            </mat-form-field>\r\n        </div>\r\n\r\n        <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">           \r\n         \r\n            <ng-container matColumnDef=\"num\">\r\n                <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> No. </mat-header-cell>\r\n                <mat-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    {{element.announcementCategoryId}} \r\n                </mat-cell>\r\n            </ng-container>\r\n      \r\n            <!-- question en Column -->\r\n            <ng-container matColumnDef=\"feedbackEng\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Subject (EN) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" *matCellDef=\"let element\" (click)=\"getRow(element)\">\r\n                    {{element.announcementCategoryName}} \r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- question bm Column -->\r\n            <ng-container matColumnDef=\"feedbackMalay\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Subject (BM) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" *matCellDef=\"let element\">\r\n                    {{element.announcementCategoryDescription}}\r\n                </mat-cell>\r\n            </ng-container>\r\n      \r\n            <!-- status Column -->\r\n            <ng-container matColumnDef=\"status\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matHeaderCellDef> Active Status </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-check\" style=\"color: green;\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- action Column -->\r\n            <ng-container matColumnDef=\"action\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> Action </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-edit font-size-xxl\" style=\"color: orange\" (click)=\"updateRow(element.announcementCategoryId)\"></i>\r\n                    &nbsp;\r\n                    <i class=\"fa fa-trash font-size-xxl\" style=\"color: red\" (click)=\"deleteRow(element.announcementCategoryId)\" \r\n                    title=\"Delete {{ element.announcementCategoryId }}\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n        \r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n      \r\n    </div>\r\n  \r\n  <div class=\"float-right paddingTop-15\">\r\n      <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n          <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n          <mat-option value=\"5\">5</mat-option>\r\n          <mat-option value=\"10\">10</mat-option>\r\n          <mat-option value=\"25\">25</mat-option>\r\n          <mat-option value=\"50\">50</mat-option>\r\n          </mat-select>\r\n      </mat-form-field>\r\n      <span class=\"float-right\">\r\n          <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n              <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n              <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n              <strong>{{commonservice.recordTable?.totalElements}}</strong> polls questions\r\n          </span>\r\n          <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n          <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n          </button>\r\n          <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n          </button>\r\n      </span>\r\n  </div>\r\n</div>\r\n \r\n<!-- <app-confirm-dialog  #resetModal \r\n[title]=\"'common.icon.warn'\" \r\n[content]=\"'common.msg.reset'\"\r\n[state]=\"'common.state.warn'\" \r\n[isReset]=\"'true'\"\r\n(resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>\r\n\r\n<app-confirm-dialog  #infoModal \r\n[title]=\"'common.icon.success'\" \r\n[content]=\"'register.popupmsg.success_content1'\"\r\n[email] = \"getEmail\"\r\n[content2] = \"'register.popupmsg.success_content2'\" \r\n[state]=\"'common.state.success'\" \r\n[isRegister]=\"'index'\">\r\n</app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbacksubjecttblComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var FeedbacksubjecttblComponent = (function () {
    function FeedbacksubjecttblComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['num', 'feedbackEng', 'feedbackMalay', 'status', 'action'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    FeedbacksubjecttblComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    FeedbacksubjecttblComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    FeedbacksubjecttblComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        this.http.get(this.dataUrl)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.announcementList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    FeedbacksubjecttblComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    FeedbacksubjecttblComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    FeedbacksubjecttblComponent.prototype.add = function () {
        this.router.navigate(['feedback/subject/add']);
        this.commonservice.pageModeChange(false);
    };
    FeedbacksubjecttblComponent.prototype.updateRow = function (row) {
        console.log(row);
        alert("Update pq id: " + row);
        this.router.navigate(['feedback/subject/', row]);
        this.commonservice.pageModeChange(true);
    };
    FeedbacksubjecttblComponent.prototype.deleteRow = function (enId, bmId) {
        var _this = this;
        console.log(enId + bmId);
        this.commonservice.delRecord(enId, bmId).subscribe(function (data) {
            alert('Record deleted successfully!');
            _this.router.navigate(['feedback/subject']);
        }, function (error) {
            console.log("No Data");
        });
    };
    FeedbacksubjecttblComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    FeedbacksubjecttblComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], FeedbacksubjecttblComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], FeedbacksubjecttblComponent.prototype, "sort", void 0);
    FeedbacksubjecttblComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-feedbacksubjecttbl',
            template: __webpack_require__("../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], FeedbacksubjecttblComponent);
    return FeedbacksubjecttblComponent;
}());



/***/ }),

/***/ "../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n}\r\n\r\n.bg-form-header {\r\n    padding: 10px;\r\n    background: transparent;\r\n    border-bottom: 1px solid #ccc;\r\n}\r\n\r\n.example-full-width {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"updateForm\" autocomplete=\"off\" role=\"form\" novalidate>\r\n    <div class=\"container right-content\">\r\n        <!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0formpx solid #000\">\r\n            <h4 class=\"paddingTop-15 staticLabel\">\r\n                <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n        </div> -->\r\n  \r\n        <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n            <h2 class=\"staticLabel pull-left\">{{commonservice.pageMode}} Feedback Type </h2>\r\n            <br><br>\r\n            <span class=\"pull-right\">            \r\n              <a routerLink='/feedback/type'>\r\n                <i class=\"fa fa-chevron-left font-size-m\"></i> BACK\r\n              </a>\r\n            </span>\r\n        </div> \r\n                   \r\n        <div class=\"example-container mat-elevation-z8\">\r\n            <div class=\"bg-form-header col-md-12\">\r\n                <div class=\"row\">\r\n                    <label class=\"col-md-6 staticLabel font-size-s boldText\">English</label>\r\n                    <label class=\"col-md-6 staticLabel font-size-s boldText\">Malay</label>\r\n                </div>\r\n            </div><br>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Type </div>\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Type </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Type\" formControlName=\"typeEn\" (change)=\"checkReqValues()\"\r\n                        required>\r\n                        <mat-error *ngIf=\"updateForm.controls.typeEn.hasError('required')\">\r\n                            Type is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Type\" formControlName=\"typeBm\" (change)=\"checkReqValues()\"\r\n                        required>\r\n                        <mat-error *ngIf=\"updateForm.controls.typeBm.hasError('required')\">\r\n                            Type is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-12\">\r\n                    <mat-checkbox class=\"example-full-width font-size-s\" formControlName=\"active\">Active</mat-checkbox>\r\n                </div>\r\n            </div>\r\n        \r\n        </div>\r\n    \r\n        <div class=\"form-group\" style=\"margin-top: 2%\">\r\n            <button mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s pull-right\"\r\n            (click)=\"update(updateForm.value)\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\" [disabled]=\"!complete\">\r\n            <i *ngIf=\"complete\" class=\"fa fa-check\"></i>\r\n            <i *ngIf=\"!complete\" class=\"fa fa-times\"></i> {{commonservice.pageMode}} </button>\r\n            <button tabindex=\"6\" mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s pull-right\"\r\n            style=\"width: 100px; font-family: Roboto\" (click)=\"myFunction()\">\r\n            <i class=\"fa fa-refresh\"></i>Reset</button>\r\n        </div>      \r\n\r\n    </div>\r\n</form>\r\n  \r\n  \r\n  \r\n  \r\n  \r\n  \r\n  <!-- <app-confirm-dialog  #resetModal \r\n  [title]=\"'common.icon.warn'\" \r\n  [content]=\"'common.msg.reset'\"\r\n  [state]=\"'common.state.warn'\" \r\n  [isReset]=\"'true'\"\r\n  (resetMethod)=\"resetMethod($event)\">\r\n  </app-confirm-dialog>\r\n  \r\n  <app-confirm-dialog  #infoModal \r\n  [title]=\"'common.icon.success'\" \r\n  [content]=\"'register.popupmsg.success_content1'\"\r\n  [email] = \"getEmail\"\r\n  [content2] = \"'register.popupmsg.success_content2'\" \r\n  [state]=\"'common.state.success'\" \r\n  [isRegister]=\"'index'\">\r\n  </app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbacktypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var FeedbacktypeComponent = (function () {
    function FeedbacktypeComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
    }
    FeedbacktypeComponent.prototype.ngOnInit = function () {
        this.typeEn = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.typeBm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.active = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.updateForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormGroup */]({
            typeEn: this.typeEn,
            typeBm: this.typeBm,
            active: this.active
        });
        this.getData();
    };
    FeedbacktypeComponent.prototype.update = function (formValues) {
        var body = [
            {
                "typeId": null,
                "type": null,
                "typeReference": null,
                "language": {
                    "languageId": null
                }
            }, {
                "typeId": null,
                "type": null,
                "typeReference": null,
                "language": {
                    "languageId": null
                }
            }
        ];
        console.log(formValues);
        body[0].typeId = 98;
        body[0].type = formValues.typeBm;
        body[0].typeReference = 22;
        body[0].language.languageId = 2;
        body[1].typeId = 99;
        body[1].type = formValues.typeEn;
        body[1].typeReference = 22;
        body[1].language.languageId = 1;
        console.log("TEST");
        console.log(body);
        // this.commonservice.addRecord(body).subscribe(
        //   data => {
        //     console.log(JSON.stringify(body))
        //     console.log(body)
        //     alert('Record added successfully!')
        //     this.router.navigate(['feedback/type/add']);
        //     // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        //   },
        //   error => {
        //     console.log("No Data")
        //     // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
        // });
    };
    FeedbacktypeComponent.prototype.getData = function () {
        var _this = this;
        var _getRefID = this.router.url.split('/')[3];
        this.dataUrl = this.appConfig.urlFeedback + 'feedback/type/' + _getRefID;
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        this.http.get(this.dataUrl)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            if (_this.recordList.feedbackType.feedbackTypeDescription) {
                _this.updateForm.get('typeEn').setValue(_this.recordList.feedbackType.feedbackTypeDescription);
                _this.updateForm.get('typeBm').setValue(_this.recordList.feedbackType.feedbackTypeDescription);
            }
            console.log(_this.recordList.feedbackType.feedbackTypeDescription);
        });
    };
    FeedbacktypeComponent.prototype.checkReqValues = function () {
        var reqVal = ["typeEn", "typeBm"];
        var nullPointers = [];
        for (var _i = 0, reqVal_1 = reqVal; _i < reqVal_1.length; _i++) {
            var reqData = reqVal_1[_i];
            var elem = this.updateForm.get(reqData);
            if (elem.value == "" || elem.value == null) {
                elem.setValue(null);
                nullPointers.push(null);
            }
        }
        if (nullPointers.length > 0) {
            this.complete = false;
        }
        else {
            this.complete = true;
        }
    };
    FeedbacktypeComponent.prototype.myFunction = function () {
        var txt;
        var r = confirm("Are you sure to reset the form?");
        if (r == true) {
            txt = "You pressed OK!";
            this.updateForm.reset();
        }
        else {
            txt = "You pressed Cancel!";
        }
    };
    FeedbacktypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-feedbacktype',
            template: __webpack_require__("../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], FeedbacktypeComponent);
    return FeedbacktypeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n.example-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  min-width: 300px;\r\n}\r\n  \r\n.mat-table {\r\n  overflow: auto;\r\n  max-height: 800px;\r\n}\r\n\r\n.mat-header-cell.mat-sort-header-sorted {\r\n  color: black;\r\n}\r\n\r\n.padding5 {\r\n    padding:5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0px solid #000\">\r\n    <h4 class=\"paddingTop-15 staticLabel\">\r\n        <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n</div> -->\r\n\r\n<div class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n        <h2 class=\"staticLabel pull-left\">View Feedback Type</h2>\r\n        <span class=\"pull-right editBtn\" style=\"z-index: 1;\">\r\n            <button type=\"button\" mat-fab color=\"warn\" (click)=\"add()\" \r\n            [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive}\">&nbsp;\r\n            <i class=\"fa fa-plus font-size-l\"></i></button>\r\n        </span>\r\n    </div> \r\n\r\n    <div class=\"example-container mat-elevation-z8\">\r\n        <!-- <div class=\"form-header col-md-12\" style=\"background-color:lightgrey;\">\r\n            <label class=\"staticLabel font-size-m boldText\">View Polls Questions</label>\r\n        </div> -->\r\n        <div class=\"col-md-12 paddingTop-25 example-header\">\r\n            <mat-form-field class=\"font-size-s\">\r\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n            </mat-form-field>\r\n        </div>\r\n\r\n        <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">           \r\n         \r\n            <ng-container matColumnDef=\"num\">\r\n                <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> No. </mat-header-cell>\r\n                <mat-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    {{element.feedbackTypeId}} \r\n                </mat-cell>\r\n            </ng-container>\r\n      \r\n            <!-- question en Column -->\r\n            <ng-container matColumnDef=\"feedbackEng\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Type (EN) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" *matCellDef=\"let element\" (click)=\"getRow(element)\">\r\n                    {{element.feedbackTypeDescription}} \r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- question bm Column -->\r\n            <ng-container matColumnDef=\"feedbackMalay\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Type (BM) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" *matCellDef=\"let element\">\r\n                    {{element.feedbackTypeDescription}}\r\n                </mat-cell>\r\n            </ng-container>\r\n      \r\n            <!-- status Column -->\r\n            <ng-container matColumnDef=\"status\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matHeaderCellDef> Active Status </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-check\" style=\"color: green;\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- action Column -->\r\n            <ng-container matColumnDef=\"action\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> Action </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-edit font-size-xxl\" style=\"color: orange\" (click)=\"updateRow(element.feedbackTypeCode)\"\r\n                    title=\"Update {{ element.feedbackTypeCode }}\"></i>  \r\n                    &nbsp;\r\n                    <i class=\"fa fa-trash font-size-xxl\" style=\"color: red\" (click)=\"deleteRow(element.feedbackTypeId)\" \r\n                    title=\"Delete {{ element.feedbackTypeCode }}\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n        \r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n      \r\n    </div>\r\n  \r\n  <div class=\"float-right paddingTop-15\">\r\n      <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n          <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n          <mat-option value=\"5\">5</mat-option>\r\n          <mat-option value=\"10\">10</mat-option>\r\n          <mat-option value=\"25\">25</mat-option>\r\n          <mat-option value=\"50\">50</mat-option>\r\n          </mat-select>\r\n      </mat-form-field>\r\n      <span class=\"float-right\">\r\n          <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n              <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n              <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n              <strong>{{commonservice.recordTable?.totalElements}}</strong> polls questions\r\n          </span>\r\n          <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n          <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n          </button>\r\n          <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n          </button>\r\n      </span>\r\n  </div>\r\n</div>\r\n \r\n<!-- <app-confirm-dialog  #resetModal \r\n[title]=\"'common.icon.warn'\" \r\n[content]=\"'common.msg.reset'\"\r\n[state]=\"'common.state.warn'\" \r\n[isReset]=\"'true'\"\r\n(resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>\r\n\r\n<app-confirm-dialog  #infoModal \r\n[title]=\"'common.icon.success'\" \r\n[content]=\"'register.popupmsg.success_content1'\"\r\n[email] = \"getEmail\"\r\n[content2] = \"'register.popupmsg.success_content2'\" \r\n[state]=\"'common.state.success'\" \r\n[isRegister]=\"'index'\">\r\n</app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbacktypetblComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var FeedbacktypetblComponent = (function () {
    function FeedbacktypetblComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['num', 'feedbackEng', 'feedbackMalay', 'status', 'action'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    FeedbacktypetblComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    FeedbacktypetblComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    FeedbacktypetblComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        this.dataUrl = this.appConfig.urlFeedback + 'feedback/type';
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        this.http.get(this.dataUrl)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.feedbackTypeList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    FeedbacktypetblComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    FeedbacktypetblComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    FeedbacktypetblComponent.prototype.add = function () {
        this.router.navigate(['feedback/type/add']);
        this.commonservice.pageModeChange(false);
    };
    FeedbacktypetblComponent.prototype.updateRow = function (row) {
        this.router.navigate(['feedback/type/', row]);
        this.commonservice.pageModeChange(true);
    };
    FeedbacktypetblComponent.prototype.deleteRow = function (enId, bmId) {
        var _this = this;
        console.log(enId + bmId);
        this.commonservice.delRecord(enId, bmId).subscribe(function (data) {
            alert('Record deleted successfully!');
            _this.router.navigate(['feedback/type']);
        }, function (error) {
            console.log("No Data");
        });
    };
    FeedbacktypetblComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    FeedbacktypetblComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], FeedbacktypetblComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], FeedbacktypetblComponent.prototype, "sort", void 0);
    FeedbacktypetblComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-feedbacktypetbl',
            template: __webpack_require__("../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], FeedbacktypetblComponent);
    return FeedbacktypetblComponent;
}());



/***/ }),

/***/ "../../../../../src/app/feedback/view/feedback/feedback.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/view/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  feedback works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/feedback/view/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FeedbackComponent = (function () {
    function FeedbackComponent() {
    }
    FeedbackComponent.prototype.ngOnInit = function () {
    };
    FeedbackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-feedback',
            template: __webpack_require__("../../../../../src/app/feedback/view/feedback/feedback.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feedback/view/feedback/feedback.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], FeedbackComponent);
    return FeedbackComponent;
}());



/***/ }),

/***/ "../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <mat-table #table [dataSource]=\"dataSource\">\r\n\r\n    <ng-container matColumnDef=\"fbId\">\r\n      <mat-header-cell *matHeaderCellDef> Feedback Id </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.feedbackTypeId}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <ng-container matColumnDef=\"fbMs\">\r\n      <mat-header-cell *matHeaderCellDef> Feedback Malay </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\" > {{element.feedbackTypeDescription}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <!-- <ng-container matColumnDef=\"fbEng\">\r\n      <mat-header-cell *matHeaderCellDef> Feedback English </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.feedbackTypeDescription}} </mat-cell>\r\n    </ng-container> -->\r\n\r\n    <ng-container matColumnDef=\"fbCode\">\r\n      <mat-header-cell *matHeaderCellDef> Feedback Code </mat-header-cell>\r\n      <mat-cell *matCellDef=\"let element\"> {{element.feedbackTypeCode}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n  </mat-table>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbacktblComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var FeedbacktblComponent = (function () {
    function FeedbacktblComponent(http, appConfig, service, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.service = service;
        this.router = router;
        this.displayedColumns = ['fbId', 'fbMs', 'fbCode'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.fbList);
    }
    FeedbacktblComponent.prototype.ngOnInit = function () {
        this.getFeedbackType();
    };
    FeedbacktblComponent.prototype.getFeedbackType = function () {
        var _this = this;
        this.service.getFeedbackType().subscribe(function (data) {
            if (data.statusCode == "S001") {
                console.log("success calling");
                console.log(data.feedbackTypeList);
                _this.fbList = data.feedbackTypeList;
                _this.dataSource.data = data.feedbackTypeList;
            }
            else {
            }
        });
    };
    FeedbacktblComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-feedbacktbl',
            template: __webpack_require__("../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], FeedbacktblComponent);
    return FeedbacktblComponent;
}());



/***/ }),

/***/ "../../../../../src/app/leftmenu/leftmenu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".submenu_link{\r\n    display: block;\r\n    padding: 10px 5px;\r\n    font-size: 14px;\r\n    color: #000;\r\n}\r\n\r\n.submenu_link:hover, .submenu_link:focus, .submenu_link:visited, .submenu_link_active{\r\n    text-decoration: none;\r\n    background: #cecece;\r\n    color: #000;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/leftmenu/leftmenu.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"example-form\">\r\n\t<mat-form-field class=\"example-form-field\" style=\"width:100%\">\r\n\t\t<input matInput type=\"text\" placeholder=\"Search\" [(ngModel)]=\"value\" [matAutocomplete]=\"auto\"  [ngModelOptions]=\"{standalone: true}\"/>\r\n\t\t<mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\r\n\t\t\t<mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">\r\n\t\t\t\t{{ option.name }}\r\n\t\t\t</mat-option>\r\n\t\t</mat-autocomplete>\r\n\t\t<button mat-button *ngIf=\"value\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"value=''\">\r\n\t\t\t<mat-icon>close</mat-icon>\r\n\t\t</button>\r\n\t\t\r\n\t\t<button mat-button *ngIf=\"!value\" matSuffix mat-icon-button aria-label=\"Search\">\r\n\t\t\t<mat-icon>search</mat-icon>\r\n\t\t</button>\r\n\t</mat-form-field>\r\n\r\n\t<mat-accordion *ngIf='menulst'>\r\n\t\t\r\n\t\t<mat-expansion-panel *ngFor=\"let menu of menulst.menuList\" >\r\n\t\t\t\r\n\t\t\t<mat-expansion-panel-header *ngIf='menu.isActive'>\r\n\t\t\t\t<mat-panel-title style=\"font-weight: bold;\"> \r\n\t\t\t\t\t{{menu.mainMenuTitle}}\r\n\t\t\t\t</mat-panel-title>\t\t\t\t\t\r\n\t\t\t</mat-expansion-panel-header>\r\n\t\t\t<div *ngFor=\"let sub of menu.subMenu\" style=\"padding-bottom: 0px;\">\r\n\t\t\t\t<a class=\"submenu_link\" routerLinkActive=\"submenu_link_active\" [routerLink]=[sub.subMenuUrl] >{{sub.subMenuTitle}}</a>\r\n\t\t\t\t<!-- <button mat-button *ngIf=\"sub.isactive\" id=\"{{sub.subMenuId}}\" (click)=\"getTbl(menu.mainMenuId,sub.subMenuId)\">{{sub.subMenuTitle}}</button> -->\r\n\t\t\t\t<!-- <a id=\"{{sub.subMenuId}}\"  [routerLink]=\"['articletbl', sub.subMenuId]\" (click)=\"getTbl(mnu.mainMenuId,sub.subMenuId)\">{{sub.subMenuTitle}}</a> -->\r\n\t\t\t</div>\r\n\t\t\t\t\r\n\t\t</mat-expansion-panel>\t\r\n\t</mat-accordion>\r\n\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/leftmenu/leftmenu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeftmenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators_startWith__ = __webpack_require__("../../../../rxjs/_esm5/operators/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__ = __webpack_require__("../../../../rxjs/_esm5/operators/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








// import { Router } from '@angular/router/src/router';
var User = (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());

var LeftmenuComponent = (function () {
    //   public objMenu: object;
    // tslint:disable-next-line:max-line-length
    function LeftmenuComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.menuClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.myControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.mylst = 'Menu 1';
        this.options = [
            new User('Mary'),
            new User('Shelley'),
            new User('Igor')
        ];
        this.value = 'Clear me';
    }
    LeftmenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredOptions = this.myControl.valueChanges
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators_startWith__["a" /* startWith */])({}), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__["a" /* map */])(function (user) { return user && typeof user === 'object' ? user.name : user; }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_map__["a" /* map */])(function (name) { return name ? _this.filter(name) : _this.options.slice(); }));
        this.http.get(this.appConfig.urlMenu + 'langId=1').subscribe(function (data) {
            console.log(data);
            _this.menulst = data;
        });
    };
    LeftmenuComponent.prototype.filter = function (name) {
        return this.options.filter(function (option) {
            return option.name.toLowerCase().indexOf(name.toLowerCase()) === 0;
        });
    };
    LeftmenuComponent.prototype.displayFn = function (user) {
        return user ? user.name : user;
    };
    LeftmenuComponent.prototype.getTbl = function (mainid) {
        this.router.navigate([mainid]);
        //  this.router.navigate(['articletbl', subid]);
        //    this.objMenu = obj;
        // if (mainid === 1 && subid === 3) {
        //     this.http.get(this.appConfig.urlCommon + 'article/category/1').subscribe(data => {
        //         this.dataTbl = data;
        //         console.log(this.dataTbl);
        //     });
        // }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
        __metadata("design:type", Object)
    ], LeftmenuComponent.prototype, "menuClick", void 0);
    LeftmenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-leftmenu',
            template: __webpack_require__("../../../../../src/app/leftmenu/leftmenu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/leftmenu/leftmenu.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_6__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */]])
    ], LeftmenuComponent);
    return LeftmenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/nav/nav.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".top-nav {\r\n\tpadding-top: 0px;\r\n\tborder-top: 4px solid #e6436e; }\r\n\r\n.nav.navbar-nav {\r\n\t\tfont-size: 15px;\r\n\t\tpadding: 10px 0px; }\r\n.navbar-default {\r\n\tbackground: #fff;\r\n\theight: 60px; }\r\n\t\r\n.navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > li > a:hover {\r\nbackground: #00bdbb;\r\ncolor: #fff; }\r\n\r\n.navbar-default .navbar-nav > li > a {\r\npadding: 20px;\r\ndisplay: block;\r\ncolor: #000;\r\npadding: 0px 15px;\r\ntext-decoration: none;\r\nheight: 60px;\r\nline-height: 60px; }\r\n.navbar-default .navbar-nav > li > a:hover {\r\n\tbackground: #00bdbb !important;\r\n\tcolor: #fff !important; }\r\n\r\n.navbar-default .navbar-nav > li > a:hover {\r\nbackground: #00bdbb !important;\r\ncolor: #fff; }\r\n\r\n.navbar-default .navbar-nav > li > .active > a:hover {\r\nbackground: #00bdbb !important;\r\ncolor: #fff !important; }\r\n.navbar {\r\n\tposition: relative;\r\n    min-height: 40px;\r\n    /* margin-bottom: 21px; */\r\n    box-shadow: none;\r\n    border: none;\r\n    font-size: 12px;\r\n}\r\n.navbar-brand {\r\nfloat: left;\r\npadding: 6px 0px;\r\nfont-size: 29px;\r\nline-height: 40px;\r\nheight: 60px; }\r\n\r\n.container-fluid {\r\n    margin-right: auto;\r\n    margin-left: auto;\r\n    padding-left: 15px;\r\n    padding-right: 15px;\r\n}\r\n.top-navtop {\r\n    width: 100% !important;\r\n\theight: 70px;\r\n\ttop: 0px;\r\n\tright: 0px;\r\n    background: #1ebebc;\r\n    position: fixed !important;\r\n    z-index: 10000;\r\n    -webkit-transition-property: height;\r\n    -webkit-transition-duration: 1s;\r\n    transition-property: height;\r\n\ttransition-duration: 1s;\r\n\tz-index: 10000;\r\n\t/* background: rgb(0, 189, 187); */\r\n}\r\n.containerinside {\r\n    margin-right: auto;\r\n    margin-left: auto;\r\n    padding-left: 15px;\r\n\tpadding-right: 15px;\r\n\tpadding-top: 35px;\r\n\tfont-size: 15px;\r\n    line-height: 1.42857143;\r\n    color: #8a0a0a;\r\n\t/* top:35px; */\r\n}\r\n\r\n.userContainer{\r\n    color: #1ebebc; float: right; top: 20px; position: relative;\r\n}\r\n\r\n\r\n.logoContainer{\r\n    color: #1ebebc;\r\n}\r\n\r\n.mdcontainer{\r\n\twidth: 90%;\r\n    height: auto;\r\n    position: relative;\r\n    background-color: rgb(255, 255, 255);\r\n    margin-bottom: 1%;\r\n    margin-left: 5%;\r\n    margin-right: 5%;\r\n    margin-top: -68px;\r\n    border-width: 4px 0px 0px;\r\n    border-radius: 0px;\r\n    border-top: 4px solid rgb(230, 67, 110);\r\n    padding: 3px 0px;\r\n}\r\n@media (min-width: 1200px){\r\n\t.containerinside {\r\n\t\twidth: 1170px;\r\n\t}\r\n}\r\n\r\n@media (min-width: 992px){\r\n\t.containerinside {\r\n\t\twidth: 970px;\r\n\t}\r\n}\r\n/* @media (min-width: 768px){\r\n\t.containerinside {\r\n\t\twidth: 750px;\r\n\t}\r\n} */\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/nav/nav.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"container\">\r\n  <div class=\"top-navtop\">\r\n    <div class=\"containerinside\">\r\n        <div class=\"top-nav\">\r\n            <div class=\"navbar navbar-default\">\r\n              <div class=\"container-fluid navpart\">\r\n                <div class=\"navbar-header\">\r\n                  <a href=\"\" class=\"navbar-brand\">\r\n                    <img src=\"../assets/images/logo_ms.jpg\" alt=\"\">\r\n                  </a>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>        \r\n      </div>      \r\n  </div>\r\n</div> -->\r\n<div>\r\n  <!-- <div class=\"navbar-header\">\r\n    <a href=\"\" class=\"navbar-brand\">\r\n      <img src=\"../assets/images/logo_ms.jpg\" alt=\"\">\r\n    </a>\r\n  </div> -->\r\n  <div style=\"width: 100%; height: 50px; background-color: #1ebebc;\"></div>\r\n  <div style=\"width: 100%; height: 40px; background-color: #a9a3a3; margin-top:1px;\"></div>\r\n  <div class=\"mdcontainer\">\r\n    <div style=\"font-size: larger; font-weight: bold; padding: 3px;\">\r\n      <span class=\"logoContainer\"><img src=\"../assets/images/logo_ms.jpg\" alt=\"\"></span>\r\n      <span class=\"userContainer\">Goms | \r\n          <button mat-button>View Site</button> \r\n      </span>\r\n    </div>    \r\n  </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/nav/nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavComponent = (function () {
    function NavComponent() {
    }
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-nav',
            template: __webpack_require__("../../../../../src/app/nav/nav.component.html"),
            styles: [__webpack_require__("../../../../../src/app/nav/nav.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "../../../../../src/app/poll/question/pollquestion/pollquestion.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n.example-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  min-width: 300px;\r\n}\r\n  \r\n.mat-table {\r\n  overflow: auto;\r\n  max-height: 800px;\r\n}\r\n\r\n.mat-header-cell.mat-sort-header-sorted {\r\n  color: black;\r\n}\r\n\r\n.padding5 {\r\n    padding:5px;\r\n}\r\n  ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/poll/question/pollquestion/pollquestion.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0px solid #000\">\r\n    <h4 class=\"paddingTop-15 staticLabel\">\r\n        <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n</div> -->\r\n\r\n<div class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n        <h2 class=\"staticLabel pull-left\">View Polls Questions</h2>\r\n        <span class=\"pull-right editBtn\" style=\"z-index: 1;\">\r\n            <button type=\"button\" mat-fab color=\"warn\" (click)=\"add()\"\r\n            [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive}\">&nbsp;\r\n            <i class=\"fa fa-plus font-size-l\"></i></button>\r\n        </span>\r\n    </div>\r\n\r\n    <div class=\"example-container mat-elevation-z8\">\r\n        <!-- <div class=\"form-header col-md-12\" style=\"background-color:lightgrey;\">\r\n            <label class=\"staticLabel font-size-m boldText\">View Polls Questions</label>\r\n        </div> -->\r\n        <div class=\"col-md-12 paddingTop-25 example-header\">\r\n            <mat-form-field class=\"font-size-s\" >\r\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n            </mat-form-field>\r\n        </div>\r\n\r\n        <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">\r\n\r\n            <!-- Checkbox Column -->\r\n            <!-- <ng-container matColumnDef=\"select\">\r\n            <mat-header-cell *matHeaderCellDef>\r\n                <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                            [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n                </mat-checkbox>\r\n            </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let row\">\r\n                <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                            (change)=\"$event ? selection.toggle(row) : null\"\r\n                            [checked]=\"selection.isSelected(row)\">\r\n                </mat-checkbox>\r\n            </mat-cell>\r\n            </ng-container> -->\r\n\r\n            <!-- num Column -->\r\n            <ng-container matColumnDef=\"num\">\r\n                <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> No. </mat-header-cell>\r\n                <mat-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    {{element.announcementCategoryId}}\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- question en Column -->\r\n            <ng-container matColumnDef=\"pq_en\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Poll Question (EN) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left padding5\" *matCellDef=\"let element\">\r\n                    {{element.announcementCategoryDescription}} \r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- question bm Column -->\r\n            <ng-container matColumnDef=\"pq_bm\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Poll Question (BM) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left padding5\" *matCellDef=\"let element\">\r\n                    {{element.announcementCategoryDescription}}\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- status Column -->\r\n            <ng-container matColumnDef=\"status\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matHeaderCellDef> Active Status </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-check\" style=\"color: green;\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- action Column -->\r\n            <ng-container matColumnDef=\"action\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> Action </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-edit font-size-xxl\" style=\"color: orange\" (click)=\"updateRow(element.announcementCategoryId)\"></i>\r\n                    &nbsp;\r\n                    <i class=\"fa fa-trash font-size-xxl\" style=\"color: red\" (click)=\"deleteRow(element.announcementCategoryId)\"\r\n                    title=\"Delete {{ element.announcementCategoryId }}\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n\r\n    </div>\r\n\r\n    <div class=\"float-right paddingTop-15\">\r\n        <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n            <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n            <mat-option value=\"5\">5</mat-option>\r\n            <mat-option value=\"10\">10</mat-option>\r\n            <mat-option value=\"25\">25</mat-option>\r\n            <mat-option value=\"50\">50</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <span class=\"float-right\">\r\n            <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n                <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n                <strong>{{commonservice.recordTable?.totalElements}}</strong> polls questions\r\n            </span>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            </button>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n    </div>\r\n</div>\r\n\r\n<!-- <app-confirm-dialog  #resetModal\r\n[title]=\"'common.icon.warn'\"\r\n[content]=\"'common.msg.reset'\"\r\n[state]=\"'common.state.warn'\"\r\n[isReset]=\"'true'\"\r\n(resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>\r\n\r\n<app-confirm-dialog  #infoModal\r\n[title]=\"'common.icon.success'\"\r\n[content]=\"'register.popupmsg.success_content1'\"\r\n[email] = \"getEmail\"\r\n[content2] = \"'register.popupmsg.success_content2'\"\r\n[state]=\"'common.state.success'\"\r\n[isRegister]=\"'index'\">\r\n</app-confirm-dialog> -->\r\n"

/***/ }),

/***/ "../../../../../src/app/poll/question/pollquestion/pollquestion.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollquestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var PollquestionComponent = (function () {
    function PollquestionComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['num', 'pq_en', 'pq_bm', 'status', 'action'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.selection = new __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__["a" /* SelectionModel */](true, []);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    PollquestionComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggle() {
    //   this.isAllSelected() ?
    //       this.selection.clear() :
    //       this.dataSource.data.forEach(row => this.selection.select(row));
    // }
    PollquestionComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    PollquestionComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    PollquestionComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        this.http.get(this.dataUrl)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.announcementList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    PollquestionComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    PollquestionComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    PollquestionComponent.prototype.add = function () {
        this.router.navigate(['poll/questions/add']);
        this.commonservice.pageModeChange(false);
    };
    PollquestionComponent.prototype.updateRow = function (row) {
        console.log(row);
        this.router.navigate(['poll/questions', row]);
        this.commonservice.pageModeChange(true);
    };
    PollquestionComponent.prototype.deleteRow = function (enId, bmId) {
        var _this = this;
        console.log(enId + bmId);
        this.commonservice.delRecord(enId, bmId).subscribe(function (data) {
            alert('Record deleted successfully!');
            _this.router.navigate(['feedback/subject']);
        }, function (error) {
            console.log("No Data");
        });
    };
    PollquestionComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    PollquestionComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], PollquestionComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], PollquestionComponent.prototype, "sort", void 0);
    PollquestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-pollquestion',
            template: __webpack_require__("../../../../../src/app/poll/question/pollquestion/pollquestion.component.html"),
            styles: [__webpack_require__("../../../../../src/app/poll/question/pollquestion/pollquestion.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], PollquestionComponent);
    return PollquestionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n}\r\n\r\n.bg-form-header {\r\n    padding: 10px;\r\n    background: transparent;\r\n    border-bottom: 1px solid #ccc;\r\n}\r\n\r\n.example-full-width {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"updateForm\" autocomplete=\"off\" role=\"form\" novalidate>\r\n    <div class=\"container right-content\">\r\n        <!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0formpx solid #000\">\r\n            <h4 class=\"paddingTop-15 staticLabel\">\r\n                <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n        </div> -->\r\n        <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n            <h2 class=\"staticLabel pull-left\">{{commonservice.pageMode}} Polls Questions</h2>\r\n            <br><br>\r\n            <span class=\"pull-right\">            \r\n              <a routerLink='/poll/questions'>\r\n                <i class=\"fa fa-chevron-left font-size-m\"></i> BACK\r\n              </a>\r\n            </span>\r\n        </div> \r\n                   \r\n        <div class=\"example-container mat-elevation-z8\">\r\n            <div class=\"bg-form-header col-md-12\">\r\n                <div class=\"row\">\r\n                    <label class=\"col-md-6 staticLabel font-size-s boldText\">English</label>\r\n                    <label class=\"col-md-6 staticLabel font-size-s boldText\">Malay</label>\r\n                </div>\r\n            </div><br>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Poll Question</div>\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Poll Question</div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <textarea matInput placeholder=\"Poll Question\" formControlName=\"pollEng\" #pollEng maxlength=\"200\" \r\n                        (change)=\"checkReqValues()\" required></textarea>\r\n                        <mat-error *ngIf=\"updateForm.controls.pollEng.hasError('required')\">\r\n                            Poll Question is required\r\n                        </mat-error>\r\n                        <mat-hint align=\"end\">{{pollEng.value?.length || 0}}/200</mat-hint>\r\n                    </mat-form-field>\r\n                </div>\r\n\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <textarea matInput placeholder=\"Poll Question\" formControlName=\"pollMalay\" #pollMalay maxlength=\"200\" \r\n                        (change)=\"checkReqValues()\" required></textarea>\r\n                        <mat-error *ngIf=\"updateForm.controls.pollMalay.hasError('required')\">\r\n                            Poll Question is required\r\n                        </mat-error>\r\n                        <mat-hint align=\"end\">{{pollMalay.value?.length || 0}}/200</mat-hint>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Options</div>\r\n                <div class=\"col-md-6 text-align-Center font-size-m\"> Options</div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 1\" formControlName=\"opt1En\" (change)=\"checkReqValues()\"\r\n                        value=\"\" required>\r\n                        <mat-error *ngIf=\"updateForm.controls.opt1En.hasError('required')\">\r\n                            Option 1 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 1\" formControlName=\"opt1Bm\" (change)=\"checkReqValues()\"\r\n                        value=\"\" required>\r\n                        <mat-error *ngIf=\"updateForm.controls.opt1Bm.hasError('required')\">\r\n                            Option 1 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 2\" formControlName=\"opt2En\" (change)=\"checkReqValues()\"\r\n                        value=\"\" required>\r\n                        <mat-error *ngIf=\"updateForm.controls.opt2En.hasError('required')\">\r\n                            Option 2 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 2\" formControlName=\"opt2Bm\" (change)=\"checkReqValues()\" \r\n                        value=\"\" required>\r\n                        <mat-error *ngIf=\"updateForm.controls.opt2Bm.hasError('required')\">\r\n                            Option 2 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                <mat-form-field class=\"example-full-width font-size-s\" >\r\n                    <input matInput placeholder=\"Option 3\" formControlName=\"opt3En\">\r\n                    <mat-error *ngIf=\"updateForm.controls.opt3En.hasError('required')\">\r\n                        Option 3 is required\r\n                    </mat-error>\r\n                </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 3\" formControlName=\"opt3Bm\">\r\n                        <mat-error *ngIf=\"updateForm.controls.opt3Bm.hasError('required')\">\r\n                            Option 3 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 4\" formControlName=\"opt4En\">\r\n                        <mat-error *ngIf=\"updateForm.controls.opt4En.hasError('required')\">\r\n                            Option 4 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 4\" formControlName=\"opt4Bm\">\r\n                        <mat-error *ngIf=\"updateForm.controls.opt4Bm.hasError('required')\">\r\n                            Option 4 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 5\" formControlName=\"opt5En\">\r\n                        <mat-error *ngIf=\"updateForm.controls.opt5En.hasError('required')\">\r\n                            Option 5 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                    <mat-form-field class=\"example-full-width font-size-s\" >\r\n                        <input matInput placeholder=\"Option 5\" formControlName=\"opt5Bm\">\r\n                        <mat-error *ngIf=\"updateForm.controls.opt5Bm.hasError('required')\">\r\n                            Option 5 is required\r\n                        </mat-error>\r\n                    </mat-form-field>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"example-header\">\r\n                <div class=\"col-md-12\">\r\n                    <mat-checkbox class=\"example-full-width font-size-s\" formControlName=\"active\">Active</mat-checkbox>\r\n                </div>\r\n            </div>\r\n        \r\n        </div>\r\n    \r\n        <div class=\"form-group\" style=\"margin-top: 2%\">\r\n            <button mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s pull-right\"\r\n            (click)=\"update(updateForm.value)\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\" [disabled]=\"!complete\">\r\n            <i *ngIf=\"complete\" class=\"fa fa-check\"></i>\r\n            <i *ngIf=\"!complete\" class=\"fa fa-times\"></i> {{commonservice.pageMode}} </button>\r\n            <button tabindex=\"6\" mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s pull-right\"\r\n            style=\"width: 100px; font-family: Roboto\" (click)=\"myFunction()\">\r\n            <i class=\"fa fa-refresh\"></i>Reset</button>\r\n        </div>      \r\n\r\n    </div>\r\n</form>\r\n  \r\n  \r\n  \r\n  \r\n  \r\n  \r\n  <!-- <app-confirm-dialog  #resetModal \r\n  [title]=\"'common.icon.warn'\" \r\n  [content]=\"'common.msg.reset'\"\r\n  [state]=\"'common.state.warn'\" \r\n  [isReset]=\"'true'\"\r\n  (resetMethod)=\"resetMethod($event)\">\r\n  </app-confirm-dialog>\r\n  \r\n  <app-confirm-dialog  #infoModal \r\n  [title]=\"'common.icon.success'\" \r\n  [content]=\"'register.popupmsg.success_content1'\"\r\n  [email] = \"getEmail\"\r\n  [content2] = \"'register.popupmsg.success_content2'\" \r\n  [state]=\"'common.state.success'\" \r\n  [isRegister]=\"'index'\">\r\n  </app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollquestiondetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
// import { Component, OnInit, ViewEncapsulation, ViewChild, Inject  } from '@angular/core';
// import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
// import { CommonService } from '../../service/common.service';
// import { Router, RouterModule } from '@angular/router';
// import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var PollquestiondetailsComponent = (function () {
    function PollquestiondetailsComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
    }
    PollquestiondetailsComponent.prototype.ngOnInit = function () {
        this.pollEng = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.pollMalay = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt1En = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt2En = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt3En = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt4En = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt5En = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt1Bm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt2Bm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt3Bm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt4Bm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.opt5Bm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.active = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]();
        this.updateForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormGroup */]({
            pollEng: this.pollEng,
            pollMalay: this.pollMalay,
            opt1En: this.opt1En,
            opt2En: this.opt2En,
            opt3En: this.opt3En,
            opt4En: this.opt4En,
            opt5En: this.opt5En,
            opt1Bm: this.opt1Bm,
            opt2Bm: this.opt2Bm,
            opt3Bm: this.opt3Bm,
            opt4Bm: this.opt4Bm,
            opt5Bm: this.opt5Bm,
            active: this.active
        });
    };
    PollquestiondetailsComponent.prototype.update = function (formValues) {
        var _this = this;
        var body = [
            {
                "pollsId": null,
                "pollsQuestion": null,
                "pollsAnswer1": null,
                "pollsAnswer2": null,
                "pollsAnswer3": null,
                "pollsAnswer4": null,
                "pollsAnswer5": null,
                "pollsActiveFlag": false,
                "pollsResult1": null,
                "pollsResult2": null,
                "pollsResult3": null,
                "pollsResult4": null,
                "pollsResult5": null,
                "pollsReference": null,
                "language": {
                    "languageId": null
                }
            }, {
                "pollsId": null,
                "pollsQuestion": null,
                "pollsAnswer1": null,
                "pollsAnswer2": null,
                "pollsAnswer3": null,
                "pollsAnswer4": null,
                "pollsAnswer5": null,
                "pollsActiveFlag": false,
                "pollsResult1": null,
                "pollsResult2": null,
                "pollsResult3": null,
                "pollsResult4": null,
                "pollsResult5": null,
                "pollsReference": null,
                "language": {
                    "languageId": null
                }
            }
        ];
        console.log(formValues);
        body[0].pollsId = 98;
        body[0].pollsQuestion = formValues.pollMalay;
        body[0].pollsAnswer1 = formValues.opt1Bm;
        body[0].pollsAnswer2 = formValues.opt2Bm;
        body[0].pollsAnswer3 = formValues.opt3Bm;
        body[0].pollsAnswer4 = formValues.opt4Bm;
        body[0].pollsAnswer5 = formValues.opt5Bm;
        body[0].pollsActiveFlag = formValues.active;
        ;
        body[0].pollsResult1 = null;
        body[0].pollsResult2 = null;
        body[0].pollsResult3 = null;
        body[0].pollsResult4 = null;
        body[0].pollsResult5 = null;
        body[0].pollsReference = 22;
        body[0].language.languageId = 2;
        body[1].pollsId = 99;
        body[1].pollsQuestion = formValues.pollEng;
        body[1].pollsAnswer1 = formValues.opt1En;
        body[1].pollsAnswer2 = formValues.opt2En;
        body[1].pollsAnswer3 = formValues.opt3En;
        body[1].pollsAnswer4 = formValues.opt4En;
        body[1].pollsAnswer5 = formValues.opt5En;
        body[1].pollsActiveFlag = formValues.active;
        body[1].pollsResult1 = null;
        body[1].pollsResult2 = null;
        body[1].pollsResult3 = null;
        body[1].pollsResult4 = null;
        body[1].pollsResult5 = null;
        body[1].pollsReference = 22;
        body[1].language.languageId = 1;
        console.log("TEST");
        console.log(body);
        this.commonservice.addRecord(body).subscribe(function (data) {
            console.log(JSON.stringify(body));
            console.log(body);
            alert('Record added successfully!');
            _this.router.navigate(['poll/questions/add']);
            // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        }, function (error) {
            console.log("No Data");
            // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
        });
    };
    PollquestiondetailsComponent.prototype.checkReqValues = function () {
        var reqVal = ["pollEng", "pollMalay", "opt1En", "opt1Bm", "opt2En", "opt2Bm"];
        var nullPointers = [];
        for (var _i = 0, reqVal_1 = reqVal; _i < reqVal_1.length; _i++) {
            var reqData = reqVal_1[_i];
            var elem = this.updateForm.get(reqData);
            if (elem.value == "" || elem.value == null) {
                elem.setValue(null);
                nullPointers.push(null);
            }
        }
        if (nullPointers.length > 0) {
            this.complete = false;
        }
        else {
            this.complete = true;
        }
    };
    PollquestiondetailsComponent.prototype.myFunction = function () {
        var txt;
        var r = confirm("Are you sure to reset the form?");
        if (r == true) {
            txt = "You pressed OK!";
            this.updateForm.reset();
        }
        else {
            txt = "You pressed Cancel!";
        }
    };
    PollquestiondetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-pollquestiondetails',
            template: __webpack_require__("../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.html"),
            styles: [__webpack_require__("../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], PollquestiondetailsComponent);
    return PollquestiondetailsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/poll/result/pollresult/pollresult.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n  }\r\n  \r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 800px;\r\n  }\r\n  \r\n  .mat-header-cell.mat-sort-header-sorted {\r\n    color: black;\r\n  }\r\n\r\n  .padding5 {\r\n    padding:5px;\r\n   }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/poll/result/pollresult/pollresult.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0px solid #000\">\r\n    <h4 class=\"paddingTop-15 staticLabel\">\r\n        <i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i>Polls Questions</h4>\r\n</div> -->\r\n\r\n<div class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n        <h2 class=\"staticLabel\">View Polls Results</h2>\r\n    </div> \r\n  \r\n    <div class=\"example-container mat-elevation-z8\">\r\n        <!-- <div class=\"form-header col-md-12\" style=\"background-color:lightgrey;\">\r\n            <label class=\"staticLabel font-size-s boldText\">View Polls Results</label>\r\n        </div> -->\r\n      \r\n        <div class=\"col-md-12 paddingTop-25 example-header\">\r\n            <mat-form-field class=\"font-size-s\" >\r\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n            </mat-form-field>\r\n        </div>\r\n\r\n        <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">     \r\n\r\n            <!-- num Column -->\r\n            <ng-container matColumnDef=\"num\">\r\n                <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 4%;\" *matHeaderCellDef> No. </mat-header-cell>\r\n                <mat-cell class=\"text-align-left\" style=\"flex: 0 0 4%;\" *matCellDef=\"let element\">\r\n                    {{element.userId}} \r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- Question 1 Column -->\r\n            <ng-container matColumnDef=\"question\">\r\n                <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 21%;\" *matHeaderCellDef> Question </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left padding5\" style=\"flex: 0 0 21%;\" *matCellDef=\"let element\">\r\n                    {{element.fullName}} \r\n                </mat-cell>\r\n            </ng-container>\r\n        \r\n            <!-- Option 1 Column -->\r\n            <ng-container matColumnDef=\"opt1\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 15%;\" *matHeaderCellDef> Option 1 </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 15%;\" *matCellDef=\"let element\">\r\n                    <div class=\"col-md-12\">\r\n                        {{element.isMyIdentityValid}} \r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                        {{element.userId}}/{{element.userId}}\r\n                    </div>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- Option 2 Column -->\r\n            <ng-container matColumnDef=\"opt2\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 15%;\" *matHeaderCellDef> Option 2 </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 15%;\" *matCellDef=\"let element\">\r\n                    <div class=\"col-md-12\">\r\n                        {{element.isMyIdentityValid}} \r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                        {{element.userId}}/{{element.userId}}\r\n                    </div>\r\n                </mat-cell>\r\n            </ng-container>\r\n        \r\n            <!-- Option 3 Column -->\r\n            <ng-container matColumnDef=\"opt3\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 15%;\" *matHeaderCellDef> Option 3 </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 15%;\" *matCellDef=\"let element\">\r\n                    <div class=\"col-md-12\">\r\n                        {{element.isMyIdentityValid}} \r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                        {{element.userId}}/{{element.userId}}\r\n                    </div>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- Option 4 Column -->\r\n            <ng-container matColumnDef=\"opt4\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 15%;\" *matHeaderCellDef> Option 4 </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 15%;\" *matCellDef=\"let element\">\r\n                    <div class=\"col-md-12\">\r\n                        {{element.isMyIdentityValid}} \r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                        {{element.userId}}/{{element.userId}}\r\n                    </div>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- Option 5 Column -->\r\n            <ng-container matColumnDef=\"opt5\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 15%;\" *matHeaderCellDef> Option 5 </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 15%;\" *matCellDef=\"let element\">\r\n                    <div class=\"col-md-12\">\r\n                        {{element.isMyIdentityValid}} \r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                        {{element.userId}}/{{element.userId}}\r\n                    </div>\r\n                </mat-cell>\r\n            </ng-container>\r\n        \r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n        \r\n    </div>\r\n    \r\n    <div class=\"float-right paddingTop-15\">\r\n        <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n            <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n            <mat-option value=\"5\">5</mat-option>\r\n            <mat-option value=\"10\">10</mat-option>\r\n            <mat-option value=\"25\">25</mat-option>\r\n            <mat-option value=\"50\">50</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <span class=\"float-right\">\r\n            <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n                <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n                <strong>{{commonservice.recordTable?.totalElements}}</strong> polls questions\r\n            </span>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            </button>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n    </div>\r\n</div>\r\n   \r\n<!-- <app-confirm-dialog  #resetModal \r\n[title]=\"'common.icon.warn'\" \r\n[content]=\"'common.msg.reset'\"\r\n[state]=\"'common.state.warn'\" \r\n[isReset]=\"'true'\"\r\n(resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>\r\n\r\n<app-confirm-dialog  #infoModal \r\n[title]=\"'common.icon.success'\" \r\n[content]=\"'register.popupmsg.success_content1'\"\r\n[email] = \"getEmail\"\r\n[content2] = \"'register.popupmsg.success_content2'\" \r\n[state]=\"'common.state.success'\" \r\n[isRegister]=\"'index'\">\r\n</app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/poll/result/pollresult/pollresult.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollresultComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var PollresultComponent = (function () {
    function PollresultComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['num', 'question', 'opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.selection = new __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__["a" /* SelectionModel */](true, []);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    PollresultComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    PollresultComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    PollresultComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        //this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
        this.dataUrl = this.appConfig.urlUserList;
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        //this.http.get(this.dataUrl) 
        this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.userList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    PollresultComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    PollresultComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    PollresultComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    PollresultComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], PollresultComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], PollresultComponent.prototype, "sort", void 0);
    PollresultComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-pollresult',
            template: __webpack_require__("../../../../../src/app/poll/result/pollresult/pollresult.component.html"),
            styles: [__webpack_require__("../../../../../src/app/poll/result/pollresult/pollresult.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], PollresultComponent);
    return PollresultComponent;
}());



/***/ }),

/***/ "../../../../../src/app/referencecode/city/city.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/referencecode/city/city.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<p>-->\r\n<!--country works!-->\r\n<!--</p>-->\r\n\r\n\r\n<div class=\"container right-content\">\r\n  <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n    <h2 class=\"staticLabel\">View City</h2>\r\n  </div>\r\n\r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <div class=\"example-header\">\r\n      <mat-form-field class=\"font-size-s\" >\r\n        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">\r\n\r\n      <!-- City Name Column -->\r\n      <ng-container matColumnDef=\"cityName\">\r\n        <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 35%;\" *matHeaderCellDef> City Name </mat-header-cell>\r\n        <mat-cell class=\"text-align-left\" style=\"flex: 0 0 35%;\" *matCellDef=\"let element\">\r\n          {{element.cityName}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- City Id 1 Column -->\r\n      <ng-container matColumnDef=\"cityId\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> City Id </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n          {{element.cityId}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- City Code 1 Column -->\r\n      <ng-container matColumnDef=\"cityCode\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> City Code </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n          {{element.cityCode}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- State Name 1 Column -->\r\n      <ng-container matColumnDef=\"stateName\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 35%;\" *matHeaderCellDef> State Name </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 35%;\" *matCellDef=\"let element\">\r\n          {{element.state.stateName}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- State Id 1 Column -->\r\n      <ng-container matColumnDef=\"stateId\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> State Id </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n          {{element.state.stateId}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n  </div>\r\n\r\n  <div class=\"float-right paddingTop-15\">\r\n    <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n      <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n        <mat-option value=\"5\">5</mat-option>\r\n        <mat-option value=\"10\">10</mat-option>\r\n        <mat-option value=\"25\">25</mat-option>\r\n        <mat-option value=\"50\">50</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <span class=\"float-right\">\r\n            <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n                <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n                <strong>{{commonservice.recordTable?.totalElements}}</strong> city list\r\n            </span>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            </button>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/referencecode/city/city.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var CityComponent = (function () {
    function CityComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['cityName', 'cityId', 'cityCode', 'stateName', 'stateId'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.selection = new __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__["a" /* SelectionModel */](true, []);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    CityComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    CityComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    CityComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        //this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
        this.dataUrl = this.appConfig.urlCityList;
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        //this.http.get(this.dataUrl)
        this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.cityList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    CityComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    CityComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    CityComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    CityComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], CityComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], CityComponent.prototype, "sort", void 0);
    CityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-city',
            template: __webpack_require__("../../../../../src/app/referencecode/city/city.component.html"),
            styles: [__webpack_require__("../../../../../src/app/referencecode/city/city.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], CityComponent);
    return CityComponent;
}());



/***/ }),

/***/ "../../../../../src/app/referencecode/country/country.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/referencecode/country/country.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<p>-->\r\n  <!--country works!-->\r\n<!--</p>-->\r\n\r\n\r\n<div class=\"container right-content\">\r\n  <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n    <h2 class=\"staticLabel\">View Country</h2>\r\n  </div>\r\n\r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <div class=\"example-header\">\r\n      <mat-form-field class=\"font-size-s\" >\r\n        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">\r\n\r\n      <!-- num Column -->\r\n      <ng-container matColumnDef=\"num\">\r\n        <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> No. </mat-header-cell>\r\n        <mat-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n          {{element.countryId}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- Country Name 1 Column -->\r\n      <ng-container matColumnDef=\"countryName\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 30%;\" *matHeaderCellDef> Country Name </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 30%;\" *matCellDef=\"let element\">\r\n          {{element.countryName}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- Country Name 1 Column -->\r\n      <ng-container matColumnDef=\"countryCode\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 30%;\" *matHeaderCellDef> Country Code </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 30%;\" *matCellDef=\"let element\">\r\n          {{element.countryCode}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- Country Name 1 Column -->\r\n      <ng-container matColumnDef=\"dialCode\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 30%;\" *matHeaderCellDef> Dial Code </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 30%;\" *matCellDef=\"let element\">\r\n          {{element.countryDialCode}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n  </div>\r\n\r\n  <div class=\"float-right paddingTop-15\">\r\n    <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n      <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n        <mat-option value=\"5\">5</mat-option>\r\n        <mat-option value=\"10\">10</mat-option>\r\n        <mat-option value=\"25\">25</mat-option>\r\n        <mat-option value=\"50\">50</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <span class=\"float-right\">\r\n            <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n                <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n                <strong>{{commonservice.recordTable?.totalElements}}</strong> country list\r\n            </span>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            </button>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/referencecode/country/country.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
// import { Component, OnInit } from '@angular/core';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var CountryComponent = (function () {
    function CountryComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['num', 'countryName', 'countryCode', 'dialCode'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.selection = new __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__["a" /* SelectionModel */](true, []);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    CountryComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    CountryComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    CountryComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        //this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
        this.dataUrl = this.appConfig.urlCountryList;
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        //this.http.get(this.dataUrl)
        this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.countryList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    CountryComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    CountryComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    CountryComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    CountryComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], CountryComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], CountryComponent.prototype, "sort", void 0);
    CountryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-country',
            template: __webpack_require__("../../../../../src/app/referencecode/country/country.component.html"),
            styles: [__webpack_require__("../../../../../src/app/referencecode/country/country.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], CountryComponent);
    return CountryComponent;
}());



/***/ }),

/***/ "../../../../../src/app/referencecode/ethnicity/ethnicity.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/referencecode/ethnicity/ethnicity.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  ethnicity works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/referencecode/ethnicity/ethnicity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EthnicityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EthnicityComponent = (function () {
    function EthnicityComponent() {
    }
    EthnicityComponent.prototype.ngOnInit = function () {
    };
    EthnicityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-ethnicity',
            template: __webpack_require__("../../../../../src/app/referencecode/ethnicity/ethnicity.component.html"),
            styles: [__webpack_require__("../../../../../src/app/referencecode/ethnicity/ethnicity.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EthnicityComponent);
    return EthnicityComponent;
}());



/***/ }),

/***/ "../../../../../src/app/referencecode/postcode/postcode.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/referencecode/postcode/postcode.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n      <h2 class=\"staticLabel\">Post Code of Malaysia</h2>\r\n    </div>\r\n\r\n  <div class=\"col-md-12\">\r\n    <div class=\"col-md-6\">\r\n        <mat-form-field class=\"font-size-s\" style=\"width:80%;\">\r\n          <mat-select (change)=\"getCitiesByState($event)\" placeholder=\"State\">\r\n            <mat-option *ngFor=\"let state of getStateData\" [value]=\"state\">{{ state?.stateName }}</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <mat-form-field class=\"font-size-s\" style=\"width:80%;\">\r\n          <mat-select (change)=\"getPostcodeByCity($event)\"  placeholder=\"City\">\r\n            <mat-option *ngFor=\"let city of getCityData\" [value]=\"city\">{{ city?.cityName }}</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n  </div>\r\n  <h3>\r\n      <span *ngIf=\"selStateInfo\">\r\n          {{selStateInfo?.value.stateName}} (State ID: {{selStateInfo?.value.stateId}})\r\n      </span> \r\n      <span *ngIf=\"getPostData\">\r\n          ,{{selCityInfo?.value.cityName}} (City Code: {{selCityInfo?.value.cityCode}})\r\n      </span>\r\n    </h3>\r\n  <div *ngIf=\"getPostData\">\r\n    \r\n    <mat-grid-list cols=\"6\" rowHeight=\"30px\">\r\n        <mat-grid-tile *ngFor=\"let postcode of getPostData\"  style=\"border:#e2e2e2 solid 1px;\">\r\n          {{postcode.postCode}}\r\n        </mat-grid-tile>\r\n      </mat-grid-list>\r\n  </div>\r\n  <div class=\"paddingTop-15\" *ngIf=\"getPostData\">\r\n      <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n        <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" >\r\n          <mat-option value=\"5\">5</mat-option>\r\n          <mat-option value=\"10\">10</mat-option>\r\n          <mat-option value=\"25\">25</mat-option>\r\n          <mat-option value=\"50\">50</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <div style=\"float:right;\">\r\n              <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                  <strong>1</strong> of\r\n                  <strong>3</strong> in\r\n                  <strong>{{getPostData?.length}}</strong> postcode list\r\n              </span>\r\n              <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" >\r\n              <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n              </button>\r\n              <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" >\r\n              <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n              </button>\r\n            </div>\r\n    </div>\r\n    \r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/referencecode/postcode/postcode.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostcodeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PostcodeComponent = (function () {
    function PostcodeComponent(commonservice) {
        this.commonservice = commonservice;
    }
    PostcodeComponent.prototype.ngOnInit = function () {
        this.getState('152');
    };
    PostcodeComponent.prototype.getState = function (id) {
        var _this = this;
        return this.commonservice.getStateData()
            .subscribe(function (resStateData) {
            _this.getStateData = resStateData;
        }, function (Error) {
            //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
            console.log('Error in State');
        });
    };
    PostcodeComponent.prototype.getCitiesByState = function (e) {
        var _this = this;
        this.getPostData = '';
        this.selStateInfo = e;
        if (e) {
            return this.commonservice.getCitiesbyState(e.value.stateId)
                .subscribe(function (resCityData) {
                _this.getCityData = resCityData;
            }, function (Error) {
                //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');      
                console.log('Error in City');
            });
        }
    };
    PostcodeComponent.prototype.getPostcodeByCity = function (e) {
        var _this = this;
        this.selCityInfo = e;
        if (e) {
            return this.commonservice.getPostCodeData(e.value.cityId)
                .subscribe(function (resPostCodeData) {
                _this.getPostData = resPostCodeData;
            }, function (Error) {
                //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');      
                console.log('Error in Podtcode');
            });
        }
    };
    PostcodeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-postcode',
            template: __webpack_require__("../../../../../src/app/referencecode/postcode/postcode.component.html"),
            styles: [__webpack_require__("../../../../../src/app/referencecode/postcode/postcode.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_common_service__["a" /* CommonService */]])
    ], PostcodeComponent);
    return PostcodeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/referencecode/religion/religion.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/referencecode/religion/religion.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n        <h2 class=\"staticLabel pull-left\">View Religion</h2>\r\n        <span class=\"pull-right editBtn\" style=\"z-index: 1;\">\r\n            <button type=\"button\" mat-fab color=\"warn\" \r\n            [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive}\">&nbsp;\r\n            <i class=\"fa fa-plus font-size-l\"></i></button>\r\n        </span>\r\n    </div>\r\n\r\n    <div class=\"example-container mat-elevation-z8\">\r\n       \r\n        <mat-table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">\r\n            <ng-container matColumnDef=\"num\">\r\n                <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> No. </mat-header-cell>\r\n                <mat-cell class=\"text-align-left\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    {{element.religionListID}}\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- question en Column -->\r\n            <ng-container matColumnDef=\"Enreligion\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Religion (EN) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left padding5\" *matCellDef=\"let element\">\r\n                    {{element.En.religion}} \r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- question bm Column -->\r\n            <ng-container matColumnDef=\"Bmreligion\">\r\n                <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Religion (BM) </mat-header-cell>\r\n                <mat-cell class=\"text-align-Left padding5\" *matCellDef=\"let element\">\r\n                    {{element.Bm.religion}}\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- status Column -->\r\n            <ng-container matColumnDef=\"status\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matHeaderCellDef> Active Status </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 16%;\" *matCellDef=\"let element\">\r\n                    {{element.ActiveFlag}}\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <!-- action Column -->\r\n            <ng-container matColumnDef=\"action\">\r\n                <mat-header-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matHeaderCellDef> Action </mat-header-cell>\r\n                <mat-cell class=\"text-align-Center\" style=\"flex: 0 0 10%;\" *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-edit font-size-xxl\" style=\"color: orange\" ></i>\r\n                    &nbsp;\r\n                    <i class=\"fa fa-trash font-size-xxl\" style=\"color: red\" title=\"Delete\"></i>\r\n                </mat-cell>\r\n            </ng-container>\r\n\r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n\r\n    </div>\r\n\r\n    <div class=\"paddingTop-15\">\r\n        <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n            <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\">\r\n            <mat-option value=\"5\">5</mat-option>\r\n            <mat-option value=\"10\">10</mat-option>\r\n            <mat-option value=\"25\">25</mat-option>\r\n            <mat-option value=\"50\">50</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <span style=\"float:right;\">\r\n            <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                <strong>1</strong> of\r\n                <strong>3</strong> in\r\n                <strong>4</strong> Religion list\r\n            </span>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" >\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            </button>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\">\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/referencecode/religion/religion.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReligionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReligionComponent = (function () {
    function ReligionComponent(http) {
        this.http = http;
        this.recordList = null;
        this.displayedColumns = ['num', 'Enreligion', 'Bmreligion', 'status', 'action'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["E" /* MatTableDataSource */](this.recordList);
    }
    ReligionComponent.prototype.ngOnInit = function () {
        this.getRecordList();
    };
    ReligionComponent.prototype.getRecordList = function () {
        var _this = this;
        debugger;
        this.dataUrl = './app/apidata/religion.json';
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        this.http.get(this.dataUrl)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log(data);
            _this.dataSource.data = _this.recordList.religionList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    ReligionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-religion',
            template: __webpack_require__("../../../../../src/app/referencecode/religion/religion.component.html"),
            styles: [__webpack_require__("../../../../../src/app/referencecode/religion/religion.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], ReligionComponent);
    return ReligionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/referencecode/state/state.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/referencecode/state/state.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container right-content\">\r\n  <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n    <h2 class=\"staticLabel\">View State</h2>\r\n  </div>\r\n\r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <div class=\"example-header\">\r\n      <mat-form-field class=\"font-size-s\" >\r\n        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\" style=\"max-height: 550px;\">\r\n\r\n      <!-- State Name Column -->\r\n      <ng-container matColumnDef=\"stateName\">\r\n        <mat-header-cell class=\"text-align-left\" style=\"flex: 0 0 50%;\" *matHeaderCellDef> State Name </mat-header-cell>\r\n        <mat-cell class=\"text-align-left\" style=\"flex: 0 0 50%;\" *matCellDef=\"let element\">\r\n          {{element.stateName}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- State Id 1 Column -->\r\n      <ng-container matColumnDef=\"stateId\">\r\n        <mat-header-cell class=\"text-align-Left\" style=\"flex: 0 0 50%;\" *matHeaderCellDef> State Id </mat-header-cell>\r\n        <mat-cell class=\"text-align-Left\" style=\"flex: 0 0 50%;\" *matCellDef=\"let element\">\r\n          {{element.stateId}}\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n  </div>\r\n\r\n  <div class=\"float-right paddingTop-15\">\r\n    <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n      <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.recordTable?.totalPages)\">\r\n        <mat-option value=\"5\">5</mat-option>\r\n        <mat-option value=\"10\">10</mat-option>\r\n        <mat-option value=\"25\">25</mat-option>\r\n        <mat-option value=\"50\">50</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <span class=\"float-right\">\r\n            <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n                <strong>{{commonservice.recordTable?.pageNumber}}</strong> of\r\n                <strong>{{commonservice.recordTable?.totalPages}}</strong> in\r\n                <strong>{{commonservice.recordTable?.totalElements}}</strong> state list\r\n            </span>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.recordTable?.pageNumber)\">\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            </button>\r\n            <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.recordTable?.pageNumber, commonservice.recordTable?.totalPages)\">\r\n            <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </span>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/referencecode/state/state.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var StateComponent = (function () {
    function StateComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.recordList = null;
        this.displayedColumns = ['stateName', 'stateId'];
        this.pageSize = 10;
        this.pageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatTableDataSource */](this.recordList);
        this.selection = new __WEBPACK_IMPORTED_MODULE_6__angular_cdk_collections__["a" /* SelectionModel */](true, []);
        this.getRecordList(this.pageCount, this.pageSize);
    }
    StateComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    StateComponent.prototype.ngOnInit = function () {
        this.getRecordList(this.pageCount, this.pageSize);
    };
    StateComponent.prototype.getRecordList = function (count, size) {
        var _this = this;
        //this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
        this.dataUrl = this.appConfig.urlStateList;
        //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
        //this.http.get(this.dataUrl)
        this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
            .subscribe(function (data) {
            _this.recordList = data;
            console.log("data");
            console.log(data);
            _this.dataSource.data = _this.recordList.stateList;
            _this.commonservice.recordTable = _this.recordList;
            _this.noNextData = _this.recordList.pageNumber === _this.recordList.totalPages;
        });
    };
    StateComponent.prototype.paginatorL = function (page) {
        this.getRecordList(page - 1, this.pageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    StateComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getRecordList(page + 1, this.pageSize);
    };
    StateComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    StateComponent.prototype.pageChange = function (event, totalPages) {
        this.getRecordList(this.pageCount, event.value);
        this.pageSize = event.value;
        this.noPrevData = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginator */])
    ], StateComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatSort */])
    ], StateComponent.prototype, "sort", void 0);
    StateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-state',
            template: __webpack_require__("../../../../../src/app/referencecode/state/state.component.html"),
            styles: [__webpack_require__("../../../../../src/app/referencecode/state/state.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_3__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], StateComponent);
    return StateComponent;
}());



/***/ }),

/***/ "../../../../../src/app/rightcontent/rightcontent.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-container {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-orient: vertical;\r\n\t-webkit-box-direction: normal;\r\n\t    -ms-flex-direction: column;\r\n\t        flex-direction: column;\r\n\tmin-width: 300px;\r\n  }\r\n  \r\n  .mat-table {\r\n\toverflow: auto;\r\n\tmax-height: 500px;\r\n  }\r\n\r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 1100px !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/rightcontent/rightcontent.component.html":
/***/ (function(module, exports) {

module.exports = "  <p style=\"margin-top: 10px;\" class=\"font-size-l\">Articles</p>\r\n  <!-- Button Row -->\r\n    <div class=\"button-row\" style=\"padding-left:80%; padding-bottom:10px;\">\r\n        <!-- Here \"Article\" is dynamic -->\r\n        <button mat-raised-button color=\"primary\" style=\"background-color:#1ebebc\" [routerLink]=\"['/addtemplate']\"><mat-icon>add</mat-icon> Add Article</button> \r\n        <button mat-raised-button color=\"primary\" style=\"background-color:#1ebebc\"><mat-icon>call_made</mat-icon> API </button> \r\n    </div> \r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <!-- Search and Filter Section -->\r\n    <mat-form-field class=\"example-form-field\">\r\n        <input matInput type=\"text\" placeholder=\"Clearable input\" [(ngModel)]=\"value\"/>\r\n        <button mat-button *ngIf=\"value\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"value=''\">\r\n            <mat-icon>close</mat-icon>\r\n        </button>\r\n    </mat-form-field>\r\n    <!-- Data table -->\r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n      <!-- Position Column -->\r\n      <ng-container matColumnDef=\"position\">\r\n        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.position}} </mat-cell>\r\n      </ng-container>\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"name\">\r\n        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.name}} </mat-cell>\r\n      </ng-container>\r\n      <!-- Weight Column -->\r\n      <ng-container matColumnDef=\"weight\">\r\n        <mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.weight}} </mat-cell>\r\n      </ng-container>\r\n      <!-- Symbol Column -->\r\n      <ng-container matColumnDef=\"symbol\">\r\n        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.symbol}} </mat-cell>\r\n      </ng-container>\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n    <!-- <mat-paginator #paginator\r\n                   [pageSize]=\"10\"\r\n                   [pageSizeOptions]=\"[5, 10, 20]\">\r\n    </mat-paginator> -->\r\n    <!-- Pagination -->\r\n    <div style=\"float:right; margin-top: 10px;\">\r\n        <mat-form-field style=\"width:50px;\">         \r\n            <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\">\r\n                <mat-option value=\"5\">5</mat-option>\r\n                <mat-option value=\"10\">10</mat-option>\r\n                <mat-option value=\"25\">25</mat-option>\r\n                <mat-option value=\"50\">50</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>   \r\n        <span style=\"padding-right:20px; float:right;\">\r\n            <span style=\"color:#000; padding-right:20px;\">Pages <strong>1</strong> of <strong>27</strong> in <strong>267</strong> items</span>\r\n            <button mat-mini-fab color=\"basic\" matSuffix ><mat-icon>navigate_before</mat-icon></button>\r\n            <button mat-mini-fab color=\"basic\"  ><mat-icon>navigate_next</mat-icon></button>\r\n        </span>\r\n    </div>\r\n  </div>"

/***/ }),

/***/ "../../../../../src/app/rightcontent/rightcontent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RightcontentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RightcontentComponent = (function () {
    function RightcontentComponent() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["E" /* MatTableDataSource */](ELEMENT_DATA);
    }
    RightcontentComponent.prototype.ngOnInit = function () {
        // this.dataSource.paginator = this.paginator;
    };
    // tslint:disable-next-line:use-life-cycle-interface
    RightcontentComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatPaginator */])
    ], RightcontentComponent.prototype, "paginator", void 0);
    RightcontentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-rightcontent',
            template: __webpack_require__("../../../../../src/app/rightcontent/rightcontent.component.html"),
            styles: [__webpack_require__("../../../../../src/app/rightcontent/rightcontent.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], RightcontentComponent);
    return RightcontentComponent;
}());

var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
];


/***/ }),

/***/ "../../../../../src/app/roles/roles.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html {\r\n    font-family: Roboto,\"Helvetica Neue\",sans-serif;\r\n    font-size: inherit;\r\n}\r\n\r\nform {\r\n    width: 100%;\r\n}\r\n\r\n.formbg {    \r\n    border: 1px solid #dedede;\r\n    border-radius: 5px;\r\n    background: #fff;\r\n    background-color: #eeeeee;\t\r\n    color: #000;\r\n    /* padding: 13px 10px; */\r\n    margin-top: 15px;\r\n    margin-bottom: 1%;\r\n    padding-top: 10px;\r\n    /* padding-bottom: 15px; */\r\n    box-shadow: #eeeeee 0px 0px 10px 0px;\r\n}\r\n\r\n.formbg label {\r\n    color : rgb(0, 0, 0);\r\n    /* rgb(179, 179, 179); */\r\n    margin-bottom: 0px;\r\n}\r\n\r\nlabel {\r\n    color: rgba(0,0,0,0.70);\r\n}\r\n\r\n.thinText {\r\n    font-weight: 400;\r\n}\r\n\r\n.semiBoldText {\r\n    font-weight: 500;\r\n}\r\n\r\n.boldText {\r\n    font-weight: bold;\r\n}\r\n\r\n.staticLabel{\r\n    /* font: inherit; */\r\n    text-transform: uppercase;\r\n}\r\n\r\n.form-header {\r\n    background: #dbdbdb;\r\n    padding: 10px 10px 0px;\r\n    text-shadow: 0 1px 0 #f5f5f5;\r\n    border-bottom: 1px solid #ccc;\r\n    border-top-left-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n    margin-top: -1%;\r\n    margin-bottom: 1%;\r\n}\r\n\r\n.right-content {\r\n    width: 100%;\r\n}\r\n\r\n/* .form-group {\r\n    padding: 10px;\r\n} */\r\n\r\n.example-full-width {\r\n    width: 100%;\r\n}\r\n\r\n.closer-top {\r\n    margin-bottom: -1%; margin-top: -8%;\r\n}\r\n\r\n.close-top {\r\n    margin-bottom: -1%; margin-top: -3%;\r\n}\r\n\r\n.font-size-xx-s {\r\n    font-size: xx-small\r\n}\r\n\r\n.font-size-x-s {\r\n    font-size: x-small\r\n}\r\n\r\n.font-size-xs {\r\n    font-size: smaller\r\n}\r\n\r\n.font-size-s {\r\n    font-size: small\r\n}\r\n\r\n.font-size-m {\r\n    font-size: medium\r\n}\r\n\r\n.font-size-l {\r\n    font-size: large\r\n}\r\n\r\n.font-size-xl {\r\n    font-size: x-large\r\n}\r\n\r\n.font-size-xxl {\r\n    font-size: xx-large\r\n}\r\n\r\n.paddingTop-10 {\r\n    padding-top: 10px;\r\n}\r\n\r\n.paddingTop-15 {\r\n    padding-top: 15px;\r\n}\r\n\r\n.paddingTop-20 {\r\n    padding-top: 20px;\r\n}\r\n\r\n.paddingTop-25 {\r\n    padding-top: 25px;\r\n}\r\n\r\n.text-align-Center {\r\n    text-align: center;\r\n}\r\n\r\n.text-align-Left {\r\n    text-align: left;\r\n}\r\n\r\n.mat-form-field-placeholder-wrapper {\r\n    position: absolute;\r\n    left: 0;\r\n    box-sizing: content-box;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: hidden;\r\n    pointer-events: none;\r\n    /* font-weight: 500; */\r\n}\r\n\r\n.mat-error {\r\n    font-size: small;\r\n    display: block;\r\n    /* margin-top: -2%; */\r\n}\r\n\r\n/* Structure */\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n  }\r\n  \r\n  .example-header {\r\n    min-height: 64px;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: baseline;\r\n        -ms-flex-align: baseline;\r\n            align-items: baseline;\r\n    padding: 0px 24px 0;\r\n    font-size: 20px;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n  }\r\n  \r\n  /* .mat-form-field {\r\n    font-size: 14px;\r\n    flex-grow: 1;\r\n    margin-left: 32px;\r\n  } */\r\n  \r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 500px;\r\n  }\r\n\r\n  .mat-form-field-placeholder {\r\n    color: rgba(0,0,0,1);\r\n  }\r\n\r\n  .backTitle {\r\n    margin-left: -1%;\r\n      cursor: pointer;\r\n  }\r\n\r\n  .backTitle:hover {\r\n    margin-left: -1%;\r\n      color: #ff4081;\r\n      cursor: pointer;\r\n  }\r\n\r\n.error2{\r\nbackground-color: #E3C3C5;\r\n}\r\n\r\n@media (min-width: 1200px){\r\n\t.container {\r\n\t\twidth: 100%;\r\n    }    \r\n    .container-sample {\r\n        width: 100%;\r\n        padding-top: 5px; \r\n        box-sizing: inherit !important; \r\n\t}\r\n}\r\n\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/roles/roles.component.html":
/***/ (function(module, exports) {

module.exports = "<form style=\"padding-right: 15px; padding-left: 15px;\" [formGroup]=\"updateForm\" autocomplete=\"off\" role=\"form\" novalidate>\r\n      <div class=\"container-sample animated flipInX\">\r\n        <div class=\"col-md-12\" style=\"padding: 0px 10px 10px 5px; border: 0px solid #000\">\r\n            <h4 class=\"paddingTop-15 staticLabel\"><i class=\"fa fa-chevron-left font-size-xl paddingTop-15 backTitle\" style=\"cursor: pointer;\" (click)=\"navigateBack()\" title=\"Go Back\"></i> {{ pageMode }} Roles</h4>\r\n        </div>\r\n      <div class=\"row \">\r\n          <div class=\"col-md-12 \">\r\n            <mat-form-field class=\"example-full-width font-size-s\">\r\n              <input matInput placeholder=\"Role Name\" [formControl]=\"rolesname\"\r\n                required>\r\n              <!-- <mat-hint align=\"end\">{{name.value?.length || 0}}/60</mat-hint> -->\r\n              <!-- <mat-error *ngIf=\"!validateCtrlChk(nama_penuh) && citizenFormGrp.controls.nama_penuh.errors.required\">\r\n                {{'register.err.name' | translate }}\r\n              </mat-error> -->\r\n              <!-- <mat-error *ngIf=\"!validateCtrlChk(nama_penuh) && citizenFormGrp.controls.nama_penuh.errors.pattern\">\r\n                {{'register.pattern.name' | translate }}\r\n              </mat-error> -->\r\n              <mat-error *ngIf=\"updateForm.controls.rolesname.hasError('required')\">\r\n                Role Name is required\r\n              </mat-error>\r\n            </mat-form-field>\r\n\r\n            <!-- <mat-form-field class=\"example-full-width font-size-s\" style=\"width:100%\">\r\n              <mat-select placeholder=\"Permission\" [formControl]=\"permission\"\r\n                  required multiple>\r\n                  <mat-option *ngFor=\"let roles of rolespermission\" [value]=\"roles\">{{roles}}</mat-option>\r\n              </mat-select>\r\n              <mat-error *ngIf=\"updateForm.controls.permission.hasError('required')\">\r\n                Permissions is required\r\n              </mat-error>\r\n            </mat-form-field> -->\r\n                        \r\n          </div>\r\n          <div class=\"col-md-12 paddingTop-25\">\r\n          <div class=\"mat-elevation-z8\">\r\n              <div class=\"form-header col-md-12\">\r\n                <label class=\"staticLabel font-size-m boldText\">Permissions</label>\r\n              </div>\r\n              <div class=\"example-header\">\r\n                <mat-form-field class=\"example-full-width font-size-s\" >\r\n                  <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n                </mat-form-field>\r\n              </div>\r\n\r\n              <mat-table #table [dataSource]=\"dataSource\">     \r\n                \r\n                  <!-- Checkbox Column -->\r\n                  <ng-container matColumnDef=\"select\">\r\n                    <mat-header-cell *matHeaderCellDef>\r\n                      <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                                    [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n                      </mat-checkbox>\r\n                    </mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let row\">\r\n                      <mat-checkbox (click)=\"$event.stopPropagation()\"\r\n                                    (change)=\"$event ? selection.toggle(row) : null\"\r\n                                    [checked]=\"selection.isSelected(row)\">\r\n                      </mat-checkbox>\r\n                    </mat-cell>\r\n                  </ng-container>\r\n              \r\n                  <!-- modules Column -->\r\n                  <ng-container matColumnDef=\"modules\">\r\n                    <mat-header-cell class=\"text-align-Left\" *matHeaderCellDef> Modules </mat-header-cell>\r\n                    <mat-cell class=\"text-align-Left\" *matCellDef=\"let element\" (click)=\"getRow(element)\"> {{element.modules}} </mat-cell>\r\n                  </ng-container>\r\n\r\n                  <!-- viewCol Column -->\r\n                  <ng-container matColumnDef=\"viewCol\">\r\n                    <mat-header-cell class=\"text-align-Center\" *matHeaderCellDef> View </mat-header-cell>\r\n                    <mat-cell class=\"text-align-Center\" *matCellDef=\"let row\">\r\n                      <mat-checkbox ></mat-checkbox>\r\n                    </mat-cell>\r\n                  </ng-container>\r\n              \r\n                  <!-- addCol Column -->\r\n                  <ng-container matColumnDef=\"addCol\">\r\n                    <mat-header-cell class=\"text-align-Center\" *matHeaderCellDef> Add </mat-header-cell>\r\n                    <mat-cell class=\"text-align-Center\" *matCellDef=\"let row\">\r\n                      <mat-checkbox ></mat-checkbox>\r\n                    </mat-cell>>\r\n                  </ng-container>\r\n              \r\n                  <!-- updateCol Column -->\r\n                  <ng-container matColumnDef=\"updateCol\">\r\n                    <mat-header-cell class=\"text-align-Center\" *matHeaderCellDef> Update </mat-header-cell>\r\n                    <mat-cell class=\"text-align-Center\" *matCellDef=\"let row\">\r\n                      <mat-checkbox ></mat-checkbox>\r\n                    </mat-cell>\r\n                  </ng-container>\r\n              \r\n                  <!-- deleteCol Column -->\r\n                  <ng-container matColumnDef=\"deleteCol\">\r\n                    <mat-header-cell class=\"text-align-Center\" *matHeaderCellDef> Delete </mat-header-cell>\r\n                    <mat-cell class=\"text-align-Center\" *matCellDef=\"let row\">\r\n                      <mat-checkbox ></mat-checkbox>\r\n                    </mat-cell>\r\n                  </ng-container>\r\n\r\n                  <!-- allCol Column -->\r\n                  <ng-container matColumnDef=\"allCol\">\r\n                    <mat-header-cell class=\"text-align-Center\" *matHeaderCellDef> All </mat-header-cell>\r\n                    <mat-cell class=\"text-align-Center\" *matCellDef=\"let row\">\r\n                      <mat-checkbox ></mat-checkbox>\r\n                    </mat-cell>\r\n                  </ng-container>\r\n              \r\n                  <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n                  <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n              </mat-table>\r\n              \r\n          </div>\r\n          <div class=\"form-group\" style=\"margin-top: 2%\">\r\n              <button mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s pull-right\"\r\n                (click)=\"updateUser(updateForm.value)\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\" [disabled]=\"!isComplete\">\r\n                <i *ngIf=\"isComplete\" class=\"fa fa-check\"></i><i *ngIf=\"!isComplete\" class=\"fa fa-times\"></i> {{ pageMode }} </button>\r\n          </div>\r\n          </div>\r\n\r\n      </div>\r\n  </div>\r\n</form>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!-- <app-confirm-dialog  #resetModal \r\n[title]=\"'common.icon.warn'\" \r\n[content]=\"'common.msg.reset'\"\r\n[state]=\"'common.state.warn'\" \r\n[isReset]=\"'true'\"\r\n(resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>\r\n\r\n<app-confirm-dialog  #infoModal \r\n[title]=\"'common.icon.success'\" \r\n[content]=\"'register.popupmsg.success_content1'\"\r\n[email] = \"getEmail\"\r\n[content2] = \"'register.popupmsg.success_content2'\" \r\n[state]=\"'common.state.success'\" \r\n[isRegister]=\"'index'\">\r\n</app-confirm-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/roles/roles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_cdk_collections__ = __webpack_require__("../../../cdk/esm5/collections.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RolesComponent = (function () {
    function RolesComponent() {
        this.rolespermission = ['admin | log entry | Can add log entry', 'admin | log entry | Can change log entry',
            'admin | log entry | Can delete log entry', 'announcement | announcement | Can change announcement',
            'announcement | announcement | Can delete announcement', 'announcement | announcement category | Can add announcement category'];
        this.rolesList = null;
        this.displayedColumns = ['select', 'modules', 'viewCol', 'addCol', 'updateCol', 'deleteCol', 'allCol'];
        this.userPageSize = 10;
        this.userPageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.isComplete = true;
        //dataSource = new MatTableDataSource<object>(this.rolesList);
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["E" /* MatTableDataSource */](ELEMENT_DATA);
        this.selection = new __WEBPACK_IMPORTED_MODULE_3__angular_cdk_collections__["a" /* SelectionModel */](true, []);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    RolesComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    RolesComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    RolesComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    RolesComponent.prototype.ngOnInit = function () {
        this.pageModeChange();
        this.rolesname = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.permission = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.updateForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            rolesname: this.rolesname,
            permission: this.permission,
        });
    };
    RolesComponent.prototype.pageModeChange = function () {
        if (this.isEdit)
            this.pageMode = "Update";
        else
            this.pageMode = "Create";
    };
    RolesComponent.prototype.navigateBack = function () {
        history.back();
    };
    RolesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-roles',
            template: __webpack_require__("../../../../../src/app/roles/roles.component.html"),
            styles: [__webpack_require__("../../../../../src/app/roles/roles.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], RolesComponent);
    return RolesComponent;
}());

var ELEMENT_DATA = [
    { modules: 'Email' },
    { modules: 'Feedback' },
    { modules: 'Login' },
    { modules: 'Announcement' },
];


/***/ }),

/***/ "../../../../../src/app/routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_error_component__ = __webpack_require__("../../../../../src/app/error/error.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rightcontent_rightcontent_component__ = __webpack_require__("../../../../../src/app/rightcontent/rightcontent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addtemplate_addtemplate_component__ = __webpack_require__("../../../../../src/app/addtemplate/addtemplate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__articletbl_articletbl_component__ = __webpack_require__("../../../../../src/app/articletbl/articletbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_nav_router_activator_service__ = __webpack_require__("../../../../../src/app/service/nav-router-activator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_user_component__ = __webpack_require__("../../../../../src/app/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__roles_roles_component__ = __webpack_require__("../../../../../src/app/roles/roles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__authentication_groups_groupsview_component__ = __webpack_require__("../../../../../src/app/authentication/groups/groupsview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authentication_usertbl_usertbl_component__ = __webpack_require__("../../../../../src/app/authentication/usertbl/usertbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__poll_question_pollquestion_pollquestion_component__ = __webpack_require__("../../../../../src/app/poll/question/pollquestion/pollquestion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__poll_question_pollquestiondetails_pollquestiondetails_component__ = __webpack_require__("../../../../../src/app/poll/question/pollquestiondetails/pollquestiondetails.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__poll_result_pollresult_pollresult_component__ = __webpack_require__("../../../../../src/app/poll/result/pollresult/pollresult.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__slider_slider_component__ = __webpack_require__("../../../../../src/app/slider/slider.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__feedback_view_feedbacktbl_feedbacktbl_component__ = __webpack_require__("../../../../../src/app/feedback/view/feedbacktbl/feedbacktbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__feedback_type_feedbacktype_feedbacktype_component__ = __webpack_require__("../../../../../src/app/feedback/type/feedbacktype/feedbacktype.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__feedback_type_feedbacktypetbl_feedbacktypetbl_component__ = __webpack_require__("../../../../../src/app/feedback/type/feedbacktypetbl/feedbacktypetbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__authentication_groups_groupsedit_component__ = __webpack_require__("../../../../../src/app/authentication/groups/groupsedit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__referencecode_country_country_component__ = __webpack_require__("../../../../../src/app/referencecode/country/country.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__referencecode_state_state_component__ = __webpack_require__("../../../../../src/app/referencecode/state/state.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__referencecode_city_city_component__ = __webpack_require__("../../../../../src/app/referencecode/city/city.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__referencecode_ethnicity_ethnicity_component__ = __webpack_require__("../../../../../src/app/referencecode/ethnicity/ethnicity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__referencecode_religion_religion_component__ = __webpack_require__("../../../../../src/app/referencecode/religion/religion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__referencecode_postcode_postcode_component__ = __webpack_require__("../../../../../src/app/referencecode/postcode/postcode.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__feedback_subject_feedbacksubjecttbl_feedbacksubjecttbl_component__ = __webpack_require__("../../../../../src/app/feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__feedback_subject_feedbacksubject_feedbacksubject_component__ = __webpack_require__("../../../../../src/app/feedback/subject/feedbacksubject/feedbacksubject.component.ts");

























var appRoutes = [
    { path: 'index', component: __WEBPACK_IMPORTED_MODULE_1__rightcontent_rightcontent_component__["a" /* RightcontentComponent */] },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'addtemplate', component: __WEBPACK_IMPORTED_MODULE_2__addtemplate_addtemplate_component__["a" /* AddtemplateComponent */] },
    { path: 'articletbl/:id', component: __WEBPACK_IMPORTED_MODULE_3__articletbl_articletbl_component__["a" /* ArticletblComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__service_nav_router_activator_service__["a" /* NavRouterActivatorService */]] },
    { path: 'feedback/message/visitor', component: __WEBPACK_IMPORTED_MODULE_13__feedback_view_feedbacktbl_feedbacktbl_component__["a" /* FeedbacktblComponent */] },
    { path: 'feedback/message/admin', component: __WEBPACK_IMPORTED_MODULE_13__feedback_view_feedbacktbl_feedbacktbl_component__["a" /* FeedbacktblComponent */] },
    { path: 'feedback/type', component: __WEBPACK_IMPORTED_MODULE_15__feedback_type_feedbacktypetbl_feedbacktypetbl_component__["a" /* FeedbacktypetblComponent */] },
    { path: 'feedback/type/:id', component: __WEBPACK_IMPORTED_MODULE_14__feedback_type_feedbacktype_feedbacktype_component__["a" /* FeedbacktypeComponent */] },
    { path: 'feedback/type/add', component: __WEBPACK_IMPORTED_MODULE_14__feedback_type_feedbacktype_feedbacktype_component__["a" /* FeedbacktypeComponent */] },
    { path: 'feedback/subject', component: __WEBPACK_IMPORTED_MODULE_23__feedback_subject_feedbacksubjecttbl_feedbacksubjecttbl_component__["a" /* FeedbacksubjecttblComponent */] },
    { path: 'feedback/subject/:id', component: __WEBPACK_IMPORTED_MODULE_24__feedback_subject_feedbacksubject_feedbacksubject_component__["a" /* FeedbacksubjectComponent */] },
    { path: 'feedback/subject/add', component: __WEBPACK_IMPORTED_MODULE_24__feedback_subject_feedbacksubject_feedbacksubject_component__["a" /* FeedbacksubjectComponent */] },
    { path: '404', component: __WEBPACK_IMPORTED_MODULE_0__error_error_component__["a" /* ErrorComponent */] },
    { path: 'user/:id', component: __WEBPACK_IMPORTED_MODULE_5__user_user_component__["a" /* UserComponent */] },
    { path: 'roles', component: __WEBPACK_IMPORTED_MODULE_6__roles_roles_component__["a" /* RolesComponent */] },
    { path: 'userlist', component: __WEBPACK_IMPORTED_MODULE_8__authentication_usertbl_usertbl_component__["a" /* UsertblComponent */] },
    { path: 'groupmodule', component: __WEBPACK_IMPORTED_MODULE_7__authentication_groups_groupsview_component__["a" /* GroupsviewComponent */] },
    { path: 'groups/:id', component: __WEBPACK_IMPORTED_MODULE_16__authentication_groups_groupsedit_component__["a" /* GroupseditComponent */] },
    { path: 'poll/questions', component: __WEBPACK_IMPORTED_MODULE_9__poll_question_pollquestion_pollquestion_component__["a" /* PollquestionComponent */] },
    { path: 'poll/questions/:id', component: __WEBPACK_IMPORTED_MODULE_10__poll_question_pollquestiondetails_pollquestiondetails_component__["a" /* PollquestiondetailsComponent */] },
    { path: 'poll/questions/add', component: __WEBPACK_IMPORTED_MODULE_10__poll_question_pollquestiondetails_pollquestiondetails_component__["a" /* PollquestiondetailsComponent */] },
    { path: 'poll/results', component: __WEBPACK_IMPORTED_MODULE_11__poll_result_pollresult_pollresult_component__["a" /* PollresultComponent */] },
    { path: 'slider', component: __WEBPACK_IMPORTED_MODULE_12__slider_slider_component__["a" /* SliderComponent */] },
    { path: 'slider/:id', component: __WEBPACK_IMPORTED_MODULE_12__slider_slider_component__["a" /* SliderComponent */] },
    { path: 'reference/country', component: __WEBPACK_IMPORTED_MODULE_17__referencecode_country_country_component__["a" /* CountryComponent */] },
    { path: 'reference/city', component: __WEBPACK_IMPORTED_MODULE_19__referencecode_city_city_component__["a" /* CityComponent */] },
    { path: 'reference/state', component: __WEBPACK_IMPORTED_MODULE_18__referencecode_state_state_component__["a" /* StateComponent */] },
    { path: 'reference/ethnicity', component: __WEBPACK_IMPORTED_MODULE_20__referencecode_ethnicity_ethnicity_component__["a" /* EthnicityComponent */] },
    { path: 'reference/religion', component: __WEBPACK_IMPORTED_MODULE_21__referencecode_religion_religion_component__["a" /* ReligionComponent */] },
    { path: 'reference/postcode', component: __WEBPACK_IMPORTED_MODULE_22__referencecode_postcode_postcode_component__["a" /* PostcodeComponent */] }
    // {path: '**', component: ErrorComponent},
];
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


/***/ }),

/***/ "../../../../../src/app/service/common.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_retry__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/retry.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var CommonService = (function () {
    // tslint:disable-next-line:max-line-length
    function CommonService(http, appConfig, route, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.route = route;
        this.router = router;
        this.temp = null;
        this.usersUrl = this.appConfig.urlUsers;
        this.slidersUrl = this.appConfig.urlSlides;
        this.stateUrl = this.appConfig.urlStateList;
        this.cityUrl = this.appConfig.urlCityList;
        this.postcodeUrl = this.appConfig.urlPostcode;
    }
    // getMenuID(ID): Observable<any> {
    //   // tslint:disable-next-line:no-debugger
    //   debugger;
    //   console.log('This is from Common Service ,' + ID);
    //   if (!isNaN(ID)) {
    //   return ID;
    // }
    // }
    // triggerArticle(topicID) {
    //       if (!isNaN(topicID)) {
    //           return this.route.paramMap
    //           .switchMap((params: ParamMap) =>
    //           this.getMenuID(topicID))
    //           .subscribe(resSliderData => this.dataTbl = resSliderData);
    //       }
    //      }
    CommonService.prototype.getUsersData = function () {
        return this.http.get(this.usersUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.getSlidersData = function () {
        return this.http.get(this.slidersUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.getUsersDataByID = function (uid) {
        return this.http.get(this.usersUrl + uid)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.getMenuID = function (data) {
        this.subid = data.subMenu;
        this.mainid = data.mainMenu;
        this.GetList(data.subMenu);
    };
    CommonService.prototype.GetList = function (topicID) {
        var _this = this;
        if (this.mainid === 1 && topicID === 3) {
            return this.http.get(this.appConfig.urlCommon + 'article/category/1')
                .subscribe(function (Rdata) {
                _this.dataTbl = Rdata;
                // console.log(this.dataTbl);
                _this.router.navigate(['articletbl', topicID]);
            });
        }
        else if (this.mainid === 1 && topicID === 4) {
            return this.http.get(this.appConfig.urlUserList + '?page=1&size=10')
                .subscribe(function (Rdata) {
                _this.dataTbl = Rdata;
                _this.router.navigate(['userlist']);
                // console.log(this.dataTbl);
            });
        }
        else {
            this.dataTbl = [];
        }
    };
    CommonService.prototype.GetUser = function (userId) {
        var _this = this;
        return this.http.get(this.appConfig.urlUserList + '/' + userId + '?langId=1').subscribe(function (Rdata) {
            _this.dataTbl = Rdata;
            _this.router.navigate(['user', userId]);
        });
    };
    CommonService.prototype.updateUser = function (user) {
        // console.log(this.appConfig.urlUsers + user.userId)
        // console.log(user)
        // return this.http.put(this.appConfig.urlUsers + user.userId, user)
        return this.http.put(this.appConfig.urlUserList + '/' + user.userId + '?langId=1', user)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.getModuleList = function () {
        return this.http.get(this.appConfig.urlModuleList)
            .map(function (response) { return response.json()[0]; })
            .catch(this.handleError);
    };
    CommonService.prototype.getGroupList = function () {
        return this.http.get(this.appConfig.urlGroupModuleList)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.getGroupsData = function () {
        console.log(this.appConfig.urlGroup);
        return this.http.get(this.appConfig.urlGroup)
            .map(function (response) { return response.json().groupList; })
            .catch(this.handleError);
    };
    CommonService.prototype.getFeedbackType = function () {
        return this.http.get(this.appConfig.urlFbTypeList + 'type/?langId=1')
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.pageModeChange = function (isEdit) {
        if (isEdit === true)
            this.pageMode = "Update";
        else
            this.pageMode = "Add";
        return this.pageMode;
    };
    // SLIDER
    CommonService.prototype.getSlider = function (code) {
        var _this = this;
        // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
        return this.http.get(this.appConfig.urlSlides + '/' + code).subscribe(function (Rdata) {
            _this.dataTbl = Rdata;
            // this.router.navigate(['user', code]);
        });
    };
    CommonService.prototype.addSlider = function (slider) {
        console.log(this.appConfig.urlSlides);
        console.log(slider);
        // return this.http.put(this.appConfig.urlUsers + user.userId, user)
        return this.http.post(this.appConfig.urlSlides, slider)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.updateSlider = function (slider) {
        // console.log(this.appConfig.urlUsers + user.userId)
        console.log(slider);
        // debugger;
        // return this.http.put(this.appConfig.urlUsers + user.userId, user)
        return this.http.put(this.appConfig.urlSlides + '/' + slider[0].slideCode, slider)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.delSlider = function (enId, bmId) {
        // return this.http.put(this.appConfig.urlUsers + user.userId, user)
        return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," + bmId, null)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.addRecord = function (record) {
        var fullUrl = this.appConfig.urlPoll + "/question";
        console.log(fullUrl);
        console.log(record);
        // return this.http.put(this.appConfig.urlUsers + user.userId, user)
        return this.http.post(fullUrl, record)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.delRecord = function (enId, bmId) {
        return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=", enId + "," + bmId)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.handleError = function (error) {
        var msg = "Status code " + error.status + " on url " + error.url;
        console.error(msg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].throw(msg);
    };
    CommonService.prototype.getStateData = function () {
        //  console.log(this.countryUrl);
        return this.http.get(this.stateUrl)
            .map(function (response) { return response.json().stateList; })
            .retry(5)
            .catch(this.handleError);
    };
    CommonService.prototype.getCitiesbyState = function (code) {
        return this.http.get(this.cityUrl + '/state/' + code)
            .map(function (response) { return response.json().cityList; })
            .retry(5)
            .catch(this.handleError);
    };
    CommonService.prototype.getPostCodeData = function (code) {
        //  console.log(this.countryUrl);
        return this.http.get(this.postcodeUrl + code)
            .map(function (response) { return response.json().postcodeList; })
            .retry(5)
            .catch(this.handleError);
    };
    CommonService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], CommonService);
    return CommonService;
}());



/***/ }),

/***/ "../../../../../src/app/service/nav-router-activator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavRouterActivatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavRouterActivatorService = (function () {
    function NavRouterActivatorService(commonservice, router) {
        this.commonservice = commonservice;
        this.router = router;
    }
    NavRouterActivatorService.prototype.canActivate = function (route, state) {
        // tslint:disable-next-line:radix
        var eventExists = !!this.commonservice.GetList(parseInt(route.params['id']));
        // tslint:disable-next-line:curly
        if (!eventExists)
            this.router.navigate(['/404']);
        return eventExists;
    };
    NavRouterActivatorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]])
    ], NavRouterActivatorService);
    return NavRouterActivatorService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { MatButtonModule } from '@angular/material';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import {MatIconModule} from '@angular/material/icon';
// import {MatCardModule} from '@angular/material/card';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatPaginator, MatTableModule} from '@angular/material';

var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["z" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["D" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["G" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["H" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["I" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["C" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatPaginatorModule */],
            ],
            declarations: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["z" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["D" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["G" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["H" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["I" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["p" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["C" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatPaginatorModule */],
            ],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "../../../../../src/app/slider/slider.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".right-content {\r\nwidth: 100%;\r\n}\r\n\r\n.example-container {\r\ndisplay: -webkit-box;\r\ndisplay: -ms-flexbox;\r\ndisplay: flex;\r\n-webkit-box-orient: vertical;\r\n-webkit-box-direction: normal;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\nmin-width: 300px;\r\n}\r\n\r\n.bg-form-header {\r\npadding: 10px;\r\nbackground: transparent;\r\nborder-bottom: 1px solid #ccc;\r\n}\r\n\r\n.example-full-width {\r\nwidth: 100%;\r\n}\r\n\r\n.activeFontColor {\r\ncolor: green;\r\n}\r\n\r\n.inactiveFontColor {\r\ncolor:red;\r\n}\r\n\r\n.backTitle {\r\nmargin-left: -2%;\r\ncursor: pointer;\r\n}\r\n\r\n.backTitle:hover {\r\nmargin-left: -2%;\r\ncolor: #ff4081;\r\ncursor: pointer;\r\n}\r\n\r\n.editBtn{\r\nposition: absolute;\r\nright: 10px;\r\ntop: 65%;\r\n}\r\n\r\n.editBtn:hover {\r\nposition: absolute;\r\nbackground-color: rgb(109, 185, 38);\r\ncolor: #FFF;\r\nright: 10px;\r\ntop: 65%;\r\n}\r\n\r\n.editBtn-active {\r\nposition: absolute;\r\nbackground-color: rgb(109, 185, 38);\r\ncolor: #FFF;\r\nright: 10px;\r\ntop: 65%;\r\n}\r\n\r\n.backBtn a {\r\nposition: absolute;\r\nright: 10px;\r\ntop: 40%;\r\ncursor: pointer;\r\ntext-decoration: none\r\n}\r\n\r\n.backBtn:hover a {\r\nposition: absolute;\r\nright: 10px;\r\ntop: 40%;\r\ncursor: pointer;\r\ntext-decoration: none\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/slider/slider.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"viewSeq == 1\" class=\"container right-content\">\r\n  <div class=\"col-md-12\">\r\n    <h2 class=\"staticLabel\">Slider Management</h2>\r\n    <span class=\"pull-right editBtn\">\r\n      <button type=\"button\" mat-fab color=\"warn\" (click)=\"addBtn()\" [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive  }\">&nbsp;\r\n        <i class=\"fa fa-plus font-size-l\"></i>\r\n      </button>\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <!-- <div class=\"example-header\">\r\n      <mat-form-field>\r\n        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n      </mat-form-field>\r\n    </div> -->\r\n\r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n      {{ element }}\r\n      <!-- slideId Column -->\r\n      <ng-container matColumnDef=\"slideCode\">\r\n        <mat-header-cell *matHeaderCellDef style=\"flex: 0 0 10%;\">Code</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" style=\"flex: 0 0 10%;\"> {{element.slideCode}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- slideTitle Column -->\r\n      <ng-container matColumnDef=\"slideTitleEn\">\r\n        <mat-header-cell *matHeaderCellDef style=\"flex: 0 0 30%;\"> Title (EN)</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" (click)=\"getRow(element)\" style=\"flex: 0 0 30%;\"> {{element.slideList[0].slideTitle}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- slideDescription Column -->\r\n      <ng-container matColumnDef=\"slideTitleBm\">\r\n        <mat-header-cell *matHeaderCellDef style=\"flex: 0 0 30%;\"> Title (BM) </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.slideList[1].slideTitle}} </mat-cell>\r\n      </ng-container>\r\n\r\n      <!-- slideActiveFlag Column -->\r\n      <ng-container matColumnDef=\"slideActiveFlag\">\r\n        <mat-header-cell *matHeaderCellDef style=\"flex: 0 0 10%; text-align: center\"> Status </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" style=\"flex: 0 0 10%; text-align: center; vertical-align: top;\">\r\n          <i [ngClass]=\"{'fa fa-check font-size-xxl activeFontColor':element.slideList[0].slideActiveFlag,'fa fa-times font-size-xxl inactiveFontColor':!element.slideList[0].slideActiveFlag}\"></i>\r\n        </mat-cell>\r\n      </ng-container>\r\n      \r\n      <!-- Action Column -->\r\n      <ng-container matColumnDef=\"slideAction\">\r\n        <mat-header-cell *matHeaderCellDef style=\"flex: 0 0 20%; text-align: center\"> Action </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" style=\"flex: 0 0 20%; text-align: center\">\r\n            <i class=\"fa fa-edit font-size-xxl\" style=\"color: orange\" (click)=\"updateRow(element.slideCode)\" title=\"Update {{ element.slideCode }}\"></i>\r\n            &nbsp;\r\n            <i class=\"fa fa-trash font-size-xxl\" style=\"color: red\" (click)=\"deleteRow(element.slideList[0].slideId,element.slideList[1].slideId)\" title=\"Delete {{ element.slideList[0].slideId }},{{ element.slideList[1].slideId }}\"></i>\r\n        </mat-cell>\r\n      </ng-container>\r\n\r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n\r\n  </div>\r\n\r\n  <div class=\"float-right paddingTop-15\">\r\n    <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n      <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.sliderTable?.totalPages)\">\r\n        <mat-option value=\"5\">5</mat-option>\r\n        <mat-option value=\"10\">10</mat-option>\r\n        <mat-option value=\"25\">25</mat-option>\r\n        <mat-option value=\"50\">50</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <span class=\"float-right\">\r\n      <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n        <strong>{{commonservice.sliderTable?.pageNumber}}</strong> of\r\n        <strong>{{commonservice.sliderTable?.totalPages}}</strong> in\r\n        <strong>{{commonservice.sliderTable?.totalElements}}</strong> sliders</span>\r\n      <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.sliderTable?.pageNumber)\">\r\n        <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n      </button>\r\n      <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.sliderTable?.pageNumber, commonservice.sliderTable?.totalPages)\">\r\n        <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n      </button>\r\n    </span>\r\n  </div>\r\n\r\n</div>\r\n\r\n<!-- VIEW: ADD/EDIT SLIDER -->\r\n<div *ngIf=\"viewSeq == 2\" class=\"container right-content\">\r\n  <div class=\"col-md-12\">\r\n    <h2 class=\"staticLabel\">{{ pageMode }} Slider</h2>\r\n    <span class=\"pull-right backBtn\">\r\n      <a class=\"font-size-s\" (click)=\"navigateBack()\">\r\n        <i class=\"fa fa-chevron-left font-size-m\"></i> BACK\r\n      </a>\r\n      <!-- <button type=\"button\" mat-raised-button class=\"form-control btn btn-md btn-info font-size-s\" (click)=\"navigateBack()\">\r\n        <i class=\"fa fa-chevron-left font-size-m\"></i> BACK\r\n      </button> -->\r\n      <br />\r\n    </span>\r\n  </div>\r\n\r\n  <form [formGroup]=\"sliderForm\" autocomplete=\"off\" role=\"form\" novalidate>\r\n  \r\n      <!-- EN -->\r\n      <div class=\"example-container mat-elevation-z8 col-md-12\">\r\n        <div class=\"row\">\r\n          <div class=\"bg-form-header col-md-6\">\r\n            <label class=\"staticLabel font-size-s boldText\">English</label>\r\n          </div>\r\n          <div class=\"bg-form-header col-md-6\">\r\n            <label class=\"staticLabel font-size-s boldText\">Bahasa Malaysia</label>\r\n          </div>\r\n        </div>\r\n  \r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">&nbsp;</div>\r\n          <div class=\"col-md-6\">\r\n            <mat-form-field class=\"example-full-width font-size-s paddingTop-10\">\r\n              <input matInput placeholder=\"Title\" formControlName=\"titleEn\" (change)=\"checkReqValues()\"\r\n                required>\r\n              <mat-error *ngIf=\"sliderForm.controls.titleEn.hasError('required')\">\r\n                Title is required\r\n              </mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <mat-form-field class=\"example-full-width font-size-s paddingTop-10\">\r\n              <input matInput placeholder=\"Title\" formControlName=\"titleBm\" value=\"\" (change)=\"checkReqValues()\"\r\n                required>\r\n              <mat-error *ngIf=\"sliderForm.controls.titleBm.hasError('required')\">\r\n                Title is required\r\n              </mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n        </div>\r\n  \r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <mat-form-field class=\"example-full-width font-size-s paddingTop-10\">\r\n              <textarea matInput placeholder=\"Description\" formControlName=\"descEn\" #descEn maxLength=\"10000\" (change)=\"checkReqValues()\"\r\n                required></textarea>\r\n              <mat-error *ngIf=\"sliderForm.controls.descEn.hasError('required')\">\r\n                Description is required\r\n              </mat-error>\r\n              <mat-hint align=\"end\">{{descEn.value?.length || 0}}/10000</mat-hint>\r\n            </mat-form-field>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <mat-form-field class=\"example-full-width font-size-s paddingTop-10\">\r\n              <textarea matInput placeholder=\"Description\" formControlName=\"descBm\" #descBm maxLength=\"10000\" (change)=\"checkReqValues()\"\r\n                required></textarea>\r\n              <mat-error *ngIf=\"sliderForm.controls.descBm.hasError('required')\">\r\n                Description is required\r\n              </mat-error>\r\n              <mat-hint align=\"end\">{{descBm.value?.length || 0}}/10000</mat-hint>\r\n              <!-- <mat-error *ngIf=\"!validateCtrlChk(feedback_message) && feedbackFormgrp.controls.feedback_message.errors.required\">{{'feedback.err.drop' | translate }}</mat-error> -->\r\n            </mat-form-field>\r\n          </div>\r\n          <div class=\"col-md-12\">&nbsp;</div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <label class=\"font-size-s\">Slider Image</label>\r\n            </div>\r\n          <div class=\"col-md-5\" style=\"border: 0px solid #000\">\r\n            <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <mat-select formControlName=\"imgEn\" placeholder=\"Select Image\" (change)=\"checkReqValues()\" required>\r\n                      <!-- <mat-option *ngFor=\"let imgd of imgData\" [value]=\"imgd?.imgName\">imgName</mat-option> -->\r\n                      <mat-option [value]=\"1\">image1.png</mat-option>\r\n                      <mat-option [value]=\"2\">image2.jpg</mat-option>\r\n                      <mat-option [value]=\"3\">image3.png</mat-option>\r\n                  </mat-select>\r\n                <mat-error *ngIf=\"sliderForm.get('imgEn').hasError('required')\">\r\n                  Please select a file\r\n                </mat-error>\r\n                <!-- <mat-error *ngIf=\"sliderForm.get('imgEn').hasError('maxContentSize')\">\r\n                  The total size must not exceed {{sliderForm.get('imgEn')?.getError('maxContentSize').maxSize | byteFormat}}\r\n                  ({{sliderForm.get('imgEn')?.getError('maxContentSize').actualSize | byteFormat}}).\r\n                </mat-error> -->\r\n            </mat-form-field>\r\n          </div>\r\n          <div class=\"col-md-2\" style=\"text-align: center; padding-top: 15px;\">\r\n              <mat-checkbox formControlName=\"copyImg\" (change)=\"isChecked($event)\"></mat-checkbox><span class=\"font-size-s\">&nbsp;Copy</span>\r\n          </div>\r\n          <div class=\"col-md-5\" style=\"border: 0px solid #000; text-align: left\">\r\n            <mat-form-field class=\"example-full-width font-size-s\">\r\n              <mat-select formControlName=\"imgBm\" placeholder=\"Select Image\" (change)=\"checkReqValues()\" required>\r\n                  <!-- <mat-option *ngFor=\"let imgd of imgData\" [value]=\"imgd?.imgName\">imgName</mat-option> -->\r\n                  <mat-option [value]=\"1\">image1.png</mat-option>\r\n                  <mat-option [value]=\"2\">image2.jpg</mat-option>\r\n                  <mat-option [value]=\"3\">image3.png</mat-option>\r\n              </mat-select>\r\n            <mat-error *ngIf=\"sliderForm.get('imgBm').hasError('required')\">\r\n              Please select a file\r\n            </mat-error>\r\n                <!-- <mat-error *ngIf=\"sliderForm.get('imgEn').hasError('maxContentSize')\">\r\n                  The total size must not exceed {{sliderForm.get('imgEn')?.getError('maxContentSize').maxSize | byteFormat}}\r\n                  ({{sliderForm.get('imgEn')?.getError('maxContentSize').actualSize | byteFormat}}).\r\n                </mat-error> -->\r\n            </mat-form-field>\r\n          </div>\r\n          <div class=\"col-md-1\">\r\n            &nbsp;\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">&nbsp;</div>\r\n          <div class=\"col-md-12\">\r\n            <mat-checkbox formControlName=\"active\" (change)=\"checkReqValues()\"></mat-checkbox><span class=\"font-size-s\">&nbsp;Active</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-12\">&nbsp;</div>\r\n      </div>\r\n  \r\n      <!-- <div class=\"container\"> -->\r\n      <div class=\"col-md-12\">&nbsp;</div>\r\n        <div class=\"col-md-12 form-group\">\r\n          <button mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s pull-right\"\r\n            (click)=\"updateSlider(sliderForm.value)\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\" [disabled]=\"!complete\">\r\n            <i *ngIf=\"complete\" class=\"fa fa-check\"></i>\r\n            <i *ngIf=\"!complete\" class=\"fa fa-times\"></i> Update</button>\r\n          <button mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s pull-right\"\r\n            style=\"width: 100px; font-family: Roboto\" (click)=\"myFunction()\">\r\n            <i class=\"fa fa-refresh\"></i>Reset</button>\r\n        </div>\r\n      <div class=\"col-md-12\">&nbsp;</div>\r\n    <!-- </div> -->\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/slider/slider.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var SliderComponent = (function () {
    // tslint:disable-next-line:max-line-length
    function SliderComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.sliderList = null;
        this.sliderPageSize = 10;
        this.sliderPageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.date = new Date();
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["E" /* MatTableDataSource */](this.sliderList);
        this.resetMsg = this.resetMsg;
        this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
    }
    SliderComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    SliderComponent.prototype.ngOnInit = function () {
        this.viewSeq = 1;
        this.isEdit = false;
        this.changePageMode(this.isEdit);
        this.displayedColumns = ['slideCode', 'slideTitleEn', 'slideTitleBm', 'slideActiveFlag', 'slideAction'];
        // this.displayedColumns2 = ['sliderId', 'fullName', 'pid', 'sliderTypeId', 'isStaff', 'accountStatusId'];
        // this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
        // this.complete = false;
        this.titleEn = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.titleBm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.descEn = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.descBm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.imgEn = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.imgBm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.active = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.copyImg = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        // this.email = new FormControl('', Validators.pattern(EMAIL_REGEX))
        this.sliderForm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormGroup */]({
            titleEn: this.titleEn,
            descEn: this.descEn,
            imgEn: this.imgEn,
            titleBm: this.titleBm,
            descBm: this.descBm,
            imgBm: this.imgBm,
            active: this.active,
            copyImg: this.copyImg
        });
    };
    SliderComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    // get Slider Data 
    SliderComponent.prototype.getSlidersData = function (count, size) {
        var _this = this;
        // console.log(this.appConfig.urlsliderList + '/?page=' + count + '&size=' + size)
        this.dataUrl = this.appConfig.urlSlides;
        this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
        // this.http.get(this.dataUrl).subscribe(
        function (data) {
            _this.sliderList = data;
            console.log(_this.sliderList);
            _this.dataSource.data = _this.sliderList.slideCodeList;
            _this.commonservice.sliderTable = _this.sliderList;
            _this.noNextData = _this.sliderList.pageNumber === _this.sliderList.totalPages;
        });
    };
    SliderComponent.prototype.paginatorL = function (page) {
        this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    SliderComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getSlidersData(page + 1, this.sliderPageSize);
    };
    SliderComponent.prototype.pageChange = function (event, totalPages) {
        this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
        this.sliderPageSize = event.value;
        this.noPrevData = true;
    };
    SliderComponent.prototype.changePageMode = function (isEdit) {
        if (isEdit == false) {
            this.pageMode = "Add";
        }
        else if (isEdit == true) {
            this.pageMode = "Update";
        }
    };
    SliderComponent.prototype.onPaginateChange = function (event) {
        // alert(JSON.stringify(event));
        //  const startIndex = event.pageIndex * event.pageSize;
        // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
        // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
    };
    SliderComponent.prototype.addBtn = function () {
        this.viewSeq = 2;
        // console.log(this.viewSeq);
        // this.router.navigate(['slider', "add"]);
    };
    SliderComponent.prototype.navigateBack = function () {
        this.viewSeq = 1;
        this.router.navigate(['slider']);
    };
    // add, update, delete
    SliderComponent.prototype.updateRow = function (row) {
        var _this = this;
        // this.router.navigate(['slider', row]);
        this.viewSeq = 2;
        // alert("Update Slider id: " + row);
        this.isEdit = true;
        this.changePageMode(this.isEdit);
        // Update Slider Service
        return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(function (Rdata) {
            _this.sliderData = Rdata;
            console.log(_this.sliderData);
            console.log(_this.appConfig.urlSlides + '/' + row);
            var dataEn = _this.sliderData['slideList'][0];
            var dataBm = _this.sliderData['slideList'][1];
            // populate data
            _this.sliderForm.get('titleEn').setValue(dataEn.slideTitle);
            _this.sliderForm.get('descEn').setValue(dataEn.slideDescription);
            _this.sliderForm.get('imgEn').setValue(dataEn.slideImage);
            _this.sliderForm.get('titleBm').setValue(dataBm.slideTitle);
            _this.sliderForm.get('descBm').setValue(dataBm.slideDescription);
            _this.sliderForm.get('imgBm').setValue(dataBm.slideImage);
            _this.sliderForm.get('active').setValue(dataEn.slideActiveFlag);
            _this.slideCode = _this.sliderData['slideList'][0]['slideCode'];
            _this.slideIdEn = dataEn.slideId;
            _this.slideIdBm = dataBm.slideId;
            // this.copyImg
        });
    };
    SliderComponent.prototype.isChecked = function (e) {
        if (e.checked) {
            this.sliderForm.get("imgBm").setValue(this.sliderForm.get("imgEn").value);
            // console.log(e.checked)
        }
        else {
            this.sliderForm.get("imgBm").setValue("");
        }
        this.copyImg = e.checked;
    };
    SliderComponent.prototype.checkReqValues = function () {
        var titleEn = "titleEn";
        var descEn = "descEn";
        var imgEn = "imgEn";
        var titleBm = "titleBm";
        var descBm = "descBm";
        var imgBm = "imgBm";
        var active = "active";
        var reqVal = [titleEn, descEn, imgEn, titleBm, descBm, imgBm, active];
        var nullPointers = [];
        for (var _i = 0, reqVal_1 = reqVal; _i < reqVal_1.length; _i++) {
            var reqData = reqVal_1[_i];
            var elem = this.sliderForm.get(reqData);
            if (elem.value == "" || elem.value == null) {
                elem.setValue(null);
                nullPointers.push(null);
            }
        }
        if (nullPointers.length > 0) {
            this.complete = false;
        }
        else {
            this.complete = true;
            // this.toastr.error(this.translate.instant('Country error!'), '');
        }
    };
    SliderComponent.prototype.myFunction = function () {
        var txt;
        var r = confirm("Are you sure to reset the form?");
        if (r == true) {
            txt = "You pressed OK!";
            this.sliderForm.reset();
        }
        else {
            txt = "You pressed Cancel!";
        }
    };
    SliderComponent.prototype.deleteRow = function (enId, bmId) {
        var _this = this;
        var txt;
        var r = confirm("Are you sure to delete " + enId + " & " + bmId + "?");
        if (r == true) {
            this.commonservice.delSlider(enId, bmId).subscribe(function (data) {
                txt = "Slider deleted successfully!";
                _this.router.navigate(['slider']);
            }, function (error) {
                console.log("No Data");
            });
            // this.sliderForm.reset();
        }
        else {
            txt = "Delete Cancelled!";
            alert(txt);
        }
    };
    SliderComponent.prototype.updateSlider = function (formValues) {
        // console.log(this.viewSeq);
        var body = [
            {
                "slideId": null,
                "slideTitle": null,
                "slideDescription": null,
                "slideImage": null,
                "slideCode": null,
                "slideSort": null,
                "slideActiveFlag": false,
                "language": {
                    "languageId": null
                }
            },
            {
                "slideId": null,
                "slideTitle": null,
                "slideDescription": null,
                "slideImage": null,
                "slideCode": null,
                "slideSort": null,
                "slideActiveFlag": false,
                "language": {
                    "languageId": null
                }
            }
        ];
        // console.log(formValues)
        body[0].slideTitle = formValues.titleEn;
        body[0].slideDescription = formValues.descEn;
        body[0].slideImage = "enImg.png";
        body[0].slideCode = null;
        body[0].slideSort = null;
        body[0].slideActiveFlag = formValues.active;
        body[0].language.languageId = 1;
        body[1].slideTitle = formValues.titleBm;
        body[1].slideDescription = formValues.descBm;
        body[1].slideImage = "bmImg.jpg";
        body[1].slideCode = null;
        body[1].slideSort = null;
        body[1].slideActiveFlag = formValues.active;
        body[1].language.languageId = 2;
        console.log(body);
        // console.log(JSON.stringify(body))
        if (!this.isEdit) {
            // Add Slider Service
            this.commonservice.addSlider(body).subscribe(function (data) {
                alert('Slider added successfully!');
            }, function (error) {
                console.log("No Data");
            });
        }
        else {
            body[0].slideId = this.slideIdEn;
            body[1].slideId = this.slideIdBm;
            body[0].slideCode = this.slideCode;
            body[1].slideCode = this.slideCode;
            // Update Slider Service
            this.commonservice.updateSlider(body).subscribe(function (data) {
                alert('Slider update successful!');
            }, function (error) {
                console.log("No Data");
            });
        }
        this.router.navigate(['slider']);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatPaginator */])
    ], SliderComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["B" /* MatSort */])
    ], SliderComponent.prototype, "sort", void 0);
    SliderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-slider',
            template: __webpack_require__("../../../../../src/app/slider/slider.component.html"),
            styles: [__webpack_require__("../../../../../src/app/slider/slider.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_4__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
    ], SliderComponent);
    return SliderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/user/user.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html {\r\n    font-family: Roboto,\"Helvetica Neue\",sans-serif;\r\n    font-size: inherit;\r\n}\r\n\r\n.right-content {\r\n    width: 100%;\r\n}\r\n\r\nform {\r\n    width: 100%;\r\n}\r\n\r\n.formbg {    \r\n    border: 1px solid #dedede;\r\n    border-radius: 5px;\r\n    background: #fff;\r\n    background-color: #eeeeee;\t\r\n    color: #000;\r\n    margin-top: 15px;\r\n    margin-bottom: 1%;\r\n    box-shadow: #eeeeee 0px 0px 10px 0px;\r\n}\r\n\r\n.formbg label {\r\n    color : rgb(0, 0, 0);\r\n    /* rgb(179, 179, 179); */\r\n    margin-bottom: 0px;\r\n}\r\n\r\nlabel {\r\n    color: rgba(0,0,0,0.70);\r\n    margin-bottom: 0px;\r\n}\r\n\r\n.thinText {\r\n    font-weight: 400;\r\n}\r\n\r\n.semiBoldText {\r\n    font-weight: 500;\r\n}\r\n\r\n.boldText {\r\n    font-weight: bold;\r\n}\r\n\r\n.staticLabel{\r\n    /* font: inherit; */\r\n    text-transform: uppercase;\r\n}\r\n\r\n.form-header {\r\n    padding: 10px;\r\n    background: transparent;\r\n    border-bottom: 1px solid #ccc;\r\n}\r\n\r\n.form-header-dark {\r\n    padding: 10px;\r\n    background: #dbdbdb;\r\n    /* margin-bottom: 1%; */\r\n}\r\n\r\n/* .form-header {\r\n    background: #dbdbdb;\r\n    text-shadow: 0 1px 0 #f5f5f5;\r\n    border-bottom: 1px solid #ccc;\r\n    -moz-border-radius-topleft: 3px;\r\n    -webkit-border-top-left-radius: 3px;\r\n    border-top-left-radius: 3px;\r\n    -moz-border-radius-topright: 3px;\r\n    -webkit-border-top-right-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n    margin-bottom: 1%;\r\n} */\r\n\r\n/* .form-group {\r\n    padding: 10px;\r\n} */\r\n\r\n.example-full-width {\r\n    width: 100%;\r\n}\r\n\r\n.closer-top {\r\n    margin-bottom: -1%; margin-top: -8%;\r\n}\r\n\r\n.close-top {\r\n    margin-bottom: -1%; margin-top: -3%;\r\n}\r\n\r\n.font-size-xx-s {\r\n    font-size: xx-small\r\n}\r\n\r\n.font-size-x-s {\r\n    font-size: x-small\r\n}\r\n\r\n.font-size-xs {\r\n    font-size: smaller\r\n}\r\n\r\n.font-size-s {\r\n    font-size: small\r\n}\r\n\r\n.font-size-m {\r\n    font-size: medium\r\n}\r\n\r\n.font-size-l {\r\n    font-size: large\r\n}\r\n\r\n.font-size-xl {\r\n    font-size: x-large\r\n}\r\n\r\n.font-size-xxl {\r\n    font-size: xx-large\r\n}\r\n\r\n.marginTop-10 {\r\n    margin-top: 10px;\r\n}\r\n\r\n.paddingTop-10 {\r\n    padding-top: 10px;\r\n}\r\n\r\n.paddingTop-15 {\r\n    padding-top: 15px;\r\n}\r\n\r\n.mat-form-field-placeholder-wrapper {\r\n    position: absolute;\r\n    left: 0;\r\n    box-sizing: content-box;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: hidden;\r\n    pointer-events: none;\r\n    /* font-weight: 500; */\r\n}\r\n\r\n.mat-error {\r\n    font-size: small;\r\n    display: block;\r\n    /* margin-top: -2%; */\r\n}\r\n\r\n/* Structure */\r\n.example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    min-width: 300px;\r\n  }\r\n  \r\n  .example-header {\r\n    min-height: 64px;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: baseline;\r\n        -ms-flex-align: baseline;\r\n            align-items: baseline;\r\n    padding: 8px 24px 0;\r\n    font-size: 20px;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n  }\r\n  \r\n  /* .mat-form-field {\r\n    font-size: 14px;\r\n    flex-grow: 1;\r\n    margin-left: 32px;\r\n  } */\r\n  \r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 500px;\r\n  }\r\n\r\n  .mat-form-field-placeholder {\r\n    color: rgba(0,0,0,1);\r\n  }\r\n\r\n  .backTitle {\r\n    margin-left: -2%;\r\n      cursor: pointer;\r\n  }\r\n\r\n  .backTitle:hover {\r\n    margin-left: -2%;\r\n      color: #ff4081;\r\n      cursor: pointer;\r\n  }\r\n\r\n  .mat-mini-fab:not([class*=mat-elevation-z]) {\r\n    box-shadow: 0 3px 5px -1px rgba(0,0,0,0), 0 6px 10px 0 rgba(0,0,0,0), 0 1px 18px 0 rgba(0,0,0,0); \r\n  }\r\n\r\n  .editBtn-color {\r\n      background: orange;\r\n  }\r\n\r\n  .deleteBtn-color {\r\n      background: red;\r\n  }\r\n\r\n  .mat-cell, .mat-header-cell {\r\n    -webkit-box-flex: 0;\r\n        -ms-flex: 0;\r\n            flex: 0;\r\n    overflow: hidden;\r\n    /* word-wrap: break-word; */\r\n  }\r\n  \r\n  .editBtn{\r\n      position: absolute;\r\n      right: 10px;\r\n      top: 65%;\r\n    }\r\n  \r\n.editBtn:hover {\r\n    position: absolute;\r\n    background-color: rgb(109, 185, 38);\r\n    color: #FFF;\r\n    right: 10px;\r\n    top: 65%;\r\n  }\r\n  \r\n  .editBtn-active {\r\n    position: absolute;\r\n    background-color: rgb(109, 185, 38);\r\n    color: #FFF;\r\n    right: 10px;\r\n    top: 65%;\r\n  }\r\n\r\n  .mat-fab .mat-button-wrapper {\r\n    padding: 18px 2px 15px 0px;\r\n    display: inline-block;\r\n    line-height: 24px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user/user.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"viewSeq == 1\" class=\"container right-content\">\r\n  <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n    <h1 class=\"paddingTop-15 staticLabel\">Admin User Management</h1>\r\n    <span class=\"pull-right editBtn\">\r\n      <button type=\"button\" mat-fab color=\"warn\" (click)=\"add()\" [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive  }\">&nbsp;<i class=\"fa fa-plus font-size-l\"></i></button>\r\n    </span>\r\n  </div>  \r\n  \r\n  <div class=\"example-container mat-elevation-z8\">\r\n    <!-- <div class=\"example-header\">\r\n      <mat-form-field>\r\n        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n      </mat-form-field>\r\n    </div> -->\r\n  \r\n    <mat-table #table [dataSource]=\"dataSource\">\r\n      <!-- fullName Column -->\r\n      <ng-container matColumnDef=\"userId\">\r\n        <mat-header-cell *matHeaderCellDef>No.</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.userId}} </mat-cell>\r\n      </ng-container>\r\n  \r\n      <!-- fullName Column -->\r\n      <ng-container matColumnDef=\"fullName\">\r\n        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" (click)=\"getRow(element)\"> {{element.fullName}} </mat-cell>\r\n      </ng-container>\r\n  \r\n      <!-- User Type Column -->\r\n      <ng-container matColumnDef=\"userTypeId\">\r\n        <mat-header-cell *matHeaderCellDef> Group Module </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"> {{element.userTypeId}} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui nemo rerum eligendi molestiae quaerat deserunt autem commodi, ipsum aspernatur odit veritatis voluptatibus voluptatem, repudiandae optio. Quasi, dignissimos cumque. Facere, hic?</mat-cell>\r\n      </ng-container>\r\n  \r\n      <!-- Action Column -->\r\n      <ng-container matColumnDef=\"accountStatusId\">\r\n        <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\"><button mat-mini-fab style=\"background: orange\" title=\"Update {{ element.userId }}\"><i class=\"fa fa-edit\" (click)=\"updateRow(element.userId)\"></i></button>&nbsp;<button mat-mini-fab style=\"background: red\"><i class=\"fa fa-trash\" (click)=\"deleteRow(element.userId)\" title=\"Delete {{ element.userId }}\"></i></button></mat-cell>\r\n      </ng-container>\r\n  \r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n    </mat-table>\r\n  \r\n  </div>\r\n  \r\n  <div class=\"float-right paddingTop-15\">\r\n    <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n      <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.userTable?.totalPages)\">\r\n        <mat-option value=\"5\">5</mat-option>\r\n        <mat-option value=\"10\">10</mat-option>\r\n        <mat-option value=\"25\">25</mat-option>\r\n        <mat-option value=\"50\">50</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <span class=\"float-right\">\r\n      <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n        <strong>{{commonservice.userTable?.pageNumber}}</strong> of\r\n        <strong>{{commonservice.userTable?.totalPages}}</strong> in\r\n        <strong>{{commonservice.userTable?.totalElements}}</strong> users</span>\r\n      <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.userTable?.pageNumber)\">\r\n        <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n      </button>\r\n      <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.userTable?.pageNumber, commonservice.userTable?.totalPages)\">\r\n        <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n      </button>\r\n    </span>\r\n  </div>\r\n  \r\n  </div>\r\n\r\n  <!-- VIEW SEQUENCE 2 -->\r\n  <div *ngIf=\"viewSeq == 2\" class=\"container right-content\">\r\n    <div class=\"col-md-12\" style=\"padding: 10px 10px 10px 0px; border: 0px solid #000\">\r\n      <h1 class=\"paddingTop-15 staticLabel\">Admin Users</h1>\r\n      <span class=\"pull-right editBtn\">\r\n        <button type=\"button\" mat-fab color=\"warn\" (click)=\"add()\" [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive  }\">&nbsp;<i class=\"fa fa-plus font-size-l\"></i></button>\r\n      </span>\r\n    </div>\r\n    \r\n    <div class=\"example-container mat-elevation-z8\">\r\n      <div class=\"col-md-12\">\r\n        <mat-form-field class=\"example-full-width\">\r\n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n        </mat-form-field>\r\n      </div>\r\n    \r\n      <mat-table #table [dataSource]=\"dataSource\">\r\n        <!-- fullName Column -->\r\n        <ng-container matColumnDef=\"userId\">\r\n          <mat-header-cell *matHeaderCellDef>No.</mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\" style=\"text-align: left\"> {{element.userId}} </mat-cell>\r\n        </ng-container>\r\n    \r\n        <!-- fullName Column -->\r\n        <ng-container matColumnDef=\"fullName\">\r\n          <mat-header-cell *matHeaderCellDef style=\"width: 25%\"> Name </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\" (click)=\"getRow(element)\"> {{element.fullName}} </mat-cell>\r\n        </ng-container>\r\n    \r\n        <!-- ICNO Column -->\r\n        <ng-container matColumnDef=\"pid\">\r\n          <mat-header-cell *matHeaderCellDef style=\"width: 10%\"> ICNO </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\"> {{element.pid}} </mat-cell>\r\n        </ng-container>\r\n    \r\n        <!-- User Type Column -->\r\n        <ng-container matColumnDef=\"userTypeId\">\r\n          <mat-header-cell *matHeaderCellDef style=\"width: 25%\"> Email </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\"> {{element.email}}</mat-cell>\r\n        </ng-container>\r\n    \r\n        <!-- Account Status Column -->\r\n        <ng-container matColumnDef=\"isStaff\">\r\n          <mat-header-cell *matHeaderCellDef style=\"text-align: center; width: 10%\"> Account Status </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\" style=\"text-align: center\">\r\n            <span *ngIf=\"element.isStaff == false\" style=\"color: red\">Inactive</span>\r\n            <span *ngIf=\"element.isStaff == true\" style=\"color: green\">Active</span>\r\n          </mat-cell>\r\n        </ng-container>\r\n  \r\n        <!-- Action Column -->\r\n        <ng-container matColumnDef=\"accountStatusId\">\r\n          <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\"><button mat-mini-fab style=\"background: orange\" title=\"Update {{ element.userId }}\"><i class=\"fa fa-edit\" (click)=\"updateRow(element.userId)\"></i></button>&nbsp;<button mat-mini-fab style=\"background: red\"><i class=\"fa fa-trash\" (click)=\"deleteRow(element.userId)\" title=\"Delete {{ element.userId }}\"></i></button></mat-cell>\r\n        </ng-container>\r\n    \r\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n      </mat-table>\r\n    \r\n    </div>\r\n    \r\n    <div class=\"float-right paddingTop-15\">\r\n      <mat-form-field style=\"width:50px; margin-top: -10px\">\r\n        <mat-select class=\"font-size-s\" value=\"10\" style=\"text-align: center;\" (change)=\"pageChange($event, commonservice.userTable?.totalPages)\">\r\n          <mat-option value=\"5\">5</mat-option>\r\n          <mat-option value=\"10\">10</mat-option>\r\n          <mat-option value=\"25\">25</mat-option>\r\n          <mat-option value=\"50\">50</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <span class=\"float-right\">\r\n        <span style=\"color:#000; padding-left:20px; padding-right:20px;\">Pages\r\n          <strong>{{commonservice.userTable?.pageNumber}}</strong> of\r\n          <strong>{{commonservice.userTable?.totalPages}}</strong> in\r\n          <strong>{{commonservice.userTable?.totalElements}}</strong> users</span>\r\n        <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(commonservice.userTable?.pageNumber)\">\r\n          <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n        </button>\r\n        <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(commonservice.userTable?.pageNumber, commonservice.userTable?.totalPages)\">\r\n          <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n        </button>\r\n      </span>\r\n    </div>\r\n    \r\n    </div>"

/***/ }),

/***/ "../../../../../src/app/user/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_common_service__ = __webpack_require__("../../../../../src/app/service/common.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






// import { ToastrService } from "ngx-toastr";
var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var UserComponent = (function () {
    // tslint:disable-next-line:max-line-length
    function UserComponent(http, appConfig, commonservice, router) {
        this.http = http;
        this.appConfig = appConfig;
        this.commonservice = commonservice;
        this.router = router;
        this.userList = null;
        this.userPageSize = 10;
        this.userPageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.viewSeq = 1; /* View Page Sequence Based on Discussion {1,2} */
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["E" /* MatTableDataSource */](this.userList);
        this.getUserList(this.userPageCount, this.userPageSize);
    }
    UserComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    UserComponent.prototype.ngOnInit = function () {
        this.viewSeq = 2; /* View Page change by {1,2} */
        if (this.viewSeq == 1) {
            this.displayedColumns = ['userId', 'fullName', 'userTypeId', 'accountStatusId'];
        }
        else if (this.viewSeq == 2) {
            this.displayedColumns = ['userId', 'fullName', 'pid', 'userTypeId', 'isStaff', 'accountStatusId'];
        }
        this.getUserList(this.userPageCount, this.userPageSize);
        // console.log(this.dataSource)
    };
    UserComponent.prototype.getUserList = function (count, size) {
        var _this = this;
        // console.log(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)
        // if(this.viewSeq == 1)
        this.dataUrl = this.appConfig.urlUserList;
        // else if(this.viewSeq == 2)
        // this.dataUrl = this.appConfig.urlUsers;
        this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(function (data) {
            _this.userList = data;
            console.log(_this.userList);
            _this.dataSource.data = _this.userList.userList;
            _this.commonservice.userTable = _this.userList;
            // this.noNextData = this.userList.pageNumber === this.userList.totalPages;
        });
    };
    UserComponent.prototype.paginatorL = function (page) {
        this.getUserList(page - 1, this.userPageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    UserComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc;
        pageInc = page + 1;
        // this.noNextData = pageInc === totalPages;
        this.getUserList(page + 1, this.userPageSize);
    };
    UserComponent.prototype.getRow = function (row) {
        console.log(row);
        this.commonservice.GetUser(row.userId);
    };
    UserComponent.prototype.add = function () {
        // console.log();
        alert("Add Admin User");
        // this.commonservice.GetUser(row.userId);
    };
    UserComponent.prototype.updateRow = function (row) {
        this.viewSeq = 2;
        console.log(this.viewSeq);
        console.log(row);
        alert("Update user id: " + row);
        // this.commonservice.GetUser(row.userId);
    };
    UserComponent.prototype.deleteRow = function (row) {
        console.log(row);
        alert("Delete user id: " + row);
        // this.commonservice.GetUser(row.userId);
    };
    // tslint:disable-next-line:use-life-cycle-interface
    UserComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    UserComponent.prototype.pageChange = function (event, totalPages) {
        this.getUserList(this.userPageCount, event.value);
        this.userPageSize = event.value;
        this.noPrevData = true;
    };
    UserComponent.prototype.onPaginateChange = function (event) {
        // alert(JSON.stringify(event));
        //  const startIndex = event.pageIndex * event.pageSize;
        // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
        // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["q" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["q" /* MatPaginator */])
    ], UserComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["B" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_material__["B" /* MatSort */])
    ], UserComponent.prototype, "sort", void 0);
    UserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user',
            template: __webpack_require__("../../../../../src/app/user/user.component.html"),
            styles: [__webpack_require__("../../../../../src/app/user/user.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewEncapsulation */].None,
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__config_app_config_module__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__config_app_config_module__["b" /* AppConfig */], __WEBPACK_IMPORTED_MODULE_1__service_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "../../../../../src/assets/fonts/Roboto/Roboto-Light.ttf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Roboto-Light.fc84e998bc29b297ea20.ttf";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map