import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermooComponent } from './termoo.component';

describe('TermooComponent', () => {
  let component: TermooComponent;
  let fixture: ComponentFixture<TermooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
