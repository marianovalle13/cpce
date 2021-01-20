import { Component } from '@angular/core';
import { ToastController, ModalController, Tabs, App, LoadingController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PresentPage } from '../present/present';
import { HomeListPage } from '../home-list/home-list';
import { OnlinePage } from '../online/online';
import { CourseDetailPage } from '../course-detail/course-detail';
import { LoginPage } from '../login/login';
import { Constants } from '../../app/app.constants';
import { TrainingsProvider } from '../../providers/trainings/trainings';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TrainingsProvider]
})

export class HomePage {

  page: any=1;
  isBusy: boolean;
  trainings: any = [];
  infiniteScroll: any;
  error: boolean = false;
  filterSelected: any;
  
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public trainingsProvider: TrainingsProvider,
    public app: App,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController
    
  ) {
    console.log(JSON.parse(localStorage.getItem("info")))
    // this.execute();
  }
  
  ionViewDidEnter() {
    this.page = 1;
    this.trainings = [];
    this.getTrainings()
    this.presentLoading()
  }

  getTrainings() {
    this.isBusy = true
    this.trainingsProvider.getTrainings(this.page,null,null,null)
    .then(res => {
      this.page = res.page;
      let data = res.data;
      console.log(res)
      //this.trainings = res;
      this.isBusy = false
      if (data.length > 0) {
        data.forEach(element => {
          this.trainings.push(element)
        });
      }
      if (this.infiniteScroll) {
        this.infiniteScroll.complete()
        console.log("infinitescroll.complete()")
      }
  })
  .catch(e => {
    this.error = e;
    this.isBusy = false
  })
}

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
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


  goToPresent(id, imagenURL) {
    this.navCtrl.push(PresentPage, { id: id, imagenURL: imagenURL})
  }

  goToHomeList() {
    this.navCtrl.push(HomeListPage)
  }

  goToOnline() {
    this.navCtrl.push(OnlinePage)
  }

  goToCourse(id, imagenURL, tipo, date) {
    this.navCtrl.push(CourseDetailPage, {id: id, imagenURL: imagenURL, tipo: tipo, date: date })
  }

  // goToCourse(present){
  //   this.navCtrl.push(CourseDetailPage, {present: " "})
  // }

  logout() {
    // this.storage.clear()
    //   .then(() => {
        localStorage.clear()
        this.app.getRootNav().setRoot(LoginPage);
    //  })
  }

  toast(status) {
    const toast = this.toastCtrl.create({
      message: status,
      duration: 2000,
      position: "top"
    });
    toast.present();

  }
  loadData(event) {
    setTimeout(() => {
      this.page = this.page + 1
      console.log(this.page, "pagina to search")
      this.infiniteScroll = event;
      this.getTrainings();
    }, 500);
  }

  execute() {
    let numberaso: any = "10999996"
    numberaso.match(/\d{3}(?=\d{2,3})|\d+/g).join("-")
    console.log("numberaso xd", numberaso.match(/\d{7}(?=\d{0})|\d+/g).join("-"));
    let first =  numberaso.match(/\d{7}(?=\d{0})|\d+/g).join("-")
    console.log(first)
    let sec = first.match(/\d{2}(?=\d{0})/g).join("-")
    console.log(sec)
    // let first = numberaso.match(/.{3}/g).join('-')
    
  }
  getColor(type){
    let color;
    if(type == '1'){
      color = "home"
    } else if (type == '2') {
      color = "present"
    } else if (type = '3') {
      color = "online"
    }
    return color;
  }

}
