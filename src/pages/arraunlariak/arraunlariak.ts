import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../../providers/act-dataservice';

@Component({
  selector: 'page-arraunlariak',
  templateUrl: 'arraunlariak.html'
})
export class ArraunlariakPage {

  title: string;
  subtitle: string = null;
  selectedItem: any;
  items: any = null;
  eguneratzen: string = null;

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
    }

  ionViewDidLoad() {
    this.title = this.ds.entityToHtml(this.selectedItem.iz);
    //console.log('Hello PageDetail Page');
    console.log(this.selectedItem);

    console.log('ArraunlariakPage');
    let loading = this.loadingCtrl.create({
        content: this.eguneratzen
    });
    loading.present();

    this.ds.getArraunlariakZerrenda(this.selectedItem.id).subscribe(
        data => {
          console.log('getArraunlariakZerrenda barruan');
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
}
