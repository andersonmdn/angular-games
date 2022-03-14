import { Component, Input, OnInit } from '@angular/core';

import { Memo } from '../memo';

@Component({
  selector: 'app-memo-card',
  templateUrl: './memo-card.component.html',
  styleUrls: ['./memo-card.component.less'],
})
export class MemoCardComponent implements OnInit {
  @Input() memo: Memo = { image: '', active: false, right: false };

  constructor() {}

  ngOnInit() {}
}
