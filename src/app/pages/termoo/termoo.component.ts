import { TermooService } from './termoo.service';
import { Component, EventEmitter, OnInit } from '@angular/core';

import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-termoo',
  templateUrl: './termoo.component.html',
  styleUrls: ['./termoo.component.scss'],
})
export class TermooComponent implements OnInit {
  constructor(
    public termooService: TermooService,
    private eventManager: EventManager
  ) {
    this.eventManager.addEventListener(
      document.body,
      'keyup',
      (event: KeyboardEvent) => this.termooService.newEntry(event.key)
    );
  }

  public onPlayAgain() {
    console.log('Jogar Novamente');

    this.termooService.newGame();
  }

  public onShareTwitter() {
    const data = this.termooService.getEmojiTable();

    window.open(
      `https://twitter.com/intent/tweet?text=Joguei minha versão do jogo term.ooo %0A${data}%0A https://github.com/andersonmdn/angular-games `,
      '_blank'
    );
  }

  ngOnInit(): void {}
}
