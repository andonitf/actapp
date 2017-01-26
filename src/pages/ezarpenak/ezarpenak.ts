import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActDataservice } from '../../providers/act-dataservice';
import { TranslateService } from 'ng2-translate/ng2-translate'
//import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';

@Component({
  selector: 'page-ezarpenak',
  templateUrl: 'ezarpenak.html'
})
export class EzarpenakPage {

  ligak: any;
  liga: string;
  denboraldiak: any;
  denboraldia: number;
  hizkuntzak: any;
  hizkuntza: string;

  constructor(
    public navCtrl: NavController,
    public ds: ActDataservice,
    private translateService: TranslateService
    ) {}

  ionViewDidLoad() {
    console.log('Hello Ezarpenak Page');
    this.ds.getLiga().then(data => {
        this.liga = data;
        this.ligak = this.ds.getLigaZerrenda();
        // console.log('liga Page');
        // console.log(this.ligak);
        // console.log(this.liga);
      });
    this.ds.getHizkuntza().then(data => {
        this.hizkuntza = data;
        this.hizkuntzak = this.ds.getHizkuntzaZerrenda();
        // console.log('hizkuntza Page');
        // console.log(this.hizkuntzak);
        // console.log(this.hizkuntza);
      });
    this.ds.getDenboraldia().then(data => {
        this.denboraldia = data;
        this.denboraldiak = this.ds.getDenboraldiZerrenda();
        // console.log('denboraldia Page');
        // console.log(this.denboraldiak);
        // console.log(this.denboraldia);
      });
  }

  itemChanged(item_type, item_data) {
    switch(item_type){
      case 'liga':
        console.log('itemChanged: '+ item_data);
        this.ds.setLiga(item_data).then(data => {
          console.log('denboraldi berria: '+ data);
          //this.navCtrl.setRoot(Page1);
        });
     break;
      case 'hizkuntza':
        console.log('itemChanged: '+ item_data);
        this.ds.setHizkuntza(item_data).then(data => {
          this.translateService.use(data);
          //this.translateService.use(lang);
          console.log('hizkuntza berria: '+ data);
          //this.navCtrl.setRoot(Page1);
        });
      break;
      case 'denboraldia':
        console.log('itemChanged: '+ item_data);
        this.ds.setDenboraldia(item_data).then(data => {
          console.log('denboraldi berria: '+ data);
          //this.navCtrl.setRoot(Page1);
        });
     break;
    }
  }
}
