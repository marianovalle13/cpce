import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, NavParams, Platform, App, Nav, Content, LoadingController } from 'ionic-angular';
import { NavController, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Constants } from '../../app/app.constants';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';
import Vimeo from '@vimeo/player';
import { VideoProvider } from '../../providers/video/video';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DownloadsPage } from '../downloads/downloads';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})


export class VideoPage {

  @ViewChild(Content) content: Content;
  @ViewChild('iframe') video: ElementRef;
  @ViewChild(Nav) nav: Nav;
  idVimeo: any;
  iframe: any;
  player: any;
  autoSaveInterval: number;
  vimeoURL: any;
  vimeo: any = {};
  titulo: any;
  trainingId: any;
  lastSecond: any;
  videoData: any;
  tipo: any;
  comment: any;
  training: any;
  live: any;
  item: any;
  messages: any = [];
  loader: any;
  user: any;
  isBusy: boolean = false;
  keyboardPresent: boolean = false;
  landscape: boolean = false;

  // 
  lolo: any = 4898;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public callNumber: CallNumber,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    public iab: InAppBrowser,
    private alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public videoProvider: VideoProvider,
    private screenOrientation: ScreenOrientation,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    public app: App,
    private keyboard: Keyboard
  ) {

    this.idVimeo = this.navParams.get("vimeo").idVimeo
    // this.vimeo = this.navParams.get("vimeo").idVimeo
    this.titulo = this.navParams.get("titulo")
    this.tipo = this.navParams.get("tipo")
    this.trainingId = this.navParams.get("id")
    this.training = this.navParams.get("training")
    this.item = this.navParams.get("item")
    console.log("video id", this.vimeo);
    console.log("titulo del curso", this.titulo);
    console.log("training ID", this.trainingId);
    this.user = JSON.parse(localStorage.getItem("info"));
    console.log("tipo", this.tipo);

    if (this.tipo == "3" || this.tipo == "Online") {
      if (this.item.mostrarChat && this.item.live){
        this.live = true;
      }
    } else {
      this.live = false;
    }

    //Debug chat
    //this.live = 1;

    this.orientationChange();
  }
  keyboardEvent(){
    this.keyboard.onKeyboardWillShow().subscribe(data => {
        console.log('keyboard is shown');
        this.keyboardPresent = true; 
      });
    this.keyboard.onKeyboardWillHide().subscribe(data => {
        console.log('keyboard is hide');
        this.keyboardPresent = false; 
      });
  }
  orientationChange() {
    // detect orientation changes
    this.screenOrientation.onChange().subscribe(
      () => {
        console.log("Orientation Changed", this.screenOrientation.type);
        if (this.screenOrientation.type == "landscape-primary" || this.screenOrientation.type == "landscape-secondary" ){
          this.landscape = true;
        } else {
          this.landscape = false;
          setTimeout(() => {
            this.scroll();
          }, 500);
        }
      }
    );
  }

  ionViewDidLoad() {
    this.getVimeo()
    this.getVideoData();
    this.getMessages(true);
    //if (this.live) {
    this.messagesTimer();
    //}
    setTimeout(() => {
      this.initilizeVimeo();
    }, 2000);
    this.keyboardEvent();
  }
  ionViewDidEnter() {
    this.hideTabs();
  }
  messagesTimer() {
    this.getMessages();
    setInterval(() => {
      console.log("Running Timer");
      //Controlar cantidad
      this.getMessages();
    }, 10000);
  }
  hideTabs() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
  }
  showTabs() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    elem.style.display = 'flex';
  }

  ionViewDidLeave() {
    clearInterval(this.autoSaveInterval);
    console.log("autoSaveInterval", this.autoSaveInterval);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.showTabs();
  }

  getVideoData() {
    this.presentLoading();
    this.videoProvider.getVideoData(this.trainingId).then(vid => {
      this.videoData = vid;
      console.log("datos del video", vid);
      this.loader.dismiss();
    })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
    });
    this.loader.present();
  }

  getMessages(start:boolean = false) {
    this.isBusy = true;
    this.videoProvider.getChat(this.trainingId).then((res: any) => {
      console.log(res);
      if(res.data.length !== this.messages.length) {
        this.messages = [];
        this.messages = res.data;
      }
      if (start) {
        this.scroll();
      }
      console.log(this.messages, "respuesta del provider")
      this.isBusy = false;
    })
      .catch(e => {
        console.log(e);
        this.isBusy = false;
      })
  }

  scroll() {
    setTimeout(() => {
      console.log("Scrolling to bottom");
      this.content.scrollToBottom(300);
    }, 20);

  }


  initilizeVimeo() {
    this.screenOrientation.unlock();
    console.log("Initialize vimeo");
    console.log(this.video)
    let options = {
      landscape: true,
      portrait: false
    }
    this.iframe = this.video.nativeElement;
    this.player = new Vimeo(this.iframe, options);
    console.log("vimeo player", this.player);
    this.loadVimeoEvents();
  }
  loadVimeoEvents() {
    let self = this;
    this.player.on('play', function () {
      console.log('Played the video');
      self.autoSaveInterval = setInterval(() => {
        self.player.getCurrentTime().then(res => {
          self.lastSecond = res;
          console.log("Current time: ", res)
          self.setVideoPause();
        });
      }, 10000);
    });
    this.player.on('pause', function () {
      console.log('Paused the video');
      console.log("lastSecond", this.lastSecond);
      clearInterval(self.autoSaveInterval);
      console.log("autoSaveInterval", self.autoSaveInterval)
    });
    if (this.videoData.data.videoPausado && this.videoData.data.videoPausado != 0 && this.tipo == "1") {
      this.setVideoCurrentTime(this.videoData.data.videoPausado);
    }
  }

  setVideoPause() {
    let info = JSON.parse(localStorage.getItem("info"));
    let data = {
      TIP_TIPDOC: info.tipoDocumento,
      PER_NRODOC: info.nroDocumento,
      CUR_ID: this.trainingId,
      TIEMPO: this.lastSecond,
    }
    this.videoProvider.setVideoPause(this.trainingId, data).then(res => {
      console.log(res, "post a PAUSE parto of the video")
      console.log(data, "DATOS DE PAUSA");
    })
  }

  sendComment() {
    if (this.comment == "" || this.comment == undefined) {
      this.showToast("Debe escribir una consulta");
    } else {
      let info = JSON.parse(localStorage.getItem("info"));
      let data = {
        TIP_TIPDOC: info.tipoDocumento,
        PER_NRODOC: info.nroDocumento,
        CUR_ID: this.trainingId,
        message: this.comment,
        // self: false
      }
      this.videoProvider.setComment(data).then(res => {
        console.log(res, "posteado el comentario")
        console.log(data, "DATOS DE COMENTARIO");
        // this.showToast("Su consulta fué enviada con éxito");
        this.comment = "";
        this.getMessages(true);
      })
    }
  }



  showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //Setear posición del video en segundos
  setVideoCurrentTime(seconds) {
    this.player.setCurrentTime(seconds);
    //this.playVideo();
  }
  playVideo() {
    this.player.play();
  }

  getVimeo() {
    let vimeoVideo = "https://player.vimeo.com/video/" + this.idVimeo;
    this.vimeoURL = this.sanitizer.bypassSecurityTrustResourceUrl(vimeoVideo);
  }
  downloads() {
    this.showTabs();
    let self = this;
    setTimeout(() => {
      self.navCtrl.push(DownloadsPage, { id: this.trainingId, archives: this.item.archivos, titulo: this.item.titulo })
    }, 50);
  }

}
