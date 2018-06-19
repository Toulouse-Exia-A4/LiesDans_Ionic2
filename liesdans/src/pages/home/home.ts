import { Component } from '@angular/core';
import { AlertsProvider } from '../../providers/Alerts';

import { LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DAOProfileProvider } from '../../providers/DAOProfile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public justLoggedIn = false;

  constructor(
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alerts: AlertsProvider,
    public daoProfile: DAOProfileProvider
  ) {
    this.justLoggedIn = navParams.get("justLoggedIn");
  }

  onLink(url: string) {
    window.open(url);
  }

  ionViewDidLoad() {
    //Once the main view loads
    //and after the platform is ready...
    //this.platform.ready().then(() => {
    //  //Setup a resume event listener
    //  document.addEventListener('resume', () => {
        
    //  });
      
    //});
    this.Loaded();
  }

  Loaded() {
    if (this.justLoggedIn) {
      this.daoProfile.getUserIdFromStorage().then(
        userId => {
          this.daoProfile.getProfile(userId).then(
            data => {
              this.alerts.showSuccessAlert("Bienvenue " + data.firstName, "Home");
            },
            error => {
              this.alerts.showErrorAlert(error, "Home");
            }
          ).catch((err) => {
            this.alerts.showErrorAlert(err, "Home");
          });
        }
      )
    }
  }
}
