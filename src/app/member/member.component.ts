import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as auth from '../auth-config.json';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const USER = 'https://graph.microsoft.com/v1.0/users';
const USER_COUNT = 'https://graph.microsoft.com/v1.0/users?$count=true';

type ProfileType = {
  givenName?: string, // surnom
  surname?: string, // prenom
  userPrincipalName?: string, // email
  mail?: string,
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

  constructor(
    private http: HttpClient

  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('test');
  //  this.getProfile();
    this.getAllProfile();
    console.log('test3');
  }

  // tslint:disable-next-line:typedef
  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
    console.log('test2');
  }

  // tslint:disable-next-line:typedef
  getAllProfile(){
    const numberUsers = this.http.get(USER_COUNT);
    console.log(numberUsers);
    // @ts-ignore
    for (let i = 0; i < numberUsers; i++) {
      this.http.get(USER)
        .subscribe(profile => {
          this.allProfile[0] = profile;
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
  onSubmit(form: NgForm) {
    print();
  }
}

