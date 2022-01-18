import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermoComponent } from './views/termo/termo.component';

const routes: Routes = [{ path: 'termo', component: TermoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
