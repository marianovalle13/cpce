import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the TrainingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyAccountProvider extends BaseProvider {

  getAccount(status, page) {
    let params = '&'; 
    if(page){
       params += 'page=' + page
    }
    if (status){
      params += '&status=' + status
    } 
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_MYACCOUNT + "?TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento + params; 
    console.log("URL del provider", url)
    return this.http.get(url)
      .toPromise()
      .then((response: any) => {
        return response
      })
      .catch(e => { return e });
  }



}
