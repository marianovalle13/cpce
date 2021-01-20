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
export class PaymentProvider extends BaseProvider {

  getPaymentOptions(id){
      let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/TRAINING-BUY-GET" + "/?TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento + "";
      console.log(url);
      return this.http.get(url)
      
      .toPromise()
      .then((res:any) => {
        return res
      })
      .catch(e => {console.log(e)});
  }


  createInscription(id, data) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/TRAINING-BUY-SET" + "/?TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento + "";
    console.log(url);
    return this.http.post(url, data)
      .toPromise()
      .then((res: any) => {
        console.log(res, "RESPUESTA DEL PROVIDER")
        return res
      })
      .catch(e => {return e});
  }
  



}
