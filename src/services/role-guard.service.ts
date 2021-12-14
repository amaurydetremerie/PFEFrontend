import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: MsalService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.instance.acquireTokenSilent({
      scopes: ['user.read'],
      account: this.authService.instance.getAllAccounts()[0]
    }).then(response => {
            // @ts-ignore
      return response.idTokenClaims.roles.filter((x: string) => x === ('administrator')).length>0;
    });
  }
}