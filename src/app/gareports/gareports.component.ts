import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { ChartReadyEvent } from 'ng2-google-charts';
import { ChartErrorEvent } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';
import { ChartMouseOverEvent, ChartMouseOutEvent } from 'ng2-google-charts'
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'gosg-gareports',
  templateUrl: './gareports.component.html',
  styleUrls: ['./gareports.component.css']
})
export class GareportsComponent implements OnInit {
  result: any;
  @ViewChild('cchart') cchart;
  public selectEvent: ChartSelectEvent;
  publish: FormControl;
  endD: FormControl;
  gaForm: FormGroup;
  dimensions: FormControl;
  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  stDate:any;
  endDate:any;
  st_Date:any;
  end_Date:any;
  publishdt:number;
  enddt: number;
  minDate: any;
  sMinDate: any;
  eMinDate: any;

  private columnChartData:any = {
    chartType: 'ColumnChart',
    dataTable: [],
    options: {title: 'Countries'}
  };
  dimension: any;

  constructor(private http:  HttpClient) { }



  headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});

  ngOnInit() {
    this.publish = new FormControl();
    this.endD = new FormControl();
    this.dimensions = new FormControl();

    this.gaForm = new FormGroup({
      publish: this.publish,
      endD: this.endD,
      dimensions: this.dimensions
    });
    // this.getGA('2018-08-10', '2018-10-01', 'ga:city');

  }

  getGAReport(frmDt, endDt, opt, token){

    return this.http.get(`https://www.googleapis.com/analytics/v3/data/ga?ids=${environment.googleId}&start-date=${frmDt}&end-date=${endDt}&metrics=ga%3Ausers&dimensions=ga:${opt}&access_token=${token}&max-results=10`)
      .subscribe(
        data => {
          this.columnChartData.dataTable=[];
          if(data['totalResults'] !== 0){
            this.columnChartData = Object.create(this.columnChartData);
            this.columnChartData.options.title = this.gaForm.get('dimensions').value;
            this.columnChartData.dataTable.push(['Country', 'Count']);
            console.log(this.columnChartData.dataTable);
            for (var i = 0; i <= data['rows'].length; i++) {

              if((data['rows'][i] != undefined)){
                this.columnChartData.dataTable.push([data['rows'][i][0], parseInt(data['rows'][i][1])])
              }
            }
          }else{
            this.columnChartData = Object.create(this.columnChartData);
            this.columnChartData.options.title = "Record Not Found";
            // this.columnChartData = Object.create(this.columnChartData);
          }
        }, error => {
          console.log(error);
        }
      )
  }

  getGAReportTable(frmDt, endDt, opt, token){

    return this.http.get(`https://www.googleapis.com/analytics/v3/data/ga?ids=${environment.googleId}&start-date=${frmDt}&end-date=${endDt}&metrics=ga%3Ausers&dimensions=ga:${opt},ga:date&access_token=${token}`)
      .subscribe(
        data => {
          console.log(data)

        }, error => {
          console.log(error);
        }
      )
  }

  public changeData():void {
    this.getGA(this.st_Date, this.end_Date, this.dimension);
  }




  getGA(frmDt, endDt, opt){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(`https://www.googleapis.com/oauth2/v4/token?client_id=${environment.gaClientId}&client_secret=${environment.gaSecret}&grant_type=refresh_token&refresh_token=${environment.gaToken}`,'', httpOptions)
    .subscribe(
      data => {
        console.log(data);
        this.getGAReport(frmDt, endDt, opt, data['access_token']);
        this.getGAReportTable(frmDt, endDt, opt, data['access_token']);
      }, error => {
        console.log(error);
      }
    )
  }




  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) {
    let year, month, day;
    this.events = [];
    this.events.push(`${event.value}`);
    console.log(moment(event.value).format('YYYY-MM-DD'));

    this.publishdt = new Date(this.events[0]).getTime();
    // this.updateForm.get('publish').setValue(new Date(this.publishdt).toISOString());
    this.dateFormatExample = "";

    year = new Date(this.events[0]).getFullYear();
    month = new Date(this.events[0]).getMonth();
    day = new Date(this.events[0]).getDate();

    this.eMinDate = new Date(year,month,day);
    this.st_Date = moment(event.value).format('YYYY-MM-DD');
    if(this.publishdt>this.enddt || this.enddt == undefined || this.enddt == null){
    }
  }



  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) {
    this.events = [];
    this.events.push(`${event.value}`);
    this.enddt = new Date(this.events[0]).getTime();
    this.end_Date = moment(event.value).format('YYYY-MM-DD');
    this.dateFormatExample = "";
  }

  checkState(e){
    this.dimension = e.value;
  }




}
