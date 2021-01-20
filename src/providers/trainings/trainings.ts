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
export class TrainingsProvider extends BaseProvider {

  getTrainings(page, tipo, category = '', search = ''){ 
    let info = JSON.parse(localStorage.getItem("info"))
    let params = '?'; 
    if(page){
       params += 'page=' + page
    }
    if (tipo){
      params += '&tipo=' + tipo
    } 
    if (category){
      params += '&TCU_CODIGO=' + category
    } else {
      params  += ''
    }
    if (search) {
      params += '&search=' + search
    } else {
      params += '' 
    }
    console.log(params);
    
    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + params + "&TIP_TIPDOC=" + info.tipoDocumento + "&PER_NRODOC=" + info.nroDocumento + "";
      console.log("URL del provider", url)
      return this.http.get(url)
      .toPromise()
      .then((response:any) => {
        return response
      })
      .catch(e => {return e});
  }

  getAllTrainings(page) {

    const url = this.getServerUrl() + Constants.API_METHOD_TRAINING + '&page='+page;
    console.log(url)
    return this.http.get(url)
      .toPromise()
      .then((response: any) => {
        return response
      })
      .catch(e => { return e });
  }

  
}
