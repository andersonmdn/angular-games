import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermooComponent } from './termoo.component';
import { TermooTableComponent } from './termoo-table/termoo-table.component';
import { TermooModalComponent } from './termoo-modal/termoo-modal.component';

import { TermooModalService } from './termoo-modal/termoo-modal.service';
import { TermooTableService } from './termoo-table/termoo-table.service';
import { TermooService } from './termoo.service';

@NgModule({
  declarations: [TermooComponent, TermooTableComponent, TermooModalComponent],
  imports: [CommonModule],
  providers: [TermooService, TermooTableService, TermooModalService],
})
export class TermooModule {}
