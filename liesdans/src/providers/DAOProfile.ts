import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { DAOBaseProvider } from './DAOBase';

/*
  Generated class for the DAOProfile provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
class Profile {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  experience: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.type = obj && obj.type || null;
    this.firstName = obj && obj.firstName || null;
    this.lastName = obj && obj.lastName || null;
    this.experience = obj && obj.experience || null;
  }
}

@Injectable()
export class DAOProfileProvider extends DAOBaseProvider {

  constructor(public http: Http, public storage: Storage, public loadingCtrl: LoadingController) {
    super(http, storage, loadingCtrl);
        console.log('Hello DAOProfile Provider');
    }


  getProfile(id: Number): Promise<Profile> {
    return this.get('/profile/' + id)
      .then((res: Response) => {
        let body = res.json();
        var profile = new Profile(body.profile);
        profile.type = body.type;
        return profile;
      })
      .catch((res: Response) => {
        return Promise.reject(res.json().error || res.text || res);
      })
  }
}
