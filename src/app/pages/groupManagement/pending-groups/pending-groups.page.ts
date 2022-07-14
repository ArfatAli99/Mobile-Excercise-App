import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService, GroupService, StorageService, UserService } from '../../../services/services.module';


@Component({
  selector: 'app-pending-groups',
  templateUrl: './pending-groups.page.html',
  styleUrls: ['./pending-groups.page.scss'],
})
export class PendingGroupsPage implements OnInit {

  list = [];
  session: any[];
  userId: number;
  constructor(
  	  public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public _storage: StorageService) { }

  ngOnInit() {
  	let userId = this._storage.getObject('userId');
    let session = this._storage.getObject('session');
    Promise.all([userId, session]).then(value => {
      
      this.userId = value[0];
      this.session = value[1];
      this.getPendingGroups();
    });
  }

  getPendingGroups(){
  	let params = {
      userid: this.userId
    };

    this.groupService.getPendingGroups(params).subscribe((resp: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (resp.success) {
        let list = resp.data.DATA;
        this.list = list;
      }
    },error => {
        console.log("error", error);
    });

  }
  openPendingGroup(item) {
    this.router.navigate(['/pending-group'])
  }


}
