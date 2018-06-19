import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { DAOBaseProvider } from './DAOBase';

class Project {
  id: string;
  name: string;
  description: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.type || null;
    this.description = obj && obj.firstName || null;
  }
}

/*
  Generated class for the DAOProject provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DAOProjectProvider extends DAOBaseProvider {

    constructor(public http: Http, public storage: Storage, public loadingCtrl: LoadingController) {
      super(http, storage, loadingCtrl);
      console.log('Hello DAOProject Provider');
    }

    getAllProjects(): Promise<Array<Project>> {
      return this.get('/project/all')
        .then((res: Response) => {
          let body = res.json();
          var projects = new Array<Project>();
          for (var i = 0; i < body.length; i++) {
            projects.push(new Project(body[i]));
          }
          return projects;
        })
        .catch((res: Response) => {
          return Promise.reject(res.json().error || res.text || res);
        })
    }
}
