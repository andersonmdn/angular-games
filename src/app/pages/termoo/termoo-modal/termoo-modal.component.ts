import { TermooTableService } from './../termoo-table/termoo-table.service';
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
    public termooService: TermooService,
    private termooTableService: TermooTableService
  ) {
    this.win = true;
  }

  public playAgain() {
    this.termooService.newGame();
  }

  public shareTwitter() {
    const data = this.termooTableService.getEmojiTable();

    window.open(
      `https://twitter.com/intent/tweet?text=Joguei minha versão do jogo term.ooo %0A${data}%0A https://github.com/andersonmdn/angular-games `,
      '_blank'
    );
  }

  ngOnInit(): void {}
}
