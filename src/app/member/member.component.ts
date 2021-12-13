import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import * as auth from '../auth-config.json';
import {Client} from '@microsoft/microsoft-graph-client';
import {MsalService} from '@azure/msal-angular';
import {AuthCodeMSALBrowserAuthenticationProvider} from '@microsoft/microsoft-graph-client/lib/src/authentication/msal-browser/AuthCodeMSALBrowserAuthenticationProvider';
import {userService} from '../home/shared/user.service';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const USER = 'https://graph.microsoft.com/v1.0/users';
const USER_COUNT = 'https://graph.microsoft.com/v1.0/users?$count=true';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-member',
  templateUrl: './member.html',
  styleUrls: ['./member.component.scss'],
})

export class MemberComponent implements OnInit {
  url = auth.resources.todoListApi.resourceUri;
  profile!: ProfileType;
  allProfile!: ProfileType[];

  // tslint:disable-next-line:ban-types

  constructor(
    private http: HttpClient, private authService: MsalService, private userservice: userService
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // @ts-ignore
    this.authService.instance.acquireTokenSilent({
      scopes: ['user.read.all'],
      account: this.authService.instance.getAllAccounts()[0]
    }).then(result => {
      console.log(result);
      this.http.get(USER, {
        headers: {
          Authorisation: ['Bearer ' + result.idToken]
        }
      }).subscribe(profile => {
        console.log(profile);
        // @ts-ignore
        this.allProfile = profile.value;
      });
    });
  }

  // tslint:disable-next-line:typedef
  getProfile() {


    console.log('test2');
  }

  // tslint:disable-next-line:typedef
  getAllProfile() {
    const numberUsers = this.http.get(USER_COUNT);
    console.log(numberUsers);
    // @ts-ignore
    for (let i = 0; i < numberUsers; i++) {
      this.http.get(USER)
        .subscribe(profile => {
          this.allProfile[i] = profile;
        });
    }
  }


  /* elements: any = [
     {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
     {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
     {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
   ];

   headElements = ['ID', 'First', 'Last', 'Handle'];*/

  // tslint:disable-next-line:typedef
  ban(id: string | undefined) {
    // @ts-ignore
    console.log(id);
  }
}

