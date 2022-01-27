import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermooModalComponent } from './termoo-modal.component';

describe('TermooModalComponent', () => {
  let component: TermooModalComponent;
  let fixture: ComponentFixture<TermooModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermooModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermooModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
