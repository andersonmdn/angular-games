import { TermooModalService } from './termoo-modal/termoo-modal.service';
import { TermooTableService } from './termoo-table/termoo-table.service';
import { Injectable } from '@angular/core';

import { LocalStorageService } from './../../core/services/local-storage.service';

@Injectable()
export class TermooService {
  private localStorage: LocalStorageService;
  private termooTableService: TermooTableService;
  private termooModalService: TermooModalService;
  private _currentAnswer: string = '';
  private _remainingAttempts: number = 0;
  private static totalAttempts: number = 5;

  constructor(
    private _localStorage: LocalStorageService,
    private _termooTableService: TermooTableService,
    private _termooModalService: TermooModalService
  ) {
    console.log('Termoo Service - Constructor');
    this.localStorage = _localStorage;
    this.termooTableService = _termooTableService;
    this.termooModalService = _termooModalService;

    if (this.isNewGame()) {
      this.newGame();
    } else {
      this.continueGame();
    }
  }

  public set currentAnswer(value: string) {
    const formatedValue = value.toUpperCase();

    this._currentAnswer = formatedValue;
    this.termooTableService.rightAnswer = this._currentAnswer;
    this.localStorage.set('answer', this._currentAnswer);
  }

  public get currentAnswer(): string {
    return this._currentAnswer;
  }

  private set remainingAttempts(value: number) {
    this._remainingAttempts = value;
    this.localStorage.set('remaining_attempts', this._remainingAttempts);
  }

  private get remainingAttempts() {
    return this._remainingAttempts;
  }

  private loadNewRemainingAttempts() {
    this.remainingAttempts = 5;
  }

  private loadStorageRemainingAttempts() {
    const localStorageRemainingAttempts =
      this.localStorage.get('remaining_attempts');

    if (localStorageRemainingAttempts) {
      this.remainingAttempts = localStorageRemainingAttempts;
    } else {
      this.newGame();
    }
  }

  private loadStorageAnswer() {
    const localStorageAnswer = this.localStorage.get('answer');

    if (localStorageAnswer) {
      this.currentAnswer = localStorageAnswer;
    } else {
      this.newGame();
    }
  }

  private loadNewAnswer() {
    const newAnswer = 'TESTE';

    this.currentAnswer = newAnswer;
  }

  public newGame() {
    console.log('Termoo Service - Inicio do um Novo Jogo');
    this.loadNewAnswer();
    this.loadNewRemainingAttempts();
    this.initializeGame();
    this.localStorage.set('in_game', 1);
  }

  public continueGame() {
    console.log('Termoo Service - Continuar do um Jogo');
    this.loadStorageAnswer();
    this.loadStorageRemainingAttempts();
    this.initializeGame();
  }

  public getTermooTable() {
    return this.termooTableService.table;
  }

  private loadWords() {
    const localWords: Array<string> = this.localStorage.get('words');

    if (localWords) {
      localWords.map((word, indexRow) => {
        word.split('').map((letter) => {
          this.termooTableService.setActiveRow(indexRow + 1);
          this.newEntry(letter);
          this.termooTableService.updateColumnStatus();
        });
      });
    }
  }

  private initializeGame() {
    const activeRow = TermooService.totalAttempts - this.remainingAttempts + 1;

    this.termooTableService.createNewTable(5, this.currentAnswer.length);

    if (!this.isNewGame()) {
      this.loadWords();
    }

    this.termooTableService.setActiveRow(activeRow);
  }

  public newEntry(key: string) {
    const formatedKey = key ? key.toUpperCase().trim() : '';
    const isOneLetter: boolean | null =
      formatedKey.match(/[A-Z]/g) && formatedKey.length == 1;

    if (isOneLetter) {
      this.termooTableService.setNewLetter(formatedKey);
    } else if (formatedKey == 'BACKSPACE') {
      this.termooTableService.removeLastLetter();
    } else if (
      formatedKey == 'ENTER' &&
      this.termooTableService.hasFinishedTyping()
    ) {
      this.nextAttempt();
    }
  }

  private decrementAttempts() {
    if (this.remainingAttempts > 0) {
      this.remainingAttempts = this.remainingAttempts - 1;
    }
  }

  private nextAttempt() {
    this.termooTableService.updateColumnStatus();
    const isCorrect = this.termooTableService.isCorrect();

    this.decrementAttempts();

    if (isCorrect) {
      this.win();
      this.clearWord();
    } else if (this.remainingAttempts > 0) {
      this.saveWord();

      const newActiveRow =
        TermooService.totalAttempts - this.remainingAttempts + 1;

      this.termooTableService.setActiveRow(newActiveRow);
    } else {
      this.lose();
      this.clearWord();
    }
  }

  private saveWord() {
    const fullWord = this.termooTableService.getWord();

    const localWords: Array<string> = this.localStorage.get('words');
    let words: Array<string>;

    if (localWords) {
      words = [...localWords];
    } else {
      words = [];
    }

    words.push(fullWord);
    console.log(words, fullWord);

    this.localStorage.set('words', words);
  }

  private clearWord() {
    this.localStorage.remove('words');
  }

  private isNewGame(): boolean {
    return this.localStorage.get('in_game') == 0;
  }

  private win() {
    console.log('Vitória');

    this.localStorage.increment('games');
    this.localStorage.increment('victories');
    this.localStorage.increment('sequence');
    this.localStorage.set('in_game', 0);

    this.termooModalService.toggle();
  }

  private lose() {
    this.localStorage.increment('games');
    this.localStorage.set('sequence', 1);
    this.localStorage.set('in_game', 0);

    this.termooModalService.toggle();
    console.log('Derrota');
  }
}
