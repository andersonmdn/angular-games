import { TestBed } from '@angular/core/testing';

import { TermooModalService } from './termoo-modal.service';

describe('TermooModalService', () => {
  let service: TermooModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermooModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
