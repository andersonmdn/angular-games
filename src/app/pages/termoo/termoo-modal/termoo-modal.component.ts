import { Component, OnInit } from '@angular/core';

import { TermooModalService } from './termoo-modal.service';

@Component({
  selector: 'app-termoo-modal',
  templateUrl: './termoo-modal.component.html',
  styleUrls: ['./termoo-modal.component.css'],
})
export class TermooModalComponent implements OnInit {
  constructor(public termooModalService: TermooModalService) {}

  ngOnInit(): void {}
}
