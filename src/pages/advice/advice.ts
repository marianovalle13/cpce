import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-advice',
  templateUrl: 'advice.html',
})
export class AdvicePage {
  
  article:any;
  advices: any[] = [
    {
      img: "assets/imgs/allianz.png",
      numberArg: "080088824324",
      numberArg2: "080088824337",
      numberInt: "00541141298100"
    },
    {
      img: "assets/imgs/atm.png",
      numberArg: "08009998208",
      sms: "01161808888",
      numberInt: "00541143237829"
    },
    {
      img: "assets/imgs/boston.png",
      numberArg: "08008883070",
      numberInt: "00541143245599"
    },
    {
      img: "assets/imgs/chubb.png",
      numberArg: "00541143708470",
      numberInt: "00541143708470"
    },
    {
      img: "assets/imgs/federacion.png",
      numberArg: "08002220022",
      numerArg2: "08008000022",
      numberInt: "00541141298100"
    },
    {
      img: "assets/imgs/lacaja.png",
      numberArg: "08006662252",
      numberArg2: "08006660939",
      numberInt: "00541152389243"
    },
    {
      img: "assets/imgs/galeno.png",
      numberArg: "08009990084",
      numberArg2: "08007775433",
      numberInt: "00543514858321"
    },
    {
      img: "assets/imgs/logo_holandonet.png",
      numberArg: "08009990002",
      numberInt: "00541141298100"
    },
    {
      img: "assets/imgs/lasegunda.png",
      numberArg: "08008880001",
      numberArg2: "08008888003",
      numberInt: "00541153008029"
    },
    {
      img: "assets/imgs/integrity.png",
      numberArg: "08002223700",
      numberInt: "00541149777744"
    },
    {
      img: "assets/imgs/mapfre.png",
      numberArg: "08106667424",
      numberArgWhat: "5491162996922",
      numberInt: "00541157772127"
    },
    {
      img: "assets/imgs/mercantil.png",
      numberArg: "08001220535",
      numberArg2: "08001221453",
      numberInt: "00541141360673"
    },
    {
      img: "assets/imgs/meridional.png",
      numberArg: "08003334358",
      numberInt: "00541143299143",
      numberInt2: "00541152389210"
    },
    {
      img: "assets/imgs/providencia.png",
      numberArg: "08004444442",
      numberArgWhat: "5491128084442",
      numberIntWhat: "5491128084442"
    },
    {
      img: "assets/imgs/sancor.png",
      numberArg: "08003332766",
      numberArgWhat: "5493493520650",
      numberInt: "00541153008073"
    },
    {
      img: "assets/imgs/sura.png",
      numberArg: "080099976925",
      numberInt: "00541143311555"
    },
    {
      img: "assets/imgs/zurich.png",
      numberArg: "08002221600",
      numberArg2: "08109992424",
      numberInt: "00541148144208",
      numberInt2: "00541141298100"
    },
    
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private callNumber: CallNumber,
    private sms: SMS,
    private sanitizer: DomSanitizer  
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvicePage');
  }

  close() {
    this.navCtrl.pop();
  }

  callArg(item) {
    this.callNumber.callNumber(item, true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  callArg2(item) {
    this.callNumber.callNumber(item, true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  callInt(item) {
    this.callNumber.callNumber(item, true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  callInt2(item) {
    this.callNumber.callNumber(item, true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

  SendMessage(item) {
    var options = {

      android: {
        intent: 'INTENT'
      }
    }

    this.sms.hasPermission().then(() => {
      this.sms.send(item, 'ATM', options);
    })
  }

  getWhatsappArgUrl(item) {
    let res: any;
    let temporal: string = `whatsapp://send?phone=${item}`;
    res = this.sanitizer.bypassSecurityTrustUrl(temporal);
    return res;
  }

  getWhatsappIntUrl(item) {
    let res: any;
    let temporal: string = `whatsapp://send?phone=${item}`;
    res = this.sanitizer.bypassSecurityTrustUrl(temporal);
    return res;
  }

}
