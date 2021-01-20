import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TabsPage } from '../tabs/tabs';
// import {TabsProvider}  from '../../providers/login/login'
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { Constants } from '../../app/app.constants';
import { PushProvider } from '../../providers/push/push';
import { TermsPage } from '../terms/terms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  formObject: any;
  terms: boolean = true;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public iab: InAppBrowser,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public formBuilder: FormBuilder,
    public pushProvider: PushProvider,
    public loginProvider: LoginProvider
  ) {
    this.formObject = this.formBuilder.group({
      dni: ['', Validators.required],
      m1: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      m2: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      m3: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
      // matricula: ['', [Validators.required, Validators.pattern(('[0-9]{2}[-][0-9]{5}[-]{1}[0-9]{1}'))]],
      pin: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    });

  }


  goToHome() {
    this.navCtrl.setRoot(TabsPage)
  }


  login(object) {
    if(!this.terms){
      this.toast("Debe aceptar los términos y condiciones");
      return;
    }
    console.log(object.m1 + object.m2 + object.m3)
    this.loginProvider.login(object.dni, object.m1 + "-" + object.m2 + "-" + object.m3, object.pin).then((res: any) => {
      // error: {code: 0, message: ""} login exitoso
      // error: {code: 1, message: "Los datos ingresados no se encontraron"} login fallido
      if (res.error.code != 0) {
        this.toast(res.error.message)
      } else {
        localStorage.setItem("info", JSON.stringify(res.data))
        Constants.storage.user = JSON.parse(localStorage.getItem("info"));
        console.log('NRO DOC', res.data.nroDocumento)
        const user = {
          userApp: res.data.nroDocumento
        };
        this.pushProvider.enablePN(user);
        this.goToHome()
      }
    })
  }
  toast(status) {
    const toast = this.toastCtrl.create({
      message: status,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }


  
  goToTerms() {
    this.navCtrl.push(TermsPage)
  }
}
