import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-complaints',
  templateUrl: 'complaints.html'
})
export class ComplaintsPage {

  article: any;
  pdf: any;
  loader: any;
  secures: any[] = [
    {
      name: "ALLIANZ",
      pdfUrl: "http://ddncentral.com.ar/files/allianz.pdf",
      pdfInt: "assets/pdf/allianz.pdf"
    },
    {
      name: "ATM",
      pdfUrl: "http://ddncentral.com.ar/files/atm.pdf",
      pdfInt: "assets/pdf/atm.pdf"
    },
    {
      name: "BERKLEY",
      pdfUrl: "http://ddncentral.com.ar/files/berkley.pdf",
      pdfInt: "assets/pdf/berkley.pdf"
    },
    {
      name: "BOSTON",
      pdfUrl: "http://ddncentral.com.ar/files/boston.pdf",
      pdfInt: "assets/pdf/boston.pdf"
    },
    {
      name: "CHUBB",
      pdfUrl: "http://ddncentral.com.ar/files/chubb.pdf",
      pdfInt: "assets/pdf/chubb.pdf"
    },
    {
      name: "FEDERACION PATRONAL",
      pdfUrl: "http://ddncentral.com.ar/files/fedpatronal.pdf",
      pdfInt: "assets/pdf/fedpatronal.pdf"
    },
    {
      name: "LA CAJA",
      pdfUrl: "http://ddncentral.com.ar/files/lacaja.pdf",
      pdfInt: "assets/pdf/lacaja.pdf"
    },
    {
      name: "HOLANDO",
      pdfUrl: "https://hnet.laholando.com/extranet/web01480.spr_download?p_o_nodo=117&p_x_formulario=DENUNCIA%20SINIESTROS%20AUTOMOTORES%20ANEXO%20I%20(11-02-2019).pdf",
      pdfInt: ""
    },
    {
      name: "LA SEGUNDA",
      pdfUrl: "http://ddncentral.com.ar/files/lasegunda.pdf",
      pdfInt: "assets/pdf/lasegunda.pdf"
    },
    {
      name: "MAPFRE",
      pdfUrl: "http://ddncentral.com.ar/files/mapfre.pdf",
      pdfInt: "assets/pdf/mapfre.pdf"
    },
    {
      name: "MERCANTIL ANDINA",
      pdfUrl: "http://ddncentral.com.ar/files/merandina.pdf",
      pdfInt: "assets/pdf/merandina.pdf"
    },
    {
      name: "MERIDIONAL SEGUROS",
      pdfUrl: "http://ddncentral.com.ar/files/meridional.pdf",
      pdfInt: "assets/pdf/meridional.pdf"
    },
    {
      name: "SEGUROS NACION",
      pdfUrl: "http://ddncentral.com.ar/files/nacionterceros.pdf",
      pdfInt: "assets/pdf/nacionterceros.pdf"
    },
    {
      name: "ORBIS",
      pdfUrl: "http://ddncentral.com.ar/files/orbis.pdf",
      pdfInt: "assets/pdf/orbis.pdf"
    },
    {
      name: "PROVIDENCIA",
      pdfUrl: "http://ddncentral.com.ar/files/providencia.pdf",
      pdfInt: "assets/pdf/providencia.pdf"
    },
    {
      name: "SANCOR SEGUROS",
      pdfUrl: "http://ddncentral.com.ar/files/sancor.pdf",
      pdfInt: "assets/pdf/sancor.pdf"
    },
    {
      name: "SURA (ex RSA)",
      pdfUrl: "http://ddncentral.com.ar/files/sura_ex_rsa.pdf",
      pdfInt: "assets/pdf/sura_ex_rsa.pdf"
    },
    {
      name: "ZURICH (ex QBE)",
      pdfUrl: "http://ddncentral.com.ar/files/zurich_ex_qbe.pdf",
      pdfInt: "assets/pdf/zurich_ex_qbe.pdf"
    }
  ];
    

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private file: File,
    private ft: FileTransfer,
    private document: DocumentViewer,
    private fileOpener: FileOpener,
    private platform: Platform,
    private callNumber: CallNumber,
    private loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintsPage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Descargando...",
      duration: 10000
    });
    this.loader.present();
  }


  openFileExternalUrl(item) {
    //let downloadUrl = Constants.FILES_BASE_URL + '/' + "assets/imgs/gearlabs_web_v4.pdf";
  this.presentLoading();
    let downloadUrl = item;
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer.download(downloadUrl, path + 'Formulario')
      .then(entry => {
        let url = entry.toURL();

        if (this.platform.is('ios')) {
          this.document.viewDocument(url, 'application/pdf', {});
        } else {
          this.fileOpener.open(url, 'application/pdf')
            .then(res => {
              this.loader.dismiss();
              console.log('File is opened')
            })
            .catch(e => console.log('Error opening file', e))
        }
      })
      .catch(e => console.log('Error opening file', e))
      .then(() => console.log('File finish final'));
    }

    // openFileInternal(item) {
    //   const options: DocumentViewerOptions = {
    //     title: 'Formulario'
    //   }

    //   let url = "assets/pdf/allianz.pdf";
    //   this.document.viewDocument(url, 'application/pdf', options);
    // }

  call() {
    this.callNumber.callNumber("01152172080", true)
    .then(res => {
      console.log('Launched dialer!', res)
    })
    .catch(err => console.log('Error launching dialer', err));
  }

}
