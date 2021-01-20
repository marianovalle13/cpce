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
export class PollProvider extends BaseProvider {

  getPoll(id){
      let info = JSON.parse(localStorage.getItem("info"))
      const url = this.getServerUrl() + Constants.API_METHOD_POLL + "/poll" + "/" + id +"/?TIP_TIPDOC="+info.tipoDocumento+"&PER_NRODOC="+info.nroDocumento+"";
      return this.http.get(url)
      .toPromise()
      .then((res:any) => {
        return res
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  setPoll(data) {
    let info = JSON.parse(localStorage.getItem("info"))
    const url = this.getServerUrl() + Constants.API_METHOD_POLL_SET;
    console.log(url);
    return this.http.post(url, data)
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch(e => { console.log(e) });
  }


}
