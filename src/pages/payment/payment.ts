import { Component, ViewChild } from '@angular/core';
import { ToastController, ModalController, Tabs, NavParams, LoadingController, AlertController, Content } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdvicePage } from '../advice/advice';
import { DataPage } from '../data/data';
import { PopoverPage } from '../popover/popover';
import { CourseDetailPage } from '../course-detail/course-detail';
import { CongratsQrPage } from '../congrats-qr/congrats-qr';
import { CongratsPage } from '../congrats/congrats';
import * as moment from 'moment';
import { PaymentProvider } from '../../providers/payment/payment';
import { NgIf } from '@angular/common';



@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})


export class PaymentPage {
  
  @ViewChild(Content) content: Content;
  
  filterSelected: any;
  online: any;
  present: any;
  presentId: any;
  onlineId: any;
  paymentOptionsOnline: any = {};
  paymentOptionsPresent: any = {};

  paymentMethodSelected: any;
  paymentQuotesSelected: any;
  date: any;
  imagenURL: any;
  tipo: any;
  live: any;
  liveHasta: any;
  liveDesde: any;
  cuota: any = 1 + " cuota";
  texto: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public tabs: Tabs,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public paymentProvider: PaymentProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    this.online = this.navParams.get("online");
    // this.present = this.navParams.get("present");
    this.present = this.navParams.get("present");
    this.presentId = this.navParams.get("presentId");
    this.onlineId = this.navParams.get("onlineId");
    this.date = this.navParams.get("date");
    this.liveHasta = this.navParams.get("liveHasta");
    this.liveDesde = this.navParams.get("liveDesde");
    this.imagenURL = this.navParams.get("imagenURL");
    this.tipo = this.navParams.get("tipo");
    this.live = this.navParams.get("live");

  }
  
  ngOnInit(){
    // console.log("este es el Id online", this.onlineId);
    // console.log("este es el Id present", this.presentId);
    this.presentLoading();
    // this.getDate()
  }
  
  ionViewDidLoad(){
    if(this.presentId) {
      this.getPaymentOptionsPresent();
      console.log("este es el Id present", this.presentId);
     
    }else{
      this.getPaymentOptionsOnline();
      console.log("este es el Id online", this.onlineId);
      console.log("fecha desde online", this.date);
      console.log("live: ", this.live);
      console.log("liveDesde inicio de payment: ", this.liveDesde);
      
    }




  }

  getPaymentOptionsPresent() {
    this.paymentProvider.getPaymentOptions(this.presentId).then( res => {
      this.paymentOptionsPresent = res;
      console.log("getPaymentOptionsPresent", res);
      this.paymentOptionsPresent.data.data.cuotasArr = this.buildQuotes(res.data.data.cuotas);
      if(this.paymentOptionsPresent.data.data.aceptacionDebito != '') {
        this.texto = "Autorizo al Consejo Profesional de Ciencias Económicas de Córdoba a adicionar a mis aportes mensuales, que como profesional matriculado de esta Institución me corresponden, y a partir del mes agosto de 2020, la cantidad de " + this.cuota + " hasta completar el monto total de $ " + this.paymentOptionsPresent.data.data.categoria[0].ACA_MONTO;
      }
      if(this.paymentOptionsPresent.data.data.metodoPago.length == 0){
        this.showAlertMensaje();
      }
    })
  }

  getPaymentOptionsOnline() {
    this.paymentProvider.getPaymentOptions(this.onlineId).then(aux => {
      this.paymentOptionsOnline = aux;
      console.log("getPaymentOptionsOnline", aux);
      this.paymentOptionsOnline.data.data.cuotasArr = this.buildQuotes(aux.data.data.cuotas);
      if(this.paymentOptionsOnline.data.data.aceptacionDebito != '') {
        this.texto = "Autorizo al Consejo Profesional de Ciencias Económicas de Córdoba a adicionar a mis aportes mensuales, que como profesional matriculado de esta Institución me corresponden, y a partir del mes agosto de 2020, la cantidad de " + this.cuota + " hasta completar el monto total de $ " + this.paymentOptionsOnline.data.data.categoria[0].ACA_MONTO;
      }
      // Detectar si el monto es 0 llamar directamente a payTrainingOnline
      // con el primer elemento del array seleccionado 
    })
  }
  
  scrollToBottom() {
    this.content.scrollToBottom();
    console.log("scrolleado hacia abajo");
    
  }

  buildQuotes(value) {
    let quotes = [];
    for (let index = 0; index < value; index++) {
      quotes.push(index + 1);
    }
    console.log("Quotes", quotes);
    return quotes;
  }

  payTrainingPresent() {
    let info = JSON.parse(localStorage.getItem("info"))
    let data = {
      TIP_TIPDOC: info.tipoDocumento,
      PER_NRODOC: info.nroDocumento,
      CUR_ID: this.presentId,
      FRM_CODIGO: "",
      ACA_MONTO: this.paymentOptionsPresent.data.data.categoria[0].ACA_MONTO,
      CAT_CODIGO: this.paymentOptionsPresent.data.data.categoria[0].CAT_CODIGO,
      CAR_CODIGO: 1,
      CANTCUOTAS: 1
    }
    if(!this.paymentQuotesSelected){
      data.CANTCUOTAS = 1
    }
    else{
      data.CANTCUOTAS = this.paymentQuotesSelected
    }

    if (this.paymentOptionsPresent.data.data.metodoPago.length == 0) {
      data.FRM_CODIGO = "";
    }
    else {
      data.FRM_CODIGO = this.paymentMethodSelected
    }
    
    this.paymentProvider.createInscription(this.presentId, data).then(res => {
      console.log(res, "post a payment provider PRESENT")
      console.log(data, "DATOS CREADOS");
      this.congratsToast()
      this.goToCongratsQr()
      
    })
    
  }

  payTrainingOnline() {
    let info = JSON.parse(localStorage.getItem("info")) 
    let data = {
      TIP_TIPDOC: info.tipoDocumento,
      PER_NRODOC: info.nroDocumento,
      CUR_ID: this.onlineId,
      FRM_CODIGO: 0,
      ACA_MONTO: 0,
      CAT_CODIGO: 0,
      CAR_CODIGO: 1,
      CANTCUOTAS: 1
    }
    if (!this.paymentQuotesSelected) {
      data.CANTCUOTAS = 1
    }
    else {
      data.CANTCUOTAS = this.paymentQuotesSelected
    }

    //en caso de que el curso sea gratis, directamente se les asigna el valor 0, en caso contrario se selecciona el metodo de pago y los precios en la página
    if (this.paymentOptionsOnline.data.data.categoria[0].ACA_MONTO == 0) {
      data.ACA_MONTO = 0;
      data.CAT_CODIGO = 0;
      data.FRM_CODIGO = 0;
    }else{
      data.ACA_MONTO = this.paymentOptionsOnline.data.data.categoria[0].ACA_MONTO,
      data.CAT_CODIGO = this.paymentOptionsOnline.data.data.categoria[0].CAT_CODIGO,
      data.FRM_CODIGO = this.paymentMethodSelected
      }
    

    this.paymentProvider.createInscription(this.onlineId, data).then(res => {
      console.log(res, "post a payment provider ONLINE")
      console.log(data, "DATOS CREADOS");
      
      this.getDate()

      
    }).catch(e => console.log(e))

  }

  getDate(){
    let dateFrom = this.date;
    let a = moment(new Date(dateFrom * 1000)).utc(); // Fecha del curso
    let b = moment(new Date()).utc(); // Fecha de Hoy
    var d = a.diff(b,'minutes');
    console.log(d);
    if (d < 0 && this.live == 0) {
      // Mostrar pantalla de ir al curso
      this.goToCourse()
        
    }else{
      this.congratsToastOnline()
      this.goToCongrats()
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(AdvicePage, {}, { cssClass: 'advice-modal'} );
    modal.present();
  }

  presentModalSinister() {
    let modalSinister = this.modalCtrl.create(DataPage, {}, {cssClass: 'data-modal'});
    modalSinister.present();
  }


  goToCongratsQr(){
    this.navCtrl.setRoot(CongratsQrPage, {presentId: this.presentId})
  }

  goToCongrats() {
    console.log("liveDesde: ", this.liveDesde);
    this.navCtrl.setRoot(CongratsPage, {id: this.onlineId, imageURL: this.imagenURL, tipo: this.tipo, date: this.date, liveHasta: this.liveHasta, liveDesde: this.liveDesde})
  }

  // alertPaymentPresent() {
  //   const confirm = this.alertCtrl.create({
  //     title: 'Alerta',
  //     message: 'Autorizo al CPCE a debitar de mi cuenta corriente, el importe de $' + this.paymentOptionsPresent.data.data.categoria[0].ACA_MONTO + ' en ' + this.paymentQuotesSelected + ' cuotas mensuales',
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //           this.canceledToast()
  //         }
  //       },
  //       {
  //         text: 'Acepto',
  //         handler: () => {
  //           console.log('Agree clicked');
  //           this.payTrainingPresent()
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  // alertPaymentOnline() {
  //   const confirm = this.alertCtrl.create({
  //     title: 'Alerta',
  //     message: 'Autorizo al CPCE a debitar de mi cuenta corriente, el importe de $'+ this.paymentOptionsOnline.data.data.categoria[0].ACA_MONTO +' en '+ this.paymentQuotesSelected +' cuotas mensuales',
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //           this.canceledToast()
  //         }
  //       },
  //       {
  //         text: 'Acepto',
  //         handler: () => {
  //           console.log('Agree clicked');
  //           this.payTrainingOnline()
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  canceledToast() {
    const toast = this.toastCtrl.create({
      message: 'No se ha podido completar su inscripción',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  congratsToast() {
    const toast = this.toastCtrl.create({
      message: 'Su inscripción se ha completado con éxito',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  congratsToastOnline() {
    const toast = this.toastCtrl.create({
      message: 'Su inscripción se ha completado con éxito, podrá ingresar al curso a través de la pestaña MIS CURSOS',
      duration: 15000,
      position: 'top', 
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 500
    });
    loader.present();
  }

  goToCourse(){
    const toast = this.toastCtrl.create({
      message: 'Inscripción realizada con éxito.',
      duration: 5000,
      position: 'top',
    });
    toast.present();
    this.navCtrl.setRoot(CourseDetailPage, { online: "online", imagenURL: this.imagenURL, id: this.onlineId, tipo: this.tipo, payed: "payed"})

  }

  goBack() {
    this.navCtrl.pop();
  }

  getQuotesPres() {
    this.cuota = this.paymentQuotesSelected + " cuotas";
    // console.log("cuota changed", this.cuota);
    this.texto = "Autorizo al Consejo Profesional de Ciencias Económicas de Córdoba a adicionar a mis aportes mensuales, que como profesional matriculado de esta Institución me corresponden, y a partir del mes agosto de 2020, la cantidad de " + this.cuota + " hasta completar el monto total de $ " + this.paymentOptionsPresent.data.data.categoria[0].ACA_MONTO;
  }

  getQuotesOnl() {
    this.cuota = this.paymentQuotesSelected + " cuotas";
    // console.log("cuota changed", this.cuota);
    this.texto = "Autorizo al Consejo Profesional de Ciencias Económicas de Córdoba a adicionar a mis aportes mensuales, que como profesional matriculado de esta Institución me corresponden, y a partir del mes agosto de 2020, la cantidad de " + this.cuota + " hasta completar el monto total de $ " + this.paymentOptionsOnline.data.data.categoria[0].ACA_MONTO;
  }


  showAlertMensaje() {
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: this.paymentOptionsPresent.data.data.mensaje,
      buttons: [{
        text: 'Entendido',
        handler: () => {
          console.log('Entendido');
          this.goBack();
        }
      }
      ]
    });
    alert.present();
  }
}
