import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'

import { UtilsService,
         UserService,
         GroupService,
         StorageService } from '../../services/services.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

   userId: number;
  	
  	constructor(
      public router: Router,
      public _utils: UtilsService,
      public userService: UserService,
      public groupService: GroupService,
      public _storage: StorageService,
      public menu: MenuController) {  
        // this.userId = this.userService.loggedUser.USERID;
      }

  	ngOnInit() {
      this.enableMenu();
      if(!this.userId){
        this._storage.getObject('userId').then((value)=>{
          this.userId = value;
          this.userService.loggedUser={success:true, USERID:this.userId};
          console.log('Home UserId:', this.userId);
          this.getDefaults();
        });
      }else{
        this.getDefaults();
      }
      
  	}


    getDefaults(){
      let params = {
        userId: this.userId
      };
      this._utils.showLoading();
      this.groupService.getDefaultGroupId(params).subscribe((response)=>{
        console.log('Home getDefault Response:', response);
        this._utils.hideLoading();
        if(response.success){
          this.groupService.defaultsGroupId = response.data.DATA;
          this._storage.setObject('defaultGroupId', response.data.DATA);
        }
      },(error)=>{
        this._utils.hideLoading();
        console.log('Home getDefault Error:', error);
      });
    }

    openPage(pageName){
      this.router.navigate(['/'+pageName]);

    }

  /*
  * Enable Side Menu On Login Page
  */
  enableMenu(){
    this.menu.enable(true);
  }

}
