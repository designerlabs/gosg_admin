import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { ChartReadyEvent } from 'ng2-google-charts';
import { ChartErrorEvent } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';
import { ChartMouseOverEvent, ChartMouseOutEvent } from 'ng2-google-charts'

@Component({
  selector: 'gosg-gareports',
  templateUrl: './gareports.component.html',
  styleUrls: ['./gareports.component.css']
})
export class GareportsComponent implements OnInit {
  result: any;
  @ViewChild('cchart') cchart;
  public selectEvent: ChartSelectEvent;

  public columnChartData:any;

  constructor(private http:  HttpClient) { }



  headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});

  ngOnInit() {

    this.getGA('2018-08-10', '2018-10-01', 'ga:city');
    this.columnChartData.chartType = 'ColumnChart';
    this.columnChartData.dataTable = [];
    this.columnChartData.options.title = "Users by Countries";
  }

  getGAReport(frmDt, endDt, opt, token){

    return this.http.get(`https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A173733410&start-date=${frmDt}&end-date=${endDt}&metrics=ga%3Ausers&dimensions=${opt}&access_token=${token}`)
      .subscribe(
        data => {
          console.log(data);

          for (var i = 0; i <= data['rows'].length; i++) {
            console.log('loop ' + i, data['rows'][i]);
            debugger;
            // this.columnChartData.dataTable.push(data['rows'][i]);
            this.columnChartData = Object.create(this.columnChartData);
          }

        }, error => {
          console.log(error);
        }
      )
  }

  public changeData():void {
    // forces a reference update (otherwise angular won't detect the change
    this.getGA('2018-08-10', '2018-10-01', 'ga:city');



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




}
