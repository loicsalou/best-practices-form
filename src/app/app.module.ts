import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './state';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {multiTranslateLoader, ObHttpApiInterceptor, ObMasterLayoutModule} from '@oblique/oblique';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PersonPageComponent} from './person-page/person-page.component';
import {CivilComponent} from './person-page/civil/civil.component';
import {CoordComponent} from './person-page/coord/coord.component';
import {EffectsModule} from '@ngrx/effects';
import {PersonEffects} from './state/person.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {HomepageComponent} from './homepage/homepage.component';
import {MatButtonModule} from '@angular/material/button';
import {FormStorageDirective} from './formutils/form.storage.directive';

@NgModule({
            declarations: [
              AppComponent,
              PersonPageComponent,
              CivilComponent,
              CoordComponent,
              FormStorageDirective,
              HomepageComponent
            ],
            imports: [
              BrowserModule,
              BrowserAnimationsModule,
              ReactiveFormsModule,
              NgxJsonViewerModule,
              AppRoutingModule,
              ObMasterLayoutModule,
              BrowserAnimationsModule,
              TranslateModule.forRoot(multiTranslateLoader()),
              HttpClientModule,
              StoreModule.forRoot(reducers, {
                metaReducers
              }),
              EffectsModule.forRoot([PersonEffects]),
              MatFormFieldModule,
              MatInputModule,
              MatDatepickerModule,
              MatNativeDateModule,
              MatButtonModule
            ],
            providers: [
              {provide: HTTP_INTERCEPTORS, useClass: ObHttpApiInterceptor, multi: true},
              {
                provide: DateAdapter, useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
              },
              {provide: MAT_DATE_LOCALE, useValue: 'fr-CH'},
              {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
    translate.use('fr');
    registerLocaleData(localeDe, 'de');
    registerLocaleData(localeFr, 'fr');
    registerLocaleData(localeIt, 'it');
  }
}
