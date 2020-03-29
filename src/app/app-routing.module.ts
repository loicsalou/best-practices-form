import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonPageComponent} from './person-page/person-page.component';

const routes: Routes = [
  {path: '**', component: PersonPageComponent}
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
