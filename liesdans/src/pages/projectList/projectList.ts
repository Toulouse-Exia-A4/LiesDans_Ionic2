import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DAOProjectProvider } from '../../providers/DAOProject';
import { AlertsProvider } from '../../providers/Alerts';

/*
  Generated class for the projectList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-projectList',
    templateUrl: 'projectList.html'
})
export class ProjectListPage {

  public projects;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public daoProject: DAOProjectProvider,
    public alerts: AlertsProvider
  ) { }

    ionViewDidLoad() {
      console.log('ionViewDidLoad projectListPage');
      this.Loaded();
    }

    Loaded() {
      //this.daoProject.getAllProjects().then(
      //  res => {
      //    this.projects = res;
      //  }
      //).catch((err) => {
      //  this.alerts.showErrorAlert(err, "Project List");
      //});

      this.projects = [
        {
          id: 123,
          name: 'JEAN HUBERT',
          description: 'Sauvez le soldat jean hub'
        },
        {
          id: 321,
          name: 'Ionic Prosit',
          description: 'Faire un prosit sur IONIC'
        }
      ]
    }

    openProject(id) {
      this.alerts.showSuccessAlert(id, 'Project List');
    }

}
