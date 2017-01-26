import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../../providers/act-dataservice';
import { TripulazioaPage } from '../tripulazioa/tripulazioa';
//import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';

@Component({
  selector: 'page-emaitzak',
  templateUrl: 'emaitzak.html'
})
export class EmaitzakPage {

  title:        string;
  subtitle:     string  = null;
  selectedItem: any;
  items:        any     = null;
  eguneratzen:  string  = null;
  banner_datuak:any     = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: ActDataservice,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translateService: TranslateService
    ) {
      this.selectedItem = navParams.get('item');
      this.subtitle = ds.getLigaUrtea();
      this.translateService.get('Eguneratzen').subscribe((res: string) => {
          //console.log(res);
          this.eguneratzen = res;
      });

      this.banner_datuak = {
          data1: this.ds.entityToHtml(this.selectedItem.iz),
          data2: this.ds.entityToHtml(this.selectedItem.le),
          data3: this.ds.entityToHtml(this.selectedItem.da),
          data4:this.ds.entityToHtml(this.selectedItem.or) 
      };
    }

  ionViewDidLoad() {
    this.title = this.ds.entityToHtml(this.selectedItem.iz);
    //console.log('Hello PageDetail Page');
    console.log(this.selectedItem);
    console.log('EmaitzakPage');
    let loading = this.loadingCtrl.create({
        content: this.eguneratzen
    });
    loading.present();

    this.ds.getEstropadaEmaitzak(this.selectedItem.id).subscribe(
        data => {
          console.log('getEstropadaEmaitzak barruan');
          this.items = data.items;
          console.log(this.items);
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

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TripulazioaPage, {
      estropada: this.selectedItem,
      taldea: item
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ds.getEstropadaEmaitzak(this.selectedItem.id).subscribe(
        data => {
          //console.log('getEstropadaEmaitzak barruan');
          this.items = data.items;
          console.log(this.items);
          console.log('Async operation has ended');
          refresher.complete();
        }, 
        error => {
          console.error('Akats bat gertatu da: '+ error);
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
}
