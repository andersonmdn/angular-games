import { TermooService } from './termoo.service';
import { Component, OnInit } from '@angular/core';

import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-termoo',
  templateUrl: './termoo.component.html',
  styleUrls: ['./termoo.component.css'],
})
export class TermooComponent implements OnInit {
  constructor(
    public termooService: TermooService,
    private eventManager: EventManager
  ) {
    console.log('Termoo Component - Constructor');
    this.eventManager.addEventListener(
      document.body,
      'keyup',
      (event: KeyboardEvent) => this.termooService.newEntry(event.key)
    );
  }

  ngOnInit(): void {}
}
