import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { CacheModule } from 'ionic-cache';
import { Mode } from '@ionic/Core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DocsRoutingModule } from './pages/docsManagement/docs-routing.module';
import { GalleryRoutingModule } from './pages/galleryManagement/gallery-routing.module';
import { GroupRoutingModule } from './pages/groupManagement/group-routing.module';
import { MailRoutingModule } from './pages/mailManagement/mail-routing.module';
import { NewsRoutingModule } from './pages/newsManagement/news-routing.module';
import { PollsRoutingModule } from './pages/pollsManagement/polls-routing.module';

@NgModule({
  declarations: [
  	  AppComponent
      ],
  entryComponents: [],
  imports: [
    	BrowserModule, 
    	IonicModule.forRoot({
       mode: 'ios',
       backButtonText: ''
    }),
      // IonicStorageModule.forRoot({
      //   driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage']
      // }),
      IonicStorageModule.forRoot(),
      CacheModule.forRoot({ keyPrefix: 'fs_' }),
      HttpModule, 
      AppRoutingModule,
      DocsRoutingModule,
      GalleryRoutingModule,
      GroupRoutingModule,
      MailRoutingModule,
      NewsRoutingModule,
      PollsRoutingModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileOpener,
    InAppBrowser,
    Firebase,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
