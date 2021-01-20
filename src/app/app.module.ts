import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MyApp } from './app.component';
import { Keyboard } from '@ionic-native/keyboard';

//Pages
import { IntroPage } from '../pages/intro/intro';
import { AdvicePage } from '../pages/advice/advice';
import { FormsPage } from '../pages/forms/forms';
import { DataPage } from '../pages/data/data';
import { ThirdPage } from '../pages/third/third';
import { UrgencyPage } from '../pages/urgency/urgency';
import { ComplaintsPage } from '../pages/complaints/complaints';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MyCoursesPage } from '../pages/my-courses/my-courses';
import { TabsPage } from '../pages/tabs/tabs';
import { PresentPage } from '../pages/present/present';
import { OnlinePage } from '../pages/online/online';
import { HomeListPage } from '../pages/home-list/home-list';
import { PopoverPage } from '../pages/popover/popover';
import { CourseDetailPage } from '../pages/course-detail/course-detail';
import { QrPage } from '../pages/qr/qr';
import { PollsPage } from '../pages/polls/polls';
import { PaymentPage } from '../pages/payment/payment';
import { CongratsQrPage } from '../pages/congrats-qr/congrats-qr';
import { DownloadsPage } from '../pages/downloads/downloads';
import { CongratsPage } from '../pages/congrats/congrats';
import { CongratsPollPage } from '../pages/congrats-poll/congrats-poll';
import { VideoPage } from '../pages/video/video';
import { CvPage } from '../pages/cv/cv';
import { TermsPage } from '../pages/terms/terms';


//Providers
import { BaseProvider } from '../providers/base/base';
import { LoginProvider } from '../providers/login/login';
import { TrainingsProvider } from '../providers/trainings/trainings';
import { TrainingProvider } from '../providers/training/training';
import { CategoriesProvider } from '../providers/categories/categories';
import { CertifiesProvider } from '../providers/certifies/certifies';
import { QrProvider } from '../providers/qr/qr';
import { PaymentProvider } from '../providers/payment/payment';
import { MyAccountProvider } from '../providers/myAccount/myAccount';
import { PollProvider } from '../providers/poll/poll';
import { VideoProvider } from '../providers/video/video';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Push } from '@ionic-native/push';
import { PushProvider } from '../providers/push/push';



@NgModule({
  declarations: [
    MyApp,
    AdvicePage,
    CongratsPage,
    IntroPage,
    FormsPage,
    DataPage,
    ThirdPage,
    TabsPage,
    CourseDetailPage,
    OnlinePage,
    HomeListPage,
    PaymentPage,
    QrPage,
    PollsPage,
    CongratsQrPage,
    CongratsPollPage,
    DownloadsPage,
    PopoverPage,
    MyCoursesPage,
    LoginPage,
    VideoPage,
    HomePage,
    PresentPage,
    UrgencyPage,
    ComplaintsPage,
    CvPage,
    TermsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: ''
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdvicePage,
    IntroPage,
    FormsPage,
    CongratsPage,
    DataPage,
    VideoPage,
    HomePage,
    MyCoursesPage,
    QrPage,
    TabsPage,
    DownloadsPage,
    PollsPage,
    OnlinePage,
    PaymentPage,
    CongratsQrPage,
    CongratsPollPage,
    HomeListPage,
    ThirdPage,
    PopoverPage,
    CourseDetailPage,
    PresentPage,
    LoginPage,
    UrgencyPage,
    ComplaintsPage,
    CvPage,
    TermsPage
  ],
  providers: [
    HTTP,
    StatusBar,
    InAppBrowser,
    SocialSharing,
    SplashScreen,
    File,
    FileTransfer,
    CallNumber,
    DocumentViewer,
    EmailComposer,
    SMS,
    Push,
    PushProvider,
    QrProvider,
    FileOpener,
    Keyboard,
    ScreenOrientation,
    HttpClientModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BaseProvider,
    LoginProvider,
    TrainingsProvider,
    PaymentProvider,
    TrainingProvider,
    VideoProvider,
    CategoriesProvider,
    CertifiesProvider,
    MyAccountProvider,
    PollProvider
  ]
})

export class AppModule { }
