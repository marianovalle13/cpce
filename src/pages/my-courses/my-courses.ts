import { Component } from '@angular/core';
import { ToastController, ModalController, LoadingController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { QrPage } from '../qr/qr';
import { CourseDetailPage } from '../course-detail/course-detail';
import { DownloadsPage } from '../downloads/downloads';
import { PollsPage } from '../polls/polls';
import { MyAccountProvider } from '../../providers/myAccount/myAccount';
import { CongratsPollPage } from '../congrats-poll/congrats-poll';


@Component({
  selector: 'page-my-courses',
  templateUrl: 'my-courses.html',
})

export class MyCoursesPage {

  cursos: string = "pendientes";
  accountList: any;
  pendingList: any=[];
  doneList: any=[];
  infiniteScroll: any;
  error: any;
  pagePending: any = 1;
  pageDone: any = 1;
  isBusy: boolean = false;


  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public myaccountProvider: MyAccountProvider,
    public loadingCtrl: LoadingController
  ) {
  }
  
  ionViewDidEnter() {
    this.loadManager();
  }

  loadManager(){
    console.log("Event: ",this.cursos);
    if (this.cursos == "pendientes") {
      this.pendingList = [];
      this.getPending();
    } else if(this.cursos == "realizadas") {
      this.doneList = [];
      this.getDone();
    }
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
    });
    loader.present();
  }

  getPending() {
    this.isBusy = true;
    console.log("trae pendings");
    
    this.myaccountProvider.getAccount(0, this.pagePending).then( res => {
      let array = res.data
      console.log(res.page, "PAGINA QUE TRAJO LA CONSULTA")
      console.log(res, "RES DE PENDIENTES")
      this.pagePending = res.page
      array.forEach(element => {
          this.pendingList.push(element)
      });
      console.log(this.pendingList, "PENDING LIST");
      if(this.infiniteScroll){
        this.infiniteScroll.complete()
      }
      this.isBusy = false;
    }).catch(e =>  {
      if(e){
        console.log(e)
        this.error = e,
        this.isBusy = false;
      }
    })
  }

  getDone() {
    this.isBusy = true;
    console.log("trae terminadas");
  
    this.myaccountProvider.getAccount(-1, this.pageDone).then( res => {
      console.log(res,"RES DE FINALIZADAS")
      let array = res.data
      this.pageDone = res.page
      array.forEach(element => {
          this.doneList.push(element)
      });
      console.log(this.doneList, "DONE LIST")
      if(this.infiniteScroll){
        this.infiniteScroll.complete()
      }
      this.isBusy = false;
    }).catch(e =>  {
      if(e){
        console.log(e)
        this.error = e
        this.isBusy = false;
      }
    })
  }

  loadDataPending(event) {
    setTimeout(() => {
      this.pagePending = this.pagePending + 1 
      console.log(this.pagePending, "pagina to search PENDING")
      this.infiniteScroll = event;
      this.getPending()
    }, 500);
  }
  loadDataDone(event) {
    setTimeout(() => {
      this.pageDone = this.pageDone + 1
      console.log(this.pageDone, "pagina to search DONE")
      this.infiniteScroll = event;
      this.getDone()
    }, 500);
  }


  goToCertified($event, id) {
    this.navCtrl.push(CongratsPollPage, { id: id, finished: "finished"})
  } 


  goToCongratsPoll($event, id) {
    this.navCtrl.push(QrPage, { id: id });
    $event.stopPropagation();
  }
  goToQr($event, id) {
    this.navCtrl.push(QrPage, { id: id });
    $event.stopPropagation();
  }

  goToDownloads($event, id){
    this.navCtrl.push(DownloadsPage, {id: id});
    $event.stopPropagation()
  }

  goToDetail(id, tipo, training){
    this.navCtrl.push(CourseDetailPage, {id:id, tipo: tipo, training: training})
  }

  goToPolls($event, id){
    this.navCtrl.push(PollsPage, { id: id});
    $event.stopPropagation();
  }

}
