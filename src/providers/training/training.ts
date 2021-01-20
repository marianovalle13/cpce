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
export class TrainingProvider extends BaseProvider {

  getTraining(id){
      let info = JSON.parse(localStorage.getItem("info"))
      const url = this.getServerUrl() + Constants.API_METHOD_TRAINING +id+"/?TIP_TIPDOC="+info.tipoDocumento+"&PER_NRODOC="+info.nroDocumento+"";
      return this.http.get(url)
      .toPromise()
      .then((res:any) => {
        return res
      })
      .catch(e => {
        console.log(e);
      });
  }
  getCv(id){
      let info = JSON.parse(localStorage.getItem("info"))
      const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + "cv/" + id + "/?TIP_TIPDOC="+info.tipoDocumento+"&PER_NRODOC="+info.nroDocumento+"";
      return this.http.get(url)
      .toPromise()
      .then((res:any) => {
        return res
      })
      .catch(e => {
        console.log(e);
      });
  }

  getTemario(id) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/TEMARY-SEND/";
    return this.http.get(url)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => {
        console.log(e);
      });
  }

  sendMail(id) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/DOCS-SEND" + "/?TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento + "";
    return this.http.get(url)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => {
        console.log(e);
      });
      // http://capacitaciononline.org.ar/ws/trainings/4839/action/DOCS-SEND/?TIP_TIPDOC=DNI&PER_NRODOC=12345678
  }
  }

