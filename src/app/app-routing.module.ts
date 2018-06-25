import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegFormComponent} from './reg-form/reg-form.component';
import {ConfirmCodeComponent} from './confirm-code/confirm-code.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  { path: 'reg', component: RegFormComponent },
  { path: 'code', component: ConfirmCodeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/reg', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
