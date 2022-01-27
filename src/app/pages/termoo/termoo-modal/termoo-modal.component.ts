import { TermooService } from './../termoo.service';
import { Component, Input, OnInit } from '@angular/core';

import { TermooModalService } from './termoo-modal.service';

@Component({
  selector: 'app-termoo-modal',
  templateUrl: './termoo-modal.component.html',
  styleUrls: ['./termoo-modal.component.css'],
})
export class TermooModalComponent implements OnInit {
  @Input() win: boolean = false;

  constructor(
    public termooModalService: TermooModalService,
    public termooService: TermooService
  ) {
    this.win = true;
  }

  public playAgain() {
    this.termooService.newGame();
  }

  ngOnInit(): void {}
}
