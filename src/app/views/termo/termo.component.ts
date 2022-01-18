import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

interface typeGridLetter {
  letter: string;
  status: string;
}

@Component({
  selector: 'app-termo',
  templateUrl: './termo.component.html',
  styleUrls: ['./termo.component.css'],
})
export class TermoComponent implements OnInit {
  public lettersGrid: Array<Array<typeGridLetter>> = [];
  private try: number = 0;
  private letterInputNumber: number = 0;
  private letterNumbers: number = 0;
  private answer: string = '';

  constructor(private eventManager: EventManager) {
    this.eventManager.addEventListener(
      document.body,
      'keyup',
      (e: KeyboardEvent) => this.simulateKeypress(e.key.toUpperCase())
    );
  }

  private getStatusAnswer(
    answer: string,
    index: number,
    typed: string
  ): string {
    const correctLetter = answer.substring(index, index + 1);

    if (correctLetter == typed) {
      return 'correct';
    }

    if (answer.split('').indexOf(typed) >= 0) {
      return 'close';
    }

    if (correctLetter != typed) {
      return 'wrong';
    }

    return 'unlock';
  }

  private checkAnswer(
    answer: string,
    row: number,
    numberLetters: number
  ): void {
    for (let index = 0; index < numberLetters; index++) {
      const typedLetter = this.getGridLetter(row, index).letter;
      this.updateGridLetter(
        row,
        index,
        typedLetter,
        this.getStatusAnswer(answer, index, typedLetter)
      );
    }
  }

  private updateGridLetter(
    row: number,
    column: number,
    letter: string,
    status: string
  ) {
    this.lettersGrid[row][column] = { letter: letter, status: status };
  }

  private getGridLetter(row: number, column: number): typeGridLetter {
    return this.lettersGrid[row][column];
  }

  private unlockRow(row: number, numberLetters: number) {
    for (let index = 0; index < numberLetters; index++) {
      this.updateGridLetter(row, index, '', 'unlock');
    }
  }

  private simulateKeypress(key: string): void {
    if (
      key.match(/[A-Z]{1,1}/g) &&
      key.length == 1 &&
      this.letterInputNumber < this.letterNumbers
    ) {
      this.updateGridLetter(this.try, this.letterInputNumber, key, 'unlock');
      this.letterInputNumber++;
    } else if (key == 'BACKSPACE' && this.letterInputNumber > 0) {
      this.letterInputNumber--;
      this.updateGridLetter(this.try, this.letterInputNumber, '', 'unlock');
    } else if (key == 'ENTER' && this.letterInputNumber == this.letterNumbers) {
      this.checkAnswer(this.answer, this.try, this.letterNumbers);

      if (this.lettersGrid[this.try].join('') == this.answer) {
        //CORRETO
      } else {
        this.try++;
        this.letterInputNumber = 0;
        this.unlockRow(this.try, this.letterNumbers);
        //ERRADO
      }
    }
  }

  ngOnInit(): void {
    const attempts = 5;
    let lettersColumns: Array<typeGridLetter> = [];

    this.answer = 'GABRIELA';

    this.letterNumbers = this.answer.split('').length;

    for (let index = 0; index < this.letterNumbers; index++) {
      lettersColumns.push({ letter: '', status: 'locked' });
    }

    for (let index = 0; index < attempts; index++) {
      this.lettersGrid.push([...lettersColumns]);
    }

    this.unlockRow(this.try, this.letterNumbers);

    console.log(this.lettersGrid);
  }
}
