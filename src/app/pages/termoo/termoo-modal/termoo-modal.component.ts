import { TermooTableService } from './../termoo-table/termoo-table.service';
import { TermooService } from './../termoo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TermooModalService } from './termoo-modal.service';

@Component({
  selector: 'app-termoo-modal',
  templateUrl: './termoo-modal.component.html',
  styleUrls: ['./termoo-modal.component.scss'],
})
export class TermooModalComponent implements OnInit {
  @Input() win: boolean = false;
  @Output() eventPlayAgain = new EventEmitter();
  @Output() eventShareTwitter = new EventEmitter();

  constructor(
    public termooModalService: TermooModalService,
    private termooTableService: TermooTableService
  ) {
    this.win = true;
  }

  public playAgain() {
    this.eventPlayAgain.emit();
  }

  public shareTwitter() {
    this.eventShareTwitter.emit();
  }

  ngOnInit(): void {}
}
