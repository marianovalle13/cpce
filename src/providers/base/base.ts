import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class BaseProvider {

  constructor(
    public httpx: HTTP,
    public http: HttpClient,
    public storage: Storage
  ) {
  }
  getApiEndPoint() {
    return '';
  }

  getServerUrl() {
    return Constants.API_BASE_URL;
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${Constants.storage.accessToken}`
    });
  }

  public handleError(error): Promise<any> {
    console.log(`Handle Error `, error);
    error = error.error
    if (error.status == 401) {
      return Promise.reject(error || `No se encuentra autorizado. Quizas deba volver a loguearse`);
    } else if (error.status == 404) {
      return Promise.reject(error || `No se encuentro lo que buscaba`);
    } else
      return Promise.reject(error || `Ocurrio un error intente mas tarde`);
  }

}
