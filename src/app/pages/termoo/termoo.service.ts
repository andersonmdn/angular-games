import { TermooModalService } from './termoo-modal/termoo-modal.service';
import { TermooTableService } from './termoo-table/termoo-table.service';
import { Injectable } from '@angular/core';

import { LocalStorageService } from './../../core/services/local-storage.service';
import AnswerList from 'src/app/core/interfaces/AnswerList';

@Injectable()
export class TermooService {
  private localStorage: LocalStorageService;
  private termooTableService: TermooTableService;
  private termooModalService: TermooModalService;
  private _currentAnswer: string = '';
  private _remainingAttempts: number = 0;
  private static totalAttempts: number = 5;
  private _won: boolean = false;

  constructor(
    private _localStorage: LocalStorageService,
    private _termooTableService: TermooTableService,
    private _termooModalService: TermooModalService
  ) {
    this.localStorage = _localStorage;
    this.termooTableService = _termooTableService;
    this.termooModalService = _termooModalService;

    if (this.isNewGame()) {
      this.newGame();
    } else {
      this.continueGame();
    }
  }

  public set won(value: boolean) {
    this._won = value;
  }

  public get won() {
    return this._won;
  }

  public set currentAnswer(value: string) {
    const formatedValue = value
      .normalize('NFD')
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
      .toUpperCase();

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
    const newIndex = this.localStorage.getNumber('new_answer');
    const newAnswer = AnswerList[newIndex];

    this.currentAnswer = newAnswer;
  }

  public newGame() {
    this.loadNewAnswer();
    this.loadNewRemainingAttempts();
    this.initializeGame();
    this.localStorage.set('in_game', 1);
  }

  public continueGame() {
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
    this.termooModalService.visible = false;
    this.termooModalService.loadStorageValues();
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

    this.localStorage.set('words', words);
  }

  private clearWord() {
    this.localStorage.remove('words');
  }

  private isNewGame(): boolean {
    return this.localStorage.get('in_game') == 0;
  }

  private win() {
    this.localStorage.increment('games');
    this.localStorage.increment('victories');
    this.localStorage.increment('sequence');
    this.localStorage.set('in_game', 0);
    this.localStorage.increment('new_answer');
    this.won = true;

    this.termooModalService.loadStorageValues();
    this.termooModalService.toggle();
  }

  private lose() {
    this.localStorage.increment('games');
    this.localStorage.set('sequence', 1);
    this.localStorage.set('in_game', 0);
    this.localStorage.increment('new_answer');
    this.won = false;

    this.termooModalService.loadStorageValues();
    this.termooModalService.toggle();
  }

  public getEmojiTable(): string {
    return this.termooTableService.getEmojiTable();
  }
}
