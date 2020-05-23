import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonPageComponent} from './person-page/person-page.component';
import {PersonPageGuardService} from './service/person-page-guard.service';
import {HomepageComponent} from './homepage/homepage.component';

const routes: Routes = [
  {path: 'person', component: PersonPageComponent, canActivate: [PersonPageGuardService]},
  {path: '**', component: HomepageComponent}
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
