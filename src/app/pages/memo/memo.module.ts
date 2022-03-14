import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MemoCardComponent } from './memo-card/memo-card.component';
import { MemoComponent } from './memo.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MemoComponent, MemoCardComponent],
})
export class MemoModule {}
