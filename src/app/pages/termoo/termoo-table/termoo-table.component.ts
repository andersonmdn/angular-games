import { Component, OnInit } from '@angular/core';

import { TermooService } from './../termoo.service';

@Component({
  selector: 'app-termoo-table',
  templateUrl: './termoo-table.component.html',
  styleUrls: ['./termoo-table.component.less', '../termoo.component.less'],
})
export class TermooTableComponent implements OnInit {
  constructor(public termooService: TermooService) {}

  ngOnInit(): void {}
}
