import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { UsersProvider } from '../providers/users/users';
import { LoggerServiceProvider } from '../providers/logger-service/logger-service';
import { AppConfig, APP_DI_CONFIG, APP_CONFIG_TOKEN } from '../providers/utils-service/config-service';
import { MessagingServiceProvider } from '../providers/messaging-service/messaging-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase, "anonymous"),// imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: APP_CONFIG_TOKEN, useValue: APP_DI_CONFIG },
    AuthProvider,
    DatabaseProvider,
    UsersProvider,
    LoggerServiceProvider,
    MessagingServiceProvider
  ]
})
export class AppModule {}
