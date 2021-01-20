import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Constants } from '../../app/app.constants';
import { Platform, Events } from 'ionic-angular';

@Injectable()
export class PushProvider {
  user: any;

  constructor(
    public http: HttpClient,
    private push: Push,
    private platform: Platform,
    public events: Events
    ) {
    console.log('Hello NotificationProvider Provider');
  }
  /**
   * @param user - id de usuario ( must be an object)
   */
  enablePN(user) {
    this.user = user
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          //alert('We have permission to send push notifications');
          this.registerPN();
        } else {
          console.log('We do not have permission to send push notifications');
          //alert("No tiene permisos para notificaciones");
          this.registerPN();
        }
      })
      .catch(response => {
        console.log(response);
        alert(response);
      });
  }

  registerPN() {
    const options: PushOptions = {
      android: {
        icon: Constants.PUSH_ICON_NAME,
        iconColor: Constants.PUSH_ICON_COLOR
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification:' + JSON.stringify(notification));
      this.events.publish('foregroundNotification',notification);
    }
    );

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered:' + JSON.stringify(registration));

      this.user.pnId = registration.registrationId;
      this.user.app = Constants.PUSH_APP_ID;
      if (this.platform.is('android')) {
        this.user.osType = 'android'
      } else if (this.platform.is('ios')) {
        this.user.osType = 'ios'
      }

      // const user = {
      //   app: "5cb76e58ab5af1207ea405bb",
      //   userApp: "user@dipro",
      //   pnId: registration.registrationId,
      //   osType: "Android"
      // };

      // const url = "http://190.106.134.143:3050/api/users/ensure"; //Micam
      const url = Constants.PUSH_SERVER_URL + Constants.PUSH_SERVER_REGISTER_ID;


      console.log("Ensure:" + JSON.stringify(this.user));
      //alert("Ensure:" + JSON.stringify(this.user));

      this.http.post(url, this.user)
        .toPromise()
        .then(response => {
          console.log("Ensure OK:" + JSON.stringify(response));
          //alert("Ensure OK :" + JSON.stringify(response));
        })
        .catch(error => {
          console.log("Error:" + JSON.stringify(error));
          //alert("Error:" + JSON.stringify(error));
        });

    }
    );

    pushObject.on('error').subscribe(error => alert('Ha ocurrido un error con el servidor de push notification ' + error));

  }

}
