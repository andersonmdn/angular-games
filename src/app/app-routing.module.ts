import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermooComponent } from './pages/termoo/termoo.component';

const routes: Routes = [{ path: '', component: TermooComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
