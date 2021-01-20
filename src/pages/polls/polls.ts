import { Component } from '@angular/core';
import { ToastController, ModalController, Tabs, NavParams, LoadingController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { HomePage } from '../home/home';
import { CongratsPollPage } from '../congrats-poll/congrats-poll';
import { PollProvider } from '../../providers/poll/poll';
import { TabsPage } from '../tabs/tabs';
import { MyCoursesPage } from '../my-courses/my-courses';



@Component({
  selector: 'page-polls',
  templateUrl: 'polls.html',
})

export class PollsPage {
  filterSelected: any;
  poll: any;
  trainingID: any;
  answers: any = [];
  qualification: string;
  suggestion: string;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public pollProvider: PollProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.trainingID = this.navParams.get("id");

  }

  ngOnInit() {
    this.presentLoading();
    this.getPoll();
  }

  getPoll() {
    this.pollProvider.getPoll(this.trainingID).then(res => {
      this.poll = res.data;
      console.log("Encuesta para armar", res);

    })
      .catch(e => console.log(e))
  }

  setPoll() {
    let user = JSON.parse(localStorage.getItem("info"))

    let data = {
      TIP_TIPDOC: user.tipoDocumento,
      PER_NRODOC: user.nroDocumento,
      CUR_ID: this.trainingID,
      sugerencia: this.suggestion,
      PRE_CODIGO: this.poll.calificacion[0].id,
      CAL_CODIGO: this.poll.calificacion[0].valor,
      disertantes:[]
    }

    this.poll.disertante.forEach((element, index) => {
        data.disertantes.push({
          DIS_CODIGO: element.id,
          CALIFICACION: []
        });
        element.preguntas.forEach(el => {
          data.disertantes[index].CALIFICACION.push({
            PRE_CODIGO: el.id,
            CAL_CODIGO: el.valor
          })
        });
      });

    console.log("Data to Send",data);

    this.pollProvider.setPoll(data).then(res => {
      console.log(data, "DATOS CREADOS");
      // this.pollToast();
      // this.navCtrl.setRoot(TabsPage)
      this.goToList();

    })

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 100
    });
    loader.present();
  }

  presentModal() {
    let modal = this.modalCtrl.create(AdvicePage, {}, { cssClass: 'advice-modal' });
    modal.present();
  }

  presentModalSinister() {
    let modalSinister = this.modalCtrl.create(DataPage, {}, { cssClass: 'data-modal' });
    modalSinister.present();
  }


  goToCourse(home) {
    this.navCtrl.push(CourseDetailPage, { home: "home" })
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
    this.presentToast();
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Ya puedes descargar el certificado',
      duration: 3000
    });
    toast.present();
  }

  pollToast() {
    const toast = this.toastCtrl.create({
      message: 'Encuesta enviada con éxito',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // goToCongratsPoll() {
  //   this.navCtrl.push(CongratsPollPage)
  // }

  goToList(){
    const toast = this.toastCtrl.create({
      message: 'Podrá descargar el certificado desde MIS CURSOS',
      duration: 5000,
      position: 'top',
      closeButtonText: "Ok."
    });
    toast.present();
    this.navCtrl.setRoot(MyCoursesPage)
  }
}
