import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../../providers/act-dataservice';
import { BerriaIkusiPage } from '../berria-ikusi/berria-ikusi';
//import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';

@Component({
  selector: 'page-berriak',
  templateUrl: 'berriak.html'
})
export class BerriakPage {

  url: string = null;
  all_items   = []; 
  items: any  = [];
  datu_gehiago_dago: boolean = true;
  berriak_orriko: number = 6;
  subtitle: string = null;
  eguneratzen: string = null;

  constructor(
    public navCtrl: NavController,
    public ds: ActDataservice,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translateService: TranslateService
    ) {
      this.subtitle = ds.getLigaUrtea();
      this.translateService.get('Eguneratzen').subscribe((res: string) => {
        //console.log('hau iritxi da 1: '+ res);
        this.eguneratzen = res 
      });
  }

  ionViewDidLoad() {
    console.log('BerriakPage');
    let loading = this.loadingCtrl.create({
        content: this.eguneratzen
    });
    loading.present();

    this.ds.getBerriakZerrenda().subscribe(
        data => {
          console.log('getBerriakZerrenda barruan');
          this.url = data.url;
          //Berri guztiak gordetzen ditugu.
          this.all_items = data.items;
          this.berriakZerrendaraErantsi();
          // console.log(this.url);
          // console.log(this.items);
          loading.dismiss();
        }, 
        error => {
          console.error('Akats bat gertatu da: '+ error);
          loading.dismiss();
          this.translateService.get('DaturikEz').subscribe((res: string) => {
              console.log(res);
              let alert = this.alertCtrl.create({
                title: 'ERROR',
                subTitle: res,
                buttons: ['OK']
              });
              alert.present();
          });
        }
      );
  }

  berriakZerrendaraErantsi(){
    let items_count = this.items.length;
    for (let i=items_count; i<items_count+this.berriak_orriko;i++){
      if (i < this.all_items.length){
        this.items.push(this.all_items[i]);
      }else{
        this.datu_gehiago_dago = false;
      }
    }
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(BerriaIkusiPage, {
      url: this.url,
      berria: item
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      // for (var i = 0; i < 30; i++) {
      //   this.items.push( this.items.length );
      // }
      this.berriakZerrendaraErantsi();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
