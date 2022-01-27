import { LocalStorageService } from './core/services/local-storage.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TermooModule } from './pages/termoo/termoo.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TermooModule],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
