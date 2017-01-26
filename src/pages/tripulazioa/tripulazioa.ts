import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../../providers/act-dataservice';

@Component({
  selector: 'page-tripulazioa',
  templateUrl: 'tripulazioa.html'
})
export class TripulazioaPage {

  title:        string;
  subtitle:     string  = null;
  estropada:    any;
  taldea:       any;
  datuak:       any     = null;
  delent:       any     = [];
  arraunlariak: any     = new Array();
  ordezkoak:    any     = [];
  eguneratzen:  string  = null;
  banner_datuak: any    = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ds: ActDataservice,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translateService: TranslateService
    ) {
      this.estropada = navParams.get('estropada');
      this.taldea = navParams.get('taldea');
      this.subtitle = ds.getLigaUrtea();
      this.translateService.get('Eguneratzen').subscribe((res: string) => {
          //console.log(res);
          this.eguneratzen = res;
      });

        console.log('this.estropada');
        console.log(this.estropada);
        console.log('this.taldea');
        console.log(this.taldea);

        this.banner_datuak = {
            data1: this.ds.entityToHtml(this.estropada.iz),
            data2: this.ds.entityToHtml(this.estropada.le),
            data3: this.ds.entityToHtml(this.estropada.da),
            data4: this.ds.entityToHtml(this.taldea.ta).toString().toUpperCase()
        };
        
        console.log('this.banner_datuak');
        console.log(this.banner_datuak);
    }

  ionViewDidLoad() {
    this.title = this.ds.entityToHtml(this.taldea.ta);
    console.log('Hello Tripulazioa Page');

//    console.log('TripulazioaPage');
    let loading = this.loadingCtrl.create({
        content: this.eguneratzen
    });
    loading.present();

    this.ds.getTripulazioa(this.estropada.id, this.taldea.id).subscribe(
        data => {
          console.log('getTripulazioa barruan');
          this.datuak = data;
          this.delent.push(data.ent);
          this.delent.push(data.del);
          this.arraunlariak = data.arraunlariak;
          this.ordezkoak = data.ordezkoak;
          console.log(this.datuak);
          console.log(this.arraunlariak);
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

  getTosta(nCuadro) {
      switch (nCuadro) {
          case 1:
              return "proa";
          case 2:
          case 4:
          case 6:
          case 8:
          case 10:
          case 12:
              return "babor";
          case 3:
          case 5:
          case 7:
          case 9:
          case 11:
          case 13:
              return "estribor";
          case 14:
              return "patron";
          default: return "";
      }
  }
}
