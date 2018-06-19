import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-project',
    templateUrl: 'project.html'
})
export class ProjectPage {

  public project;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project = this.navParams.get('project');
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad projectPage');
    }

}
