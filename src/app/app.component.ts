import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../providers/act-dataservice';
import { HasieraPage } from '../pages/hasiera/hasiera';
import { EstropadakPage } from '../pages/estropadak/estropadak';
import { EzarpenakPage } from '../pages/ezarpenak/ezarpenak';
import { EgutegiaPage } from '../pages/egutegia/egutegia';
import { TaldeakPage } from '../pages/taldeak/taldeak';
import { SailkapenaPage } from '../pages/sailkapena/sailkapena';
import { ArgazkiakPage } from '../pages/argazkiak/argazkiak';
import { BerriakPage } from '../pages/berriak/berriak';
import { ZuzeneanPage } from '../pages/zuzenean/zuzenean';

//import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';

@Component({
  templateUrl: 'app.html'
})
export class ACTApp {
  @ViewChild(Nav) nav: Nav;

  // so here we'll intialize the public member
  // with a type of string
  chosenTheme: string;
  pages: Array<{title: string, component: any, icon: string}>;
  rootPage: any = null;// HasieraPage;

  hizkuntzak: Array<{value: string, label: string}>;
  ligak: Array<{value: string, label: string}>;
  denboraldiak: number[] = [];

  constructor(
    public platform: Platform,
    public storage: Storage,
    public ds: ActDataservice,
    private translateService: TranslateService) {
    this.initializeApp();

    this.chosenTheme = 'LSM-theme';
    //Language
    this.translateService.setDefaultLang('es');
    
    this.hizkuntzak = ds.getHizkuntzaZerrenda();
    this.ligak = ds.getLigaZerrenda();
    this.denboraldiak = ds.getDenboraldiZerrenda();
    
    Observable.forkJoin([
        this.initializeDenboraldia(),
        this.initializeLiga(),
        this.initializeHizkuntza()
        ])
        .subscribe(data => {
          //console.log(data[0], data[1], data[2]);
          //both call succeeded
          console.log(`hasieratutako datuak ${data[0]}, ${data[1]}, ${data[2]} `);
          this.translateService.use(data[2]);

          // using our local, private instance of the SettingsService's public method
          // to subscribe to theme changes and set a default chosen theme
          this.ds.getTheme().subscribe(val => this.chosenTheme = val);
          
          /* Una vez inicializados los datos, se establece la página principal */
          this.rootPage = HasieraPage;
        }
    );

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HasieraPage, icon: 'home' },
      { title: 'Egutegia', component: EstropadakPage, icon: 'beer' },
      { title: 'Taldeak', component: TaldeakPage, icon: 'contact' },
      { title: 'Emaitzak', component: EgutegiaPage, icon: 'beer' },
      { title: 'Sailkapena', component: SailkapenaPage, icon: 'home' },
      { title: 'Zuzenean', component: ZuzeneanPage, icon: 'beer' },
      { title: 'Argazkiak', component: ArgazkiakPage, icon: 'camera' },
      { title: 'Berriak', component: BerriakPage, icon: 'flag' },
      { title: 'Ezarpenak', component: EzarpenakPage, icon: 'globe' }
      ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  initializeDenboraldia(){
    return this.storage.get('Denboraldia').then( (data:any) => {
      if (data == null){
        let denboraldia = this.denboraldiak[0];
        return this.storage.set('Denboraldia', denboraldia).then( (data:any) => {
          console.log('Defektuz sortutato denboraldia da:', data);
          return data;
        });
      }else{
        return data;
      }
    });
  }

  initializeLiga(){
    return this.storage.get('Liga').then( (data:any) => {
      if (data == null){
        let liga = this.ligak[0].value;
        return this.storage.set('Liga', liga).then( (data:any) => {
          console.log('Defektuz sortutato liga da:', data);
          return data;
        });
      }else{
        return data;
      }
    });
  }

  initializeHizkuntza(){
    return this.storage.get('Hizkuntza').then( (data:any) => {
      if (data == null){
        let hizkuntza = this.hizkuntzak[0].value;
        return this.storage.set('Hizkuntza', hizkuntza).then( (data:any) => {
          console.log('Defektuz sortutato hizkuntza da:', data);
          return data;
        });
      }else{
        return data;
      }
    });
  }
}
