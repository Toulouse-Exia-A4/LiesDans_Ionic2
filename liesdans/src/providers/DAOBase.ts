import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the DiscordApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DAOBaseProvider {

  private ApiEndPoint = 'http://localhost:80';

  constructor(public http: Http, public storage: Storage, public loadingCtrl: LoadingController) {
    console.log('Hello DAOBase Provider');
  }

  post(url: string, body: any): Promise<any> {
    let headerDict = {
      'Content-Type': 'application/json',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };

    var urlPost = this.ApiEndPoint + url;
    console.log("Call post " + urlPost);
    return this.http.post(urlPost, body, requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get(url: string, body: any = null): Promise<any> {
    let headerDict = {
      'Content-Type': 'application/json',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };

    var urlGet = this.ApiEndPoint + url + this.BuildURLParametersString(body);
    console.log("Call get " + urlGet);
    return this.http.get(urlGet, requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private BuildURLParametersString(parameters: any): string {
    if (!parameters || parameters == null)
      return "";

    var string = "?";

    var separator = "";
    Object.keys(parameters).forEach(key => {
      string += separator + decodeURI(key) + encodeURI(parameters[key]);
      separator = "&";
    });

    return string;
  }

  async checkUserLoggedIn() {
    return this.getUserIdFromStorage()
      .then((result) => {
        if (result.length > 0) {
          return true;
        }
        else {
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
  }

  //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
  private extractData(res: Response) {
    //Convert the response to JSON format
    let body = res.json();
    //Return the data (or nothing)
    return body || {};
  }

  //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
  private handleError(res: Response | any) {
    console.error('Entering handleError');
    console.dir(res.json());
    return Promise.reject(res.json().error || res.message || res);
  }

  public saveUserId(userId: string) {
    return this.storage.set("userid", userId);
  }

  public getUserIdFromStorage() {
    return this.storage.get('userid');
  }

  public clearStorage() {
    this.storage.remove("userid");
  }

}
