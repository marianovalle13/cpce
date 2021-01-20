import { Component } from '@angular/core';
import { ToastController, ModalController, Tabs, NavParams, LoadingController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { MyCoursesPage } from '../my-courses/my-courses';
import { QrProvider } from '../../providers/qr/qr';



@Component({
  selector: 'page-congrats-qr',
  templateUrl: 'congrats-qr.html',
})

export class CongratsQrPage {
  filterSelected: any;
  presentId: any;
  qrCode: any;
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public iab: InAppBrowser,
    public qrProvider: QrProvider,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController
  ) {
    this.presentId = this.navParams.get("presentId");
  }

  ngOnInit() {
    console.log("present Id", this.presentId);
    
  }

  ionViewDidEnter(){
    this.presentLoading()
    console.log(this.getQr());
    this.getQr()
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 100
    });
    loader.present();
  }

  presentModal() {
    let modal = this.modalCtrl.create(AdvicePage, {}, { cssClass: 'advice-modal'} );
    modal.present();
  }

  presentModalSinister() {
    let modalSinister = this.modalCtrl.create(DataPage, {}, {cssClass: 'data-modal'});
    modalSinister.present();
  }

  getQr() {
    this.qrProvider.getQr(this.presentId).then(res => {
      this.qrCode = res;
      console.log("codigo QR", res);
      
    })
  }
  

  openQr() {
    window.open(this.qrCode.data.QRfile, '_system')
  }

  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create(PopoverPage, { filterSelected: this.filterSelected }, {});

  //   popover.present({
  //     ev: myEvent,
  //   });
  //   popover.onDidDismiss((data => {
  //     if (data) {
  //       this.filterSelected = data;

  //     } else {
  //       this.filterSelected = undefined;

  //     }
      
  //   }))
  //   console.log(this.filterSelected);
  // }

goToList(){
  this.navCtrl.push(MyCoursesPage).then(() => {
    const index = this.navCtrl.getActive().index;
    this.navCtrl.remove(index);
    this.navCtrl.remove(index-1);
    this.navCtrl.remove(index-2);
  });  
  this.navCtrl.setRoot(MyCoursesPage) 
}
}
