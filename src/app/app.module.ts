import { HomeModule } from './pages/home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './core/services/local-storage.service';
import { MemoModule } from './pages/memo/memo.module';
import { TermooModule } from './pages/termoo/termoo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TermooModule,
    MemoModule,
    HomeModule,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
