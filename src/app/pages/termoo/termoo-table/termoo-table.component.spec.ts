import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermooTableComponent } from './termoo-table.component';

describe('TermooTableComponent', () => {
  let component: TermooTableComponent;
  let fixture: ComponentFixture<TermooTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermooTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermooTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
