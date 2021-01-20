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
export class VideoProvider extends BaseProvider {

  getVideoData(id) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/VIDEO-DATOS-GET" +"/?TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento + "";
    return this.http.get(url)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => {
        console.log(e);
      });
  }

  setVideoPause(id, data) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/VIDEO-PAUSA-SET/";
    console.log(url);
    return this.http.post(url, data)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => { console.log(e) });
  }

  setVideoEnd(id, data) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/VIDEO-FINALIZADO-SET/";
    console.log(url);
    return this.http.post(url, data)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => { console.log(e) });
  }

  setComment(data) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_SENDCHAT;
    console.log(url);
    return this.http.post(url, data)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => { console.log(e) });
  }


  getChat(id) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + id + "/action" + "/GETCHAT" + "/?TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento;
    console.log(url)
    return this.http.get(url)
      .toPromise()
      .then((response: any) => {
        return response
      })
      .catch(e => { return e });
  }


  }

  

  

