import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemoComponent } from './pages/memo/memo.component';
import { HomeComponent } from './pages/home/home.component';
import { TermooComponent } from './pages/termoo/termoo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'memo', component: MemoComponent },
  { path: 'termoo', component: TermooComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
