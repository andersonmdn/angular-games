import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoComponent } from './termo.component';
import { TermoService } from './../../services/termo.service';

@NgModule({
  declarations: [TermoComponent],
  imports: [CommonModule],
  providers: [TermoService],
})
export class TermoModule {}
