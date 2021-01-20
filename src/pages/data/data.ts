import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ThirdPage } from '../third/third';
import { UrgencyPage } from '../urgency/urgency';
import { ComplaintsPage } from '../complaints/complaints';

/**
 * Generated class for the DataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataPage');
  }

  close() {
    this.navCtrl.pop();
  }

  tertiaryDate() {
    this.navCtrl.push(ThirdPage);
  }

  UrgencyDate() {
    this.navCtrl.push(UrgencyPage);
  }

  complaintsDate() {
    this.navCtrl.push(ComplaintsPage);
  }

}
