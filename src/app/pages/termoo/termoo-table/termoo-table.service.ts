import { Injectable } from '@angular/core';

import TermoTable from 'src/app/core/interfaces/TermoTable';
import { TermooService } from './../termoo.service';

@Injectable()
export class TermooTableService {
  private _table: Array<Array<TermoTable>> = [];
  private _totalColumns: number = 0;
  private _totalRows: number = 0;
  private _activeRow: number = 0;
  private _rightAnswer: string = '';

  constructor() {}

  public get table() {
    return this._table;
  }

  private set table(value) {
    this._table = value;
    this._totalRows = value.length;
    this._totalColumns = value[0].length;
  }

  public set rightAnswer(value: string) {
    this._rightAnswer = value;
  }

  public get rightAnswer(): string {
    return this._rightAnswer;
  }

  private set activeRow(value: number) {
    if (value < this.table.length) {
      this._activeRow = value;
    }
  }

  private get activeRow() {
    return this._activeRow;
  }

  public createNewTable(rows: number, columns: number) {
    const newTable: Array<Array<TermoTable>> = [];

    do {
      newTable.push(this.newExempleRow(columns));
    } while (newTable.length < rows);

    this.table = newTable;
  }

  public setNewLetter(letter: string) {
    const indexRow = this.activeRow;
    const indexColumn = this.getEmptyColumnIndex();

    if (indexColumn >= 0) {
      this.table[indexRow][indexColumn] = this.getUpdatedColumn(
        indexRow,
        indexColumn,
        letter
      );
    }
  }

  public removeLastLetter() {
    const indexRow = this.activeRow;
    const fillColumn = this.getEmptyColumnIndex() - 1;
    const indexColumn = fillColumn >= 0 ? fillColumn : this.table[0].length - 1;

    if (indexColumn >= 0) {
      this.table[indexRow][indexColumn] = this.getUpdatedColumn(
        indexRow,
        indexColumn,
        ''
      );
    }
  }

  private getUpdatedColumn(
    indexRow: number,
    indexColumn: number,
    newLetter: string = '',
    newStatus: 'correct' | 'locked' | 'wrong' | 'unlock' | 'close' | '' = ''
  ): TermoTable {
    const oldColumn = this.table[indexRow][indexColumn];

    const updatedColumn = {
      letter: newLetter,
      status: newStatus != '' ? newStatus : oldColumn.status,
    };

    return updatedColumn;
  }

  public updateColumnStatus() {
    const indexRow = this.activeRow;

    this.table[indexRow].map((column, indexColumn) => {
      let newStatus: 'correct' | 'locked' | 'wrong' | 'unlock' | 'close' | '';

      const isCorrectAnswer =
        column.letter ==
        this._rightAnswer.substring(indexColumn, indexColumn + 1);

      const isCloseAnswer =
        this._rightAnswer.split('').indexOf(column.letter) >= 0;

      if (isCorrectAnswer) {
        newStatus = 'correct';
      } else if (isCloseAnswer) {
        newStatus = 'close';
      } else {
        newStatus = 'wrong';
      }

      this.table[indexRow][indexColumn] = this.getUpdatedColumn(
        indexRow,
        indexColumn,
        column.letter,
        newStatus
      );
    });
  }

  public isCorrect() {
    return this.table[this.activeRow]
      .map((column) => {
        return column.status;
      })
      .every((status) => {
        return status == 'correct';
      });
  }

  public getWord(): string {
    return this.table[this.activeRow]
      .map((column) => {
        return column.letter;
      })
      .join('');
  }

  private getEmptyColumnIndex(): number {
    return this.table[this.activeRow]
      .map((column) => {
        return column.letter;
      })
      .indexOf('');
  }

  public hasFinishedTyping() {
    return this.getEmptyColumnIndex() < 0;
  }

  public setActiveRow(activeRow: number) {
    let newActiveRow = activeRow;

    if (newActiveRow > this.table.length) {
      newActiveRow = this.table.length;
    }

    newActiveRow--;

    this.activeRow = newActiveRow;
    this.unlockRows(newActiveRow);
  }

  private newExempleRow(columns: number): Array<TermoTable> {
    const newRow: Array<TermoTable> = [];
    do {
      newRow.push({ letter: '', status: 'locked' });
    } while (newRow.length < columns);

    return newRow;
  }

  private unlockRows(indexRow: number) {
    const newTable: Array<Array<TermoTable>> = [...this.table];

    for (let row = 0; row <= indexRow; row++) {
      newTable[row] = this.unlockRow(newTable[row]);
    }

    this.table = newTable;
  }

  private unlockRow(tableRow: Array<TermoTable>): Array<TermoTable> {
    const copyTable: Array<TermoTable> = [...tableRow];

    const newTable: Array<TermoTable> = copyTable.map((column: TermoTable) => {
      return {
        letter: column.letter,
        status: column.status == 'locked' ? 'unlock' : column.status,
      };
    });

    return newTable;
  }
}
