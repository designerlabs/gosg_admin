import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private commonservice: CommonService, private router: Router) { 
  }

  ngOnInit() {
  }
  
}
