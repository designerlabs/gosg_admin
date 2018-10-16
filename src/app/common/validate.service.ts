import { Injectable, Inject} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Validators, ValidatorFn } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import 'rxjs/add/operator/map';

@Injectable()

export class ValidateService {

  constructor() { }


	validateCtrl(ctrl){
        return ctrl.valid || ctrl.untouched;
	}
	
	//'email': '^[a-z0-9._]+@([a-z0-9]{2,})+\.[a-z.]{2,}$', yg asal
	getPattern(min?, max?){
		return {
			'name':'^[a-zA-Z@.&*()-+/\' ]{'+min+','+max+'}$',
			'passport':'^[a-zA-Z0-9]{'+min+','+max+'}$',
			'numberOnly': '^[0-9]{'+min+','+max+'}$',
			'alphaOnly':'^[a-zA-Z]{'+min+','+max+'}$',
			'alphaNumeric':'^[a-zA-Z0-9]{'+min+','+max+'}$',			
			'email': '^[a-z0-9._]+@([a-z0-9]{2,})[.]([a-z.]{2,})$',
			'colorCode':'^#[a-fA-F0-9]{'+min+','+max+'}$',
			'alphaSpaceHyphen':'^[a-zA-Z-\' ]{'+min+','+max+'}$',
			};
	} 
	
	getMask(){
		return {
			'telephone' : [ /[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
			'fax' : [ /[0-9]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
			'telephonef': ['+', /[0-9]/, /\d/, '-', /\d/, '-',/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
			'icno': [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
			'postcode':[/\d/, /\d/, /\d/, /\d/, /\d/],
			'dateFormat':[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
			'colorcode':['#', /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/]
		}
	}
	

}
