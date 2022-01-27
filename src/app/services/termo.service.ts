import { LocalStorageService } from '../core/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TermoService {
  // private _totalAttempts: number = 5;
  // private _remainingAttempts: number = 0;
  // private _grid: Array<Array<TermoGrid>> = [];
  // private _totalColumns: number = 0;
  // private _answer: string = '';
  // private _activeRow: number = 0;
  // private _activeColumn: number = 0;
  // private localStorage: LocalStorageService;
  // constructor() {
  //   this.localStorage = new LocalStorageService();
  //   this._answer = this.getWord(); //Busca a Resposta do Jogo
  //   this._remainingAttempts = this.getRemainingAttempts(); //Busca as Tentativas Restantes
  //   console.log(
  //     '🚀 ~ file: termo.service.ts ~ line 22 ~ TermoService ~ constructor ~ this._remainingAttempts',
  //     this._remainingAttempts
  //   );
  //   this._totalColumns = this._answer.split('').length; //Busa o Numetro de Caracteres
  //   console.log('Resposta é:', this._answer);
  //   this.createGrid(this._totalColumns);
  //   this.unlockRow(this._activeRow);
  // }
  // private createGrid(columns: number): void {
  //   const newEmptyRow = this.getEmptyRow(columns);
  //   do {
  //     this.grid.push([...newEmptyRow]);
  //   } while (this.grid.length < this._totalAttempts);
  // }
  // private getEmptyRow(columns: number): Array<TermoGrid> {
  //   let lettersColumns: Array<TermoGrid> = [];
  //   do lettersColumns.push({ letter: '', status: 'locked' });
  //   while (lettersColumns.length < columns);
  //   return lettersColumns;
  // }
  // public hasAcriveColumnEmpty(): boolean {
  //   return this._activeColumn < this._totalColumns;
  // }
  // public setActiveColumnValue(value: string) {
  //   this.updateGridLetter(this._activeRow, this._activeColumn, value, 'unlock');
  //   this._activeColumn++;
  // }
  // public removeLastColumnValue(): void {
  //   if (this._activeColumn > 0) {
  //     this._activeColumn--;
  //     this.updateGridLetter(this._activeRow, this._activeColumn, '', 'unlock');
  //   }
  // }
  // public checkAcriveRowAnswer(): boolean {
  //   if (this._activeColumn == this._totalColumns) {
  //     if (this._remainingAttempts > 0) {
  //       this.setRemainingAttempts(this._remainingAttempts - 1);
  //     }
  //     console.log(this._remainingAttempts);
  //     this.checkAnswer(this._answer, this._activeRow, this._totalColumns);
  //     if (this.getActiveRowWord() == this._answer) {
  //       return true;
  //     }
  //     if (this._remainingAttempts > 0) {
  //       this._activeRow++;
  //       this._activeColumn = 0;
  //       this.unlockRow(this._activeRow);
  //     }
  //   }
  //   return false;
  // }
  // private getActiveRowWord(): string {
  //   let word: string = '';
  //   for (const activeColumn of this.grid[this._activeRow]) {
  //     word = `${word}${activeColumn.letter}`;
  //   }
  //   return word;
  // }
  // private getWord() {
  //   const words = ['Capacete', 'Comida', 'Corrida', 'Carro', 'Viagem'];
  //   const index = Math.floor(Math.random() * 4); //-- 0 to 3
  //   return words[index].toUpperCase();
  // }
  // public getRemainingAttempts() {
  //   const remainingAttempts = this.localStorage.get('remaining_attempts');
  //   return !remainingAttempts ? 5 : remainingAttempts;
  // }
  // private setRemainingAttempts(value: number): boolean {
  //   this._remainingAttempts = value;
  //   return this.localStorage.set('remaining_attempts', value);
  // }
  // private getStatusAnswer(
  //   answer: string,
  //   index: number,
  //   typed: string
  // ): 'correct' | 'locked' | 'wrong' | 'unlock' | 'close' {
  //   const correctLetter = answer.substring(index, index + 1);
  //   if (correctLetter == typed) {
  //     return 'correct';
  //   }
  //   if (answer.split('').indexOf(typed) >= 0) {
  //     return 'close';
  //   }
  //   if (correctLetter != typed) {
  //     return 'wrong';
  //   }
  //   return 'unlock';
  // }
  // private checkAnswer(
  //   answer: string,
  //   row: number,
  //   numberLetters: number
  // ): void {
  //   for (let index = 0; index < numberLetters; index++) {
  //     const typedLetter = this.getGridColumn(row, index).letter;
  //     this.updateGridLetter(
  //       row,
  //       index,
  //       typedLetter,
  //       this.getStatusAnswer(answer, index, typedLetter)
  //     );
  //   }
  // }
  // private updateGridLetter(
  //   row: number,
  //   column: number,
  //   letter: string,
  //   status: 'correct' | 'locked' | 'wrong' | 'unlock' | 'close'
  // ) {
  //   this.grid[row][column] = { letter: letter, status: status };
  // }
  // private getGridColumn(row: number, column: number): TermoGrid {
  //   return this.grid[row][column];
  // }
  // private unlockRow(row: number) {
  //   for (let index = 0; index < this._totalColumns; index++) {
  //     this.updateGridLetter(row, index, '', 'unlock');
  //   }
  // }
  // public get grid(): Array<Array<TermoGrid>> {
  //   return this._grid;
  // }
  // public getEmojiGrid(): string {
  //   const emojiGrid: Array<string> = [];
  //   for (let row = 0; row < this._grid.length; row++) {
  //     let emojiRow: string = '';
  //     for (let column = 0; column < this._grid.length; column++) {
  //       const status = this.getGridColumn(row, column).status;
  //       switch (status) {
  //         case 'correct':
  //           emojiRow += '🟩';
  //           break;
  //         case 'wrong':
  //           emojiRow += '🟥';
  //           break;
  //         case 'close':
  //           emojiRow += '🟨';
  //           break;
  //         default:
  //           emojiRow += '⬛';
  //           break;
  //       }
  //     }
  //     emojiGrid.push(emojiRow);
  //   }
  //   return emojiGrid.join('%0A');
  // }
}
