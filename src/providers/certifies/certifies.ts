import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';
import { BaseProvider } from '../base/base';

/*
  Generated class for the TrainingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CertifiesProvider extends BaseProvider {
  getCertifies(data){
    let info = JSON.parse(localStorage.getItem("info"))
      const url = this.getServerUrl() + Constants.API_METHOD_CERTIFIED;
      console.log(url)
      return this.http.post(url, data)
      .toPromise()
      .then((response:any) => {
        return response
      })
      .catch(e => {return e});
  }
}
