import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import {
  Events,
  NavController,
  AlertController,
  App,
  Tab,
  Tabs,
  ModalController
} from "ionic-angular";
import { ViewChild } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Constants } from "../../app/app.constants";
import { LoginPage } from "../login/login";
import { MyCoursesPage } from "../my-courses/my-courses";
import { DomSanitizer } from "@angular/platform-browser";



@Component({
  templateUrl: "tabs.html"
  
})
export class TabsPage {
  @ViewChild("Tabs") Tabs: Tabs;

  tabHome = HomePage;
  tabMyCourses = MyCoursesPage;
  
  
  user;


  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    public app: App
  ) {
    
    this.storage.get(Constants.storage.user).then(user => {
      this.user = user;
    });
  }

    ionViewDidEnter(){
      
    }


  showNotifications() {
    this.checkLogin(
      "Para visualizar las notificaciones debe ingresar o registrarse!"
    );
  }

  openWsp() {
    window.open("whatsapp://send?text=Hola%20me%20comunico%20desde%20la%20App%20de%20Capacitación%20CPCE&phone=+5493513507747&abid=+5493513507747", "_system")
  }

  showProfile() {
    this.checkLogin("Para ver su perfil debe ingresar o registrarse!");
  }

  checkLogin(msg) {
    if (!this.user) {
      this.Tabs.select(0);
      this.showAccess(msg);
    }
  }

  showAccess(msg) {
    const confirm = this.alertCtrl.create({
      title: "Acceso Restringido",
      message: msg + " Desea hacerlo?",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Si",
          handler: () => {
            console.log("Agree clicked");
            this.goToLogin();
          }
        }
      ]
    });
    confirm.present();
  }

  wspAlert() {
    const confirm = this.alertCtrl.create({
      title: "Contacto",
      message: " Desea contactarnos vía WhatsApp?",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Aceptar",
          handler: () => {
            console.log("Agree clicked");
            
          }
        }
      ]
    });
    confirm.present();
  }

  // <a href="whatsapp://send?text=Hola%2C%20%C2%BFte%20interesa%20coordinar%20una%20reuni%C3%B3n%3F%20%C2%BFNos%20encontramos%20en%20el%20espacio%20de%20networking%20Sala%20B2C%20ubicada%20en%20la%20planta%20alta%3F&phone=+5493513507747&abid=+5493513507747" > </a>

  goToLogin() {
    console.log("Back to Login");
    this.app.getRootNav().setRoot(LoginPage);
  }
}
