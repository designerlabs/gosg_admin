import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';

@Injectable()
export class NavRouterActivatorService implements CanActivate {

  constructor(public commonservice: CommonService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
           // tslint:disable-next-line:radix
           const eventExists =  !!this.commonservice.GetList(parseInt(route.params['id']));
           // tslint:disable-next-line:curly
           if (!eventExists)
                this.router.navigate(['/404']);
            return eventExists;


        }
}
