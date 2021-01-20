import { Component, ViewChild } from '@angular/core';
import { ToastController, ModalController, Tabs, NavParams } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PollsPage } from '../polls/polls';
import { PaymentPage } from '../payment/payment';
import { VideoPage } from '../video/video';
import { TrainingProvider } from '../../providers/training/training';
import { CvPage } from '../cv/cv';
import { LoadingController } from 'ionic-angular';
import { DownloadsPage } from '../downloads/downloads';
import { Content } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})

export class CourseDetailPage {
  @ViewChild(Content) content: Content; 
  home: any;
  online: any;
  pay: any;
  trainingID: any;
  item: any = {};
  imagenURL: any;
  speaker: any = {};
  temario: any;
  tipo: any;
  date: any;
  training: any;
  video: any;
  isBusy: boolean = true;
  loader: any;
  payed: any;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public navParams: NavParams,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public trainingProvider:TrainingProvider,
    public loadingCtrl: LoadingController

  ) {
    this.tipo = this.navParams.get("tipo");
    this.online = this.navParams.get("online");

    this.home = this.navParams.get("home");
    this.pay = this.navParams.get("pay");
    this.trainingID = this.navParams.get("id")
    this.imagenURL = this.navParams.get("imagenURL")
    this.date = this.navParams.get("date")
    this.training = this.navParams.get("training")
    this.payed = this.navParams.get("payed")
    // this.presentLoading();
  }
  ionViewDidEnter(){
    this.loadDetail();
    console.log("tipo de curso desde Mis Cursos", this.tipo);
    this.content.resize();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
    });
    this.loader.present();
  }

  loadDetail() {
    this.presentLoading();
    this.trainingProvider.getTraining(this.trainingID).then(res => {
      console.log(res);
      this.item = res.data;
      this.speaker = res.data.disertante[0];
      console.log(this.item, "respuesta del provider")
      console.log("IMAGEN", this.imagenURL);
      console.log("ID del training", this.trainingID);
      this.getTemario();
      this.isBusy = false;
      this.loader.dismiss();
    })
    .catch(e => {
      console.log(e);
      this.isBusy = false;
      this.loader.dismiss();
    })
  }

  getTemario() {
    this.trainingProvider.getTemario(this.trainingID).then( tem => {
      this.temario = tem.data;
       console.log("temario", this.temario);
      
    })
  }

  downloadTemario() {
    let temario = this.temario.link
    let openTemario = window.open(temario, '_system')
    console.log(openTemario);
    return openTemario
  }

  goToPaymentPresent(){
    this.navCtrl.push(PaymentPage, { present: "present", presentId: this.trainingID})
  }

  goToPaymentOnline() {
    this.navCtrl.push(PaymentPage, { 
      online: "online", 
      imagenURL: this.imagenURL, 
      tipo: this.tipo, 
      onlineId: this.trainingID, 
      date: this.date,
      live: this.item.live,
      liveHasta: this.item.liveHasta,
      liveDesde: this.item.liveDesde
    })
  }

  downloads() {
    this.navCtrl.push(DownloadsPage, {id: this.trainingID, archives: this.item.archivos, titulo: this.item.titulo})
  }

  goToDowmloads_old() {
    if (this.item.archivos.length > 0) {
      console.log("this tipo", this.tipo);
      if (this.tipo !== "Home" && this.tipo !== "1") {
        if (this.item.inscripto != '') {
          this.downloads();
        } else {
          this.showError("Debe inscribirse para poder descargar los materiales")
        }
      } else {
        this.downloads();
      }
    } else {
      this.showError("No hay materiales disponibles para descargar")
    }
  }
  showError(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  goToPolls(){
    this.navCtrl.push(PollsPage)
  }

  openVideo() {
    if(this.item.videos.length != 0){
      this.navCtrl.push(VideoPage, { vimeo: this.item.videos[0], titulo: this.item.titulo, id: this.trainingID, tipo: this.tipo, training: this.training, item: this.item})
    } else {
      this.videoNotAvailable();
    }
  }
  showCv() {
    this.navCtrl.push(CvPage, {id:this.speaker.id});
  }
  videoNotAvailable() {
    const toast = this.toastCtrl.create({
      message: 'El video no está disponible en este momento',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


///en caso de que haya mas de un video muestra un actionsheet controller

  showVideos() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar video',
      buttons: this.createButtons()
      }); 
      actionSheet.present();
    }

    createButtons() {
      let buttons = [];
      for (let video of this.item.videos) {
        let suma: any;
        if(this.item.videos[0].orden == 0) {
          suma = video.orden + 1 
        }else{
          suma = video.orden
        }
        let button = {
          text: "Video " + suma,
          handler: () => {
            this.navCtrl.push(VideoPage, { vimeo: video, titulo: this.item.titulo, id: this.trainingID, tipo: this.tipo, training: this.training, item: this.item})
            return true;
          }
        }
        buttons.push(button);
      }
      return buttons;
    }



    goToHome() {
      this.navCtrl.setRoot(TabsPage)
    }
}



