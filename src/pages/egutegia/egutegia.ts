import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../../providers/act-dataservice';
import { EmaitzakPage } from '../emaitzak/emaitzak';
//import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';

@Component({
  selector: 'page-egutegia',
  templateUrl: 'egutegia.html'
})
export class EgutegiaPage {

  items: any = null;
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
          //console.log(res);
          this.eguneratzen = res;
      });
  }

  ionViewDidLoad() {
    console.log('Page1');
    let loading = this.loadingCtrl.create({
        content: this.eguneratzen
    });
    loading.present();

    this.ds.getEgutegiaZerrenda().subscribe(
        data => {
          console.log('getEgutegiaZerrenda barruan');
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
    item.src = 'egutegia';
    this.navCtrl.push(EmaitzakPage, {
      item: item
    });
  }
}
