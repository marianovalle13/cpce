import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, Tabs } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { TrainingsProvider } from '../../providers/trainings/trainings'
import * as moment from 'moment';




@Component({
  selector: 'page-online',
  templateUrl: 'online.html',
})

export class OnlinePage implements OnInit {
  filterSelected: any;
  page: any=1
  trainings: any = [];
  infiniteScroll: any;
  error: boolean=false
  isBusy: boolean;
  trainingSearchTerm: string = "";
  search: any;
  
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public trainingsProvider:TrainingsProvider

  ) {

  }
  ngOnInit(){
    this.getTrainingsOnline(null, this.page)
  }
  searchTrainings(value){
    this.page = 1;
    this.getTrainingsOnline(value, this.page)  
  }
  getTrainingsOnline(search?, page?) {
    let category;
    if(search){
      if(page == 1){
        this.cleanArray()
        this.error = undefined
      }
      this.search = search;
      } 
    else 
      {if(page == 1){
        this.cleanArray()
        this.error = undefined
      };
        this.search = null;
      }
    if (this.filterSelected) {
      category = this.filterSelected.id;
      if(this.page == 1){
        this.cleanArray()
        this.page = 1
      }
    } else {
      category = undefined
    }
    this.isBusy = true
    this.trainingsProvider.getTrainings(page, 3, category, search).then(res => {
      console.log(res);
      this.page = res.page
      let data = res.data
      if (data.length > 0) {
        data.forEach(element => {
          this.trainings.push(element)
        });
      }
      this.isBusy = false

      console.log(res.page, "RES.PAGE")
      if (this.infiniteScroll) {
        this.infiniteScroll.complete()
        console.log("infinitescroll.complete()")
      }
    })
      .catch(e => {
        if (e) {
          this.error = true
          this.isBusy = false
          this.infiniteScroll.complete()
          this.toast("No hay mas paginas para mostrar")
        }
      })
  }
  cleanArray(){
    this.trainings = [];
    console.log("limpiando")
  }
  clearTrainings() {
    this.trainingSearchTerm = "";
    this.getTrainingsOnline();
  }


  loadData(event) {
    setTimeout(() => {
      this.page = this.page + 1
      console.log(this.page, "pagina to search")
      this.infiniteScroll = event;
      this.getTrainingsOnline(this.search, this.page);
    }, 500);
  }

  presentModal() {
    let modal = this.modalCtrl.create(AdvicePage, {}, { cssClass: 'advice-modal'} );
    modal.present();
  }

  presentModalSinister() {
    let modalSinister = this.modalCtrl.create(DataPage, {}, {cssClass: 'data-modal'});
    modalSinister.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, { filterSelected: this.filterSelected }, {});

    popover.present({
      ev: myEvent,
    });
    popover.onDidDismiss((data => {
      if (data) {
        this.filterSelected = data;
        this.page = 1
        this.getTrainingsOnline(this.search, this.page);

      } else {
        this.filterSelected = undefined;
        this.page = 1
        this.getTrainingsOnline(this.search,this.page)

      }
    
    }))
    console.log(this.filterSelected);
  }

  goToCourse(training) {
    this.navCtrl.push(CourseDetailPage, { id: training.id, imagenURL: training.imagenURL, tipo: training.tipo, date: training.fechaDesde, training: training})
  }

  toast(status) {
    const toast = this.toastCtrl.create({
      message: status,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
  isPast(liveHasta,titulo){
    let date = moment(new Date()).subtract(3, 'hours').utc();
    let dateTo = moment(new Date(liveHasta * 1000)).utc();
    let res = date.isSameOrAfter(dateTo);
    // console.log("Titulo: ",titulo);
    // console.log("Date: ",date.format());
    // console.log("DateTo: ",dateTo.format());
    // console.log("Res: ",res);
    // console.log("-----------------------");
    return res;
  }
}
