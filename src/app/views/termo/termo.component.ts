import { TermoService } from './../../services/termo.service';
import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-termo',
  templateUrl: './termo.component.html',
  styleUrls: ['./termo.component.css'],
})
export class TermoComponent implements OnInit {
  constructor(
    private eventManager: EventManager,
    public termoService: TermoService
  ) {
    this.eventManager.addEventListener(
      document.body,
      'keyup',
      (e: KeyboardEvent) => this.keypress(e)
    );
  }

  private keypress(e: KeyboardEvent): void {
    const key = e.key.toUpperCase();

    if (
      key.match(/[A-Z]{1,1}/g) &&
      key.length == 1 &&
      this.termoService.hasAcriveColumnEmpty()
    ) {
      this.termoService.setActiveColumnValue(key);
    } else if (key == 'BACKSPACE') {
      this.termoService.removeLastColumnValue();
    } else if (key == 'ENTER') {
      this.termoService.checkAcriveRowAnswer();
    }
  }

  ngOnInit(): void {}
}
