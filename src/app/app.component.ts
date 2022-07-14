import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CacheService } from "ionic-cache";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

import { StorageService, UtilsService, UserService } from './services/services.module';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

   public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Activity',
      url: '/activity',
      icon: 'logo-buffer'
    },
    {
      title: 'My Groups',
      url: '/my-groups',
      icon: 'people'
    },
    {
      title: 'Messages',
      url: '/mail',
      icon: 'chatbubbles'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public fcm: Firebase,
    public router: Router,
    public _utils: UtilsService,
    public userService: UserService,
    public _storage: StorageService,
    public cache: CacheService
  ) {

    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
       // Set TTL to 12h
      this.cache.setDefaultTTL(60 * 60 * 12);
      // Keep our cached results when device is offline!
      this.cache.setOfflineInvalidate(false);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /* 
      * Initialize Push, if app is working on Mobile Device.
      */
      if(this.platform.is('cordova')){
        this.initializePush();
      }
    });
  }

  logoutClicked(){
    console.log('Logout Clicked called....');
    this.cache.clearAll();
    this._storage.clearAll();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

   initializePush(){    
    this.fcm.getToken()
      .then(token => {
        console.log(`The token is ${token}`);
        this.saveToken(token);
      }) // save the token   server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

    this.fcm.onTokenRefresh().subscribe((token: string) => {
      console.log(`Got a new token ${token}`)
      this.saveToken(token);
    });

    this.fcm.onNotificationOpen().subscribe((notification)=>{
      console.log('NotifcationTitle:', notification.title);
      console.log('NotifcationBody:', notification.body);
      this._utils.showAlert(notification.title,notification.body);
    },(error)=>{
      console.log('Error:', error);
    });
  }

  /**
  * Function to save Device Token for Push Notifications.
  */
  saveToken(token){
    console.log('TokenSavetoStorage:',token);
    this.userService.deviceToken = token;
    // this._storage.setObject('pushToken', token);
  }
}
