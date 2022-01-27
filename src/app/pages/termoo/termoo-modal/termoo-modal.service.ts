import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TermooModalService {
  private _games: number;
  private _victories: number;
  private _sequence: number;
  private _localStorageService: LocalStorageService;
  private _visible: boolean = false;

  constructor(private localStorage: LocalStorageService) {
    this._localStorageService = localStorage;

    this._games = this._localStorageService.getNumber('games');
    this._victories = this._localStorageService.getNumber('victories');
    this._sequence = this._localStorageService.getNumber('sequence');
  }

  public toggle() {
    this.visible = !this.visible;
  }

  public get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    console.log('adad');

    this._visible = value;
  }

  public get games() {
    return this._games;
  }

  public set games(value: number) {
    this._games = value;
  }

  private get victories() {
    return this._victories;
  }

  private set victories(value: number) {
    this._victories = value;
  }

  public percentageWins(): number {
    const percentageWins: number = (this.victories / this.games) * 100;
    const formatedPercentageWins: number = parseInt(percentageWins.toFixed(0));

    console.log(this.victories, this.games);

    if (formatedPercentageWins) {
      return formatedPercentageWins;
    }

    return 0;
  }

  public get sequence() {
    return this._sequence;
  }

  public set sequence(value: number) {
    this._sequence = value;
  }
}
