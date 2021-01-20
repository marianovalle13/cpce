import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the UrgencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-urgency',
  templateUrl: 'urgency.html',
})
export class UrgencyPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrgencyPage');
  }

  call() {
    this.callNumber.callNumber("01152172080", true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  callUrgency() {
    this.callNumber.callNumber("01169399638", true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  SendEmail() {
    let email = {
      to: 'siniestros@ddncentral.com.ar',
      cc: '',
      attachments: [],
      subject: 'DDN Assist',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
