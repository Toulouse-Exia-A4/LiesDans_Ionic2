import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProjectListPage } from '../pages/projectList/projectList';

import { AlertsProvider } from '../providers/Alerts';
import { DAOBaseProvider } from '../providers/DAOBase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform,
    public alerts: AlertsProvider,
    private menu: MenuController,
    private daoBase: DAOBaseProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Project List', component: ProjectListPage }
      ]

      this.onInit();
    });
    platform.resume.subscribe(e => {
      this.onInit();
    })
  }

  onInit() {
    this.daoBase.checkUserLoggedIn().then((result) => {
      this.rootPage = result ? HomePage : LoginPage;
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.daoBase.clearStorage();
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }
}
