import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider extends BaseProvider{

login(DNI, MATRICULA, PIN){
  // let body = {
  //   TIP_TIPDOC:"DNI",
  //   PER_NRODOC:"12345678",
  //   PIN:"111112",
  //   MATRICULA:"10-99999-6",
  //   idDispositivo:"",
  //   sistemaOperativo:"",
  //   sistemOperativoVersion:"",
  //   latitud:"",
  //   longitud:"",
  //   idPN:""
  // }
  let body = {
    TIP_TIPDOC:"DNI",
    PER_NRODOC:DNI,
    PIN:PIN,
    MATRICULA:MATRICULA,
    idDispositivo:"",
    sistemaOperativo:"",
    sistemOperativoVersion:"",
    latitud:"",
    longitud:"",
    idPN:""
  }
  const url = this.getServerUrl() + Constants.API_METHOD_LOGIN;
    return this.http.post(url, body, {})
    .toPromise()
    .then((response:any) => {
      return response
    })
    .catch(this.handleError.bind(this));
}
}
