import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProjectPage } from '../pages/project/project';
import { ProjectListPage } from '../pages/projectList/projectList';
import { AlertsProvider } from '../providers/Alerts';
import { DAOBaseProvider } from '../providers/DAOBase';
import { DAOProfileProvider } from '../providers/DAOProfile';
import { DAOProjectProvider } from '../providers/DAOProject';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    LoginPage,
    ProjectListPage,
    ProjectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    HomePage,
    LoginPage,
    ProjectListPage,
    ProjectPage
  ],
  providers: [DAOBaseProvider, DAOProfileProvider, DAOProjectProvider, AlertsProvider, { provide: ErrorHandler, useClass: IonicErrorHandler }],
  exports: [
  ]
})
export class AppModule { }
