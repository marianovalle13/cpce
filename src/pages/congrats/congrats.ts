import { Component } from '@angular/core';
import { ToastController, ModalController, Tabs, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as moment from 'moment';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { MyCoursesPage } from '../my-courses/my-courses';



@Component({
  selector: 'page-congrats',
  templateUrl: 'congrats.html',
})

export class CongratsPage {
  filterSelected: any;
  today = this.getToday();
  date: any;
  imagenURL: any;
  id: any;
  tipo: any;
  liveHasta: any;
  liveDesde: any;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.id = this.navParams.get("id");
    this.date = this.navParams.get("date");
    this.imagenURL = this.navParams.get("imageURL");
    this.tipo = this.navParams.get("tipo");
    this.liveHasta = this.navParams.get("liveHasta");
    this.liveDesde = this.navParams.get("liveDesde");
  }

  ngOnInit() {
    console.log("fecha desde", this.date);
    console.log("id", this.id);
    console.log("img", this.imagenURL);
    console.log("tipo", this.tipo);
    this.getDate()

  }

  goToList(){
    this.navCtrl.setRoot(MyCoursesPage)
  }

  getDateOld() {
    let timestamp = this.date * 1000
    var today:any = this.getToday()
    var course:any = new Date(timestamp)
    console.log(course, today)
    var diffMs = (course- today); // milliseconds between now & Christmas
    let difference = (diffMs / 60000)
    if(difference > 0){
      if (difference < 300000){
        console.log("Faltan 5 minutos o menos para que empiece el curso")
        this.alertCourse();
      }
    }
  }

  // metodo para sacar el tiempo
  getDate(){
    console.log("Live desde: ",this.liveDesde);
    if(this.liveDesde != ''){
      let dateFrom = this.liveDesde;
      let a = moment(new Date(dateFrom * 1000)).utc(); // Fecha del curso
      let b = moment(new Date()); // Fecha de Hoy
      var d = a.diff(b,'minutes');
      console.log("a",a.format());
      console.log("b",b.format());
      console.log("d",d);
      console.log("----------------------");
      if (d < 15 && d > 0) {
        // Mostrar pantalla de ir al curso
        console.log("Faltan 15 minutos o menos para que empiece el curso")
          this.alertCourse();
      }
    }
  }

  getToday(srt?) {
    let date 
    if(srt){
      date = new Date(srt);
    } else{
      date = new Date()
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }

  alertCourse() {
    let prompt = this.alertCtrl.create({
      title: 'Alerta',
      message: "El curso está por comenzar",
      buttons: [
        {
          text: 'Cerrar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ir al curso',
          handler: data => {
            console.log('Saved clicked');
            this.goToCourse();
          }
        }
      ]
    });
    prompt.present();
  }


  goToCourse() {
    this.navCtrl.push(CourseDetailPage, { id: this.id, imagenURL: this.imagenURL, tipo: this.tipo, date: this.date })
  }
  
}
