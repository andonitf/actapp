import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { ActDataservice } from '../../providers/act-dataservice';
import { ArgazkiaIkusiPage } from '../argazkia-ikusi/argazkia-ikusi';
import { TranslateService } from 'ng2-translate/ng2-translate'

@Component({
  selector: 'page-argazkiak',
  templateUrl: 'argazkiak.html'
})
export class ArgazkiakPage {

  items: any = null;
  url: any = null;
  photos: any = null;
  subtitle: string = null;
  eguneratzen: string = null;

  constructor(
    public navCtrl: NavController,
    public ds: ActDataservice,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
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
    console.log('ArgazkiakPage');
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

  itemSelected(idEstropada) {
    console.log(idEstropada);
    console.log(typeof(idEstropada));
    if (idEstropada == undefined) return;
    
    this.photos = null;
    let loading = this.loadingCtrl.create({
        content: this.eguneratzen
    });
    loading.present();

    this.ds.getArgazkiak(idEstropada).subscribe(
        data => {
          console.log('getEgutegiaZerrenda barruan');
          this.url = data.url;
          this.photos = data.items;
          console.log(this.photos);
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

  changePhoto( photo ){
    console.log(photo);
    
    // this.photoSelected = photo;
  }
  argazkiakIkusi( photo, index ){
    console.log(photo);
    console.log(index);
    let modal = this.modalCtrl.create( 
      ArgazkiaIkusiPage,
      {
        url: this.url,
        photos: this.photos,
        index: index
      }
      );
    modal.present();
  }
}
