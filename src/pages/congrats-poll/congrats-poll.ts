import { Component } from '@angular/core';
import { ToastController, ModalController, Tabs, LoadingController, NavParams } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { MyCoursesPage } from '../my-courses/my-courses';
import { CertifiesProvider } from '../../providers/certifies/certifies';



@Component({
  selector: 'page-congrats-poll',
  templateUrl: 'congrats-poll.html',
})

export class CongratsPollPage {
  filterSelected: any;
  id: any;
  certification: any;
  finished: any;
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    public certifyProvider: CertifiesProvider,
    public navParams: NavParams
  ) {
    this.id = this.navParams.get("id")
    this.finished = this.navParams.get("finished")
  }

  ngOnInit() {
    console.log("Id del curso", this.id);
    this.postCertified();
  }

  postCertified() {
    let info = JSON.parse(localStorage.getItem("info"))
    let data = {
      TIP_TIPDOC: info.tipoDocumento,
      PER_NRODOC: info.nroDocumento,
      CUR_ID: this.id
    }
    this.certifyProvider.getCertifies(data).then(res => {
      this.certification = res.data;
      console.log(res, "post de certificado")
      console.log(data, "DATOS CREADOS");
      console.log(this.certification, "MI CERTIFICADO");
      
  }
    )}

  downloadCertified() {
    let openLink: any;
    openLink = window.open(this.certification.certificado, "_system");
    return openLink;
  }

  goToList(){
    this.navCtrl.setRoot(MyCoursesPage)
  }


  

}
