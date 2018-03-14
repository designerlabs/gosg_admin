import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';


// <div>{{node.name}}</div>
//   <div *ngFor="let category of treeEn">
//   <ul>
//   <li *ngFor="let node of node.children">
//     <tree-node  [node]="node"></tree-node>
//   </li>
// </ul>
//  </div>
@Component({
  selector: 'app-list',
  template: `
hello
`,
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public loading = false;
  public categoryData: any;
  public treeEn: any;
  public treeBm: any;
  @Input() node;
  constructor(
    private commonservice: CommonService,
    private toastr: ToastrService,
   ) { }




  ngOnInit() {
 
  }

  public list = [];
  

  getCategory(){
    this.loading = true;
    return this.commonservice.readProtected('content/category')
     .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.categoryData = data["list"];   
        let arrCatEn = [];          
        let parentEn;
        let arrCatBm = [];          
        let parentBm;
        for(let i=0; i<this.categoryData.length; i++){        
          arrCatEn.push({id:this.categoryData[i].list[0].categoryId,
            refCode: this.categoryData[i].refCode,
            parent: this.categoryData[i].list[0].parentId,
            categoryName: this.categoryData[i].list[0].categoryName,
            children: []});      
                         
          arrCatBm.push({id:this.categoryData[i].list[1].categoryId,
            refCode: this.categoryData[i].refCode,
            parent: this.categoryData[i].list[1].parentId,
            categoryName: this.categoryData[i].list[1].categoryName,
            children: []}); 
          }
          
          this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          this.list.push(this.treeEn);
          this.treeBm = this.getNestedChildrenBm(arrCatBm, -2);
          // console.log(arrCatEn);
          // this.json_tree(this.treeEn);
          // document.getElementById("result").innerHTML = this.json_tree(this.treeEn);
          // console.log(JSON.stringify(this.treeEn));
          // console.log(JSON.stringify(this.treeBm));
          
        }).bind(this));
        this.loading = false;
      },
      error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.loading = false;
        console.log(error);
    });
  }

  getNestedChildrenEn(arr, parent) {
    var out = []
    var children = []

    for(var i in arr) {
    
        if(arr[i].parent == parent) {
            children = this.getNestedChildrenEn(arr, arr[i].id)

            if(children.length) {
                 arr[i].children = children
            }
            out.push(arr[i])
        }      
    }    
    return out  
  }


  getNestedChildrenBm(arr, parent) {
    var out = []
    var children = []

    for(var i in arr) {
    
        if(arr[i].parent == parent) {
            children = this.getNestedChildrenBm(arr, arr[i].id)

            if(children.length) {
                 arr[i].children = children
            }
            out.push(arr[i])
        }
      
    }    
    return out  
  }

}
