import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Events } from 'ionic-angular';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Constants } from './app.constants';
import { PushProvider } from '../providers/push/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    public pushProvider: PushProvider,
    public toastCtrl: ToastController,
    screenOrientation: ScreenOrientation
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let info = JSON.parse(localStorage.getItem("info"))
      console.log('INFO', info)
      if (info) {
        const user = {
          userApp: info.nroDocumento
        };
        this.pushProvider.enablePN(user);
        this.rootPage = TabsPage
      } else {
        this.rootPage = LoginPage
      }
      statusBar.styleDefault();
      statusBar.overlaysWebView(false)
      splashScreen.hide();
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);

      //Show Foreground Notification
      this.events.subscribe('foregroundNotification', (notification) => {
        console.log(notification.title + " - " + notification.message)
        const toast = this.toastCtrl.create({
          message: notification.title + ': ' + notification.message,
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Cancelar Notificación');
        });
        toast.present();
      });
    });
  }
}
