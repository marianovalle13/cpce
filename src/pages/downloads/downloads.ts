import { Component } from '@angular/core';
import { ToastController, ModalController, Tabs, NavParams, AlertController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { MyCoursesPage } from '../my-courses/my-courses';
import { TrainingProvider } from '../../providers/training/training';
import { SocialSharing } from '@ionic-native/social-sharing';



@Component({
  selector: 'page-downloads',
  templateUrl: 'downloads.html',
})

export class DownloadsPage {
  filterSelected: any;
  archives: any;
  id: any;
  email: any;
  titulo: any;
  item: any;
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public trainingProvider: TrainingProvider,
    public actionSheetController: ActionSheetController,
    public socialSharing: SocialSharing
  ) {
    this.archives = this.navParams.get("archives");
    this.id = this.navParams.get("id");
    this.titulo = this.navParams.get("titulo");
  }


  ionViewDidEnter(){
    console.log(this.archives);
    console.log("ID del training", this.id);
    console.log("titulo del curso:", this.titulo);
    this.loadDetail()
    
  }

  loadDetail() {
    if (!this.archives) {
      this.trainingProvider.getTraining(this.id).then(res => {
        console.log(res);
        this.archives = res.data.archivos;
        console.log(this.item, "respuesta del provider")
      })
      .catch(e => console.log(e))
 
    }
      
    }


  sendDownloads() {
    this.trainingProvider.sendMail(this.id).then( res => {
      this.email = res;
      console.log("email enviado", res);
      this.mailSuccess();
    })
  }

  alertMail() {
    const confirm = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Enviamos el material del curso a la casilla de correo electrónico registrada en nuestra base?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('aceptado');
            this.sendDownloads();
          }
        }
      ]
    });
    confirm.present();
  }

  mailSuccess() {
    const toast = this.toastCtrl.create({
      message: 'Mail enviado con éxito!',
      duration: 3000
    });
    toast.present();
  }


  downloadArchive(archive) {
    window.open(archive, "_system")
  }

  shareButton(archive) {
    this.socialSharing.share( "Te comparto el un archivo del curso "+ this.titulo +" desde la App de CPCE Capacitación: " + archive.link)
  }


}
