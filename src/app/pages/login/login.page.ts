import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular'
import { Router } from '@angular/router';

import { UtilsService,
         UserService,
         StorageService } from '../../services/services.module';


import { EmailValidator } from '../../validators/emailValidator';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user : FormGroup; // User form-group Object
  constructor(
    public formBuilder: FormBuilder, 
    public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
    public _storage: StorageService,
    public menu: MenuController) {
	  	
  }

  ngOnInit() {
    this.enableMenu();
  	this.user = this.formBuilder.group({
       username: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
       password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.checkAutoLogin();
  }

  /**
   * @desc : Function to Check User is logged in or not already...
   * @param : none
   * @return : none
   */
  checkAutoLogin(){
    this._storage.getObject('userId').then((userId)=>{
      console.log('Auto UserId:', userId);
      if(userId){
        this.userService.loggedUser={success:true, USERID:userId};
        this.router.navigate(['/dashboard'],{ replaceUrl: true });
      }else{
        console.log('User Not logged in already.');
      }
      
    },(error)=>{
      console.log('Auto Error:', error);
    });
  }

  /**
   * @desc : Function to submit request to Login to Server
   * @param : none
   * @return : none
   */
  doLogin(_user){

  	console.log('doLogin User: ',_user); 
    
    this._utils.showLoading();
    this.userService.login(_user).subscribe((response)=>{
      if(response.success){
        console.log('Data:',response.data);
        this.userService.loggedUser=response.data;
        console.log('UserID', response.data.USERID);
        this._storage.clearAll();
        this._storage.setObject('userId',response.data.USERID);

        // saving Device Token..
        this.saveDeviceTokenToServer(response.data.USERID, this.userService.deviceToken);

        let data_authenticateUser = {
            userId: response.data.USERID
        };

        this.userService.authenticateUserAccess(data_authenticateUser).subscribe((response)=>{
          this._utils.hideLoading();
          // console.log('Response fo ForkJoin', response);
          // let authUserResponse= response[1];
          let authUserResponse= response;
          console.log('authUserResponse', authUserResponse);
          if(authUserResponse.success){
            this._storage.setObject('session',authUserResponse.data.DEFAULTS);
            this.router.navigate(['/dashboard'],{ replaceUrl: true });
          }

        },(error)=>{
          this._utils.hideLoading();
          console.log('Error ForkJoin', error);
           this._utils.showAlert('Error!', 'Please try again.');
        });

        
      }else{
        this._utils.hideLoading();
        console.log('Bad Request:',response);
        this._utils.showAlert('Error!', 'Enter correct username and password.');
      }
      
    },(error)=>{
      this._utils.hideLoading();
      console.log('doLogin Error:', error);
      this._utils.showAlert('Error!', 'Please try again.')
    });

  }

  saveDeviceTokenToServer(userId, token){
    let params = {
      deviceToken: token,
      userID: userId,
      deviceType: 'ios'
    };

    this._storage.setObject('deviceToken', token);

    /* Sending Token to Server */
    this.userService.saveDeviceToken(params).subscribe((success)=>{
      console.log('Success:', success);
    },(error)=>{
      console.log('Error:', error);
    });
  }

  /*
  * Disable Side Menu On Login Page
  */
  enableMenu(){
    this.menu.enable(false);
  }


}
