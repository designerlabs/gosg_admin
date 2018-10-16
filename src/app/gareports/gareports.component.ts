import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { ChartReadyEvent } from 'ng2-google-charts';
import { ChartErrorEvent } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';
import { ChartMouseOverEvent, ChartMouseOutEvent } from 'ng2-google-charts'
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
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
    dataTable: [
      ['Country', 'Count'],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['',''],
      ['','']

    ],
    options: {title: 'Countries'}
  };
  reportArray:string[] = [];
  dimension: any;

  constructor(private http:  HttpClient) { }



  headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});

  ngOnInit() {
    this.publish = new FormControl();
    this.endD = new FormControl();

    this.gaForm = new FormGroup({
      publish: this.publish,
      endD: this.endD
    });
    this.getGA('2018-08-10', '2018-10-01', 'ga:city');

  }

  getGAReport(frmDt, endDt, opt, token){

    return this.http.get(`https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A173733410&start-date=${frmDt}&end-date=${endDt}&metrics=ga%3Ausers&dimensions=${opt}&access_token=${token}&max-results=10`)
      .subscribe(
        data => {
          console.log(data);
          this.reportArray = [];
          this.columnChartData = Object.create(this.columnChartData);
          this.columnChartData.options.title = "Cities";
          for (var i = 1; i <= data['rows'].length; i++) {

            if((data['rows'][i] != undefined)){
              this.columnChartData.dataTable[i][0] = data['rows'][i-1][0];
              this.columnChartData.dataTable[i][1] = parseInt(data['rows'][i-1][1]);
            }

            // this.columnChartData.dataTable.push(data['rows'][i]);

          }

        }, error => {
          console.log(error);
        }
      )
  }

  public changeData():void {
    console.log(this.st_Date, this.end_Date);
    this.getGA(this.st_Date, this.end_Date, this.dimension);
  }




  getGA(frmDt, endDt, opt){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this.http.post('https://www.googleapis.com/oauth2/v4/token?client_id=416088092941-sfsmok024hga24lu058dp2qqq9a1bl70.apps.googleusercontent.com&client_secret=5MMkSNzeprFRLvVXj7dQ_e-R&grant_type=refresh_token&refresh_token=1/tEnJY667GemBRAJ-MPXmI1CNnTgs-2wfs8oSrlFpXi8','', httpOptions)
    .subscribe(
      data => {
        console.log(data);
        this.getGAReport(frmDt, endDt, opt, data['access_token']);
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
      this.enddt = new Date(this.events[0]).getTime();
      // this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
      //this.enddt = null;
    }

    // this.checkReqValues()
  }



  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) {
    this.events = [];
    this.events.push(`${event.value}`);
    this.enddt = new Date(this.events[0]).getTime();
    this.end_Date = this.st_Date = moment(event.value).format('YYYY-MM-DD');
    this.dateFormatExample = "";
    // this.checkReqValues()
  }

  checkState(e){
    this.dimension = e.value;
  }




}
