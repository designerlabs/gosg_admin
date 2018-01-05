import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RolesComponent implements OnInit {

  updateForm: FormGroup

  rolespermission = ['admin | log entry | Can add log entry', 'admin | log entry | Can change log entry', 
  'admin | log entry | Can delete log entry', 'announcement | announcement | Can change announcement', 
  'announcement | announcement | Can delete announcement', 'announcement | announcement category | Can add announcement category'];

  rolesname: FormControl  
  permission: FormControl

  constructor() { }

  ngOnInit() {
    
    this.rolesname = new FormControl()
    this.permission = new FormControl()

    this.updateForm = new FormGroup({   

      rolesname: this.rolesname,
      permission: this.permission,
    });
  }

}
