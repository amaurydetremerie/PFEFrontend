import {Component, OnInit, Inject, OnDestroy, Injectable} from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionType,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { RoleGuard } from '../services/role-guard.service';
import {userService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'VinciMarket';
  isIframe = false;
  loggedIn = false;
  isAdmin= false;
  // tslint:disable-next-line:variable-name
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private userservice: userService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();
    if(this.loggedIn){
      this.checkAdmin();
    }

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        this.checkAccount();
      });
  }

  // tslint:disable-next-line:typedef
  checkAccount() {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  // tslint:disable-next-line:typedef
  checkAdmin() {
    if(localStorage.getItem("isAdmin")==null){
      this.authService.instance.acquireTokenSilent({
        scopes: ['user.read'],
        account: this.authService.instance.getAllAccounts()[0]
      }).then(response => {
        localStorage.setItem("isAdmin",String(
          // @ts-ignore
          response.idTokenClaims.roles.filter((x: string) => x === ('administrator')).length>0));
          this.checkAdmin();
      });
    }
    this.isAdmin=localStorage.getItem("isAdmin")==="true";
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
            this.userservice.user = response.account;
            this.checkAccount();
          });
      } else {
        this.authService.loginPopup().subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.checkAccount();
        });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem("isAdmin");
    this.authService.logout();
  }

  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
