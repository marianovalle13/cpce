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
  selector: 'page-terms',
  templateUrl: 'terms.html',
})

export class TermsPage {


  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    // public tabs: Tabs,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    // this.id = this.navParams.get("id");
    // this.date = this.navParams.get("date");
    // this.imagenURL = this.navParams.get("imageURL");
    // this.tipo = this.navParams.get("tipo");
    // this.liveHasta = this.navParams.get("liveHasta");
    // this.liveDesde = this.navParams.get("liveDesde");
  }

  ngOnInit() {
    // console.log("fecha desde", this.date);
    // console.log("id", this.id);
    // console.log("img", this.imagenURL);
    // console.log("tipo", this.tipo);
    // this.getDate()

  }




  // metodo para sacar el tiempo
  
  


  
  
}
