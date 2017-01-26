import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ActDataservice } from '../providers/act-dataservice';
import { ACTApp } from './app.component';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
// import { HizkuntzaPage } from '../pages/hizkuntza/hizkuntza';
// import { LigaPage } from '../pages/liga/liga';
// import { DenboraldiaPage } from '../pages/denboraldia/denboraldia';
import { HasieraPage } from '../pages/hasiera/hasiera';
import { EstropadakPage } from '../pages/estropadak/estropadak';
import { EzarpenakPage } from '../pages/ezarpenak/ezarpenak';
import { EgutegiaPage } from '../pages/egutegia/egutegia';
import { EmaitzakPage } from '../pages/emaitzak/emaitzak';
import { TripulazioaPage} from '../pages/tripulazioa/tripulazioa';
import { TaldeakPage} from '../pages/taldeak/taldeak';
import { ArraunlariakPage} from '../pages/arraunlariak/arraunlariak';
import { SailkapenaPage} from '../pages/sailkapena/sailkapena';
import { ArgazkiakPage} from '../pages/argazkiak/argazkiak';
import { ArgazkiaIkusiPage} from '../pages/argazkia-ikusi/argazkia-ikusi';
import { BerriakPage } from '../pages/berriak/berriak';
import { BerriaIkusiPage } from '../pages/berria-ikusi/berria-ikusi';
import { ZuzeneanPage } from '../pages/zuzenean/zuzenean';

import { ArgazkiBannerComponent } from '../components/argazki-banner/argazki-banner';

@NgModule({
  declarations: [
    ACTApp,
    HasieraPage,
    EstropadakPage,
    // HizkuntzaPage,
    // LigaPage,
    // DenboraldiaPage,
    EzarpenakPage,
    EgutegiaPage,
    EmaitzakPage,
    TripulazioaPage,
    TaldeakPage,
    ArraunlariakPage,
    SailkapenaPage,
    ArgazkiakPage,
    ArgazkiaIkusiPage,
    BerriakPage,
    BerriaIkusiPage,
    ZuzeneanPage,
    ArgazkiBannerComponent
  ],
  imports: [
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      //useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      useFactory: translateLoaderFactory,
      deps: [Http]
    }),
    IonicModule.forRoot(ACTApp, {
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ACTApp,
    HasieraPage,
    EstropadakPage,
    // HizkuntzaPage,
    // LigaPage,
    // DenboraldiaPage,
    EzarpenakPage,
    EgutegiaPage,
    EmaitzakPage,
    TripulazioaPage,
    TaldeakPage,
    ArraunlariakPage,
    SailkapenaPage,
    ArgazkiakPage,
    ArgazkiaIkusiPage,
    BerriakPage,
    BerriaIkusiPage,
    ZuzeneanPage,
    ArgazkiBannerComponent
  ],
  providers: [Storage, ActDataservice] //, IonicApp
})
export class AppModule {}

export function translateLoaderFactory(http: any) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
