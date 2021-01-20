import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrainingProvider } from '../../providers/training/training';

/**
 * Generated class for the CvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cv',
  templateUrl: 'cv.html',
})
export class CvPage {
  speakerId: string;
  speaker: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public trainingProvider: TrainingProvider
    ) {
      this.speakerId = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CvPage');
    this.loadCv();
  }
  loadCv() {
    this.trainingProvider.getCv(this.speakerId).then(res => {
      this.speaker = res.data.data;
      console.log(res, "respuesta del provider")
    })
      .catch(e => console.log(e))
  }

}
