import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { debug } from 'util';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.css']
})
export class ReligionComponent implements OnInit {

  recordList = null;
  displayedColumns = ['num', 'Enreligion', 'Bmreligion', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;

  dataSource = new MatTableDataSource<object>(this.recordList);

  constructor(private http: HttpClient,) { }

  ngOnInit() {
    this.getRecordList();
  }

  getRecordList() {
  debugger;
    this.dataUrl = './app/apidata/religion.json';

    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;
      console.log(data);
      this.dataSource.data = this.recordList.religionList;      
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
    });
  }

  // getRecordList(count, size) {

  //   this.dataUrl = this.appConfig.urlReligionList;



  //   this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
  //     .subscribe(data => {
  //       this.recordList = data;

  //       console.log("data");
  //       console.log(data);

  //       this.dataSource.data = this.recordList.religionList;
  //       this.commonservice.recordTable = this.recordList;

  //       // this.dataSource.data = this.reconstruct.religionList;
  //       // this.commonservice.recordTable = this.reconstruct;
        
  //       //==============
  //       // reconstruct = [];

  //       // for(let result of this.dataSource.data){
  //       //   // reconstruct.push(result.Id);
  //       //   console.log(result);
  //       //   console.log(this.dataSource.data);
  //       // }

  //       for (let i=0; i< this.dataSource.data.length; i++) {
  //         this.found = false;
  //         for (let j=0; j< this.religionList.length; j++) {
  //             if(this.religionList[j].religionCode == this.dataSource.data[i].religionCode){
  //               if (this.dataSource.data[i].language.languageId == 2) {
  //                 this.religionList[j].malay = this.dataSource.data[i].religion;
  //               } else {
  //                 this.religionList[j].english = this.dataSource.data[i].religion;
  //               }
  //               this.found = true;
  //               break;
  //             }
  //         }

  //         if(!this.found) {
  //           if (this.dataSource.data[i].language.languageId == 2) {
  //             this.religionList.push({
  //               religionCode : this.dataSource.data[i].religionCode,
  //               malay : this.dataSource.data[i].religion,
  //               english : null,
  //             });
  //           } else {
  //             this.religionList.push({
  //               religionCode : this.dataSource.data[i].religionCode,
  //               malay : null,
  //               english : this.dataSource.data[i].religion,
  //             });
  //           }
           
  //         }

  //         // obj = {};
  //         // obj.itemId = results[i].id;
  //         // transformedResult.push(obj);
  //       }

        

  //       console.log(this.religionList);

  //       this.reconstruct.pageNumber = 1;
  //       this.reconstruct.pageSize = 10;
  //       this.reconstruct.totalPages = 1;
  //       this.reconstruct.totalElements = this.religionList.length;
  //       this.reconstruct.religionList = this.religionList;

  //       console.log(this.reconstruct);
  //       //==============
  //       this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
  //     });
  // }

  // dataSource = new MatTableDataSource<object>(this.religionList);

  // paginatorL(page) {
  //   this.getRecordList(page - 1, this.pageSize);
  //   this.noPrevData = page <= 2 ? true : false;
  //   this.noNextData = false;
  // }

  // paginatorR(page, totalPages) {
  //   this.noPrevData = page >= 1 ? false : true;
  //   let pageInc: any;
  //   pageInc = page + 1;
  //   this.getRecordList(page + 1, this.pageSize);
  // }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // pageChange(event, totalPages) {
  //   this.getRecordList(this.pageCount, event.value);
  //   this.pageSize = event.value;
  //   this.noPrevData = true;
  // }

  // add() {

  //   this.router.navigate(['poll/questions/add']);
  //   this.commonservice.pageModeChange(false);
  //   // this.commonservice.GetUser(row.userId);
  // }

  // updateRow(row) {
    
  //   console.log(row);
  //   // alert("Update pq id: "+row);
  //   this.router.navigate(['poll/questions', row]);
  //   this.commonservice.pageModeChange(true);
  //   // this.commonservice.GetUser(row.userId);
  // }

  // deleteRow(row) {
  //   console.log(row);
  //   alert("Delete pq id: "+row);
  //   // this.commonservice.GetUser(row.userId);
  // }

}
