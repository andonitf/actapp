import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActDataservice } from '../../providers/act-dataservice';
//import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';
//import { TranslateService } from 'ng2-translate/ng2-translate'

import { EstropadakPage } from '../estropadak/estropadak';
import { TaldeakPage } from '../taldeak/taldeak';
import { EgutegiaPage } from '../egutegia/egutegia';
import { EmaitzakPage } from '../emaitzak/emaitzak';
import { SailkapenaPage } from '../sailkapena/sailkapena';
import { ZuzeneanPage } from '../zuzenean/zuzenean';
import { ArgazkiakPage } from '../argazkiak/argazkiak';
import { BerriakPage } from '../berriak/berriak';
import { EzarpenakPage } from '../ezarpenak/ezarpenak';
//import { ArgazkiBannerComponent } from '../../components/argazki-banner/argazki-banner';

@Component({
  selector: 'page-hasiera',
  templateUrl: 'hasiera.html',
})
export class HasieraPage {

  title: string = "";
  besteLiga: string = "";

  estropadakPage  = EstropadakPage;
  taldeakPage     = TaldeakPage;
  egutegiaPage    = EgutegiaPage;
  emaitzakPage    = EmaitzakPage;
  sailkapenaPage  = SailkapenaPage;
  zuzeneanPage    = ZuzeneanPage;
  argazkiakPage   = ArgazkiakPage;
  berriakPage     = BerriakPage;
  ezarpenakPage   = EzarpenakPage;

  public bannerdatuak: any = null;
  public message: string = null;

  constructor(
    public navCtrl: NavController,
    public ds: ActDataservice
    ) {
      if (ds.liga == "LSM"){
        this.title = ds.ligak[0].label + ' ' + ds.denboraldia;
        this.besteLiga = ds.ligak[1].label;
      }else{
        this.title = ds.ligak[1].label + ' ' + ds.denboraldia;
        this.besteLiga = ds.ligak[0].label;
      }
      this.message = 'testmessage';
      this.bannerdatuak = {
        src: 'hasiera',
        estropada: 'froga1',
        data: '01/01/1000'
      }
      //console.log(this.bannerdatuak);      
    }

  ionViewDidLoad() {
    console.log('Hello HasieraPage Page');

  }
}
