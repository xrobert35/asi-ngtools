import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AsiWorkflowGuard implements CanActivate {
  //route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return route.data.state.enabled;
  }

}